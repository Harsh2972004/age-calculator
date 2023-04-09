// valid days, month, year 
var validDay = false;
var validMonth = false;
var validYear = false;

// Adding errors styling for valid input and checking fields

const checkValidInput = function (input, minValue, maxValue, field, label , errorMessage){
    if (+input === 0) {
        $(".error-style").fadeIn(300, function () {
            $(field).addClass("show");
            $(label).addClass("red");
        });
    }
    else if (+input < +minValue || +input > +maxValue) {
        $(".error-style").fadeIn(300, function () {
            if (minValue === 100 && input < minValue){
                $(field).text("must be a 3 digit number.")
            }
            else {
                $(field).text(errorMessage);
            }
            $(field).addClass("show");
            $(label).addClass("red");
        });
    }
    else {
        removeError(field, label);
        if (field === ".fieldRequired1") {
            validDay = true;
        }
        else if ( field === ".fieldRequired2") {
            validMonth = true;
        }
        else if (field === ".fieldRequired3") {
            validYear = true;
        }
    }
};


// Removing Errors styling for required field

const removeError = function (field, label){
        $(field).removeClass("show");
        $(label).removeClass("red");
};


// calculateAge function

const calculateAge = function (year, month, day) {
    // calculating value 
    const date = Date.now();
    const birthDate = new Date(+year, +month -1 , +day);
    const ageInMilli = birthDate.getTime();
    const ageDate = new Date(date - ageInMilli);

    // getting result date 
    const years = ageDate.getUTCFullYear() - 1970;
    const days = ageDate.getUTCDate();
    const months = ageDate.getUTCMonth();

    // changing results 
    $("#result-days").text(days);
    $("#result-months").text(months);
    $("#result-years").text(years);

}

// Submitting and giving result 

$("#myForm").submit(function (e) {
    // preventing page from refresh 
    e.preventDefault();

    // Getting input value 
    const day = $("#dayInput").val();
    const month = $("#monthInput").val();
    const year = $("#yearInput").val();

    // Getting daysInMonth and currentYear
    const daysInMonth = new Date(+year, +month, 0).getDate();
    const currentYear = new Date().getFullYear();

    // checking field for errors 
    checkValidInput(day, 1, daysInMonth, ".fieldRequired1", ".label1" , "Must be a valid day");
    checkValidInput(month, 1, 12, ".fieldRequired2", ".label2", "Must be a valid month")
    checkValidInput(year, 100, currentYear, ".fieldRequired3", ".label3", "Must be a valid year")

    // calculating age 
    if(validDay && validMonth && validYear){
        calculateAge(year, month , day);
    }
});
