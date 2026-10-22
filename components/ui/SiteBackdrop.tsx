"use client";

import { useEffect, useRef } from "react";

const VERTEX = `attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;
const FRAGMENT = `precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_light;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float t = u_time * 0.52;
  // Independently travelling bends change fold width and tension in place.
  // Broad, diffuse shading keeps this a textile surface rather than metal.
  vec2 q = p;
  q.x += 0.28 * sin(p.y * 3.0 + t * 0.67)
    + 0.12 * sin(p.x * 1.3 - p.y * 2.1 - t * 0.48);
  q.y += 0.27 * sin(p.x * 1.7 + t * 0.61)
    + 0.16 * cos(p.x * 2.4 + p.y * 1.6 - t * 0.73);
  float tension = 1.0 + 0.22 * sin(q.x * 1.6 - q.y * 1.2 + t * 0.39);
  float field = (q.y * 3.1 + q.x * 0.95) * tension
    + 0.48 * sin(q.x * 1.15 - q.y * 1.4 + t * 0.43);
  float phase = field * 2.7 + t * 0.32;
  float fold = sin(phase);
  float broad = smoothstep(-0.8, 0.9, fold);
  float ridge = pow(max(0.0, sin(phase + 0.68)), 2.6);
  float envelope = 0.68 + 0.28 * sin(q.x * 1.4 - q.y * 0.7 + t * 0.31);
  vec3 dark = vec3(0.027, 0.027, 0.043)
    + vec3(0.045, 0.031, 0.12) * broad * envelope
    + vec3(0.032, 0.018, 0.087) * ridge * envelope;
  vec3 light = vec3(0.978, 0.975, 0.99)
    - vec3(0.07, 0.078, 0.014) * broad * envelope
    - vec3(0.035, 0.039, 0.007) * ridge * envelope;
  gl_FragColor = vec4(mix(dark, light, u_light), 1.0);
}`;

/** One low-resolution moving fabric surface shared by all public routes. */
export default function SiteBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 767px)");
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let timeUniform: WebGLUniformLocation | null = null;
    let resolutionUniform: WebGLUniformLocation | null = null;
    let lightUniform: WebGLUniformLocation | null = null;
    let frame = 0;
    let timer = 0;
    let last = 0;
    let elapsed = 0;
    let paused = false;
    let lost = false;
    let failed = false;
    let light = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      frame = timer = 0;
      last = 0;
    };
    const release = () => {
      if (gl) {
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
      }
      buffer = null;
      program = null;
    };
    const setup = () => {
      if (failed || lost || motion.matches) return false;
      try {
        gl ??= canvas.getContext("webgl", {
          alpha: false, antialias: false, depth: false, stencil: false,
          powerPreference: "low-power", preserveDrawingBuffer: false,
        });
        if (!gl) throw new Error("WebGL unavailable");
        const shaders: WebGLShader[] = [];
        const compile = (type: number, source: string) => {
          const shader = gl!.createShader(type);
          if (!shader) throw new Error("Shader unavailable");
          shaders.push(shader);
          gl!.shaderSource(shader, source);
          gl!.compileShader(shader);
          if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) throw new Error("Shader compilation failed");
          return shader;
        };
        try {
          program = gl.createProgram();
          if (!program) throw new Error("Program unavailable");
          gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
          gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
          gl.linkProgram(program);
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Shader link failed");
        } finally {
          shaders.forEach((shader) => gl!.deleteShader(shader));
        }
        gl.useProgram(program);
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        timeUniform = gl.getUniformLocation(program, "u_time");
        resolutionUniform = gl.getUniformLocation(program, "u_resolution");
        lightUniform = gl.getUniformLocation(program, "u_light");
        return true;
      } catch {
        failed = true;
        release();
        return false;
      }
    };
    const draw = (now: number) => {
      if (!gl || !program || paused || lost || motion.matches) return;
      if (last) elapsed += Math.min((now - last) / 1000, 0.15);
      last = now;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 1.25, Math.sqrt(1_000_000 / (width * height)));
      const w = Math.max(1, Math.round(width * scale));
      const h = Math.max(1, Math.round(height * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(resolutionUniform, w, h);
      gl.uniform1f(timeUniform, elapsed);
      gl.uniform1f(lightUniform, light);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      root.dataset.ready = "true";
      timer = window.setTimeout(() => { frame = requestAnimationFrame(draw); }, 1000 / (mobile.matches ? 20 : 30));
    };
    const sync = () => {
      stop();
      const html = document.documentElement;
      light = html.dataset.theme === "light" || (!html.dataset.theme && !html.classList.contains("dark") && matchMedia("(prefers-color-scheme: light)").matches) ? 1 : 0;
      paused = document.hidden || !!document.querySelector(".yarl__container, [role='dialog'], dialog[open]");
      root.dataset.paused = String(paused);
      if (motion.matches) {
        root.dataset.mode = "static";
        root.dataset.ready = "false";
      } else if (!lost && (program || setup())) {
        root.dataset.mode = "animated";
        if (!paused) frame = requestAnimationFrame(draw);
      } else {
        root.dataset.mode = "fallback";
        root.dataset.ready = "false";
      }
    };
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      stop();
      root.dataset.ready = "false";
      root.dataset.mode = motion.matches ? "static" : "fallback";
    };
    const onRestored = () => {
      lost = false;
      failed = false;
      release();
      sync();
    };
    const themeObserver = new MutationObserver(sync);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    const dialogs = new MutationObserver((records) => {
      const selector = ".yarl__container, [role='dialog'], dialog";
      if (records.some((record) => record.type === "attributes" || [...record.addedNodes, ...record.removedNodes].some((node) => node instanceof Element && (node.matches(selector) || node.querySelector(selector))))) sync();
    });
    dialogs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open"] });
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    sync();
    return () => {
      stop();
      release();
      themeObserver.disconnect();
      dialogs.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="site-backdrop" data-mode="static" data-ready="false">
      <div className="site-backdrop__base" />
      <canvas ref={canvasRef} className="site-backdrop__canvas" />
    </div>
  );
}
