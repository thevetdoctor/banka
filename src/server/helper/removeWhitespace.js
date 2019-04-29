/* eslint-disable no-param-reassign */
const whiteSpace = /\s/g;
const noWhiteSpace = '';

const removeWhitespace = (item) => {
  if (item.match(whiteSpace)) {
    item = item.replace(whiteSpace, noWhiteSpace);
  }

  // if (lastName.match(whiteSpace)) {
  //     lastName = lastName.replace(whiteSpace, noWhiteSpace);
  // }

  // if (email.match(whiteSpace)) {
  //     email = email.replace(whiteSpace, noWhiteSpace);
  // }

// if (password.match(whiteSpace)) {
//     password = password.replace(whiteSpace, noWhiteSpace);
// }
};

export default removeWhitespace;
