import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('.'),dist=path.join(root,'dist');
const report=JSON.parse(await fs.readFile(path.join(root,'capture-report.json'),'utf8'));
const map=new Map(report.assets.filter(a=>!a.failed).map(a=>[a.url,a.local]));
function local(v){try{return map.get(new URL(v,'https://katrosapaisagismo.com.br').href)||v}catch{return v}}
const search=[];
for(const route of report.pages){const file=path.join(dist,decodeURIComponent(route),'index.html');let s=await fs.readFile(file,'utf8');
s=s.replace(/((?:src|href|data-src|data-bg|poster)\s*=\s*)(["'])([^"']+)\2/gi,(a,p,q,v)=>p+q+local(v)+q);
s=s.replace(/(srcset\s*=\s*)(["'])([^"']+)\2/gi,(a,p,q,v)=>p+q+v.split(',').map(t=>t.trim().split(/\s+/).map((x,i)=>i?x:local(x)).join(' ')).join(', ')+q);
s=s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,t=>/SR7|_tpt|id="(?:tp-tools|sr7)-js"/.test(t)?'':t);
s=s.replace(/<sr7-module\b[\s\S]*?<\/sr7-module>/i,`<section class="kat-hero" aria-labelledby="kat-title"><img class="kat-hero-photo" src="/assets/6c8a105c653113600d.jpg" alt="Paisagismo da Kat Rosa na mostra Modernos Eternos" fetchpriority="high" width="1920" height="1080"><h1 id="kat-title">Ateliê de Flores e Paisagismo</h1><a class="kat-hero-contact" href="https://wa.me/553132969928?text=Ol%C3%A1!%20Contato%20do%20Site.">Entre em Contato</a><span class="kat-hero-dot" aria-hidden="true"></span></section>`);
s=s.replace(/(<form[^>]*class="[^"]*searchform[^>]*action=")[^"]+/g,'$1/busca/');
s=s.replace(/(<a[^>]*class="[^"]*button-load-more[^>]*href=")[^"]+/g,'$1#mais-projetos');
s=s.replace('</head>','<link rel="stylesheet" href="/modern.css">\n<script defer src="/modern.js"></script>\n</head>');
// Keep the original public contact service; the client must retain/configure it on migration.
const title=(s.match(/<title>(.*?)<\/title>/s)?.[1]||route).replace(/ &#8211;.*$/,'');
if(!/^\/(?:author|tag|category|project-category)\//.test(route)&&!/^\/\d{4}(?:\/\d{2}){0,2}\/$/.test(route))search.push({route,title});
await fs.writeFile(file,s);
}
await fs.writeFile(path.join(dist,'search-index.json'),JSON.stringify(search));
let base=await fs.readFile(path.join(dist,'contato/index.html'),'utf8');const start=base.indexOf('<div id="main"'),end=base.indexOf('<footer');
if(start<0||end<0)throw Error('Search template boundaries missing');
base=base.slice(0,start)+'<main id="main"><div class="wf-wrap"><h1>Busca</h1><form action="/busca/" role="search"><label for="kat-search">Buscar no site</label><input id="kat-search" name="s" type="search"><button type="submit">Buscar</button></form><div id="kat-results" aria-live="polite"></div></div></main>'+base.slice(end);
await fs.mkdir(path.join(dist,'busca'),{recursive:true});await fs.writeFile(path.join(dist,'busca/index.html'),base);
await fs.writeFile(path.join(dist,'_headers'),'/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log('Modernized',report.pages.length,'pages; local search',search.length,'entries');
