//Facebook
window.fbAsyncInit = function() {
  FB.init({
    appId      : '380895757815230',
    cookie     : true,
    xfbml      : true,
    version    : 'v18.0'
  });
    
  FB.AppEvents.logPageView(); 
    
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 
FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
  if (response.status === 'connected') {
    console.log(response.authResponse.accessToken);
  }
});


function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    if (response.status === 'connected') {
      console.log(response.authResponse.accessToken);
    }
  });
}

function customFacebookLogin() {
  FB.login(function(response) {
    if (response.authResponse) {
         console.log('Bienvenido!  Gracias por tu informacion.... ');
         FB.api('/me', {fields: 'name, email'}, function(response) {
          if (response.email) {
            alert("'Bienvenido!  Gracias por tu informacion.... ' \nTu nombre es, " + response.name + ". \nTu email es " + response.email);
          } else {
            alert("'Bienvenido!  Gracias por tu informacion.... ' \nTu nombre es, " + response.name + ". \nTu email es " + response.email);
            console.log('Correo electrónico no disponible');
          }
         });
         
    } else { 
         console.log('Inicio de Sesion Cancelado'); }
  });
}

FB.api('/me', function(response) {
  console.log(JSON.stringify(response));
});



//GOOGLE
function handleCredentialResponse(response) {
  if (response.credential) {
    var credential = response.credential;

    // Muestra la información en una ventana emergente
    alert("ID de usuario: " + credential.id + "\nNombre: " + credential.name + "\nEmail: " + credential.email);

    // Abre una nueva ventana con la información del usuario
    var userInfoWindow = window.open('', '_blank');
    userInfoWindow.document.write('<html><body>');
    userInfoWindow.document.write('<p>ID de usuario: ' + credential.id + '</p>');
    userInfoWindow.document.write('<p>Nombre: ' + credential.name + '</p>');
    userInfoWindow.document.write('<p>Email: ' + credential.email + '</p>');
    userInfoWindow.document.write('</body></html>');
    userInfoWindow.document.close();

    // Maneja la información de la credencial como desees
    console.log("ID de usuario:", credential.id);
    console.log("Nombre:", credential.name);
    console.log("Email:", credential.email);

    window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran'
  }
}

// Inicializa Google Identity Services y configura la función de devolución de llamada
google.accounts.id.initialize({
  client_id: '156922708305-2s4kunvt2aatctbfkpt00pgliqpojkuh.apps.googleusercontent.com',
  callback: handleCredentialResponse,
  cancel_on_tap_outside: false,
});

// Renderiza el botón de Inicio de Sesión de Google
google.accounts.id.renderButton(document.querySelector('.g_id_signin'));
