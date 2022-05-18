import { productServices } from "../service/product-service.js";

// PRIMERO REALIZO EL DRAG AND DROP PARA INSERTAR UNA IMAGEN

const dropArea = document.querySelector(".agregar-producto__arrastre");
const dragText = document.querySelector(".p-img");
const button = document.querySelector("#boton-buscar");
const input = dropArea.querySelector("#input-file");
let fileUrl = "";
let files;

button.addEventListener("click", (e) => {
  e.preventDefault();
  input.click();
});

input.addEventListener("change", (e) => {
  e.preventDefault();
  files = input.files;
  dropArea.classList.add("active");
  showFiles(files);
  dropArea.classList.remove("active");
});

//mientras tenemos elemento que se está arrastrando se activa
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Suelta para subir los archivos";
});
//mientras tenemos elemento que se estan arrastrando pero estemos afuera de la zona
dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = "Arrastra y suelta imagenes";
});
//cuando soltamos los archivos en la zona
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  files = e.dataTransfer.files; //being dragged during a drag and drop operation
  showFiles(files);
  dropArea.classList.remove("active");
  dragText.textContent = "Arrastra y suelta imagenes";
});

//funcion para ver la cantidad de archivos que ingreso, si son muchos, los guardo como un array de files
const showFiles = (files) => {
  if (files.length === undefined) {
    processFile(files);
  } else {
    for (const file of files) {
      processFile(file);
    }
  }
};

const processFile = (file) => {
  const docType = file.type;
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (validExtensions.includes(docType)) {
    //archivo valido
    const fileReader = new FileReader();
    const id = `file-${Math.random().toString(32).substring(7)}`;

    fileReader.addEventListener("load", (e) => {
      fileUrl = fileReader.result;
      console.log(fileUrl);
      const image = `
                <div id=${id} class="file-container">
                    <img id="previewImg" src=${fileUrl} alt=${file.name} height="32px">
                    <div class="status">
                        <span>${file.name}</span>   
                        <span class=success> 
                        Archivo subido correctamente...
                        </span>
                    </div>
                </div>
            `;
      const html = document.querySelector("#preview").innerHTML;
      document.querySelector("#preview").innerHTML = image + html; //html = image + html
    });
    fileReader.readAsDataURL(file);
    //uploadFile(file, id);
  } else {
    //archivo nop valido
    alert("no es un archivo válido");
  }
};

async function uploadFile(file, id) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body: formData,
    });

    const responseText = await response.text();
    console.log(responseText);
    document.querySelector(
      `#${id} .status-text`
    ).innerHTML = `<span class=success> Archivo subido correctamente...</span>`;
    //adicionalmente agrego al input de validación
    // document.querySelector("#input-validacion__dragAndDrop").value = "Archivo cargado correctamente - validacion ok"
  } catch (error) {
    document.querySelector(
      `#${id} .status-text`
    ).innerHTML = `<span class=failure> El archivo no puede subirse...</span>`;
  }
}

// SEGUNDO: RECIBO TODO PARA ENVIAR AL BACKEND

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const transactionFormData = new FormData(formulario);

  const product = {};
  transactionFormData.forEach((value, key) => {
    //key es el "name" de cada input
    if (key === "image") {
      product[key] = document.querySelector("#previewImg").src;
      product[key] = product[key];
    } else {
      product[key] = value;
    }
  });

  productServices
    .createProduct(product)
    .then(() => {
      alert("producto agregado exitosamente");
    })
    
    .catch((err) => {
      alert("Ocurrió un error");
      console.log(err);
    });
});

const previewFile = () => {

}

