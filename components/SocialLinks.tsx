import { ArrowUpRight, Instagram, Mail, Send, Stethoscope, Youtube } from 'lucide-react';
import { portfolio } from '@/data/portfolio';
import type { Design } from '@/lib/routes';
export function SocialLinks({ design }: { design: Design }) {
  const profiles = portfolio.profile.socialLinks;
  const links = [
    { label: 'Email', href: `mailto:${portfolio.contact.email}`, Icon: Mail },
    { label: 'YouTube', href: profiles.youtube, Icon: Youtube },
    { label: 'Instagram', href: profiles.instagram, Icon: Instagram },
    { label: 'PW MedEd · Telegram', href: profiles.telegram, Icon: Send },
    { label: 'Practo', href: profiles.practo, Icon: Stethoscope },
  ];
  return <div className={`profile-socials socials-${design}`} aria-label="Dr. Siraj Ahmad’s professional links">
    <span className="socials-heading">CONNECT WITH DR. SIRAJ</span>
    <div className="socials-list">{links.map(({ label, href, Icon }) => <a key={label} href={href} {...(!href.startsWith('mailto:') ? {target: '_blank', rel: 'noopener noreferrer'} : {})}><Icon size={16} aria-hidden="true"/>{label}<ArrowUpRight size={12} aria-hidden="true"/></a>)}</div>
  </div>;
}
