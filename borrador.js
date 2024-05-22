const express = require("express");


// const { Sequelize } = require('sequelize'); //declarmos sequelize
// //conectamos la base de datos
// const sequelize = new Sequelize('curso_node', 'root',{
//     host: 'localhost',
//     dialect: 'mysql'
// });

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('conectado a la base de datos correctamente');
//     } catch(error) {
//         console.log('Error al conectar la base de datos', error);
//     }
// })();
//Iniciamos nuestro proyecto

const app = express();

const port = 3000;


app.get('/', (req, res) => {
    res.send("<h1> Hola mundo! </h1>");
})

const listUser = [
    {
        name: "pedro",
        lastname: "pepito",
        age: 21,
        hincha: "River",
    },

    {
        name: "Marina",
        lastname: "Martinez",
        age: 24,
        hincha: "Boca Juniors",
    }
]

app.get('/users', (req, res) => {
    res.json({
        ok: true,
        listUser
    })
})


app.get('/user/find', (req, res) => {

    const { query } = req;
    console.log(query);
    //  const name = query.name;
    //  const lastname = query.lastname;
    const { name, lastname } = query;


    const result = listUser.find((user) => user.name === name && user.lastname === lastname);

    res.status(200).json({
        msg: "se esta consultando",
        result
    })
})

//Crear nuevo usuario:

app.post('/users/create', (req, res) => {
    //
    const { name, lastname, age, hincha, } = req.body;

    //listUser.push(req.body);
    //listUser = [... listUser, req.body]
    //listUser.push({... req.body, name: 'Ana'})
    //listUser = [... listUser, {... req.body, name: 'Ana'}]

    const id = listUser[listUser.length - 1].id + 1;

    const newUser = { ...req.body, id }

    listUser.push(newUser);

    res.status(201).json({
        ok: true,
        msg: "Usuario agregado con Exito!",
        newUser
    })

})

//Editar un usuario
app.put("users/edit/", (req, res) => {
    const id = req.query.id;
    const newData = req.body;

    const posUser = listUser.findIndex((user) => user.id == id);

    if (posUser < 0) res.status(404).json({
        ok: false,
            msg: `No existe el usuario con id: ${id}`
        })

        listUser [posUser] = {... listUser[posUser], ... newData}
    }
)

//Maneras de agregar usuarios
// listUser.push(newUser);
// listUser.push(req.body);
// listUser.push(... listUser. req.body):

app.get('/user/find/id', (req, res) => {
    const { query } = req;
    const { id } = query;
    const result = listUser.find((user) => parseInt(user.id) == parseInt(id));

    if (result)
        res.status(200).json({
            ok: true,
            result
        })
    else
        res.status(404).json({
            ok: false,
            msg: "No se Encontro"
        })
})


//Escuchamos en el puerto 3000
app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

