fetch('json/products.json')
.then(res=>{
  if(!res.ok) throw new Error('Impossible de charger le JSON'); 
  return res.json();
})
.then(products=>{
  const container=document.querySelector('.grid');
  function displayProducts(filter='All'){
    container.innerHTML='';
    products.filter(p=>filter==='All'||p.category===filter).forEach(p=>{
      const link=document.createElement('a'); 
      link.className='item-link'; 
      link.href='product.html?id='+p.id;

      const carousel=document.createElement('div'); 
      carousel.className='carousel';
      p.images.forEach((imgSrc,i)=>{
        const img=document.createElement('img'); 
        img.dataset.src=imgSrc;
        if(i===0) img.classList.add('active');
        img.alt=p.name+' - vue '+(i+1);
        carousel.appendChild(img);
      });

      const firstImg=new Image(); firstImg.src=p.images[0];
      carousel.querySelectorAll('img').forEach(img=>img.src=img.dataset.src);

      const imgs=carousel.querySelectorAll('img'); let current=0;
      function showNext(){ imgs.forEach(img=>img.classList.remove('active')); imgs[current].classList.add('active'); current=(current+1)%imgs.length; }
      setInterval(showNext,3000);

      const title=document.createElement('h3'); title.textContent=p.name;
      const desc=document.createElement('p'); desc.textContent=p.description;

      link.appendChild(carousel); 
      link.appendChild(title); 
      link.appendChild(desc);
      container.appendChild(link);

      setTimeout(()=>{link.classList.add('visible');},50);
    });
  }
  displayProducts();
  document.querySelectorAll('.categories-menu a').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault(); 
      displayProducts(link.dataset.category);
    });
  });
})
.catch(err=>{
  document.querySelector('.grid').innerHTML=`<p style="text-align:center;color:red;">Erreur: ${err.message}</p>`;
  console.error(err);
});
