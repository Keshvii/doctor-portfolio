import { assetPath } from '@/data/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Orbit, Sparkles } from 'lucide-react';
import { portfolio as d } from '@/data/portfolio';
import { About, Achievements, Books, Contact, Stats, Teaching } from '@/components/Sections';
export function DemoThree(){return <div className="design design-3"><section className="hero hero-three"><div className="three-note"><Sparkles size={14}/> A LIFE IN THE MAKING</div><div className="three-title"><span>SCIENCE / STORY / STUDENT</span><h1>Knowledge<br/>with <em>feeling.</em></h1><p>Dr. Siraj Ahmad<br/>Pharmacology faculty · Medical educator · Author</p><Link href="#about" className="three-down">ENTER THE PORTFOLIO <ArrowDown size={15}/></Link></div><div className="three-portrait"><span className="portrait-circle circle-a"/><span className="portrait-circle circle-b"/><Image src={assetPath(d.profile.heroImage)} width={147} height={196} alt="Dr. Siraj Ahmad, pharmacology educator" priority/><span className="portrait-stamp"><Orbit size={14}/> ALIGARH · INDIA</span></div><span className="three-margin-note">MBBS / MD (PHARMACOLOGY) · {d.profile.institution}</span><span className="hero-three-year">2026<br/>ACADEMIC<br/>PROFILE</span></section><div className="three-thesis"><span>01 / THE IDEA</span><p>{d.profile.personalStatement}</p><span>SIRAJ AHMAD · TEACHING APPROACH</span></div><Stats/><About design="3"/><Books design="3"/><Teaching design="3"/><Achievements design="3"/><Contact design="3"/></div>}

