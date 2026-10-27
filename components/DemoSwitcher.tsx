import Link from 'next/link';
export function DemoSwitcher({ active }: { active: '1' | '2' | '3' }) {
  return <div className="demo-switcher" aria-label="Choose a design demo"><div className="demo-switcher-inner">{(['1','2','3'] as const).map(id => <Link href={id === '1' ? '/' : `/demo/${id}/`} key={id} aria-current={active === id ? 'page' : undefined}>Demo {id}</Link>)}</div></div>;
}
