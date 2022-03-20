const marcBox = (id) => {
  let miCheck = document.getElementById(id);
  if (miCheck.checked) {
    document.getElementById(id + "1").value = "1";
  } else {
    document.getElementById(id + "1").value = "0";
  }
};

let num = 0;
const envioFrame = () => {
  /* Seasigna el valor del Indicador */
  document.getElementById("indi").value = "10000001";
  document.getElementById("indi1").value = "10000001";
  let aux = [];
  /*  Se recibe el mensaje y se divide en sus respectivos frames */
  let mensaje = document.getElementById("mensaje").value;
  aux = mensaje.split(" ");
  /* Se avanza por cada uno de los frames */
  if (num < document.getElementById("frames").value) {
    document.getElementById("info").value = aux[num];
    document.getElementById("num").value = num + 1;
    num++;
  }
  recFrame();
  resFrame();
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
  document.getElementById('tramaDat').value = tramaDat
};

const resFrame = () =>{
        document.getElementById("indi2").value = "10000001";
        document.getElementById("indi3").value = "10000001";
        document.getElementById("infoRes").value =
          document.getElementById("info").value;
}
