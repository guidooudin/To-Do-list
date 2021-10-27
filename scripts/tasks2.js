window.addEventListener('load', () => {
    /* logica de nuestra app */
    const apiBaseUrl = 'https://ctd-todo-api.herokuapp.com/v1'
    const jwt = localStorage.getItem('token');
    const nodoNombreUsuario = this.document.querySelector('.user-info p');
    const formulario = document.querySelector('.nueva-tarea');
    const inputNuevaTarea = this.document.querySelector('.nueva-tarea input');
    
    /* Obtengo la lista comleta de tareas */
    obtenerListaTareas(`${apiBaseUrl}/tasks`, jwt);
    function obtenerListaTareas(url, token) {
            const settings = { method: 'GET', 
            headers: { authorization: token } };
            
            fetch(url,settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
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
        formulario.reset();

    })
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
    
    
    }
});