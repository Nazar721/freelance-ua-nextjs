import Image from "next/image";
import { Phone, Send } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer id="contacts" className="bg-[#111118] border-t border-[#2A2A38] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/media/logo.jpg" alt="Freelance UA" width={40} height={40} className="rounded-lg" />
              <div>
                <div className="font-bold text-[#F8F8FF]">Freelance UA</div>
                <div className="text-[#6366F1] text-sm">Digital Agency</div>
              </div>
            </div>
            <p className="text-[#8B8B9E] text-sm leading-relaxed">
              Команда фрілансерів для вашого бізнесу. ІТ, дизайн, відео.
            </p>
          </div>

          <div>
            <h3 className="text-[#F8F8FF] font-semibold mb-4">Контакти</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-[#8B8B9E] hover:text-[#F8F8FF] transition-colors"
              >
                <Phone size={16} className="text-[#6366F1]" />
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.telegram.consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#8B8B9E] hover:text-[#F8F8FF] transition-colors"
              >
                <Send size={16} className="text-[#6366F1]" />
                {siteConfig.telegram.username}
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#8B8B9E] hover:text-[#F8F8FF] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6366F1]">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[#F8F8FF] font-semibold mb-4">Наш канал</h3>
            <a
              href={siteConfig.telegram.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#8B5CF6] transition-colors text-sm font-medium"
            >
              <Send size={16} />
              Telegram-канал з кейсами
            </a>
          </div>
        </div>

        <div className="border-t border-[#2A2A38] pt-6 text-center text-[#555568] text-sm">
          © {new Date().getFullYear()} {siteConfig.name}. Всі права захищені.
        </div>
      </div>
    </footer>
  );
}
