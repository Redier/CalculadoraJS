

// creamos el objeto calculadora
var calculadora={
  numero1:'0',
  resultado:0,
  operador:'',
  teclas:['0','1','2','3','4','5','6','7','8','9','punto','igual','mas','menos','por','dividido','raiz','sign','on'],
  inicializarValores: function(){
    this.numero1='0';
    this.display='0';
    this.resultado=0;
    this.operador='';
    this.signo=1;
  },
  operacionAritmetica: function(num1, num2, operador){
    var result=0
        variable1 =num1
        variable2 =num2

  switch (operador) {
    case 'mas':
      result= variable1+variable2;
      break;
    case 'menos':
      result= variable1-variable2;
      break;
    case 'por':
      result= variable1*variable2;
      break;
    case 'dividido':
      result= variable1/variable2;
      break;
    default:
  }
  console.log(result.toString());
  return result;
  },
  //al presionar tecla reducir tamano de la teclado e imprimir en pantalla
  presionar_tecla: function(){
    for (var x in this.teclas) {
      document.getElementById(this.teclas[x]).onclick=this.cambiar_tecla;
    }
  },
  cambiar_tecla: function (event){
    var idTecla=event.currentTarget.id;
    var imgTecla =document.getElementById(idTecla);
    if (idTecla=='mas') {
    imgTecla.style='width : 74px; height:134px';
    setInterval(function() {
    imgTecla.style='width : 79px; height:138px';
    }, 200);
  } else {
      imgTecla.style='width : 70px; height:61px';
      setInterval(function() {
      imgTecla.style='width : 75px; height:62.91px';
    }, 200);
    }
    //llamar a la funcion que segun sea el boton presionado ejecute una function
    calculadora.ejecutarFuncion(idTecla);

  },
  //-------
  ejecutarFuncion:function(tecla){
    var numero =Number(this.numero1);
        resultado =this.resultado;
        operador=calculadora.operador;

    switch (tecla) {
      case 'punto':
        calculadora.insertarPunto(tecla);
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        calculadora.insertarNumero(tecla);
        break;
      case 'on':
        this.imprimirPantalla('0');
        //limpiar numeros y operador
        calculadora.inicializarValores();
        break;
      case 'mas':
      case 'menos':
      case 'por':
      case 'dividido':
        this.operador=tecla;
        this.resultado+=numero;
        this.numero1='0';
        this.imprimirPantalla('');
        break;
      case 'igual':
        calculadora.ejecutarIgual()
        break;
      case 'sign':
          calculadora.insertarSigno(tecla);
        break;
      default:

    }
  },
//--------------
insertarPunto:function(tecla){
  var cadena = calculadora.numero1;
  var index=cadena.indexOf('.');
  if (index ==-1){// no hay punto insertamos el punto
    calculadora.numero1+='.';
  }
  calculadora.imprimirPantalla(this.numero1);
},
//---------------
insertarNumero:function(tecla){
  var numero =calculadora.numero1;
  if (numero.length <8){
    if (  numero=='0') {
                numero='';
    }
    numero+=tecla;

  }
  calculadora.numero1=numero;
  calculadora.imprimirPantalla(numero);
},
//----------------------
insertarSigno:function(tecla)
{
  var numero= Number(calculadora.numero1);
  numero*=-1;
  calculadora.numero1=numero.toString();
  calculadora.imprimirPantalla(calculadora.numero1);
},
//----------------
ejecutarIgual:function(){
  var numero =Number(this.numero1);
      resultado =this.resultado;
      operador=this.operador;
  this.resultado=calculadora.operacionAritmetica(resultado,numero,operador);
  this.imprimirPantalla(this.resultado.toString());
  this.numero1='0';
},
  //----------
  imprimirPantalla:function(cadena){
    //validar que tamaño de cadena a mostrar sea tamaño 8.
    var size =cadena.length;
    if (size>8) {
      document.getElementById('display').innerHTML=cadena.substr(0,9);
    }else{
     document.getElementById('display').innerHTML=cadena;
   }
  },

  asignarSimbolo:function(){
    var num1=parseFloat(calculadora.numero1);
    var num2=parseFloat(calculadora.numero2);
    var numero =document.getElementById('display').innerHTML;
    if (num1 == numero) {
      num1*=-1;
      calculadora.numero1=num1.toString();
      calculadora.imprimirPantalla(calculadora.numero1);
    } else {
      num2*=-1;
      calculadora.numero2=num2.toString();
      calculadora.imprimirPantalla(calculadora.numero2);
    }
  }
}

calculadora.presionar_tecla();
