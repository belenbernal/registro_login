let moduloUsuarios = require('./usuarios'); 

let process = require('process');
let comando = process.argv[2]; 

switch (comando) {  

    case 'registro': 
        let nombre = process.argv[3]; 
        let mail = process.argv[4]; 
        let password = process.argv[5]; 

        if (nombre == undefined || mail == undefined || password == undefined) { // verificamos que se ingresen todos los datos
            console.log('Debe ingresar nombre, mail y contraseña.');
            break;  
        }

        if (!mail.includes('@')) { // para verificar que el email tenga '@'
            console.log('Por favor ingrese un mail válido');
            break;  
        }

        //extra (maxi)
        let checkPass = moduloUsuarios.checkPass(password); // creo la variable checkPass a la cual le asigno el valor de la ejecucion del metodo checkPass del moduloUsuarios. Por parametro le paso password, que es la contraseña que escribimos en la consola
        let checkMail = moduloUsuarios.checkMail(mail); // creo la variable checkMail a la cual le asigno el valor de la ejecucion del metodo checkMail del moduloUsuarios. Por parametro le paso mail, que es el mail que escribimos en la consola

        if (!checkMail) { // si la variable checkMail es false... significa que el mail ya se encuentra registrado
            console.log('Este mail ya se encuentra registrado');
            break;
        }

        if (!checkPass) { // si la variable checkPass es false... significa que el mail ya se encuentra registrado
            console.log('Su contraseña debe tener al menos una letra y un número');
            break;
        }

        moduloUsuarios.registro(nombre, mail, password); // en caso de que se cumplan todas la condiciones anteriores, realizamos el registro de datos
        console.log('Usuario creado correctamente!! Ya puede iniciar sesión.');

        break;

    case 'login': 
        let mailLogin = process.argv[3]; // Proceso la posicion 3 de la consola
        let passwordLogin = process.argv[4]; // Proceso la posicion 4 de la consola

        if (mailLogin == undefined || passwordLogin == undefined) { // verificamos si todos los datos fueron ingresados
            console.log('Debe escribir su mail y su contraseña');
            break;
        }

        let usuarioLogin = moduloUsuarios.login(mailLogin, passwordLogin);

        if(usuarioLogin == undefined) { 
            console.log('No encontramos un usuario con estas credenciales')
        } else { 
            console.log(`Sesion iniciada, bienvenidx ${usuarioLogin.nombre}!`)
        }

        break;

    case 'eliminar':
        let eliminarEmail = process.argv[3]; 
        let eliminarPass = process.argv[4]; 
        let res = moduloUsuarios.eliminar(eliminarEmail, eliminarPass);

        res ? console.log('Usuario eliminado correctamente') : console.log('No encontramos un usuario con esas credenciales');

        break;

    case undefined: // cuando no enviamos nada
        console.log(`Debe escribir alguno de los siguiente comandos:
        - registro: 'nombre' 'mail' 'contraseña'
        - login: 'mail' 'contraseña'`)

    default: // cuando enviamos algun comando incorrecto
        console.log(`Este comando no existe, debe utilizar alguno de los siguientes:
        - registro: 'nombre' 'mail' 'contraseña'
        - login: 'mail' 'contraseña'`)

}