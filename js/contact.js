var elements = {
    fullName: '',
    email: '',
    message: ''
}
var fullName = document.querySelector('#fullName');
var email = document.querySelector('#email');
var message = document.querySelector('#message');
var form = document.querySelector('.form');

fullName.addEventListener('input', readText);
email.addEventListener('input', readText);
message.addEventListener('input', readText);

// Validations of complete fields, email format, alphanumeric characters and minimum characters
// If everything is valid, open the default email sending tool of the operating system
form.addEventListener('submit', function(event) {
 event.preventDefault();
 var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
 var regexChar = /^[a-zA-Z0-9\.]*$/;
 if (elements.fullName == '' || elements.email == '' || elements.message == '') {
   showAlert('incomplete fields');
 }
 else if (!regex.test(elements.email)) {
   showAlert('invalid mail');
 }
 else if (elements.message.length < 5) {
  showAlert('short message');
 }
 else if (!regex.test(elements.email)) {
  showAlert('invalid mail');
 }
 else if (!regexChar.test(elements.fullName)) {
  showAlert('invalid characters');
 }
 else {
   PostData('https://jsonplaceholder.typicode.com/posts', elements);
   window.open('mailto:julietad299@gmail.com?body='+elements.message);
 }
});

function readText(e) {
  elements[e.target.id] = e.target.value;
}

function PostData(url, elements) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(elements),
    headers: {
     'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(function (response) {
     return  response.json();
  }).then(function (json) {
     console.log(json);
  }).catch(function (error) {
     console.log(error);
  })
}

function showAlert(error){
  var messageBox = document.querySelector('#message-box__form');
  if(error == 'incomplete fields'){
   messageBox.className = 'message-box__display--form';
   messageBox.innerHTML = 'All the fields are required';
   form.classList.add('stop');
  }
  else if(error == 'invalid mail'){
    messageBox.className = 'message-box__display--form';
    messageBox.innerHTML = 'Invalid email format';
    form.classList.add('stop');
  }
  else if(error == 'short message'){
    messageBox.className = 'message-box__display--form';
    messageBox.innerHTML = 'Message requires more than 5 characters';
    form.classList.add('stop');
  }
  else if(error == 'invalid characters'){
    messageBox.className = 'message-box__display--form';
    messageBox.innerHTML = 'Invalid characters';
    form.classList.add('stop');
  }
  setTimeout( function () {
    messageBox.className = 'message-box__hidden--form';
    form.className = 'form';
  }, 2000);
}
