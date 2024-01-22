function digitPressed(digit){
    if (digit == '.'){
        var str = document.getElementById("resultInput").value;
        var used = false;
        for (let i=0; i<str.length; i++){
            if (str[i] == '.' && used == true){document.getElementById("resultInput").value = "error"; return;}
            if (str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/') used = false;
            else if (str[i] == '.'){used = true;}
        }

        if (used == true) {document.getElementById("resultInput").value = "error"; return;}
        else document.getElementById("resultInput").value += digit;
    }
    else if (digit == '+' || digit == '-' || digit == '*' || digit == '/'){
        var str = document.getElementById("resultInput").value;
        if (str[str.length-1] == '+' || str[str.length-1] == '-' || str[str.length-1] == '*' || str[str.length-1] == '/'){
            document.getElementById("resultInput").value = "error"; return;}
        else
            document.getElementById("resultInput").value += digit;
    }
    else document.getElementById("resultInput").value += digit;
}

function erase(){
    document.getElementById("resultInput").value = "";
}

function square(){
    var str = document.getElementById("resultInput").value;
    let int = 1;

    for (let i=0; i<str.length; i++){
        if (str[i] == "*" || str[i] == "+" || str[i] == "-" || str[i] == "(" || str[i] == ")" || str[i] == "m" || str[i] == "÷" || str[i] == "√" || str[i] == "%"){
            document.getElementById("resultInput").value = "Error"; return;}
        if (str[i] == '.')
            int = 0;
    }

    if (int){
        var num = parseInt(str);
        num = num*num;
        num.toString()
        document.getElementById("resultInput").value = num; return;
    }
    else{
        var num = parseFloat(str);
        num = num*num;
        num.toString();
        document.getElementById("resultInput").value = num; return;
    }
}

function raiz(){
    var str = document.getElementById("resultInput").value;

    for (let i=0; i<str.length; i++){
        if (str[i] == "*" || str[i] == "+" || str[i] == "-" || str[i] == "(" || str[i] == ")" || str[i] == "m" || str[i] == "÷" || str[i] == "%"){
            document.getElementById("resultInput").value = "Error"; return;}
    }

    var num = parseFloat(str);
    num = Math.sqrt(num);
    num.toString();
    document.getElementById("resultInput").value = num; return;
}

function modulo(){
    var str = document.getElementById("resultInput").value;

    for (let i=0; i<str.length; i++){
        if (str[i] == "*" || str[i] == "+" || str[i] == "(" || str[i] == ")" || str[i] == "m" || str[i] == "÷" || str[i] == "%"){
            document.getElementById("resultInput").value = "Error"; return;}
    }

    var num = parseFloat(str);
    num = Math.abs(num);
    num.toString();
    document.getElementById("resultInput").value = num; return;
}

function calcular(){
    var num = eval(document.getElementById("resultInput").value);
    document.getElementById("resultInput").value = num.toString();
}

document.addEventListener('keydown', function(event){
    const key = event.key;

    if (key == '=') calcular();
    else if (key == "Backspace") erase();
    else if (key == '+' || key == '-' || key == '*' || key == '/' || key == '(' || key == ')' || key == '.' || key == ',') digitPressed(key);
    else if (parseInt(key) >= 0 && parseInt(key)<=9) digitPressed(key);
});