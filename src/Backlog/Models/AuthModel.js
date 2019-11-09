import axios from "axios";

const internal = {};
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default internal.BoardModel = class {
    constructor({
        email,
        password
    }) {

        this.email = email;
        this.password = password;
    }


    HashPassword(password) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                return hash;
            });
        });        
    }



    Authenticate() {

        var hashPassword = this.HashPassword(this.password)


        return axios
            .post(process.env.REACT_APP_SANDBOX_API_URL + '/v2/auth',
                {
                    email: this.email,
                    password: hashPassword
                }
            )
            .then(result => {
                console.log(result);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
            })

    }

}