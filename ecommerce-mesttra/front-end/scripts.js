// buscar o elemento lista que vai listar os meus produtos
const lista = document.querySelector('#lista');

// URL DA API
const apiURL = 'http://localhost:3000/products';

// busco os meus inputs para pegar o que usuario digitou;
const nameInput = document.querySelector('#name')
const categoryInput = document.querySelector('#category')
const priceInput = document.querySelector('#price')

// GET
const getProducts = async () => {
  lista.innerHTML = '';
  
  const response = await fetch(apiURL);
  const products = await response.json();

  products.map((product)=> {
    lista.insertAdjacentHTML('beforeend', `
    <li class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4 mb-4">
        <div class="bg-white shadow-md rounded-md p-4">
          <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
          <p class="text-gray-600">Categoria: ${product.category}</p>
          <p class="text-gray-800 font-bold">Preço: R$ ${product.price}</p>
          <button>Excluir</button>
        </div>
    </li>
    `)
  })
}

//POST
const submitForm = async (event) => {
  event.preventDefault();
  // Monto o que vai para o backend no post 
  const product = {
    name: nameInput.value,
    category: categoryInput.value,
    price: priceInput.value,
  }
  // COnstruir a minha requisicao de POST
  const request = new Request(`${apiURL}/add`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  const response = await fetch(request);
  const data = await response.json();
  console.log(data);

  alert(`produto ${data.data[0].name} Cadastrado`);
  getProducts();
}

// DELETE

getProducts();