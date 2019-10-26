const axios = require('axios');

// const customerMemberTrimmed = require('../Models/CustomerMemberTrimmed');

module.exports = {


  GetMemberSearchData: function() {
  var responseList;

  axios.get('http://localhost:3001/v1/customer/', {
    data: {
      start: 10,
      limit: 20
    }
  })
    .then(function (response) {
      responseList = response.data;
      console.log(responseList);
      return responseList;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
};



