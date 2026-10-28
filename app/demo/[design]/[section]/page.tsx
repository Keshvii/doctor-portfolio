import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DetailPage } from '@/components/DetailPage';
import type { Design } from '@/lib/routes';
const sections = ['about', 'education', 'inquiry'] as const;
export function generateStaticParams() { return ['1', '2', '3'].flatMap(design => sections.map(section => ({ design, section }))); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ design: string; section: string }> }): Promise<Metadata> {
  const { design, section } = await params;
  return { title: `${section === 'education' ? 'Educational Material' : section === 'about' ? 'About' : 'Inquiry'} — Demo ${design}` };
}
export default async function Page({ params }: { params: Promise<{ design: string; section: string }> }) {
  const { design, section } = await params;
  if (!['1', '2', '3'].includes(design) || !sections.includes(section as typeof sections[number])) notFound();
  return <DetailPage design={design as Design} page={section as typeof sections[number]}/>;
}
