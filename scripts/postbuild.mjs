import { writeFileSync } from 'node:fs';
writeFileSync('out/.nojekyll', '');
writeFileSync('out/robots.txt', 'User-agent: *\nDisallow: /\n');
