
var memberSearch = require('../../../Common/QueryRules/GetMemberSearchData');
// import CustomerMemberTrimmed from '../../../Common/Models/CustomerMemberTrimmed';

var rows = memberSearch.GetMemberSearchData();
console.log(rows);