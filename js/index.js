var signInEmailField = document.getElementById("signInEmailField");
var signInPasswordField = document.getElementById("signInPasswordField");
var signUpNameField = document.getElementById("signUpNameField");
var signUpEmailField = document.getElementById("signUpEmailField");
var signUpPasswordField = document.getElementById("signUpPasswordField");
var signInErrorMessage = document.getElementById("signInErrorMessage");
var signInErrorMessageText = document.getElementById("signInErrorMessageText");
var signUpMessage = document.getElementById("signUpMessage");
var signUpMessageText = document.getElementById("signUpMessageText");
var userName = document.getElementById("userName");
(userName)?userName.innerText = localStorage.getItem("userName"):'';
var users = (JSON.parse(localStorage.getItem("users"))) ?? [];
var emailExists = false;


var allRegexes = [
    /^[a-zA-Z]\w{3,15}@(gmail|hotmail|outlook)\.com$/i,
    /^.{8,16}$/,
    /^[a-zA-Z]\w{3,15}$/
];

function validateInput(element, regexIndex) {

    if (allRegexes[regexIndex].test(element.value)) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        return true;
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }

}

function findEmail(emailField) {
    emailExists = false;
    var email = (emailField.value).toLowerCase().trim();

    var emailIndex = 0;
    for (emailIndex = 0; emailIndex < users.length; emailIndex++) {
        if (email == users[emailIndex].email) {
            emailExists = true;
            break;
        }
    }
    return emailIndex;

}

function setUserName(name) {
    localStorage.setItem("userName", name);
}

function checkSignInCredentials() {
    console.log("Checking");
    console.log(users);
    if (validateInput(signInEmailField, 0) & validateInput(signInPasswordField, 1)) {
        var userIndex = findEmail(signInEmailField);
        if (emailExists) {
            if (users[userIndex].password == signInPasswordField.value) {
                signInErrorMessage.classList.add("d-none");
                //userName = users[userIndex].name;
                window.location.replace("../pages/profile.html");
                setUserName(users[userIndex].name);
                console.log("ok");

            }
            else {
                signInErrorMessageText.innerText = "Wrong password";
                signInErrorMessage.classList.remove("d-none");
            }
        }
        else {
            signInErrorMessageText.innerText = "Email Doesn't Exist";
            signInErrorMessage.classList.remove("d-none");
        }
    }
    else {
        signInErrorMessageText.innerText = "All Inputs Are required";
        signInErrorMessage.classList.remove("d-none");
    }
}

function insertUser() {
    if (validateInput(signUpEmailField, 0) & validateInput(signUpPasswordField, 1) & validateInput(signUpNameField, 2)) {
        findEmail(signUpEmailField);
        if (emailExists) {
            signUpMessageText.classList.remove("text-danger");
            signUpMessageText.classList.remove("text-success");
            signUpMessageText.classList.add("text-danger");
            signUpMessageText.innerText = "Email Already Exists";
            signUpMessage.classList.remove("d-none");
            console.log(users);


        }
        else {
            var user = {
                name: signUpNameField.value,
                email: (signUpEmailField.value).toLowerCase().trim(),
                password: signUpPasswordField.value
            }
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            signUpMessageText.classList.remove("text-danger");
            signUpMessageText.classList.remove("text-success");
            signUpMessageText.classList.add("text-success");
            signUpMessageText.innerText = "User added";
            signUpMessage.classList.remove("d-none");
            clearInputs();
            setTimeout(window.location.replace("../index.html"), 1000);
            console.log(users);

        }
    }
    else {
        signUpMessageText.classList.remove("text-danger");
        signUpMessageText.classList.remove("text-success");
        signUpMessageText.classList.add("text-danger");
        signUpMessageText.innerText = "All inputs Are required";
        signUpMessage.classList.remove("d-none");
    }
}

function logOut() {
    window.location.replace("../index.html");
}

function clearInputs() {
    signUpEmailField.value = '';
    signUpPasswordField.value = '';
    signUpNameField.value = '';
}



