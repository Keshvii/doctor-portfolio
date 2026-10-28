export type Design = '1' | '2' | '3';
export type SitePage = 'home' | 'about' | 'education' | 'inquiry';
export function pagePath(design: Design, page: SitePage = 'home') {
  const root = design === '1' ? '/' : `/demo/${design}/`;
  return page === 'home' ? root : `${root}${page}/`;
}
