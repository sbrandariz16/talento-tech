


document.addEventListener('DOMContentLoaded', function() { const btnCart = document.querySelector('.container-cart-icon'); const containerCartProducts = document.querySelector('.container-cart-products'); btnCart.addEventListener('click', () => { containerCartProducts.classList.toggle('hidden-cart'); }); });

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = JSON.parse(localStorage.getItem('cart')) || [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

document.addEventListener('DOMContentLoaded', () => {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const containerItems = document.getElementById('container-items');
            data.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('item');

                item.innerHTML = `
                    <figure>
                        <img src="${product.image}" alt="producto">
                    </figure>
                    <div class="info-product">
                        <h2>${product.name}</h2>
                        <p class="price">$${product.price}</p>
                        <button class="btn-add-cart">Añadir al carrito</button>
                        <button class="btn-view-description" data-description="${product.description}" data-title="${product.name}">Ver Descripción</button>
                    </div>
                `;

                containerItems.appendChild(item);
            });

            // Añadir evento a los botones de descripción
            const descriptionButtons = document.querySelectorAll('.btn-view-description');
            descriptionButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const modal = document.getElementById('productModal');
                    const modalTitle = document.getElementById('modalTitle');
                    const modalDescription = document.getElementById('modalDescription');
                    modalTitle.textContent = e.target.getAttribute('data-title');
                    modalDescription.textContent = e.target.getAttribute('data-description');
                    modal.style.display = 'block';
                });
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    showHTML();
});

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(product => product.title === infoProduct.title);

        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        showHTML();
    }
});

// Función para mostrar HTML
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total += parseInt(product.quantity * product.price.slice(1));
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(allProducts));
};

// Cerrar el modal
const modal = document.getElementById('productModal');
const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


