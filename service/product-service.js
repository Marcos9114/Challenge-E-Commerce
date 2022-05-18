const crearNuevaLinea = (nombre, precio, imagen) => {
  const linea = document.createElement("div");
  const card = `<div class="list-card__card">
        <img src="${imagen}" alt="imagen Star Wars" />
        <h1>${nombre}</h1>
        <h2 class="price">$ ${precio}</h2>
        <h3>#id</h3>
    </div>`;
};

const productDelete = (id) => {
  return fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
};

//abrir hhtp (método, url)
//Create POST
//REad GET
//Update PUT/PATCH
//Delete DELETE
const getProductsList = () => {
  return fetch("http://localhost:3000/products").then((response) =>
    response.json()
  );
};

//fetch abre una conexion a la url "http://...", genera una promesa, una vez que se complete esa promesa, la
//transformamos a formato JSON

const detalleProducto = (id) => {
  return fetch(`http://localhost:3000/products/${id}`).then((response) =>
    response.json()
  );
};

const createProduct = (product) => {
  const productData = {
    id: uuid.v4(),
    category: product.categoria,
    image: product.image,
    name: product.nombre,
    description: product.descripcion,
    precio: product.precio,
  };
  return fetch(`http://localhost:3000/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
};

const actualizarProducto = (product, id) => {
  const productData = {
    category: product.categoria,
    image: product.imagen,
    name: product.nombre,
    description: product.description,
    precio: product.precio,
  };
  return fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

const productServices = {
  productDelete,
  getProductsList,
  createProduct,
  detalleProducto,
  actualizarProducto
};

export { productServices };
