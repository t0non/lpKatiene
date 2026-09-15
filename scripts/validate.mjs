import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
async function walk(d){return(await Promise.all((await fs.readdir(d,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]))).flat()}
const files=await walk(root),errors=[];let refs=0;
for(const f of files.filter(f=>/\.(html|css)$/.test(f))){const s=await fs.readFile(f,'utf8');for(const m of s.matchAll(/(?:["'(])((?:\/assets\/)[^"')\s<>]+)/g)){refs++;try{await fs.access(path.join(root,m[1].split('?')[0]))}catch{errors.push({file:f,asset:m[1]})}}}
console.log(JSON.stringify({files:files.length,html:files.filter(f=>f.endsWith('.html')).length,assetReferences:refs,missingReferences:errors},null,2));if(errors.length)process.exitCode=1;
