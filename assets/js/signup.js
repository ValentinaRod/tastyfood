$( document).ready(function(){
	 $(".button-collapse").sideNav();

	 //toggle del boton login
	 //toggle del boton login
   $('#login').on('click',function(){
      $('#log-In').toggle('slow');
   });


    $("#boton-guardar").click(function(e){

        function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         return regex.test(email);
        };
        if ($("#name").val() == ""){
            alert("ingrese nombre valido")
        }

        if ($("#email").val() == "") {

            alert("ingresa tu email")
        }

        if (isEmail($("#email").val()) == false ) {
            e.preventDefault();
            alert("tu email no es valido")
        
        }
        if ($("#pasword").val().length != 5) {
            alert("tu clave debe ser de 5 digitos")
        }

         else {
            e.preventDefault();
            window.location = "index-search.html";
        }
    });

    $("#guardar-login").click(function(e){
        

        if ($("#usuario").val() == ""){
            alert("ingrese usuario valido")
        }

        if ($("#pass").val().length != 5) {
            alert("tu clave debe ser de 5 digitos")
        }

         else {
            e.preventDefault();
            window.location = "index-search.html";
        }
    });


});
    
$(document).ready(function(){    
    $('#boton-guardar').click(function(){        
        /*Captura de datos escrito en los inputs*/        
        var nom = document.getElementById("name").value;
        var mail = document.getElementById("email").value;
        var pass = document.getElementById("pasword").value;
        var usuarioLogin = document.getElementById("usuario").value;
        var passLogin = document.getElementById("pass").value;

        
        /*Guardando los datos en el LocalStorage*/
        localStorage.setItem("Nombre", nom);
        localStorage.setItem("Correo", mail);
        localStorage.setItem("contraseña", pass);
        localStorage.setItem("Usuario", user);
     
    window.location.href = "index-search.html";
    });   
});

$(document).ready(function(){    
    $('#boton-cargar').click(function(){        
                                   
        /*Obtener datos almacenados*/
        var nombre = localStorage.getItem("Nombre");
        var correo = localStorage.getItem("Correo"); 
        var pasword = localStorage.getItem("Password"); 
        var usuario = localStorage.getItem("Usuario");
        var paswordLogin = localStorage.get("Contraseña");      
       
        /*Mostrar datos almacenados*/      
        document.getElementById("nombre").innerHTML = nombre;
        document.getElementById("correo").innerHTML = correo;  
        document.getElementById("pasword").innerHTML = password; 
        document.getElementById("usuario").innerHTML = usuario;
        document.getElementById("passLogin").innerHTML = pass;

        
    });   
});

$(document).ready(function(){

        var name = localStorage.getItem("nom");
        var correo = localStorage.getItem("mail");
        var contrasenia = localStorage.getItem("pass");
        var usuario = localStorage.getItem("user");

        $("#nombre-profile").append(name);
        $("#email-profile").append(correo);
        $('#usuario-profile').append(user);
        
    });
        

            