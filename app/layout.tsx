import type { Metadata } from 'next';
import './globals.css';
import './responsive.css';
import './socials.css';
import './scholar.css';
import './clinical.css';
import './reference-designs.css';
import './updates.css';
import './demo-three.css';
export const metadata: Metadata = { title: { default: 'Dr. Siraj Ahmad — Portfolio', template: '%s | Dr. Siraj Ahmad' }, description: 'Pharmacology lectures, educational resources and professional inquiries for Dr. Siraj Ahmad, MBBS, MD (Pharmacology).', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-IN"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }
