"use client";

import { useState, useCallback, useEffect } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { FadeIn } from "@/components/ui/FadeIn";

// ============================================================
// EmailJS placeholders — replace with your real values
// ============================================================
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";

interface FormState {
  name: string;
  telegram: string;
  message: string;
}

interface Errors {
  name?: string;
  telegram?: string;
  message?: string;
}

interface Toast {
  type: "success" | "error";
  message: string;
  closing?: boolean;
}

export default function ContactFormSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    telegram: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const validate = useCallback((): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Введіть ваше ім'я";
    if (!form.telegram.trim()) next.telegram = "Введіть Telegram Username";
    if (!form.message.trim()) next.message = "Опишіть ваш проєкт";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(
      () => setToast((prev) => (prev ? { ...prev, closing: true } : null)),
      3500
    );
    setTimeout(() => setToast(null), 3900);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name.trim(),
          telegram: form.telegram.trim(),
          message: form.message.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setForm({ name: "", telegram: "", message: "" });
      showToast("success", "Повідомлення надіслано! Ми зв'яжемось з вами.");
    } catch {
      showToast(
        "error",
        "Щось пішло не так. Спробуйте ще раз або напишіть у Telegram."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact-form" className="relative py-20 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!isMobile && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6366F1]/[0.04] blur-[120px]" />}
      </div>

      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Обговоримо ваш проєкт
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-xl mx-auto leading-relaxed">
            Опишіть завдання, і ми зв&apos;яжемось з вами найближчим часом
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={40} blur={6}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-2xl mx-auto"
          >
            <div className="gradient-border rounded-2xl p-7 sm:p-10 space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-[#F8F8FF]/80 mb-2"
                >
                  Ваше ім&apos;я <span className="text-[#6366F1]">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Наприклад, Олександр"
                  value={form.name}
                  onChange={handleChange}
                  disabled={sending}
                  className={`contact-form-input ${errors.name ? "error" : ""}`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-telegram"
                  className="block text-sm font-medium text-[#F8F8FF]/80 mb-2"
                >
                  Telegram Username{" "}
                  <span className="text-[#6366F1]">*</span>
                </label>
                <input
                  id="contact-telegram"
                  name="telegram"
                  type="text"
                  autoComplete="username"
                  placeholder="@username"
                  value={form.telegram}
                  onChange={handleChange}
                  disabled={sending}
                  className={`contact-form-input ${errors.telegram ? "error" : ""}`}
                />
                {errors.telegram && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.telegram}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[#F8F8FF]/80 mb-2"
                >
                  Опис проєкту <span className="text-[#6366F1]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Опишіть ваше завдання, терміни та побажання..."
                  value={form.message}
                  onChange={handleChange}
                  disabled={sending}
                  className={`contact-form-input resize-none ${errors.message ? "error" : ""}`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="magnetic-button w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] disabled:bg-[#6366F1]/50 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_48px_rgba(99,102,241,0.44)] text-base cursor-pointer disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <div className="spinner" />
                    Надсилаємо...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Надіслати запит
                  </>
                )}
              </button>
            </div>
          </form>
        </FadeIn>
      </div>

      {toast && (
        <div
          className={`toast-notification ${toast.type} ${toast.closing ? "closing" : ""}`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {toast.message}
        </div>
      )}
    </section>
  );
}
