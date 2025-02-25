const express = require('express');
const userService = require('./userService')

const app = express()
app.use(express.json()); //Vou habilitar json no express

//rota para criar usuário

app.post('/users', (req,res) =>{
    const {nome, email, senha, endereco, telefone, cpf} = req.body;
    if(!nome || !email || !senha || !endereco || !telefone || !cpf){
        return res.status(400).json
        ({error: "Nome, email, senha, endereço, telefone e CPF são dados obrigatórios"})
    }

    const user = userService.addUser(nome, email, senha, endereco, telefone, cpf);
    res.status(200).json({user});
})

//rota para mostrar os usuários

app.get("/users", (req, res) =>{
    res.json(userService.getUsers())
});

const port = 3000;
app.listen(port, ()=>{
    console.log("Servidor rodando na porta", port);
})