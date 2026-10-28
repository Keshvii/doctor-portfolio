import Link from 'next/link';
import { pagePath, type Design } from '@/lib/routes';
import { SocialLinks } from './SocialLinks';
export function SiteFooter({ design }: { design: Design }) {
  return <footer className={`site-footer footer-${design}`}><div className="section-inner"><div><Link className="footer-name" href={pagePath(design)}>Dr. Siraj Ahmad</Link><p>MBBS, MD (Pharmacology)<br/>Medical educator · Author · Physician</p></div><SocialLinks design={design}/><div className="footer-bottom"><span>Learn with understanding.</span><nav aria-label="Footer navigation"><Link href={pagePath(design, 'about')}>About</Link><Link href={pagePath(design, 'education')}>Educational Material</Link><Link href={pagePath(design, 'inquiry')}>Inquiry</Link></nav><span>Portfolio design {design}</span></div></div></footer>;
}
