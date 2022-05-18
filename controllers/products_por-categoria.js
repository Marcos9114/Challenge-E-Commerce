import { productServices } from "../service/product-service.js";

const btnStarWars = document.getElementById("verProductosStarWars");
const btnConsolas = document.getElementById("verProductosConsolas");
const btnDiversos = document.getElementById("verProductosDiversos");
const titulo = document.querySelector("#productos__titulo h1");
const promociones = document.querySelector("#verProductosConPromociones");

if (btnStarWars) {
  btnStarWars.addEventListener("click", () => {
    window.location.href = `html/productos.html?category=${"star wars"}`;
  });
}

if (btnConsolas) {
  btnConsolas.addEventListener("click", () => {
    window.location.href = `html/productos.html?category=${"consolas"}`;
  });
}

if (btnDiversos) {
  btnDiversos.addEventListener("click", () => {
    window.location.href = `html/productos.html?category=${"diversos"}`;
  });
}

if (promociones) {
  promociones.addEventListener("click", () => {
    console.log(promociones);
    window.location.href = `html/productos.html?category=${"promocion"}`;
  });
}

const listProductPorCategoria = async (categoria, elementId) => {
  //el elementId es el punto donde se ingresá en el html los resultados
  if (categoria === null) {
    alert("No se encuentra a la categoria " + categoria);
  }

  const listaSimilares = document.getElementById(`${elementId}`);

  try {
    let lista = await productServices.getProductsList();

    if (categoria !== "todos los productos") {
      lista = lista.filter((p) => p.category == categoria);
    }

    lista.forEach((item) => {
      const div = document.createElement("div");
      div.setAttribute("class", "list-card__card");

      const lineaCard = `
            <a href="../html/producto.html?id=${item.id}&category=${item.category}"><img src="${item.image}" alt="${item.name}" /></a>
            <a href="../html/producto.html?id=${item.id}&category=${item.category}"><h1>${item.name}</h1></a>
            <h2 class="price">$ ${item.precio}</h2>`;

      div.innerHTML = lineaCard;
      listaSimilares.appendChild(div);
    })
    ;
  } catch (error) {
    alert("Hubo un error al cargar la página");
    console.log(error);
  }
};

const url = new URL(window.location);
const categoria = url.searchParams.get("category");

if (titulo) {
  titulo.innerHTML = `${categoria.toUpperCase()}:`;
}

if (categoria) {
  listProductPorCategoria(categoria, "list-products");
}


