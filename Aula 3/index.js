const express = require('express');
const userService = require('./userService')

const app = express()
app.use(express.json()); //Vou habilitar json no express

//rota para criar usuário

app.post('/users', async (req, res) => {
    try {
        const { nome, email, senha, endereco, telefone, cpf } = req.body;
        if (!nome || !email || !senha || !endereco || !telefone || !cpf) {
            return res.status(400).json
                ({ error: "Nome, email, senha, endereço, telefone e CPF são dados obrigatórios" })
        }
        const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf);
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
    } catch (erro) {
        console.log("Erro ao adicionar o usuário", erro)
        res.status(401).json({ error: erro.message});

    }
})

//rota para mostrar os usuários

app.get("/users", (req, res) => {
    res.json(userService.getUsers())
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);//Converte o ID para número
    try {
        const resultado = userService.deleteUser(id);//Tenta deletar o usuário
        res.status(200).json(resultado);//Se conseguir deletar, retorna 200
    }
    catch {
        console.log("Erro ao deletar o usuário", erro)
    }
    userService.deleteUser(id);
    res.status(200).json({ message: "Usuário deletado com sucesso" })
})

app.put("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha, endereco, telefone, cpf } = req.body;
    try {
        const resultado = await userService.updateUser(id, nome, email, senha, endereco, telefone, cpf);
        if (!resultado) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(401).json({ error: erro.message});
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("Servidor rodando na porta", port);
})