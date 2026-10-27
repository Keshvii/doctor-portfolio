import type { Metadata } from 'next';
import './globals.css';
import './responsive.css';
import './socials.css';
import './scholar.css';
import './clinical.css';
import './reference-designs.css';
import './library-search.css';
export const metadata: Metadata = { title: { default: 'Dr. Ananya Mehra — Portfolio', template: '%s | Dr. Ananya Mehra' }, description: 'A fictional portfolio design prototype for Dr. Ananya Mehra, professor, medical educator, researcher and author.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-IN"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }
