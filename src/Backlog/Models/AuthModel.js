import axios from "axios";
// const bcrypt = require('bcrypt');
// const saltRounds = 12;
const internal = {};

export default internal.UserModel = class {
    constructor({
        password,
        email

    }) {

        this.password = password;
        this.email = email;
    }

    Authenticate() {


        return axios
            .post(process.env.REACT_APP_SANDBOX_API_URL + '/v1/auth',
                this
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