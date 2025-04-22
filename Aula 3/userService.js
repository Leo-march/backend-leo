const User = require('./user');
const path = require('path'); // modulo para manipular caminhos
const fs = require('fs'); // modulo para manipular arquivos
const bcryptjs = require('bcryptjs'); //modulo para criptografar a senha
const { error } = require('console');
const mysql = require('./mysql')

class userService {

    async addUser(nome, email, senha, endereco, telefone, cpf) {//função para adicionar um usuário
        try {
            const senhaCripto = await bcryptjs.hash(senha, 10)
            const resultados = await mysql.execute(
                `INSERT INTO usuarios(nome, email, senha, endereco, telefone, cpf) 
	                VALUES (?, ?, ?, ?, ?, ?);`,
                [nome, email, senhaCripto, endereco, telefone, cpf]
            );
            return resultados;
        } catch (erro) {
            console.log("Erro ao adicionar o usuário", erro)
            throw erro;
        }
    }
    getUsers() {
        return this.users
    }

    deleteUser(id) {
        try {
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        } catch {
            console.log("Erro ao deletar o usuário", erro)
        }
    }

    async updateUser(id, nome, email, senha, endereco, telefone, cpf) {
        try {
            const senhaCripto = await bcryptjs.hash(senha, 10);
            const resultados = await mysql.execute(
                `UPDATE usuarios SET nome = ?, senha = ?, email = ?, endereco = ?, telefone = ?, cpf = ? WHERE idUsuário = ?;`,
                [nome, email, senhaCripto, endereco, telefone, cpf, id]
            );
            return resultados;
        } catch (erro) {
            console.log("Erro ao atualizar o usuário", erro)
        }
    }
}

module.exports = new userService;