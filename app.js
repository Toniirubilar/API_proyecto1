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
        hincha:"river"
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


app.get('/user/find/id', (req, res) => {
    const {query} = req;
    const {id} = query;
    const result = listUser.find((user) => user.id === id);

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

app.listen(3000, ()=> {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

