class User{
    constructor(id,nome,email,senha,endereco,telefone,cpf){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cpf = cpf;
    }
}
class Admin extends User{
    constructor(id,nome,email,nivelAcesso){
        super(id,nome,email)
        this.nivelAcesso = nivelAcesso
    }
}

module.exports = User //Exporta a classe User