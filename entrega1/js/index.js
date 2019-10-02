var loginForm = document.getElementById("login-form");

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  localStorage.setItem('usuario', profile.getName());
  window.location.href = "home.html";

}

loginForm.addEventListener("submit", function(e){
  localStorage.setItem('usuario', document.getElementById("inputEmail").value);
});
