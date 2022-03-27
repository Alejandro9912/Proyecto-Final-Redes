const marcBox = (id) => {
  let miCheck = document.getElementById(id);
  if (miCheck.checked) {
    document.getElementById(id + "1").value = "1";
  } else {
    document.getElementById(id + "1").value = "0";
  }
};

let num = 0;
let mensajeRec = " ";
let aux = [];
let primeraVez = true;
let ultimaTrama = false;

const envioFrame = () => {
  /* Seasigna el valor del Indicador */
  document.getElementById("indi").value = "10000001";
  document.getElementById("indi1").value = "10000001";
  /*  Se recibe el mensaje y se divide en sus respectivos frames */
  let mensaje = document.getElementById("mensaje").value;
  aux = mensaje.split(" ");
  while(aux.length < document.getElementById("frames").value) {
    aux.push("");
  }
  /*realiza la accion de enviar la trama */
  verificarEnvio();
  //envia el valor de la trama al textArea "tramaSec"
  verificarTramaEnviada();
  //Añade información de la tabla receptor
  recFrame();
  //Añade información a la tabla de respuesta
  resFrame();
  //Evalúa los valores de respuesta para la trama enviada
  marcarRespuesta();
};

const verificarEnvio = () => {
  //si es la primer vez que se envia información llena los campos correspondientes
  if (primeraVez) {
    document.getElementById("ctr").checked = true;
    document.getElementById("ppt").checked = true;
    marcBox("ctr");
    marcBox("ppt");

    document.getElementById("info").value = aux[num];
    document.getElementById("num").value = num + 1;
    num++;
    primeraVez = false;
  }

  /*se evalua que el ultimo frame haya enviado datos para pasar al siguiente*/
  if (permiteDatos()) {
    mensajeRec += " " + aux[num - 1];
    console.log(aux[num]);
    document.getElementById("mensajeRec").value = mensajeRec;
  }
};

//Método que desencadena el botón de responder
const responder = () => {
  let ack = document.getElementById("resAck").value;
  let enq = document.getElementById("resEnq").value;
  let ctr = document.getElementById("resCtr").value;
  let dat = document.getElementById("resDat").value;
  let ppt = document.getElementById("resPpt").value;
  let lpt = document.getElementById("resLpt").value;

  if (ack == "1" && ctr == "1" && lpt == "1") {
    desmarcarTrasm();
    document.getElementById("dat").checked = true;
    marcBox("dat");
  }
  if (ack == "1" && dat == "1") {
    if (permiteDatos()) {
      /* Se avanza por cada uno de los frames */
      if (num < document.getElementById("frames").value) {
        document.getElementById("info").value = aux[num];
        document.getElementById("num").value = num + 1;
        num++;
      }
    }

    desmarcarTrasm();
    document.getElementById("ctr").checked = true;
    document.getElementById("ppt").checked = true;
    marcBox("ctr");
    marcBox("ppt");
  }
  if (num == aux.length) {
    console.log("Loka");
    document.getElementById("enq").checked = true;
    marcBox("enq");
  }
  if (enq == "1" && dat == "1") {
    console.log("CDLM PTE");
    ultimaTrama = true;
  }
  verificarTramaRespuesta();
  if (ultimaTrama == true) {
    document.getElementById("envio").disabled = true;
    document.getElementById("responder").disabled = true;
  }
};

const marcarRespuesta = () => {
  /*Se verifica que campos del transmisor estan marcados */
  if (verificarCTR() && verificarPPT()) {
    document.getElementById("resAck").value = "1";
    document.getElementById("resEnq").value = "0";
    document.getElementById("resCtr").value = "1";
    document.getElementById("resDat").value = "0";
    document.getElementById("resPpt").value = "0";
    document.getElementById("resLpt").value = "1";
    document.getElementById("resNum").value =
      document.getElementById("num").value;
  }
  if (verificarDAT()) {
    document.getElementById("resAck").value = "1";
    document.getElementById("resEnq").value = "0";
    document.getElementById("resCtr").value = "0";
    document.getElementById("resDat").value = "1";
    document.getElementById("resPpt").value = "0";
    document.getElementById("resLpt").value = "0";
    document.getElementById("resNum").value =
      document.getElementById("num").value;
  }
  if (verificarENQ()) {
    document.getElementById("resAck").value = "1";
    document.getElementById("resEnq").value = "1";
    document.getElementById("resCtr").value = "1";
    document.getElementById("resDat").value = "0";
    document.getElementById("resPpt").value = "0";
    document.getElementById("resLpt").value = "1";
    document.getElementById("resNum").value =
      document.getElementById("num").value;
  }
  if (verificarENQ() && verificarDAT()) {
    document.getElementById("resAck").value = "1";
    document.getElementById("resEnq").value = "1";
    document.getElementById("resCtr").value = "0";
    document.getElementById("resDat").value = "1";
    document.getElementById("resPpt").value = "0";
    document.getElementById("resLpt").value = "0";
    document.getElementById("resNum").value =
      document.getElementById("num").value;
  }
};

