let fs = require('fs');

let moduloUsuarios = {

    archivoJSON: './usuarios.json', // ruta del arcivo json

    leerJSON: function() { 
        let usuariosJSON = fs.readFileSync(this.archivoJSON, 'utf-8'); //leemos el json
        let usuarios = JSON.parse(usuariosJSON) //parseamos los datos para poder manipularlos

        return usuarios;
    },

    guardarJSON: function(info) {
        let usuariosActualizados = JSON.stringify(info); // convertimos los datos recibidos por parametro en un json
        fs.writeFileSync(this.archivoJSON, usuariosActualizados, 'utf-8'); // Escribo los datos en el json
    },

    registro: (nombre, mail, password) => {
        let usuarios = moduloUsuarios.leerJSON(); // asigno a 'usuarios' lo que retorna leerJSON
        
        let nuevoUsuario = { // creeamos un objeto literal con la estructura de cada usuario y luego le asignamos los valores recibidos por parametro
            nombre: nombre,
            mail: mail,
            password: password
        }

        usuarios.push(nuevoUsuario);

        moduloUsuarios.guardarJSON(usuarios) // guardamos los datos nuevos
    },

    login: (mail, password) => { 
        let usuarios = moduloUsuarios.leerJSON();
        let usuarioLogin;

        usuarios.forEach(usuario => {
            if(usuario.mail == mail && usuario.password == password) {
                usuarioLogin = usuario;
            }
        })

        return usuarioLogin;
    },

    eliminar: (mail, password) => {
        let usuarios = moduloUsuarios.leerJSON();

        let usuariosFiltrados = usuarios.filter(usuario => { //filtramos y comparamos los datos a eliminar, con los datos del array
            return usuario.mail != mail && usuario.password != password;// retornamos todos los datos, menos el que se desea eliminar
        })

        moduloUsuarios.guardarJSON(usuariosFiltrados); //guardamos todos los datos al json, menos el dato eliminado
    },

    //extra (maxi)
    checkPass: (pass) => {
        let passSplit = pass.split(''); 

        let letra = false;
        let numero = false;

        passSplit.forEach(e => { // recorremos el array de contraseña
            let parse = parseInt(e); // convierto ese caracter en un numero con parseInt, y lo guardo en la variable parse

            isNaN(parse) ? letra = true : numero = true; // si parse es NaN (not a number), significa que el caracter que se quiso convertir a numero en realidad era una letra. Entonces si esto sucede, a la variable letra vamos a asignarle el valor true (porque encontramos que la contraeña tiene al menos una letra). Si parse no es NaN, significa que el caracter que se convirtio era un número, entonces le asigno a la variable numero el valor true (porque la contraseña contiene al menos un número)
        })

        return letra && numero ? true : false; // si letra y numero son true, retorno true. Si cualquiera de las dos no es true, retorno false
    },

    checkMail: (mail) => { // creo el metodo checkMail, que recibe un mail por parametro, para ver si ya existe un usuario con ese mismo mail
        let usuarios = moduloUsuarios.leerJSON();

        let usuariosFiltro = usuarios.filter(usuario => { // creo una variable que guardara el resultado de un filtro de usuarios
            return usuario.mail == mail // guardo en el nuevo array todos los usuarios que su mail sea igual al mail que recibo por parametro
        })

        return usuariosFiltro == 0 ? true : false; // si usuariosFiltro es igual a cero, significa que no tiene nada, por ende no se encontro ningun usuario que tenga el mismo mail que el que recibo por parametro, entonces retorno true. En cambio, si no es igual a cero significa que se encontro un usuario con ese mail, entonces retorno false
    }
}

module.exports = moduloUsuarios // exportamos moduloUsuarios !!