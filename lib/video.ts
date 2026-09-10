/* Safari does not paint the first frame of <video preload="metadata">
   (Chrome does), leaving an empty box. Appending a media fragment makes
   Safari fetch and render that exact frame as the poster. */
export function withPosterFrame(src: string, t = 0.1): string {
  if (src.includes("#t=")) return src;
  return `${src}#t=${t}`;
}
