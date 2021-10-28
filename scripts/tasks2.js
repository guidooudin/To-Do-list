window.addEventListener('load', () => {
    /* logica de la app */
    const apiBaseUrl = 'https://ctd-todo-api.herokuapp.com/v1'
    const jwt = localStorage.getItem('token');
    const nodoNombreUsuario = this.document.querySelector('.user-info p');
    const formulario = document.querySelector('.nueva-tarea');
    const inputNuevaTarea = this.document.querySelector('.nueva-tarea input');
    let contenedorTareas = document.querySelector('.descripcion');
    let listadoComentarios = [];
    
    /* Obtengo la lista comleta de tareas */
    obtenerListaTareas(`${apiBaseUrl}/tasks`, jwt);
    function obtenerListaTareas(url, token) {
            const settings = { method: 'GET', 
            headers: { authorization: token } };
            
            fetch(url,settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                contenedorTareas.innerHTML = '';
                renderizarTareas(data);
        })
    };
    /* Crear nuevas tareas */
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nuevaTarea = {
            "description": inputNuevaTarea.value,
            "completed": false
        }
        
        console.log(inputNuevaTarea.value);
        crearTarea(`${apiBaseUrl}/tasks`, jwt, nuevaTarea);
        obtenerListaTareas(`${apiBaseUrl}/tasks`, jwt);
        formulario.reset();
    });
    function crearTarea(url, token, payload) {
        const settings = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                authorization : token
            },
            body: JSON.stringify(payload)
        };
        
            fetch(url,settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
        })
        }
    
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
    //En cada iteración se debe crear un boton que permita eliminar la tarea
    //En cada iteración se debe crear un boton que permita marcar como completada la tarea
    //En cada iteración se debe crear un boton que permita marcar como pendiente la tarea
    }
    function renderizarTareas(listaTareas) {
        const listaTareasPendientes = document.querySelector('.tareas-pendientes');
        const listaTareasCompletadas = document.querySelector('.tareas-terminadas');
        listaTareas.forEach(tarea => {
            if(tarea.completed) {
                const fecha = new Date(tarea.createdAt);
                const divSkeleton = document.querySelector('#skeleton');
                const miTemplate = `<li class="tarea">
                                    <div class="done"></div>
                                    <div class="descripcion">
                                    <p class="nombre">${tarea.description}</p>
                                    <div>
                                    <button><i id="${tarea.id}" class="fas
                                    fa-undo-alt change"></i></button>
                                    <button><i id="${tarea.id}" class="far
                                    fa-trash-alt"></i></button>
                                    </div>
                                    </div>
                                    </li>
                                    `;
              divSkeleton.innerHTML += miTemplate;
            } else {
                
            if (tarea.description.length > 3){
                const fecha = new Date(tarea.createdAt);
                const divSkeleton = document.querySelector('#skeleton');
                const miTemplate = `<li class="tarea">
                <div class="not-done change" id="${tarea.id}"></div>
                <div class="descripcion">
                <p class="nombre">${tarea.description}</p>
                <p class="timestamp"><i class="far
                fa-calendar-alt"></i> ${fecha.toLocaleDateString()}</p>
                </div>
                </li>`
              divSkeleton.innerHTML += miTemplate;
            }
            }
        })
    }
});