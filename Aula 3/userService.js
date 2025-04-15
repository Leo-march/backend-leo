const User = require('./user');
const path = require('path'); // modulo para manipular caminhos
const fs = require('fs'); // modulo para manipular arquivos
const bcryptjs = require('bcryptjs'); //modulo para criptografar a senha
const { error } = require('console');
const mysql = require('./mysql')

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUsers();//Array para armazenar user
        this.nextid = this.getNextId();//icontador para gerar id
    }

    loadUsers() {
        try {
            if (fs.existsSync(this.filePath)) {//verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath);//le o arquivo
                return JSON.parse(data);//transforma json em objeto
            }
        } catch (erro) {
            console.log("Erro ao carregar o arquivo", erro)
        }
        return []
    }


    getNextId() { // função para buscar o próximo id
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1
        } catch (erro) {
            console.log('Erro ao buscar o id', erro)
        }
    }

    saveUsers() {//função para salvar os arquivos
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users));
        } catch (erro) {
            console.log("Erro ao salvar arquivos", erro)
        }
    }

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