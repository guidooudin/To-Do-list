window.addEventListener("load", function () {
    /* -------------------------------------------------------------------------- */
    /*                 Login de usuarios previamente registradosX                 */
    /* -------------------------------------------------------------------------- */
    const email = this.document.querySelector("#inputEmail");
    const password = this.document.querySelector("#inputPassword");
  
    const form = document.forms[0];
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
      .then(response => response.json())
      .then(data => {
          if(data.jwt){
              localStorage.setItem("token", data.jwt);
              location.href="./mis-tareas.html"
          } else{
            alert("Usuario o contraseña incorrectos");
          }
          console.log(data);
      })
    });

  });
  