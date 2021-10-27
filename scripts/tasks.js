window.addEventListener('load', () => {
    const apiUrl = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe';
    const userId = localStorage.getItem('userId');
    const formulario = document.querySelector('.nueva-tarea');
    const nodoNombreUsuario = this.document.querySelector('.user-info p')
    let tarea = document.querySelector('.nuevaTarea');
    const token = localStorage.getItem('token');

    obtenerDatosUsuario(apiUrl, token);
    
    function obtenerDatosUsuario(url, token) {
        const settings = { method: 'GET', 
        headers: { authorization: token } };
    fetch(url, settings)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        nodoNombreUsuario.innerText = data.firstName + " " + data.lastName;
    })
    }
    
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        getTasks();
        
    });

    function getTasks() {
        console.log(nuevaTarea.value);
    }
});
