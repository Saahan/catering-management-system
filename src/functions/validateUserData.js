export default function validateUserData(data) {
  //validate signup data to check if phone number is 10 digits and the passwords match, in addition the firebase password validation rules.
  var phoneno = /^\d{10}$/;
  var phoneValid = false;
  var passwordValid = false;

  if (data.phoneNumber.match(phoneno)) {
    phoneValid = true;
  } else {
    phoneValid = false;
  }

  if (data.password === data.password2) {
    passwordValid = true;
  } else {
    passwordValid = false;
  }

  if (phoneValid === true && passwordValid === true) {
    return [true, ""];
  } else if (phoneValid === true && passwordValid === false) {
    return [false, "Passwords don't match"];
  } else if (phoneValid === false && passwordValid === true) {
    return [false, "Invalid phone number"];
  } else {
    return [false, "Phone invalid and passwords don't match"];
  }
}
