import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { assetPath, portfolio as d } from '@/data/portfolio';
import { pagePath } from '@/lib/routes';
import { About, Achievements, Books, Contact, Stats, Teaching } from '@/components/Sections';

export function DemoThree() {
  return <div className="design design-3">
    <section className="demo3-hero">
      <div className="section-inner demo3-hero-grid">
        <div className="demo3-hero-copy">
          <p className="eyebrow">PHARMACOLOGY / MEDICAL EDUCATION</p>
          <h1>Knowledge<br/>with <em>feeling.</em></h1>
          <p className="demo3-name">Dr. Siraj Ahmad</p>
          <p className="demo3-hero-description">Clear explanations, clinical connections and focused learning for aspiring doctors.</p>
          <div className="demo3-hero-actions">
            <Link className="action-link" href={pagePath('3', 'education')}>Explore educational material <ArrowUpRight size={16}/></Link>
            <Link className="text-link" href={pagePath('3', 'about')}>About Dr. Siraj <ArrowUpRight size={15}/></Link>
          </div>
        </div>
        <figure className="demo3-portrait">
          <div className="demo3-photo"><Image src={assetPath(d.profile.heroImage)} width={600} height={600} alt="Dr. Siraj Ahmad, pharmacology educator" priority/></div>
          <figcaption><span>MEDICAL EDUCATOR · AUTHOR · PHYSICIAN</span><strong>MBBS, MD (Pharmacology)</strong></figcaption>
        </figure>
        <div className="demo3-hero-meta"><span>PHARMACOLOGY FACULTY · {d.profile.institution}</span><span><MapPin size={13} aria-hidden="true"/>{d.profile.location}</span></div>
      </div>
    </section>
    <div className="demo3-statement"><div className="section-inner"><span className="eyebrow">THE TEACHING APPROACH</span><p>{d.profile.personalStatement}</p></div></div>
    <Stats/><Teaching design="3"/><About design="3"/><Books design="3"/><Achievements design="3"/><Contact design="3"/>
  </div>;
}
