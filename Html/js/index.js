
var userName = document.getElementById("userName");
var userMail = document.getElementById("userMail");
var userPass = document.getElementById("userPass");
var emailLogin = document.getElementById("userMail");
var passLogin = document.getElementById("userPass");
var users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}


var nameWelcome = localStorage.getItem("sessionUsername");
if (nameWelcome) {
  document.getElementById("username").innerHTML = "Welcome " + nameWelcome;
}


function isEmailExist(email) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].mail.toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }
  return false; 
}


function validationInput(element, msgId) {
  regex = {
    msgName: /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/,
    msgEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    msgPass: /^[a-zA-Z0-9!@#$%^&*]{8,}$/,
  };

  if (regex[msgId].test(element.value)) {
    return true;
  } else {
    return false;
  }
}

function signUp() {
  if (
    validationInput(userName, "msgName") &&
    validationInput(userMail, "msgEmail") &&
    validationInput(userPass, "msgPass")
  ) {
    if (isEmailExist(userMail.value)) {
      var status = document.getElementById("submitMessage");
      status.innerHTML = "Email already exists";
      status.classList.remove("d-none");
      status.classList.remove("text-success");
      status.classList.add("text-danger");
    } else {
      var user = {
        name: userName.value,
        mail: userMail.value,
        pass: userPass.value,
      };

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      var status = document.getElementById("submitMessage");
      status.innerHTML = "Success";
      status.classList.remove("d-none");
      status.classList.remove("text-danger");
      status.classList.add("text-success");
      location.replace(
        "file:///C:/Users/DELL/OneDrive/Desktop/login/index.html",
        "_self"
      );
    }
  } else {
    var status = document.getElementById("submitMessage");
    status.innerHTML = "All inputs are required";
    status.classList.remove("d-none");
    status.classList.remove("text-success");
    status.classList.add("text-danger");
  }
}


function logIn() {
  var email = emailLogin.value;
  var pass = passLogin.value;

  if (email == "" || pass == " ") {
    var status = document.getElementById("submitMessage");
    status.innerHTML = "Enter all requirements";
    status.classList.remove("d-none");
    return 0;
  }

  for (var i = 0; i < users.length; i++) {
    if (
      users[i].mail.toLowerCase() == email.toLowerCase() &&
      users[i].pass.toLowerCase() == pass.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", users[i].name);
      location.replace(
        "file:///C:/Users/DELL/OneDrive/Desktop/login/home.html",
        "_self"
      );
      return 0;
    }
  }
  var status = document.getElementById("submitMessage");
  status.innerHTML = "Incorrect Email or Password";
  status.classList.remove("d-none");
}


function logOut() {
  localStorage.removeItem("sessionUsername");
}
