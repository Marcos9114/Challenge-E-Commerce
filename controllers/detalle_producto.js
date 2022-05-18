import { productServices } from "../service/product-service.js";

const productoPagina = (productoImg, nombre, precio, descripcion) => {
  //   var nameProduct = document.getElementById("nameProduct");
  //   nameProduct.innerText += nombre;

  const contenedorProducto = document.querySelector("#producto-seleccionado");

  const contenidoHtml = `
        <div>
            <img src="${productoImg}" alt="${nombre}">
        </div>
        <div class="producto__texto">
            <h1 id="nameProduct">${nombre}</h1>
            <p class="price">$ ${precio}</p>
            <p> ${descripcion}</p>
        </div>`;

  const producto = document.createElement("div");
  producto.setAttribute("class", "container");

  producto.innerHTML = contenidoHtml;
  contenedorProducto.appendChild(producto);
  return contenedorProducto;
};

const obtenerInformacion = () => {
  const url = new URL(window.location);
  console.log(url);
  const id = url.searchParams.get("id");
  console.log(id);

  if (id === null) {
    alert("Error, el producto no se ha encontrado");
  }

  productServices
    .detalleProducto(id)
    .then(({ image, name, precio, description }) =>
      productoPagina(image, name, precio, description)
    )
    .catch((error) => alert("Hubo un error"));
};
obtenerInformacion();

const url = new URL(window.location);
const categoria = url.searchParams.get("category");
console.log(categoria);

const obtenerSimilares = async (categoria, elementId) => { //el elementId es el punto donde se ingresá en el html los resultados
  if (categoria === null) {
    alert("No se encuentra a la categoria");
  }

  const listaSimilares = document.getElementById(`${elementId}`);

  try {
    const lista = await productServices.getProductsList();

    const listaProductosFiltradaTotal = lista.filter(p => p.category == categoria);

    //selecciono los primeros 6 elementos de array
    const listaPrimerosProductos = listaProductosFiltradaTotal.slice(0,6);

    console.log(listaPrimerosProductos);

    listaPrimerosProductos.forEach((item) => {
      const div = document.createElement("div");
      div.setAttribute("class", "list-card__card");

      const lineaCard = `<a href="../html/producto.html?id=${item.id}&category=${item.category}"><img src="${item.image}" alt="${item.name}" /></a>
        <a href="../html/producto.html?id=${item.id}&category=${item.category}"><h1>${item.name}</h1></a>
        <h2 class="price">$ ${item.precio}</h2>`;



      div.innerHTML = lineaCard;
      listaSimilares.appendChild(div);
    });
  } catch (error) {
    alert("Hubo un error al cargar la página");
    console.log(error);
  }
};

obtenerSimilares(categoria, "listaProductos");
