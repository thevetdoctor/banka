class User {
  constructor(firstname, lastname, password, sex, email, mobile) {
    this.id = 1;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.sex = sex;
    this.email = email;
    this.mobile = mobile;
    this.active = false;
  }
}


module.exports = User;
