'use strict';

// We'll use this URL later to make our request.
const GH_USERS_ENDPOINT = 'https://api.github.com/users/';

function handleForm() {
  const githubForm = $('form[name=github-search]');
  const usernameField = $('input[name=username]');
  
  githubForm.on('submit', function(e) {
    e.preventDefault();
    
    // get the username entered
    const username = usernameField.val();
    
    // pass it in along with the GH endpoint
    fetchGHData(GH_USERS_ENDPOINT, username);
    
    // reset the input
    usernameField.val('');
  });
}

function fetchGHData(baseURL, username) {
  
  // make the complete url by concatenating
  // the endpoint and username together
  const url = baseURL + username;
  
  // try to get some JSON
  // and show something to the user.
  $.getJSON(url, showProfileInfo)
  // ... and show an error if we can't.
    .fail(showErr);
}

function showProfileInfo(profileData) {
  // store the element we'll be appending to
  const outputElem = $('.js-output');
  
  // Store the parts we want from data
  // using object destructuring
  let { name, login, html_url } = profileData;
  
  // if there's no name in the profile
  // well inform our user
  if (!name) name = 'undefined :(';
  
  // We'll use the variables above to present
  // the information we got from GitHub.
  const profileInfoHTML = (
    `<div class="user">
      <p>The user ${login}'s name is ${name}. 
        <a href="${html_url}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="user-link">
          Check out ${login}'s profile!
        </a></p>
    </div>`
  );
  
  // then empty the output region
  // and append our profile info
  outputElem
    .prop('hidden', false)
    .html(profileInfoHTML);
}

function showErr(err) {
  const outputElem = $('.js-output');
  
  const errMsg = (
    `<p>We couldn't find a user with that screenname!`
  );
    
  outputElem
    .prop('hidden', false)
    .html(errMsg);
}

$(handleForm);
