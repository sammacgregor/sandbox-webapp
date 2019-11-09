import axios from "axios";

const internal = {};

export default internal.UserModel = class {
    constructor({
        user_id,
        user_name,
        created_date,
        created_by,
        updated_date,
        updated_by
    }) {

        this.user_id = user_id;
        this.user_name = user_name;
        this.created_date = created_date;
        this.created_by = created_by;
        this.updated_date = updated_date;
        this.updated_by = updated_by;
    }


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



    CreateUser() {


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