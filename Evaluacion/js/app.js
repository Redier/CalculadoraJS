

// creamos el objeto calculadora
var calculadora={
  numero1:'0',
  numero2:'0',
  punto1:false,
  punto2:false,
  resultado:0,
  operador:'',
  signo:1,
  teclas:['0','1','2','3','4','5','6','7','8','9','punto','igual','mas','menos','por','dividido','raiz','sign','on'],
  inicializarValores: function(){
    this.numero1='0';
    this.numero2='0';
    this.punto1=false;
    this.punto2=false;
    this.resultado=0;
    this.operador='';
  },
  operacionAritmetica: function(num1,num2, operador){
    var result=0
    var variable1= parseFloat(num1)
    var variable2= parseFloat(num2)

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
  if (result.toString().length>8){
    result=result.toFixed(7)
  }
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
    var imgSuma =document.getElementById(idTecla);
    if (idTecla=='mas') {
    imgSuma.style='width : 74px; height:134px';
    setInterval(function() {
    imgSuma.style='width : 79px; height:138px';
    }, 200);
  } else {
      imgSuma.style='width : 70px; height:61px';
      setInterval(function() {
      imgSuma.style='width : 75px; height:62.91px';
    }, 200);
    }
    //llamar a la funcion que segun sea el boton presionado ejecute una function
    calculadora.ejecutarFuncion(idTecla);

  },
  //-------
  ejecutarFuncion:function(tecla){

    switch (tecla) {
      case 'punto':
        if (this.operador==''){//primer numero
          //validamos q no tengan puntos
          if (!this.punto1) {
            this.numero1+='.';
            this.imprimirPantalla(this.numero1);
            this.punto1=true;
          }
        }else {
          //validamos q no tengan puntos
          if (!this.punto2) {
            this.numero2+='.';
            this.imprimirPantalla(this.numero2);
            this.punto2=true;
          }
        };
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
        if (this.operador==''){
          if (this.numero1.length<9){
            if (  this.numero1=='0') {
              this.numero1='';
            }
            this.numero1+=tecla;
            this.imprimirPantalla(this.numero1);
          }
        }else{//trabajamos con el segundo numero
          if (this.numero2.length<9){
            if ( this.numero2=='0') {
              this.numero2='';
            }
            this.numero2+=tecla;
            this.imprimirPantalla(this.numero2);
          }
        };
        break;
      case 'on':
        this.limpiarPantalla('0');
        //limpiar numeros y operador
        calculadora.inicializarValores();
        break;
      case 'mas':
      case 'menos':
      case 'por':
      case 'dividido':
        this.operador=tecla,
        this.limpiarPantalla('');
        break;
      case 'igual':
        this.resultado=calculadora.operacionAritmetica(this.numero1,this.numero2,this.operador);
        this.imprimirPantalla(this.resultado.toString());
        break;
      case 'sign':
        calculadora.asignarSimbolo();
        break;
      default:

    }
  },

  //----------
  imprimirPantalla:function(tecla){

     document.getElementById('display').innerHTML=tecla;
  },
//---------------
  limpiarPantalla: function(vari){
    document.getElementById('display').innerHTML=vari;
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
