import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const base=(process.env.NEXT_PUBLIC_BASE_PATH||'').replace(/\/$/,'');
const routes=['/','/demo/1/','/demo/2/','/demo/3/'];
for(const route of routes){
 const file=join('out',route,'index.html');
 assert(existsSync(file),`Missing export route ${route}`);
 const html=readFileSync(file,'utf8');
 assert(/noindex/.test(html),`Missing noindex metadata ${route}`);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)){
  if(!url.startsWith('/'))continue;
  assert(!base||url.startsWith(base+'/'),`Missing base path: ${url}`);
  const local=decodeURIComponent(url.slice(base.length));
  const target=local.endsWith('/')?join('out',local,'index.html'):join('out',local);
  assert(existsSync(target),`Broken local route or asset ${url}`);
 }
 assert(!html.includes('rahul@example.com'),'Sample inquiry details leaked into output');
}
assert(existsSync('out/.nojekyll')&&existsSync('out/robots.txt'));
const chunks=readdirSync('out/_next/static/chunks').filter(name=>name.endsWith('.js'));
for(const chunk of chunks)assert(!readFileSync(join('out/_next/static/chunks',chunk),'utf8').includes('rahul@example.com'),'Sample inquiry detail in a browser chunk');
console.log(`Verified ${routes.length} exported pages, navigation and image paths (basePath=${base||'/'}), noindex and Pages marker files.`);
