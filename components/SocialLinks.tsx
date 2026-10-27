import { ArrowUpRight } from 'lucide-react';
import { portfolio } from '@/data/portfolio';

const profiles = [
  { key: 'youtube', label: 'YouTube', hosts: ['youtube.com', 'www.youtube.com', 'm.youtube.com'] },
  { key: 'instagram', label: 'Instagram', hosts: ['instagram.com', 'www.instagram.com'] },
  { key: 'twitter', label: 'X / Twitter', hosts: ['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'] },
] as const;

function validProfileUrl(value: string | null | undefined, hosts: readonly string[]) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && hosts.includes(url.hostname.toLowerCase()) ? url.toString() : null;
  } catch {
    return null;
  }
}

export function SocialLinks({ design }: { design: '1' | '2' | '3' }) {
  const links = portfolio.profile.socialLinks;
  return (
    <div className={`profile-socials socials-${design}`} aria-label="Professional social profiles">
      <span className="socials-heading">FIND DR. MEHRA ONLINE</span>
      <div className="socials-list">
        {profiles.map(({ key, label, hosts }) => {
          const href = validProfileUrl(links[key], hosts);
          const displayLabel = key === 'youtube' ? links.youtubeLabel || label : label;
          return href ? (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer">
              {displayLabel}<ArrowUpRight size={13} aria-hidden="true"/>
            </a>
          ) : (
            <span key={key} className="social-pending" title={`${label} profile link will be added before launch`}>
              {displayLabel}<small>link pending</small>
            </span>
          );
        })}
      </div>
    </div>
  );
}
