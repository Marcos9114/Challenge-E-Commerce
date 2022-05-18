export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    console.log(tipoDeInput);
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipoDeInput, input);
    }
  }
  
  const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ];
  
  const mensajesDeError = {
    nombreContacto:{
      valueMissing: "El campo nombre no puede estar vacío",
      patternMismatch: "El nombre no puede superar los 40 caracteres.",
    },
    nombreProducto: {
      valueMissing: "El campo nombre no puede estar vacío",
      patternMismatch: "El nombre no puede superar los 20 caracteres.",
    },
    nombre: {
      valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
      valueMissing: "El campo correo no puede estar vacío",
      typeMismatch: "El correo no es válido",
    },
    password: {
      valueMissing: "El campo contraseña no puede en blanco",
      patternMismatch: "El campo contraseña no puede estar vacío",
    },
    precio: {
      valueMissing: "El precio no puede estar en blanco",
    },
    inputDragAndDrop: {
      patternMismatch: "Debes cargar al menos una imagen del producto" 
    },
    // mensaje: {
    //   valueMissing: "Este campo no puede estar vacío",
    //   patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
    // },
  };

  
  function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
  }
  
