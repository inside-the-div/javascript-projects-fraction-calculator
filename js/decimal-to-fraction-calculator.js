function ValidateFractionCalculatorForm()
{
    _cmnRemoveAllErrorMessage();
    var inputNumber = document.getElementById("inputNumber").value;

    if(inputNumber == "" || (!isNaN(inputNumber) && inputNumber <= 0))
    {
        _cmnShowErrorMessageBottomOfTheInputFiled("inputNumber", "Enter valid number.");
        return false;
    }
    
    return true;
}

function ResetFractionCalculator()
{
    if(confirm("Are you sure want to reset the calculator?")){
        document.getElementById("outputNumerator").innerHTML = "?";
        document.getElementById("outputDenominator").innerHTML = "?";
        document.getElementById("inputNumber").value= "";

        _cmnRemoveAllErrorMessage();
    }
}

function CalculateFraction()
{
    if(ValidateFractionCalculatorForm())
    {
        var inputNumber = Number(document.getElementById("inputNumber").value);
        
        var result = decimalToFraction(inputNumber);
        document.getElementById("outputNumerator").innerHTML = result.toString().split('/')[0];
        document.getElementById("outputDenominator").innerHTML = result.toString().split('/')[1];  
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
    let factor = _cmnGCD(numerator, denominator);

    // Simplify fraction
    numerator /= factor;
    denominator /= factor;
   
    return numerator + "/" + denominator;    
}