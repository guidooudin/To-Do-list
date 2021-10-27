window.addEventListener('load', () => {
    /* logica de nuestra app */
    const apiBaseUrl = 'https://ctd-todo-api.herokuapp.com/v1'
    const jwt = localStorage.getItem('token');
    const nodoNombreUsuario = this.document.querySelector('.user-info p')

    
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