import axios from "axios";
// const bcrypt = require('bcrypt');
// const saltRounds = 12;
const internal = {};
axios.defaults.withCredentials = true;

export default internal.UserModel = class {
    constructor({
        password,
        email

    }) {

        this.password = password;
        this.email = email;
    }


    DestroyAuth() {

        return new Promise(function (resolve, reject) {


        return axios
            .post(process.env.REACT_APP_SANDBOX_API_URL + '/v1/auth/destroy', {
                headers: {withCredentials:true}
            })
            .then(result => {
                console.log(result);
                resolve(result.data);

            })
            .catch(error => {
                console.error("error: ", error);
                reject(error)
            })
        })

    }

    GetAuth() {

        return new Promise(function (resolve, reject) {


        return axios
            .post(process.env.REACT_APP_SANDBOX_API_URL + '/v1/auth/check',this)
            .then(result => {
                console.log(result);
                resolve(result.data);

            })
            .catch(error => {
                console.error("error: ", error);
                reject(error)
            })
        })

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