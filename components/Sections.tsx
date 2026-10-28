import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Award, BookOpen, GraduationCap, HeartPulse, Library, Microscope, Stethoscope } from 'lucide-react';
import { assetPath, portfolio as d } from '@/data/portfolio';
import { pagePath, type Design } from '@/lib/routes';
import { SocialLinks } from './SocialLinks';
import { SiteFooter } from './SiteFooter';
import { TrendingSeries } from './TrendingSeries';
const expertiseIcons = [HeartPulse, Microscope, GraduationCap, Stethoscope, BookOpen, Library];
export function Stats() {
  return <div className="portfolio-stats">{d.statistics.slice(0,4).map(s => <div key={s.id}><strong>{s.value}{s.suffix}</strong><span>{s.label}</span></div>)}</div>;
}
export function About({ design, detailed = false }: { design: Design; detailed?: boolean }) {
  return <section id="about" className={`portfolio-section about-section about-${design}`}><div className="section-inner">
    <div className="section-heading"><p className="eyebrow">MEDICAL EDUCATOR · AUTHOR · PHYSICIAN</p><h2>Complex concepts.<br/>Clear explanations.</h2></div>
    <div className="about-layout"><figure className="about-portrait"><Image src={assetPath(d.profile.profileImage)} alt="Portrait of Dr. Siraj Ahmad" width={300} height={300}/><figcaption>Dr. Siraj Ahmad · MBBS, MD (Pharmacology)</figcaption></figure><div className="about-copy"><p className="lead">{d.profile.shortBio}</p>{detailed ? d.profile.fullBio.slice(1).map(p => <p key={p}>{p}</p>) : <p>From hospital-based clinical medicine to pharmacology education, his work connects clear explanations, clinical relevance and examination-focused learning.</p>}<div className="teaching-motto"><span className="eyebrow">THE FOCUS</span><p>{d.profile.mission}</p></div><Link className="text-link" href={detailed ? '#qualifications' : pagePath(design, 'about')}>{detailed ? 'Explore the professional journey' : 'More about Dr. Siraj'} <ArrowRight size={16}/></Link><SocialLinks design={design}/></div></div>
    {detailed && <div className="expertise-row">{d.expertise.map((item, i) => { const Icon = expertiseIcons[i % expertiseIcons.length]; return <article key={item.id}><Icon size={20}/><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div>}
  </div></section>;
}
export function Qualifications({ design }: { design: Design }) {
  return <section id="qualifications" className={`portfolio-section qualifications-section qualifications-${design}`}><div className="section-inner"><div className="section-heading"><p className="eyebrow">EDUCATION & PROFESSIONAL JOURNEY</p><h2>From clinical medicine<br/>to medical education.</h2></div><h3 className="timeline-heading">Professional experience</h3><div className="timeline">{d.experience.map((e, i) => <article key={e.id}><span className="timeline-date">{typeof e.startYear === 'string' ? e.startYear : e.startYear === e.endYear ? e.startYear : `${e.startYear} — ${e.endYear}`}</span><span className="timeline-mark">0{i + 1}</span><div><h3>{e.role}</h3><p className="timeline-org">{e.institution}</p><p>{e.description}</p></div></article>)}</div><h3 className="timeline-heading">Education</h3><div className="timeline">{d.education.map((e, i) => <article key={e.id}><span className="timeline-date">{e.year}</span><span className="timeline-mark">0{i + 1}</span><div><h3>{e.abbreviation}</h3><p className="timeline-org">{e.institution}</p><p>{e.degree} · {e.description}</p></div></article>)}</div></div></section>;
}
export function Books({ design }: { design: Design }) {
  return <section id="books" className={`portfolio-section books-section books-${design}`}><div className="section-inner"><div className="section-heading"><p className="eyebrow">BOOKS & EDUCATIONAL CONTRIBUTIONS</p><h2>Learning beyond<br/>the classroom.</h2><p>Educational titles supporting medical students and examination aspirants.</p></div><div className="book-grid">{d.books.map((book, i) => <article className="book-card" key={book.id}><div className={`book-cover book-cover-${i}`} aria-label={`Title artwork for ${book.title}`}><span>DR. SIRAJ AHMAD</span><BookOpen size={26}/><strong>{book.title}</strong><small>TITLE ARTWORK · EDUCATIONAL RESOURCE</small></div><div className="book-details"><span className="eyebrow">{book.subtitle}</span><h3>{book.title}</h3><p>{book.description}</p><div className="topic-list">{book.topics.map(t => <span key={t}>{t}</span>)}</div><p className="resource-note">{book.resourceNote}</p><Link className="text-link" href={pagePath(design, 'inquiry')}>Ask about this title <ArrowUpRight size={14}/></Link></div></article>)}</div></div></section>;
}
export function Achievements({ design }: { design: Design }) {
  return <section id="achievements" className={`portfolio-section achievement-section achievements-${design}`}><div className="section-inner"><div className="section-heading"><p className="eyebrow">PROFESSIONAL MILESTONES</p><h2>A journey shaped<br/>by learning.</h2></div><div className="achievement-grid">{d.achievements.map((a, i) => <article key={a.id}><span className="achievement-number">0{i + 1}</span><Award size={25}/><span className="eyebrow">{a.year} / {a.category}</span><h3>{a.title}</h3><p>{a.organization}</p><p className="achievement-desc">{a.description}</p></article>)}</div></div></section>;
}
export function Teaching({ design }: { design: Design }) { return <TrendingSeries design={design}/>; }
export function Contact({ design }: { design: Design }) {
  return <><section id="contact" className={`portfolio-section contact-section contact-${design}`}><div className="section-inner"><div className="faq-block"><div><p className="eyebrow">A FEW HELPFUL ANSWERS</p><h3>Before you get in touch.</h3></div><div>{d.faq.map(f => <details key={f.question}><summary>{f.question}<ArrowRight size={14}/></summary><p>{f.answer}</p></details>)}</div></div><div className="home-contact-cta"><div><p className="eyebrow">CONNECT WITH THE TEAM</p><h2>A question, an idea,<br/>an opportunity.</h2><p>{d.contact.description}</p></div><Link className="action-link" href={pagePath(design, 'inquiry')}>Start an inquiry <ArrowUpRight size={17}/></Link></div></div></section><SiteFooter design={design}/></>;
}
