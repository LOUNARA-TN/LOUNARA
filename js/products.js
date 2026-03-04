fetch('json/products.json')
.then(res=>res.json())
.then(products=>{
  const container = document.querySelector('.grid');

  function displayProducts(filter='All'){
    container.innerHTML='';

    products
    .filter(p => filter==='All' || p.category===filter)
    .forEach(p=>{

      const link = document.createElement('a');
      link.href = 'product.html?id=' + p.id;
      link.className = 'item-link';

      const img = document.createElement('img');
      img.src = p.images[0];
      img.alt = p.name;

      const title = document.createElement('h3');
      title.textContent = p.name;

      const desc = document.createElement('p');
      desc.textContent = p.description;

      link.appendChild(img);
      link.appendChild(title);
      link.appendChild(desc);

      container.appendChild(link);
    });
  }

  displayProducts();

  document.querySelectorAll('.categories-menu a')
  .forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      displayProducts(link.dataset.category);
    });
  });
});
