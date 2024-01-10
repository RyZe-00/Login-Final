//Facebook
window.fbAsyncInit = function () {
  FB.init({
    appId: "380895757815230",
    cookie: true,
    xfbml: true,
    version: "v18.0",
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

FB.getLoginStatus(function (response) {
  statusChangeCallback(response);
  if (response.status === "connected") {
    console.log(response.authResponse.accessToken);
  }
});

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
    if (response.status === "connected") {
      console.log(response.authResponse.accessToken);
    }
  });
}

function customFacebookLogin() {
  FB.login(function (response) {
    if (response.authResponse) {
      console.log("Bienvenido!  Gracias por tu informacion.... ");
      FB.api("/me", { fields: "name, email" }, function (response) {
        if (response.email) {
          Swal.fire({
            icon: "info",
            title: "Información de Usuario",
            html: `<p>Nombre: ${response.name}</p>
                   <p>Email: ${response.email}</p>`,
          }).then((result) => {
            
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Información de Usuario",
            html: `<p>Nombre: ${response.name}</p>
                   <p>Email: ${response.email}</p>`,
          }).then((result) => {
            
          });
          console.log("Correo electrónico no disponible");
        }
      });
    } else {
      console.log("Inicio de Sesion Cancelado");
    }
  });
}

FB.api("/me", function (response) {
  console.log(JSON.stringify(response));
});

//GOOGLE
function handleCredentialResponse(response) {
  if (response.credential) {
    var credential = response.credential;

    Swal.fire({
      icon: "success",
      title: "Inicio de Sesion Exitoso",
      text: "Sesion Iniciada",
    }).then((result) => {
      window.location.href = 'Game/Menu/menu.html';
    });

    // Maneja la información de la credencial como desees
    console.log("ID de usuario:", credential.id);
    console.log("Nombre:", credential.name);
    console.log("Email:", credential.email);

  }
}

// Inicializa Google Identity Services y configura la función de devolución de llamada
google.accounts.id.initialize({
  client_id:
    "156922708305-2s4kunvt2aatctbfkpt00pgliqpojkuh.apps.googleusercontent.com",
  callback: handleCredentialResponse,
  cancel_on_tap_outside: false,
});

// Renderiza el botón de Inicio de Sesión de Google
google.accounts.id.renderButton(document.querySelector(".g_id_signin"));

//LOCAL
function iniciarSesionLocal() {
  // Capturamos valores de los campos de entrada
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  // Simulamos la autenticación local (sin comunicación con el servidor en este ejemplo)
  if (correo === "usuario@ejemplo.com" && password === "contraseña") {
    Swal.fire({
      icon: "success",
      title: "Inicio de Sesión Exitoso",
      text: "Bienvenido",
    }).then((result) => {
      window.location.href = 'Game/Menu/menu.html';
      // Aquí puedes redirigir al usuario a otra página
      //window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran'
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Credenciales incorrectas",
    }).then((result) => {
      // Aquí puedes redirigir al usuario a otra página después de un inicio de sesión incorrecto
      window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran';
    });

  }
}

document.addEventListener("DOMContentLoaded", function () {
  const botonIniciarSesion = document.querySelector(".input-submit");
  botonIniciarSesion.addEventListener("click", iniciarSesionLocal);
});

//INFO
function mostrarMensajeRecuperar() {
  Swal.fire({
      icon: 'info',
      title: 'Recuperar Contraseña',
      text: 'Correo: usuario@ejemplo.com | Contraseña: contraseña',
  });
}


function mostrarOcultarContrasena() {
  var passwordInput = document.getElementById('password');
  var eyeIcon = document.getElementById('eye-icon');

  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.className = 'fas fa-eye-slash'; // Cambia a la clase de ojo cerrado
  } else {
      passwordInput.type = 'password';
      eyeIcon.className = 'fas fa-eye'; // Sigue utilizando la clase de ojo abierto
  }
}
