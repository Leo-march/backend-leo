const User = require('./user');
const path = require('path'); // modulo para manipular caminhos
const fs = require('fs'); // modulo para manipular arquivos
const bcryptjs = require('bcryptjs'); //modulo para criptografar a senha
const { error } = require('console');
const mysql = require('./mysql');
const { get } = require('http');

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
    async getUsers(idUsuario) {
        try {
            const resultado = await mysql.execute(
                `SELECT idUsuário FROM usuarios WHERE idUsuário = ?;`,
                [idUsuario]);
            console.log("Resultado", resultado)
            return resultado;
        } catch (erro) {
            console.log("Erro ao buscar o usuário", erro)
        }
    }

    async deleteUser(id) {
        try {
            const user = await this.getUsers(id);
            if (user.length == 0) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            const resultado = await mysql.execute(
                `DELETE FROM usuarios WHERE idUsuário = ?;`,
                [id]
            );
            return resultado;
        } catch (erro){
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