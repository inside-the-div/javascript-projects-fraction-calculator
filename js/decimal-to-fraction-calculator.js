_cmnHideElement("OutputResult");

function FractionCalculatorFormValidate()
{
    RemoveAllErrorMessage();
    var inputNumber = document.getElementById("inputNumber").value;

    if(IsInputFieldEmpty("inputNumber") || (isNaN(inputNumber) && inputNumber <= 0))
    {
        ShowErrorMessageBottomOfTheInputFiled("inputNumber", "Enter valid decimal number.");
        return false;
    }
    
    return true;
}

function FractionCalculatorReset()
{
    document.getElementById("fractionResult").innerHTML= "0/0";
    document.getElementById("inputNumber").value= "";

    RemoveAllErrorMessage();

    _cmnHideElement("OutputResult");
    _cmnShowElement("OutputInfo", "flex");
}

function FractionCalculation()
{
    if(FractionCalculatorFormValidate())
    {
        var inputNumber = Number(document.getElementById("inputNumber").value);
        
        var result = decimalToFraction(inputNumber);
        document.getElementById("fractionResult").innerHTML= result;

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function decimalToFraction(decimal) 
{
    // Count number of digits after decimal point
    let decimalPlaces = (decimal.toString().split('.')[1] || '').length;

    // Multiply number by 10^decimalPlaces to get rid of decimal point
    let numerator = decimal * Math.pow(10, decimalPlaces);
    let denominator = Math.pow(10, decimalPlaces);

    // Find greatest common factor of numerator and denominator
    let factor = gcd(numerator, denominator);

    // Simplify fraction
    numerator /= factor;
    denominator /= factor;
    if((numerator % denominator) == 0)
    {
        return numerator + "/" + denominator;
    }
    else
    {
        var fullNumber =  Math.floor(numerator / denominator);
        numerator = numerator % denominator;
        return fullNumber +"("+ numerator + "/" + denominator +")";
    }    
}

// Helper function to find greatest common factor
function gcd(a, b) 
{
    if (b == 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}
  