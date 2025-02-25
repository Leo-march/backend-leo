const User = require('./user');
const path = require('path'); // modulo para manipular caminhos
const fs = require('fs'); // modulo para manipular arquivos

class userService {
    constructor(){
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUsers();//Array para armazenar user
        this.nextid = this.getNextId();//icontador para gerar id
    }

    loadUsers(){
        try{
        if(fs.existsSync(this.filePath)){//verifica se o arquivo existe
            const data = fs.readFileSync(this.filePath);//le o arquivo
            return JSON.parse(data);//transforma json em objeto
        }
    }catch(erro){
        console.log("Erro ao carregar o arquivo", erro)
    }
    return[]
}


getNextId(){ // função para buscar o próximo id
    try{
    if(this.users.length === 0) return 1;
    return Math.max(...this.users.map(user => user.id))+1
}catch (erro){
    console.log('Erro ao buscar o id', erro)
}
}

saveUsers(){//função para salvar os arquivos
    try{
        fs.writeFileSync(this.filePath, JSON.stringify(this.users));
    }catch(erro){
        console.log("Erro ao salvar arquivos", erro)
    }
}

    addUser(nome, email, senha, endereco, telefone, cpf){//função para adicionar um usuário
        try{
        const user = new User(this.nextid++, nome, email, senha, endereco, telefone, cpf);
        this.users.push(user);
        this.saveUsers();
        return user;
    }catch (erro){
        console.log("Erro ao adicionar o usuário", erro)
    }
}
    getUsers(){
        return this.users
    }
}

module.exports = new userService;