window.addEventListener('load', start);

var globalInputRange = null;
var globalValueRange = null;

console.log('teste'[1]);

function start(){
    handlerRange();  
}
function handlerRange(){
    function captureNumberRange(){
        globalValueRange = globalInputRange.value;
        printNumberRange();
        printCursiveNumber();
        function printNumberRange(){
            var numberInput = document.querySelector('#inputNumber');
            numberInput.value = globalValueRange;
        }
        function printCursiveNumber(){
            var numberInput = document.querySelector('#inputCursiveNumber');
            numberInput.value = generateCursiveNumber();
        }
                 
    }
    globalInputRange =document.querySelector('#inputRange');
    globalInputRange.addEventListener('change', captureNumberRange);    
}
function generateCursiveNumber(){
    var cursiveNumber=null;
    
    var unit = ['','um', 'dois', 'três', 'quatro', 'cinco',
    'seis', 'sete', 'oito', 'nove', 'dez', 'onze',
    'doze', 'treze', 'quatorze', 'quinze', 'dezesseis',
    'dezessete', 'dezoito', 'dezenove'];

    var  ten = ['','', 'vinte', 'trinta', 'quarenta', 'cinquenta',
    'sessenta', 'setenta', 'oitenta', 'noventa'];

    var hundred = ['', 'cento', 'duzentos', 'trezentos',
    'quatrocentos', 'quinhentos', 'seiscentos',
    'setecentos', 'oitocentos', 'novecentos'];
    
    if(globalValueRange<21){        
        cursiveNumber =getUnit(globalValueRange);
    }else if (globalValueRange>20 && globalValueRange<100){
        cursiveNumber =getTen(globalValueRange);
    }else{
        cursiveNumber =getHundred(globalValueRange);
    }

    function getUnit(unitNumber){
        return unit[unitNumber];
    }
    function getTen(tenNumber){
        var resto = tenNumber % 10;
        var tenDigit = (tenNumber/10)|0;   
       
        if(resto === 0 && !tenDigit == 1){            
            return ten[tenNumber/10];
        }else if(tenDigit === 0 ){
            return getUnit(resto);
        }else if(tenDigit === 1 ){            
            return getUnit(resto+10);
        }else{
            return ten[tenDigit] + concatena() + getUnit(resto);
        }
        
    }
    function getHundred(hundredNumber){
        var resto = hundredNumber % 100;
        var hundredDigit = (hundredNumber/100)|0;
        if(resto === 0){            
            return hundred[hundredNumber/10];
        }else{            
            return hundred[hundredDigit] 
            + concatena() + getTen(resto);
        }
    }

    function concatena(){
        return " e ";
    }
    
    return cursiveNumber;
}



