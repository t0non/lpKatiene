// Native interactions for the static migration. Original theme handles menus and galleries.
document.addEventListener('click',event=>{
 const more=event.target.closest('.button-load-more');
 if(!more)return;
 event.preventDefault();event.stopImmediatePropagation();
 const container=more.closest('.portfolio-shortcode, .blog-shortcode');
 if(!container){location.href='/projetos-katflores/';return;}
 const hidden=[...container.querySelectorAll('.dt-css-grid > div')].filter(e=>!e.classList.contains('visible'));
 if(!hidden.length){location.href='/projetos-katflores/';return;}
 hidden.slice(0,8).forEach(e=>{e.classList.add('visible');e.style.display='';e.style.opacity='1';});
 if(hidden.length<=8)more.closest('.paginator').hidden=true;
 window.dispatchEvent(new Event('resize'));
},true);
document.addEventListener('DOMContentLoaded',async()=>{
 for(const a of document.querySelectorAll('a.scroll-top, a[title="Go to Top"]'))a.href='#page';
 for(const a of document.querySelectorAll('li.menu-item-has-children > a'))if(a.getAttribute('href')==='/')a.href='#';
 for(const f of document.querySelectorAll('form.searchform'))f.action='/busca/';
 const out=document.getElementById('kat-results');if(!out)return;
 const q=new URLSearchParams(location.search).get('s')||'';document.getElementById('kat-search').value=q;
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 try{const index=await(await fetch('/search-index.json')).json();const hits=index.filter(p=>normalize(p.title).includes(normalize(q)));const status=document.createElement('p');status.textContent=q?`${hits.length} resultado(s) para “${q}”`:'Digite um termo para buscar.';out.append(status);if(q)for(const p of hits){const a=document.createElement('a');a.href=p.route;const title=document.createElement('textarea');title.innerHTML=p.title;a.textContent=title.value;const article=document.createElement('article');article.append(a);out.append(article);}}catch{out.textContent='Não foi possível carregar a busca. Tente novamente.';}
});
