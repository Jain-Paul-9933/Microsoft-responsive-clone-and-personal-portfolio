/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com

(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
*/
function validateName()
{
  let name = document.getElementById("name").value;
  let regx = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/

  if(!name.trim()){
    alert("Please enter your name");
    return false;
  }
  else if(!regx.test(name)){
    alert("Enter a valid name");
    return false;
  }
  else{
    return true;
  }
}
function validateEmail()
{
  let email = document.getElementById("email").value
  let regx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
  if(!email.trim()){
    alert("Please enter your email");
    return false;
  }
  else if(!regx.test(email)){
    alert("Enter a valid email");
    return false;
  }
  else{
    return true;
  }
}
function validateSubject()
{
  let subject = document.getElementById("subject").value
  if(!subject.trim()){
    alert("Please enter your subject");
    return false;
  }
  else{
    return true;
  }
}
function validateMessage()
{
  let message = document.getElementById("message").value
  if(!message.trim()){
    alert("Please enter your message");
    return false;
  }
  else{
    return true;
  }
}
function validateForm(){
  if(!validateEmail()||!validateMessage()||!validateName()||!validateSubject()){
    alert("Form not Submitted!!");
    return false;
  }
  else{
    alert("Form submitted Successfully");
    return true;
  }
}