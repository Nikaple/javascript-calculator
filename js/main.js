$(document).ready(function() {
    //是否重置计算器
    var screenReset = true;
    //输出字符串
    var screenText = "0";
    //最后字符是否是运算符
    var isLastStrOperator = false;
    //是否进行过运算
    var hasCalculated = false;
    //当前屏幕输出
    var currentText = "0";
    //当前按键信息
    var currentValue = "0";
    //运算符数组
    var operators = ["+", "-", "*", "/"];
    $('button').click(function() {
        currentText = $('#output').text();
        currentValue = $(this).val();
        isLastCharOperator = operators.indexOf(currentText[currentText.length - 1]) > -1;
        isInputOperatorOnReset = currentText === "0" && operators.indexOf(currentValue) > -1;
        isLastStrOperator = isLastCharOperator || isInputOperatorOnReset;
        isSecondLastStrOperator = operators.indexOf(currentText[currentText.length - 2]) > -1;
        switch (currentValue) {
            case "=":
                // 将×÷替换为*/
                currentText = currentText.replace(/[×÷]/g, function(match){
                    return match === '×' ? '*' : '/';
                });
                //如果最后一位是运算符，则忽略
                if (isLastStrOperator) {
                    currentText = currentText.replace(/.$/, "");
                }
                screenText = eval(currentText);
                //如果除数为0，显示error
                if (screenText == "Infinity") {
                    screenText = "Error: Divided by 0";
                } else {
                    // 计算结果没有大到自动使用科学计数法时
                    if (String(screenText).indexOf('e') === -1){
                        screenText = (+screenText).toPrecision(15);
                        screenText = screenText.replace(/\.?0*$/, '');
                    }
                }
                //进行了一次计算
                hasCalculated = true;
                if(screenText != currentText){
                    $("#output").animate({opacity: 0}, 50, function(){
                        $('#output').text(screenText);
                        $(this).animate({opacity: 1}, 50);
                    });
                }
                break;
            case "clear":
                //清零
                clearScreen();
                break;
            case "backspace":
                //如果不是初始状态，删除最后一个字符
                if(screenText.length > 1){
                    screenText = currentText.replace(/.$/, "");
                } else{
                    //如果屏幕信息为空，则显示0
                    clearScreen();
                }
                $('#output').text(screenText);
                break;
            case ".":
                //匹配带有+-*/(可选)的最后一个数字，或者只有符号，如果里面没有小数点，则添加小数点
                if (currentText.match(/[+\-*/]?(\d*\.)?\d*$/)[0].indexOf(".") === -1) {
                    screenText = currentText + currentValue;
                    screenReset = false;
                    $('#output').text(screenText);
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                //空屏只允许输入减号
                if ((currentText === "0" || currentText === "-") && currentValue !== "-") {
                    screenText = currentText;
                    $('#output').text(screenText);
                } else {
                    //如果最后一位不是运算符，则添加运算符；如果计算过一次再按运算符，继续运算。
                    if ((screenReset === false && isLastStrOperator === false) || hasCalculated === true) {
                        //将/替换为÷, *替换为×
                        currentValue = currentValue === "/" ? "÷" : currentValue;
                        currentValue = currentValue === "*" ? "×" : currentValue;
                        screenText = currentText + currentValue;
                        hasCalculated = false;
                        screenReset = false;
                    } else {
                        //用新的按键替换当前运算符
                        screenText = currentText.replace(/.$/, currentValue);
                        screenReset = false;
                    }
                    $('#output').text(screenText);
                }
                break;
            case "0":
                //末位为0时
                if (currentText[currentText.length - 1] === "0") {
                    //倒数第二位不是运算符
                    if ((!isSecondLastStrOperator) && currentText.length > 1) {
                        screenText = currentText + currentValue;
                    }
                }
                else {
                    screenText = currentText + currentValue;
                }
                $('#output').text(screenText);
                //如果计算过，则清零
                if (hasCalculated) {
                    clearScreen();
                }
                break;
            default:
                //如果之前按过等号，清零并直接添加
                if (hasCalculated) {
                    screenText = currentValue;
                    hasCalculated = false;
                } else {
                    //如果最后一位为0，并且倒数第二位为运算符
                    if (currentText[currentText.length - 1] === "0" && isSecondLastStrOperator && currentText.length > 1) {
                        screenText = currentText.replace(/.$/, currentValue);
                    } else {
                        screenText = currentText + currentValue;
                    }
                }
                if (screenReset) {
                    screenText = currentValue;
                    $('#output').text(screenText);
                    screenReset = false;
                } else {
                    $('#output').text(screenText);
                }
        }
        function clearScreen() {
            screenReset = true;
            screenText = "0";
            isLastStrOperator = false;
            hasCalculated = false;
            currentText = "0";
            currentValue = "0";
            $('#output').text("0");
        }

    });
});

