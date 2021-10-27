window.addEventListener("load", function () {
  /* -------------------------------------------------------------------------- */
  /*                            Registro de Usuarios                            */
  /* -------------------------------------------------------------------------- */

  /* ---------------------- Captura de elementos de HTML ---------------------- */

  const name = document.querySelector("#name");
  const lastname = document.querySelector("#lastname");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const password2 = document.querySelector("#password2");
  const registerForm = document.querySelector("#register");
  const apiUrl = "https://ctd-todo-api.herokuapp.com/v1/users";

  /* --------------------------------- submit --------------------------------- */

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let data = {
      firstName: name.value,
      lastName: lastname.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };
    if (!validarDatosRegistro(data)) {
      alert("Alguno de los datos es erróneo o está incompleto");
      return;
    }
    data = normalizarDatos(data);

    //función de envío al servidor
    postearRegistro(data);
  });

  /* ----------------------- Funcionalidades de Registro ---------------------- */
  function validarDatosRegistro(data) {
    for (property in data) {
      if (data.property === "") return false;
    }
    if (data.password !== data.password2) return false;
    return true;
  }

  function normalizarDatos(data) {
    return {
      firstName: data.firstName.toLowerCase().trim(),
      lastName: data.lastName.toLowerCase().trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    };
  }

  /* ------------------------ Conexión con el servidor ------------------------ */

  function postearRegistro(data) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        console.log("Creado");
        location.href = "./index.html";
      }
    });
  }
});
