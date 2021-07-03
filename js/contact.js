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

form.addEventListener('submit', function(event) {
 event.preventDefault();
 var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
 var { fullName, email, message } = elements;
 if (fullName == '' || email == '' || message == '') {
   showAlert('incomplete fields');
 }
 else if (!regex.test(email)) {
   showAlert('invalid mail');
 }
 else {
   PostData('https://jsonplaceholder.typicode.com/posts', elements);
   showAlert('sent');
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
  else if(error == 'sent') {
  messageBox.className = 'message-box__display--form';
  messageBox.innerHTML = 'Message sent!';
  form.classList.add('stop');
  }
  setTimeout(() => {
    messageBox.className = 'message-box__hidden--form';
    form.className = 'form';
  }, 2000);
}