const recFrame = () => {
  let tramaDat = "";
  /* Se recibe el frame */
  document.getElementById("infoRec").value =
    document.getElementById("info").value;
  document.getElementById("headRec").value = "10000001";
  document.getElementById("trailRec").value = "10000001";

  tramaDat += document.getElementById("ack1").value;
  tramaDat += document.getElementById("enq1").value;
  tramaDat += document.getElementById("ctr1").value;
  tramaDat += document.getElementById("dat1").value;
  tramaDat += document.getElementById("ppt1").value;
  tramaDat += document.getElementById("lpt1").value;
  tramaDat += document.getElementById("num").value;
  document.getElementById("tramaDat").value = tramaDat;
};

const resFrame = () => {
  /*se reponde el frame */
  document.getElementById("indi2").value = "10000001";
  document.getElementById("indi3").value = "10000001";
  document.getElementById("infoRes").value =
    document.getElementById("info").value;
};

const desmarcarTrasm = () => {
  document.getElementById("ack").checked = false;
  document.getElementById("enq").checked = false;
  document.getElementById("ctr").checked = false;
  document.getElementById("dat").checked = false;
  document.getElementById("ppt").checked = false;
  document.getElementById("lpt").checked = false;
  marcBox("ack");
  marcBox("enq");
  marcBox("ctr");
  marcBox("dat");
  marcBox("ppt");
  marcBox("lpt");
};

const verificarTramaRespuesta = () => {
  let trama = "Tr: ";
  /*verifica cual checbox de la trama a envia estan activos*/
  if (document.getElementById("resAck").value == "1") {
    trama += "Información recibida ";
  }
  if (document.getElementById("resEnq").value == "1") {
    trama += "Última trama ";
  }
  if (document.getElementById("resCtr").value == "1") {
    trama += "Trama de control ";
  }
  if (document.getElementById("resDat").value == "1") {
    trama += "Datos enviados ";
  }
  if (document.getElementById("resPpt").value == "1") {
    trama += "Permiso para transmitir ";
  }
  if (document.getElementById("resLpt").value == "1") {
    trama += "Listo para transmitir ";
  }

  document.getElementById("tramaSec").value += trama + "\n";
  return trama;
};

const verificarTramaEnviada = () => {
  let trama = "Tx: ";
  /*verifica cual checbox de la trama a envia estan activos*/
  if (verificarACK()) {
    trama += "Información recibida ";
  }
  if (verificarENQ()) {
    trama += "Última trama ";
  }
  if (verificarCTR()) {
    trama += "Trama de control ";
  }
  if (verificarDAT()) {
    trama += "Envío de datos ";
  }
  if (verificarPPT()) {
    trama += "Permiso para transmitir ";
  }
  if (verificarLPT()) {
    trama += "Listo para transmitir ";
  }
  document.getElementById("tramaSec").value += trama + "\n";
  return trama;
};

const permiteDatos = () => {
  if (verificarDAT()) {
    return true;
  }
  return false;
};

const verificarACK = () => {
  if (document.getElementById("ack").checked) {
    return true;
  } else {
    return false;
  }
};
const verificarCTR = () => {
  if (document.getElementById("ctr").checked) {
    return true;
  } else {
    return false;
  }
};

const verificarENQ = () => {
  if (document.getElementById("enq").checked) {
    return true;
  } else {
    return false;
  }
};

const verificarDAT = () => {
  if (document.getElementById("dat").checked) {
    return true;
  } else {
    return false;
  }
};

const verificarPPT = () => {
  if (document.getElementById("ppt").checked) {
    return true;
  } else {
    return false;
  }
};

const verificarLPT = () => {
  if (document.getElementById("lpt").checked) {
    return true;
  } else {
    return false;
  }
};
