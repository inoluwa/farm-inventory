const registerUrl = "http://localhost:4000/";

const role_id = document.getElementById('typeRole');
const name = document.getElementById('typeName');
const username = document.getElementById('username');
const password = document.getElementById('password');
const form =document.getElementById('form');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
let validate=false;	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	validate=false;
    } else {
		setSuccessFor(username);
validate=true;
    }
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}
return true;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
















function registerUser() {
    let role_id = document.getElementById('typeRole').value;
    let name = document.getElementById('typeName').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
// finish up ooo where are now?
    if(!(role_id && name && username && password)) {
        alert('all field is required');
        return
    }
    
    var registerBody=JSON.stringify({
        username,
        password,
        role_id,
        name
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:registerBody
    };
    fetch(`${registerUrl}api/register`, requestOptions)
   .then(response=>response.json())
   .then(res=> {
alert('Successfully registered')
    window.open('/login.html', "_self");
})
    .catch(error => console.error("Unable to login.", error));
    
    
}