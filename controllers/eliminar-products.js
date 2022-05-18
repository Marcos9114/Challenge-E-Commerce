import { productServices } from "../service/product-service.js";

const listProductPorCategoria = async (elementId) => {
  //el elementId es el punto donde se insertará la lineaCard en el html

  const listaSimilares = document.getElementById(`${elementId}`);

  try {
    let lista = await productServices.getProductsList();

    lista.forEach((item) => {
      const div = document.createElement("div");
      div.setAttribute("class", "list-card__card");

      const lineaCard = `
            <a href="../html/producto.html?id=${item.id}&category=${item.category}"><img src="${item.image}" alt="${item.name}" /></a>
            <a href="../html/producto.html?id=${item.id}&category=${item.category}"><h1>${item.name}</h1></a>
            <h2 class="price">$ ${item.precio}</h2>
            <button id="${item.id}" class="list-card__editar" >Editar</button>
            <button id="${item.id}" class="list-card__eliminar" >Eliminar</button>`;

      div.innerHTML = lineaCard;
      listaSimilares.appendChild(div);
    });

    eliminarProducto();
    editarProducto();

  } catch (error) {
    alert("Hubo un error en la página");
    console.log(error);
  }
};

listProductPorCategoria("list-products");

const eliminarProducto = () => {
    const btnEliminar = document.querySelectorAll(`.list-card__eliminar`);
    console.log(btnEliminar);

    btnEliminar.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.id;
        const option = confirm(
          "¿Desea elminar el articulo de manera permanente?"
        );
        if (option) {
          productServices.productDelete(id).then((respuesta) => {
            alert("Articulo eliminado con éxito");
          });
        }
      });
    });
};

const editarProducto = () => {
  const btnEditar = document.querySelectorAll(`.list-card__editar`);


  btnEditar.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = button.id;
      window.location.href = `editar-producto.html?id=${id}`;
    });
  });
};
