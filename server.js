const http = require('http');

let usuariosRegistrados = {};

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    let cuerpo = '';

    req.on('data', chunk => { cuerpo += chunk.toString(); });

    req.on('end', () => {
        let datos = cuerpo ? JSON.parse(cuerpo) : {};

        if (req.url === '/registro' && req.method === 'POST') {
            usuariosRegistrados[datos.usuario] = datos.password;
            res.end(JSON.stringify({ mensaje: "Usuario registrado exitosamente" }));
        } 
        else if (req.url === '/login' && req.method === 'POST') {
            
            // Validamos si el usuario existe y si la contraseña coincide con la registrada
            if (usuariosRegistrados[datos.usuario] && usuariosRegistrados[datos.usuario] === datos.password) {
                res.end(JSON.stringify({ mensaje: "Autenticación satisfactoria" }));
            } else {
                res.end(JSON.stringify({ mensaje: "Error en la autenticación" }));
            }

        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));
        }
    });
});

server.listen(1111, () => {
    console.log("Servidor corriendo en el puerto 1111");
});