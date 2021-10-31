window.addEventListener('load', () => {
    /* logica de la app */
    const apiBaseUrl = 'https://ctd-todo-api.herokuapp.com/v1'
    const jwt = localStorage.getItem('token');
    const nodoNombreUsuario = this.document.querySelector('.user-info p');
    const formulario = document.querySelector('.nueva-tarea');
    const inputNuevaTarea = this.document.querySelector('.nueva-tarea input');
    let contenedorTareas = document.querySelector('.descripcion');
    let listadoComentarios = [];
    
    /* Boton para salir sesion */
    const botonSalir = document.querySelector('#closeApp');
    botonSalir.addEventListener('click', () => {
        if (confirm('¿Estas seguro que deseas cerrar sesión?')) {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        }
    });
    /* Obtengo la lista completa de tareas */
    obtenerListaTareas();
    function obtenerListaTareas() {
            const settings = { method: 'GET', 
            headers: { authorization: jwt } };
            
            fetch(`${apiBaseUrl}/tasks`,settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                renderizarTareas(data);
                botonCambioEstado();
                botonBorrarTarea();
        })
    };
    /* Crear nuevas tareas */
    
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("crear terea");
        console.log(nuevaTarea.value);
    
        const payload = {
          description: nuevaTarea.value.trim()
        };
        const settings = {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            authorization: jwt
          }
        }
        console.log("Creando un tarea en la base de datos");
        fetch(urlTareas, settings)
          .then(response => response.json())
          .then(tarea => {
            console.log(tarea)
            obtenerListaTareas()
          })
          .catch(error => console.log(error));
    
    
        //limpiamos el form
        formulario.reset();
      })
    
    /* Obtengo los datos del usuario */
    obtenerDatosUsuario(`${apiBaseUrl}/users/getMe`, jwt)
    function obtenerDatosUsuario(url, token) {
        const settings = { method: 'GET', 
        headers: { authorization: token } };
        
        fetch(url,settings)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            nodoNombreUsuario.innerText = data.firstName + " " + data.lastName;
    })
    //crear funcion que renderice la lista de tareas
    //la funcion debe llevar por parametro la lista de tareas
    //la funcion debe renderizar la lista de tareas en el html
    //En cada iteración se debe evaluar si la tarea corresponde al listado de tareas-pendientes o listado de tareas-completadas
    //Si corresponde al listado de tareas-pendientes se debe renderizar en el html con una clase de not-done
    //Si corresponde al listado de tareas-completadas se debe renderizar en el html con una clase de done
    }
    function renderizarTareas(listado) {
  
        const tareasPendientes = document.querySelector('.tareas-pendientes');
        tareasPendientes.innerHTML = "";
        const tareasTerminadas = document.querySelector('.tareas-terminadas');
        tareasTerminadas.innerHTML = "";
    
        listado.forEach(tarea => {
          //variable intermedia para manipular la fecha
          let fecha = new Date(tarea.createdAt);
    
          if (tarea.completed) {
            //lo mandamos al listado de tareas incompletas
            tareasTerminadas.innerHTML += `
                            <li class="tarea">
                                <div class="done"></div>
                                <div class="descripcion">
                                <div>
                                    <button><i id="${tarea.id}" class="fas fa-undo-alt change"></i></button>
                                    <button><i id="${tarea.id}" class="far fa-trash-alt"></i></button>
                                </div>
                                    <p class="nombre">${tarea.description}</p>
                                    <p class="timestamp"><i class="far fa-calendar-alt"></i>${fecha.toLocaleDateString()}</p>
                                </div>
                            </li>
                            `
          } else {
            //lo mandamos al listado de tareas terminadas
            if (tarea.description.length > 3) {
            tareasPendientes.innerHTML += `
                            <li class="tarea">
                                <div class="not-done change" id="${tarea.id}"></div>
                                <div class="descripcion">
                                    <p class="nombre">${tarea.description}</p>
                                    <p class="timestamp"><i class="far fa-calendar-alt"></i>${fecha.toLocaleDateString()}</p>
                                </div>
                            </li>
                            `}
          }
        })
      }
    //crear una funcion que cambie el estado de la tarea a completada
    //crear una funcion que cambie el estado de la tarea a pendiente
    const urlTareas = 'https://ctd-todo-api.herokuapp.com/v1/tasks'
    function botonCambioEstado() {
        const btnCambioEstado = document.querySelectorAll('.change');
    
        btnCambioEstado.forEach(boton => {
          //a cada boton le asignamos una funcionalidad
          boton.addEventListener('click', function (event) {
            const id = event.target.id;
            const url = `${urlTareas}/${id}`
            const payload = {};
    
            if (event.target.classList.contains('fa-undo-alt')) {
              payload.completed = false;
            } else {
              payload.completed = true;
            }
    
            const settingsCambio = {
              method: 'PUT',
              headers: {
                "Authorization": jwt,
                "Content-type": "application/json"
              },
              body: JSON.stringify(payload)
            }
            fetch(url, settingsCambio)
              .then(response => {
                console.log(response.status);
                //renderizar nuevamente las tareas
                obtenerListaTareas();
              })
          })
        });
    
      }
      /* funcion para borrar las tareas */
      function botonBorrarTarea() {
        const btnBorrarTarea = document.querySelectorAll('.fa-trash-alt');
    
        btnBorrarTarea.forEach(boton => {
          //a cada boton le asignamos una funcionalidad
          boton.addEventListener('click', function (event) {
            const id = event.target.id;
            const url = `${urlTareas}/${id}`
    
            const settingsCambio = {
              method: 'DELETE',
              headers: {
                "Authorization": jwt,
              }
            }
            fetch(url, settingsCambio)
              .then(response => {
                console.log(response.status);
                //renderizar nuevamente las tareas
                obtenerListaTareas();
              })
          })
        });
    
      }
});