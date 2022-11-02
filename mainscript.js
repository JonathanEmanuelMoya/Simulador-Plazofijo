// Al iniciar obtengo los datos del json
$(()=>{
  $.get("api.json", function (datos) {

    //Con esta función, recorro cada elemento del array que me devolvió la llamada ajax, y de cada elemento uso el atributo "banco" para llenar el select
    
    datos.forEach((element) => {



      //Creo un select en el html, y lo llamo desde js

      let nombreBancos = $("#nombreBancos");
      let option = `<option value="${element.tna}" name="nombreBancos">${element.banco}</option>`;
      nombreBancos.append(option);
    });
  });
});




// Evento Click al realizar un click al boton "Calcular"

$('#boton').on('click', function resultado(e) {
    calcular();
    e.preventDefault();
});


// Evento change select nombreBancos

$("#nombreBancos").change(function () {
  let valorBanco = $("select[name=nombreBancos]").val();
  console.log(valorBanco);
  let valorBancoTexto = $("#nombreBancos option:selected");
  let textoBanco = valorBancoTexto.text();
  $("#banco").html(textoBanco);
  $("#mostrarTna").html(valorBanco);
 
});

$("#tipoPF").change(function () {
  let tipoPlazoFijo = $("select[name=tipoPF]").val();
  $("#tipoPfValue").html(tipoPlazoFijo);
});


//Función "Calcular" en la cual almaceno las variables necesarias para realizar los calculos pertinentes

function calcular() {
  let capital = $("#capital").val();
  let duracion = $("#duracion").val();
  let tipoPlazoFijo = $("select[name=tipoPF]").val();
  let TNA = $("select[name=nombreBancos]").val();
  let deposito = Number(capital);
  let interesesGanados = parseInt(deposito * ((TNA * duracion) / 100 / 365));
  let montoTotal = parseInt(deposito + interesesGanados);



  //Mostrar un alert por si el usuario no ingresa un valor para capital y plazo

  if ((capital == " ") || (duracion == " ")) {
    alert("Error, complete los campos de capital y plazo por favor");
    return false;

  } else if ((capital <= 999) || (duracion <= 29))  {
    alert("Error, ingrese un capital mayor a 999 y un plazo mayor a 29 dias por favor");
    return false;

  } else {


    //Mostrar en el "containerTable" los resultados en base a lo ingresado por el usuario

    $("#mostrarCapital").html("$" + capital + ".-");
    $("#mostrarPlazo").html(duracion + " dias.");
    $("#tipoPfValue").html(tipoPlazoFijo);
    $("#mostrarInteresesGanados").html("$" + parseInt(interesesGanados) + ".-");
    $("#mostrarMontoTotal").html("$" + parseInt(montoTotal) + ".-");
    $("#mostrarTna").html("% " + TNA);
    

  };
};

