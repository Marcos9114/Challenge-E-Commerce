import { clientServices } from "../service/client-service.js";

const formLogin = document.querySelector(".login-form");
const mail = document.getElementById("email");
const pass = document.getElementById("password");
console.log("email : marcos@alura.com", "password: Alura2022");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  var valid = false;
  clientServices
    .getUser()
    .then((data) => {
      console.log(data);
      data.forEach(({ email, password }) => {
        if (email == mail.value && password == pass.value) {
          valid = true;
          window.location.href =
            "../html/eliminar-producto.html?category=todos los productos";
        }
      });
      console.log(valid);
      if (valid == false) {
        alert("La contraseña o el email no es valido");
      }
    })
    .catch((err) => {
      alert("error en el login");
      console.log(err);
    });
});
