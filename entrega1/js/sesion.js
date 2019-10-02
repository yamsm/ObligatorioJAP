document.addEventListener("DOMContentLoaded", function(e){
    var usuario = document.getElementById("usuario");
    usuario.innerHTML = localStorage.getItem('usuario');
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
});

var cerrarSesion = document.getElementById("cerrar-sesion");

cerrarSesion.addEventListener("click", function(e){
    document.getElementById("spinner-wrapper").style.display = "block";
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    auth2.disconnect();
    localStorage.removeItem('usuario');
    setTimeout(function(){
      window.location.href = "index.html";
    }, 2500);
});
