import axios from "axios";
// const bcrypt = require('bcrypt');
// const saltRounds = 12;
const internal = {};

export default internal.UserModel = class {
    constructor({
        user_id,
        given_name,
        surname,
        password,
        mobile,
        email,
        created_date,
        created_by,
        updated_date,
        updated_by
    }) {

        this.user_id = user_id;
        this.given_name = given_name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.mobile = mobile;
        this.created_date = created_date;
        this.created_by = created_by;
        this.updated_date = updated_date;
        this.updated_by = updated_by;
    }


    // HashPassword(plaintextPassword) {
    //     bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
    //        return hash
    //       });
    // }

    DeleteUser() {


        return axios
            .delete(process.env.REACT_APP_SANDBOX_API_URL + '/v2/users/' + this.user_id,
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



    AddUser() {

        // this.password = this.HashPassword(this.password)

        return axios
            .post(process.env.REACT_APP_SANDBOX_API_URL + '/v2/users',
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


    GetUser(UserID) {
        return new Promise(function (resolve, reject) {

        return axios
            .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/Users/' + UserID)
            .then(result => {
                console.log(result.data);

                resolve(result.data);

            })
            .catch(error => {
                console.error("error: ", error);
                reject({ error: true, message: error })
            })
        })

    }

    GetUsers() {

        return new Promise(function (resolve, reject) {
            axios
                .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/users')
                .then(result => {
                    console.log(result.data);
                    resolve(result.data)
                    // return result.data;

                })
                .catch(error => {
                    console.error("error: ", error);
                    reject(error)
                })
        })
    }

}