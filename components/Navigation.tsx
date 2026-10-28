'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { pagePath, type Design, type SitePage } from '@/lib/routes';
export function Navigation({ design, page = 'home' }: { design: Design; page?: SitePage }) {
  const [open, setOpen] = useState(false);
  const links: [SitePage, string][] = [['home', 'Home'], ['about', 'About'], ['education', 'Educational Material']];
  return <header className={`portfolio-nav nav-${design}`}>
    <Link className="identity" href={pagePath(design)}><span className="identity-icon">SA</span><span>Dr. Siraj Ahmad<small>PHARMACOLOGY · EDUCATOR · AUTHOR</small></span></Link>
    <button className="nav-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav id="primary-navigation" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Portfolio navigation">
      {links.map(([key, label]) => <Link key={key} href={pagePath(design, key)} aria-current={page === key ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link href={`${pagePath(design)}#books`} onClick={() => setOpen(false)}>Books</Link>
      <Link className="nav-cta" href={pagePath(design, 'inquiry')} aria-current={page === 'inquiry' ? 'page' : undefined} onClick={() => setOpen(false)}>Inquiry <ArrowUpRight size={14}/></Link>
    </nav>
  </header>;
}
