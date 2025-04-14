const User = require('./user');
const paht = require('path'); // modulo para manipular caminhos
const fs = require('fs'); // modulo para manipular arquivos

class userService {
    constructor(){
        this.filePath = path.join(__dirname, 'user.json');
        this.users = [];//Array para armazenar user
        this.nextid = 1;//icontador para gerar id
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


getNextId(){
    try{
    if(this.users.length === 0) return ;
    return Math.max(...this.users.map(user => user.id))+1
}catch (erro){
    console.log('Erro ao buscar o id', erro)
}
}


    addUser(nome, email){
        const user = new User(this.nextid++, nome, email);
        this.users.push(user);
        return user;
    }
    getUsers(){
        return this.users
    }
}

module.exports = new userService;