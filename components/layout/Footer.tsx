"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Phone, Send } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { useTranslation } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

	return (
		<footer
			id='contacts'
			className='bg-surface border-t border-border py-12 pb-[100px] px-4'
		>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
					<div className='premium-surface rounded-2xl border border-border/60 bg-background/20 p-5'>
						<div className='flex items-center gap-3 mb-4'>
							<Image
								src='/media/logo.jpg'
								alt='Freelance UA'
								width={40}
								height={40}
								className='rounded-lg'
							/>
							<div>
								<div className='font-bold text-foreground'>Freelance UA</div>
								<div className='text-accent text-sm'>Digital Agency</div>
							</div>
						</div>
						<p className='text-muted-foreground text-sm leading-relaxed'>
							{t("footer.desc")}
						</p>
					</div>

					<div className='premium-surface rounded-2xl border border-border/60 bg-background/20 p-5'>
						<h3 className='text-foreground font-semibold mb-4'>{t("footer.contact")}</h3>
						<div className='flex flex-col gap-3'>
							<a
								href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
								className='flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors'
							>
								<Phone size={16} className='text-accent' />
								{siteConfig.phone}
							</a>
							<a
								href={siteConfig.telegram.consultationUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors'
							>
								<Send size={16} className='text-accent' />
								{siteConfig.telegram.username}
							</a>
							<a
								href={siteConfig.instagram}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors'
							>
								<svg
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='text-accent'
								>
									<rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
									<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
									<line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
								</svg>
								Instagram
							</a>
							<Link
								href='/partners'
								className='flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors'
							>
								<svg
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='text-accent'
								>
									<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
									<circle cx="9" cy="7" r="4" />
									<path d='M22 21v-2a4 4 0 0 0-3-3.87' />
									<path d='M16 3.13a4 4 0 0 1 0 7.75' />
								</svg>
								{t("header.partner")}
							</Link>
						</div>
					</div>

				</div>

				<div className='border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-text-muted text-sm'>
					<span>
						© {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
					</span>
				</div>
			</div>
		</footer>
	)
}
