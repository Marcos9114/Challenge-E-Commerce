import { productServices } from "../service/product-service.js";

const btnBuscar = document.querySelector("#icon-buscar");
const productoIngresado = document.querySelector(".header__input");

const filtrar = async () => {

  //acceso al nombre del producto ingresando al patch de la URL
  const url = new URL(window.location);
  const texto = url.searchParams.get("buscar");

  const listaSimilares = document.getElementById("listaProductos");

  try {
    const lista = await productServices.getProductsList();


    lista.forEach((item) => {
      let nombre = item.name.toLowerCase();

      if (nombre.indexOf(texto) !== -1) {
        const div = document.createElement("div");
        div.setAttribute("class", "list-card__card");

        const lineaCard = `<a href="../html/producto.html?id=${item.id}&category=${item.category}"><img src="${item.image}" alt="${item.name}" /></a>
                      <a href="../html/producto.html?id=${item.id}&category=${item.category}"><h1>${item.name}</h1></a>
                      <h2 class="price">$ ${item.precio}</h2>`;

        div.innerHTML = lineaCard;

        listaSimilares.appendChild(div);
      }
    });
  } catch (error) {
    alert("Hubo un error al buscar");
    console.log(error);
  }
};

//en el "if" se verifica si la peticion es de el index.html o de un screem de la carpeta "/html"
const buscar = () => {
  btnBuscar.addEventListener("click", () => {
    const texto = productoIngresado.value.toLowerCase();
    if (texto.length > 0) {
      if (window.location.href == "http://127.0.0.1:5501/index.html") {
        window.location.href = `html/filtro-productos.html?buscar=${texto}`;
      } else {
        window.location.href = `../html/filtro-productos.html?buscar=${texto}`;
      }
    }
  });
};


const configCSSResp = () => {
  document.querySelector(".header__input").style.display = "block";
  document.querySelector(".header__input").style.width = "80vw";
  document.querySelector(".header__img").style.display = "none";
  document.querySelector(".header__button ").style.display = "none";
  btnBuscar.style.display = "block";
  btnBuscar.style.right = "3vw";
};
const quitarCSSResp = () => {
  document.querySelector(".header__input").style.display = "none";
  document.querySelector(".header__img").style.display = "block";
  document.querySelector(".header__button ").style.display = "block";
  btnBuscar.style.display = "block";
  btnBuscar.style.right = "-53vw";
};

if (screen.width <= 400) {
  btnBuscar.addEventListener("click", configCSSResp);
  productoIngresado.addEventListener("blur", quitarCSSResp);
  buscar();
  setTimeout(() => {
    filtrar();
  }, 500);
} else {
  buscar();
  setTimeout(() => {
    filtrar();
  }, 500);
}
