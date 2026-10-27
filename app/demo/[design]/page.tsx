import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PortfolioApp } from '@/components/PortfolioApp';
export function generateStaticParams(){return [{design:'1'},{design:'2'},{design:'3'}];}
export const dynamicParams = false;
export async function generateMetadata({params}:{params:Promise<{design:string}>}):Promise<Metadata>{const {design}=await params;return {title:`Demo ${design} — Portfolio Design Preview`,description:`A fictional medical educator portfolio presented in Demo ${design}.`,robots:{index:false,follow:false}};}
export default async function DesignPage({params}:{params:Promise<{design:string}>}){const {design}=await params;if(design!=='1'&&design!=='2'&&design!=='3')notFound();return <PortfolioApp design={design}/>;}
