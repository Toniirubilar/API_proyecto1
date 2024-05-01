const express = require("express");

const app = express();

const port = 3000;

app.get('/', (req, res)=>{
    res.send("<h1> Hola mundo! </h1>");
})

const listUser = [
    {
        name:"pedro",
        lastname:"pepito",
        age: 21,
        hincha:"River",
    },
    
    {
        name:"Marina",
        lastname:"Martinez",
        age: 24,
        hincha:"Boca Juniors",
    }
]

app.get('/users', (req, res) =>{
    res.json ({
        ok:true,
        listUser
    })
})


app.get('/user/find', (req, res) => {

    const {query} = req;
     console.log (query);
    //  const name = query.name;
    //  const lastname = query.lastname;
     const {name, lastname} = query;
    

    const result = listUser.find((user) => user.name === name && user.lastname === lastname);

     res.status(200).json({
        msg:"se esta consultando",
        result
    })
})

//Crear nuevo usuario:
app.post('users/create', (req, res) => {
    
    const {name, lastname, age, hincha} = req.body;

    listUser = (... listUser, {name, lastname, age, hincha})

    const id = listUser(listUser.length-1).id+1;
    // const id = listUser.splice(listUser.length-1,listUser.length)
    listUser.push(newUser);


    res.status(201).json({
        ok: true,
        msg: "Usuario agregado con éxito"
    }
    )
})
//Editar un usuario
app.put("users/edit/:id", (req, res) => {
    const idEditar = req.params.id;
    const {id} = req.body.id;
    const newData = req.body;
    listUser.push(req.body);
})

//Maneras de agregar usuarios
// listUser.push(newUser);
// listUser.push(req.body);
// listUser.push(... listUser. req.body):

app.get('/user/find/id', (req, res) => {
    const {query} = req;
    const {id} = query;
    const result = listUser.find((user) => parseInt(user.id) == parseInt(id));

    if (result)
        res.status(200).json({
            ok:true,
            result
        })
    else
        res.status(404).json({
            ok:false,
            msg:"No se Encontro"
        })
})


//Escuchamos en el puerto 3000
app.listen(3000, ()=> {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

