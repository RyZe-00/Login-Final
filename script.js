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
          alert(
            "'Bienvenido!  Gracias por tu informacion.... ' \nTu nombre es, " +
              response.name +
              ". \nTu email es " +
              response.email
          );
        } else {
          alert(
            "'Bienvenido!  Gracias por tu informacion.... ' \nTu nombre es, " +
              response.name +
              ". \nTu email es " +
              response.email
          );
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
      icon: "info",
      title: "Información de Usuario",
      html: `<p>ID de usuario: ${credential.id}</p>
             <p>Nombre: ${credential.name}</p>
             <p>Email: ${credential.email}</p>`,
    }).then((result) => {
      // Puedes realizar acciones adicionales después de que el usuario interactúe con la ventana emergente
    });

    // Maneja la información de la credencial como desees
    console.log("ID de usuario:", credential.id);
    console.log("Nombre:", credential.name);
    console.log("Email:", credential.email);

    window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran";
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
      window.location.href = 'Game/snake.html';
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

//EASTER EGG

