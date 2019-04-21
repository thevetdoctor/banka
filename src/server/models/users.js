class User {
  constructor(email, firstName, lastName, password, sex, mobile) {
    this.id = Number();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.type = 'client';
    this.isAdmin = false;
    this.sex = sex;
    this.mobile = mobile;
    this.active = false;
    this.createdDate = new Date().toDateString();
  }
}


export default User;
