class User {
  constructor(email, firstName, lastName, password, sex, mobile, type = 'client', isAdmin = false, active = 'active') {
    this.id = Number();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.type = type;
    this.isAdmin = isAdmin;
    this.sex = sex;
    this.mobile = mobile;
    this.active = active;
  }
}


export default User;
