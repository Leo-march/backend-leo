//classe base Usuário
class usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this._senha = senha; //atributo privado _
    }

    autenticar(senha) {
        return senha === this._senha;
    }

    alterarsenha(novaSenha){
        this._senha = novaSenha
        console.log("Sua senha foi alterada com sucesso")
    }
}

//classe admin que herda a usuário
class admin extends usuario {
    constructor(nome, email, senha, nivelAcesso){
        super(nome, email, senha); // chama o construtor da classe pai
        this.nivelAcesso = nivelAcesso
    }
    banirUsuario(usuario) {
        console.log(`${usuario.nome} foi banido pelo admin ${this.nome}`)
    }

//polimorfimo sobrescrevendo o metodo autenticar
autenticar(senha){
    return senha === this.senha && this.nivelAcesso === 'alto'
}

    
};





//Exemplo de uso

const usuario1 = new usuario('Luiz', 'luiz@gmail.com', '12345');
const usuario2 = new admin('Maria', 'maria@gmail.com', '6789', 'alto');

console.log(usuario1.autenticar('12345')); //senha correta
console.log(usuario2.autenticar('6789'));
usuario2.banirUsuario(usuario1);
console.log(usuario1.alterarsenha('jamal'));
console.log(usuario1.autenticar('jamal'))

