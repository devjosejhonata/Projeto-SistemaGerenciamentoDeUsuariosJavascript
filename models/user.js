class User {
//Toda classe começa com letra maiuscula.

    constructor (name, gender, birth, country, email, password, photo, admin){
    //recebendo como parametros do construtor, os dados do usuário no formulário
    //Construtor: É um metodo chamado automaticamente Método Construtor, quando invocamos a classe.

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
        //guardando os dados do construtor dentro do objeto, referenciando aos objetos dentro da classe com o this.
        //o underline na frente da propriedade, subtende que se trata de uma propriedade privada, mas não é uma regra, é uma convenção.

    }

    get id() {
        return this._id;
    }

    get register() {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admin;
    }

    set photo(value) {
        this._photo = value;
    }

    loadFromJSON(json) {
    ////carregar do JSON

        for (let name in json) {

            switch(name) {
                case '_register':
                    this[name] = new Date(json[name])
                break;
                default:
                    this[name] = json[name];

            }

        }

    }

    static getUsersStorage () {
        //obter armazenamento de usuários

        let users = [];

        if (localStorage.getItem("users")) {
            //localStorage.getItem: Permite recuperar dados do localStorage.

            users = JSON.parse(localStorage.getItem("users"));
            //localStorage.getItem: Permite recuperar dados do localStorage.

        }

        return users

    }

    getNewID() {
    //obter novo ID

        let usersID = parseInt(localStorage.getItem("userID"));
        //parseInt, converte para número inteiro.
        //localStorage.getItem: Permite recuperar dados do localStorage.
        

        if (usersID) window.id = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);
        //localStorage.setItem: Permite gravar no localStorage.

        return usersID;

    }

    save() {

        let users = User.getUsersStorage();
        //obter armazenamento de usuários

        if (this.id > 0) {

            users.map(u => {
            //map: Localiza uma informação em um array, mapeia sua posição, se alterar dados, substitui.

                if (u._id == this._id) {

                    Object.assign(u, this)

                }

                return u;

            });

        } else {

            this._id = this.getNewID();
            //obter novo ID

            users.push(this);
            //O metodo push, adiciona ao final do array.
        }

        localStorage.setItem("users", JSON.stringify(users));
        //localStorage.setItem: Permite gravar no localStorage.

    }

    remove() {

        let users = User.getUsersStorage();
        //obter armazenamento de usuários

        users.forEach((userData, index) => {
        //O ForEach é um laço que percorre um Array, para cada item execute uma ação.

            if (this._id == userData._id) {

                users.splice(index, 1)

            }

        });

        localStorage.setItem("users", JSON.stringify(users));
        //localStorage.setItem: Permite gravar no localStorage.

    }

}