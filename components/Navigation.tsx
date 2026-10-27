'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
const links = [['about','About'],['teaching','Teaching'],['books','Books'],['research','Research'],['achievements','Achievements'],['contact','Contact']] as const;
export function Navigation({ design }: { design: '1' | '2' | '3' }) {
 const [open,setOpen]=useState(false);
 return <header className={`portfolio-nav nav-${design}`}><Link className="identity" href={design === '1' ? '/' : `/demo/${design}/`}><span className="identity-icon">AM</span><span>Dr. Ananya Mehra<small>PROFESSOR · EDUCATOR · AUTHOR</small></span></Link><button className="nav-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="primary-navigation" className={open?'nav-links is-open':'nav-links'} aria-label="Portfolio navigation">{links.map(([id,label])=><Link key={id} href={`#${id}`} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="nav-cta" href="#contact" onClick={()=>setOpen(false)}>Let’s connect <ArrowUpRight size={14}/></Link></nav></header>;
}
