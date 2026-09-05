import { Case } from "@/types";

export const cases: Case[] = [
	// IT — 4 кейси (вебсайти)
	{
		id: 1,
		categoryKey: 'cases.1.category',
		titleKey: 'cases.1.title',
		descriptionKey: 'cases.1.description',
		reviewKey: 'cases.1.review',
		image: '/media/cases/ruslanaviation.webp',
		link: 'https://www.ruslanaviationcomponents.com/',
		section: 'it',
	},
	{
		id: 13,
		categoryKey: 'itCases.repairCollision.category',
		titleKey: 'itCases.repairCollision.title',
		descriptionKey: 'itCases.repairCollision.shortDesc',
		reviewKey: 'itCases.repairCollision.reviewText',
		image: '/media/cases/repair-collision-web.webp',
		link: 'https://kolizjaoc.pl/pl',
		section: 'it',
	},
	{
		id: 16,
		categoryKey: 'cases.9.category',
		titleKey: 'cases.9.title',
		descriptionKey: 'cases.9.description',
		reviewKey: 'cases.9.review',
		image: '/media/cases/prime-autoshipping.webp',
		link: 'https://prime-autoshippingllc.com/',
		section: 'it',
	},
	{
		id: 22,
		categoryKey: 'itCases.primeAuto.category',
		titleKey: 'itCases.primeAuto.title',
		descriptionKey: 'itCases.primeAuto.shortDesc',
		reviewKey: 'itCases.primeAuto.reviewText',
		image: '/media/cases/prime-autoshipping-mockup.webp',
		link: 'https://prime-autoshippingllc.com/',
		section: 'it',
	},
	{
		id: 17,
		categoryKey: 'cases.10.category',
		titleKey: 'cases.10.title',
		descriptionKey: 'cases.10.description',
		reviewKey: 'cases.10.review',
		image: '/media/cases/asandraapp-mocap.webp',
		link: 'https://t.me/asandrasoul_bot',
		section: 'it',
	},

	// Дизайн — кейси тепер у data/designCases.ts (окрема сторінка /cases/design)

	// Відео-кейси тепер у data/videoCases.ts (окрема сторінка /cases/video)
]
