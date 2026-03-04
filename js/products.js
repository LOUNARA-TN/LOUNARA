fetch('json/products.json')
.then(res=>res.json())
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
        img.src=imgSrc;
        img.alt=p.name+' - vue '+(i+1);
        if(i===0) img.classList.add('active');
        carousel.appendChild(img);
      });

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
});
