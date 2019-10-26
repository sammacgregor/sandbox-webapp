//CustomerMemberTrimmed object constructor
var CustomerMemberTrimmed = function (customerMemberTrimmed) {

    this.RoleID = customerMemberTrimmed.RoleID;
    this.RoleTypeCode = customerMemberTrimmed.RoleTypeCode;
    this.GivenName = customerMemberTrimmed.GivenName;
    this.OtherGivenNames = customerMemberTrimmed.OtherGivenNames;
    this.Surname = customerMemberTrimmed.Surname;
    this.PreferredName = customerMemberTrimmed.PreferredName;
    this.BirthDate = customerMemberTrimmed.BirthDate;
    this.Gender = customerMemberTrimmed.Gender;
    this.Title = customerMemberTrimmed.Title;
    this.AddressLine1 = customerMemberTrimmed.AddressLine1;
    this.AddressLine2 = customerMemberTrimmed.AddressLine2;
    this.AddressLine3 = customerMemberTrimmed.AddressLine3;
    this.AddressLine4 = customerMemberTrimmed.AddressLine4;
    this.Suburb = customerMemberTrimmed.Suburb;
    this.Postcode = customerMemberTrimmed.Postcode;
    this.State = customerMemberTrimmed.State;
    this.Email = customerMemberTrimmed.Email;
    this.Mobile = customerMemberTrimmed.Mobile;
};

module.exports = CustomerMemberTrimmed;