$(document).ready(function(){var screenReset=!0,screenText="0",isLastStrOperator=!1,hasCalculated=!1,currentText="0",currentValue="0",operators=["+","-","*","/"];$("button").click(function(){function clearScreen(){screenReset=!0,screenText="0",isLastStrOperator=!1,hasCalculated=!1,currentText="0",currentValue="0",$("#output").text("0")}switch(currentText=$("#output").text(),currentValue=$(this).val(),isLastCharOperator=operators.indexOf(currentText[currentText.length-1])>-1,isInputOperatorOnReset="0"===currentText&&operators.indexOf(currentValue)>-1,isLastStrOperator=isLastCharOperator||isInputOperatorOnReset,isSecondLastStrOperator=operators.indexOf(currentText[currentText.length-2])>-1,currentValue){case"=":currentText=currentText.replace(/[×÷]/g,function(e){return"×"===e?"*":"/"}),isLastStrOperator&&(currentText=currentText.replace(/.$/,"")),screenText=eval(currentText),"Infinity"==screenText?screenText="Error: Divided by 0":-1===String(screenText).indexOf("e")&&(screenText=(+screenText).toPrecision(15),screenText=screenText.replace(/\.?0*$/,"")),hasCalculated=!0,screenText!=currentText&&$("#output").animate({opacity:0},50,function(){$("#output").text(screenText),$(this).animate({opacity:1},50)});break;case"clear":clearScreen();break;case"backspace":screenText.length>1?screenText=currentText.replace(/.$/,""):clearScreen(),$("#output").text(screenText);break;case".":-1===currentText.match(/[+\-*/]?(\d*\.)?\d*$/)[0].indexOf(".")&&(screenText=currentText+currentValue,screenReset=!1,$("#output").text(screenText));break;case"+":case"-":case"*":case"/":"0"!==currentText&&"-"!==currentText||"-"===currentValue?(!1===screenReset&&!1===isLastStrOperator||!0===hasCalculated?(currentValue="/"===currentValue?"÷":currentValue,currentValue="*"===currentValue?"×":currentValue,screenText=currentText+currentValue,hasCalculated=!1,screenReset=!1):(screenText=currentText.replace(/.$/,currentValue),screenReset=!1),$("#output").text(screenText)):(screenText=currentText,$("#output").text(screenText));break;case"0":"0"===currentText[currentText.length-1]?!isSecondLastStrOperator&&currentText.length>1&&(screenText=currentText+currentValue):screenText=currentText+currentValue,$("#output").text(screenText),hasCalculated&&clearScreen();break;default:hasCalculated?(screenText=currentValue,hasCalculated=!1):screenText="0"===currentText[currentText.length-1]&&isSecondLastStrOperator&&currentText.length>1?currentText.replace(/.$/,currentValue):currentText+currentValue,screenReset?(screenText=currentValue,$("#output").text(screenText),screenReset=!1):$("#output").text(screenText)}})});