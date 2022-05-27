var firstNum;
var secondNum;
var operator;
var finalResult;
var historyResult = "";

var isFirstNum;
var isSecondNum;
var isEqual = false;

var historyTop = "";
var historyMid = "";
var historyBot = "";

//insert NUMBER into DISPLAY function
function insert(num)
{
    //if '=' button was pressed delete what is on DISPLAY
    if(isEqual == true)
    {
        if(num == ','){    
            //if NUMBER is ',' add '0' before
            document.getElementById('resultDisplay').innerHTML = '0' + num;
        }else{
            //else insert NUMBER into DISPLAY
            document.getElementById('resultDisplay').innerHTML = num;
        }

        isEqual = false;
    }else{
        //var to check if there's something on DISPLAY
        var checkDisplay = document.getElementById('resultDisplay').innerHTML;

            //delete everything other than non-null NUMBER on DISPLAY
            if(checkDisplay == '0'||checkDisplay == 'x'||checkDisplay == '+'||checkDisplay == '-'||checkDisplay == '÷')
            {
                if(num == ','){
                    //if NUMBER is ',' add '0' before
                    document.getElementById('resultDisplay').innerHTML = '0' + num;

                }else{
                    //else insert NUMBER into DISPLAY
                    document.getElementById('resultDisplay').innerHTML = num;
                }
                
            }else{
                //add NUMBER receives into DISPLAY NUMBER
                var numReceive = document.getElementById('resultDisplay').innerHTML;

                document.getElementById('resultDisplay').innerHTML = numReceive + num;    
            }
    }
}

//clear DISPLAY function
function AC()
{
    //add '0' into DISPLAY
    document.getElementById('resultDisplay').innerHTML = "0";
}

//result MATH function
function result()
{
        //change var secondNum ',' ->'.' (needed to use eval() funtion)
        secondNum = document.getElementById('resultDisplay').innerHTML.toString().replace(',', '.');

        //var finalResult receives (1 NUMBER)+(MATH OPERATOR)+(2 NUMBER)
        finalResult = firstNum + operator + secondNum;

        //do MATH operation
        finalResult = eval(finalResult);

        //change operator '/' -> '÷' and '*' -> 'x' show on DISPLAY
        if(operator == '/' || operator == '*')
        {
            operator = operator.toString().replace('/', '÷');
            operator = operator.toString().replace('*', 'x');
        }

        //string to show on DISPLAY
        finalResultChart = firstNum.toString().replace('.', ',') + operator + secondNum.toString().replace('.', ',') + '=' + finalResult.toString().replace('.', ',');
    
        //show result on DISPLAY
        document.getElementById('resultDisplay').innerHTML = finalResultChart ;
    
        //show result on HISTORY LINE 4
        historyTop = historyMid;
        document.getElementById("histTop").innerHTML = historyTop;

        //show result on HISTORY LINE 3
        historyMid = historyBot;
        document.getElementById("histMid").innerHTML = historyMid;

        //show result on HISTORY LINE 2
        historyBot = historyResult;
        document.getElementById("histBot").innerHTML = historyBot;

        //show result on HISTORY LINE 1
        historyResult = finalResultChart;
        document.getElementById("historyDisplay").value = historyResult;
 

        //clear string to DISPLAY
        finalResultChart = '';

        //flag to show that EQUAL was pressed
        isEqual = true;
}

//NUMBER and OPERATOR handler function
function operationHandler(operation, operChar)
{      
    //operator handler
    operator = operation;

    if(isEqual == true){
        //if had a final RESULT take de final result and use as NUMBER 1
        firstNum = finalResult;
        document.getElementById('resultDisplay').innerHTML = operChar;

    }else{
        //else take de number on DISPLAY as NUMBER 1
        firstNum = document.getElementById('resultDisplay').innerHTML.toString().replace(',', '.');
        document.getElementById('resultDisplay').innerHTML = operChar;
    }
}

//use POST method without reload the webpage funtion
function fecthGo()
{
    var data = new FormData();
    data.append("historyDisplay", document.getElementById("historyDisplay").value);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "connect.php");
    xhr.onload = function(){console.log(this.response);};

    xhr.send(data);
    return false;
}