import { productServices } from "../service/product-service.js";

const listProductPorCategoria = async (categoria, elementId) => {
  //el elementId es el punto donde se ingresá en el html los resultados
  if (categoria === null) {
    alert("No se encuentra a la categoria " + categoria);
  }

  const listaSimilares = document.getElementById(`${elementId}`);

  try {
    const lista = await productServices.getProductsList();

    const listaProductosFiltradaTotal = lista.filter(
      (p) => p.category == categoria
    );

    //selecciono los primeros 6 elementos de array
    const listaPrimerosProductos = listaProductosFiltradaTotal.slice(0, 6);

    console.log(listaPrimerosProductos);

    listaPrimerosProductos.forEach((item) => {
      const div = document.createElement("div");
      div.setAttribute("class", "list-card__card");

      const lineaCard = `<a href="../html/producto.html?id=${item.id}&category=${item.category}"><img src="${item.image}" alt="${item.name}" /></a>
          <a href="../html/producto.html?id=${item.id}&category=${item.category}"><h1>${item.name}</h1></a>
          <h2 class="price">$ ${item.precio}</h2>`

      div.innerHTML = lineaCard;
      listaSimilares.appendChild(div);
    });
  } catch (error) {
    alert("Hubo un error al cargar la página");
    console.log(error);
  }
};

listProductPorCategoria("star wars", "list-starwars");
listProductPorCategoria("consolas", "list-consolas");
listProductPorCategoria("diversos", "list-diversos");
