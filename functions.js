'use strict';

const form = document.getElementById('productForm');
const search = document.getElementById('search');
const statusMessage = document.getElementById('statusMessage');
const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

function notify(message, error = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle('error', error);
}

function readProducts() {
    try {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        if (!Array.isArray(products) || products.some(product =>
            !product || !Number.isSafeInteger(product.id) || product.id <= 0 ||
            typeof product.name !== 'string' || !Number.isFinite(Number(product.price)) ||
            Number(product.price) <= 0)) {
            throw new Error('Invalid product data');
        }
        return products;
    } catch {
        notify('No se pudieron leer los datos guardados. No se sobrescribirán.', true);
        return null;
    }
}

function saveProducts(products) {
    try {
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    } catch {
        notify('No se pudieron guardar los cambios. Revisa el almacenamiento del navegador.', true);
        return false;
    }
}

function loadProductTable() {
    const products = readProducts();
    if (products === null) return;
    const query = search.value.trim().toLocaleLowerCase('es');
    const visible = products.filter(product => product.name.toLocaleLowerCase('es').includes(query));
    const tbody = document.querySelector('#productsTable tbody');
    tbody.replaceChildren();

    visible.forEach(product => {
        const row = document.createElement('tr');
        [product.id, product.name, currency.format(Number(product.price))].forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        const actions = document.createElement('td');
        const button = document.createElement('button');
        button.className = 'delete-btn';
        button.type = 'button';
        button.textContent = 'Eliminar';
        button.setAttribute('aria-label', `Eliminar ${product.name}`);
        button.addEventListener('click', () => deleteProduct(product.id));
        actions.appendChild(button);
        row.appendChild(actions);
        tbody.appendChild(row);
    });

    document.getElementById('productCount').textContent = products.length;
    document.getElementById('totalValue').textContent = currency.format(
        products.reduce((sum, product) => sum + Number(product.price), 0));
    document.getElementById('resultCount').textContent = `${visible.length} ${visible.length === 1 ? 'producto' : 'productos'}`;
    const empty = document.getElementById('emptyState');
    empty.hidden = visible.length > 0;
    empty.querySelector('h3').textContent = query ? 'Sin resultados' : 'Tu inventario empieza aquí';
    empty.querySelector('p').textContent = query ? 'Prueba con otro nombre de producto.' : 'Agrega tu primer producto con el formulario.';
}

function addProduct(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    const price = Number(document.getElementById('price').value);
    if (!name || !Number.isFinite(price) || price <= 0) {
        notify('Escribe un nombre y un precio mayor que cero.', true);
        return;
    }
    const products = readProducts();
    if (products === null) return;
    const nextId = products.reduce((highest, product) => Math.max(highest, product.id), 0) + 1;
    if (!Number.isSafeInteger(nextId)) {
        notify('No se pudo asignar un identificador al producto.', true);
        return;
    }
    products.push({ id: nextId, name, price });
    if (!saveProducts(products)) return;
    form.reset();
    search.value = '';
    loadProductTable();
    notify(`Producto «${name}» agregado.`);
    nameInput.focus();
}

function deleteProduct(productId) {
    const products = readProducts();
    if (products === null) return;
    if (!saveProducts(products.filter(product => product.id !== productId))) return;
    loadProductTable();
    notify('Producto eliminado.');
}

form.addEventListener('submit', addProduct);
search.addEventListener('input', loadProductTable);
window.addEventListener('storage', event => {
    if (event.key === 'products' || event.key === null) loadProductTable();
});
loadProductTable();
