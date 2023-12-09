function valid(event) {
    event.preventDefault();

    var day = parseInt(document.getElementById("day").value);
    var month = parseInt(document.getElementById("month").value);
    var year = parseInt(document.getElementById("year").value);

    // Clear previous error messages
    clearErrors();
    // Assuming you have an error class named "error" for styling
    var dayLabel = document.querySelector('label[for="day"]');
    // Assuming you have an error class named "error" for styling
    var monthLabel = document.querySelector('label[for="month"]');
    // Assuming you have an error class named "error" for styling
    var yearLabel = document.querySelector('label[for="year"]');

    // Check if any value is NaN or not in the valid range
    if (isNaN(day) ) {
        displayError("dayError", "This filed is required");    
        dayLabel.classList.add('errormsg'); // Add the error class to apply styling  
    }

    if (isNaN(month) || month < 1 || month > 12) {
        displayError("monthError", "This filed is required");    
        monthLabel.classList.add('errormsg'); // Add the error class to apply styling
    }

    if (isNaN(year)) {
        displayError("yearError", "This filed is required");
        yearLabel.classList.add('errormsg'); // Add the error class to apply styling
        return ;
    }

    // Check if the date is a future date
    var currentDate = new Date();
    var inputDate = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Dates


    // Check for days in the given month
    var daysInMonth = getDaysInMonth(month, year);

    // Check if the day is in the valid range for the selected month
    if (day < 1 || day > daysInMonth) {
        displayError("dayError", "Must be a valid day");
        dayLabel.classList.add('errormsg');
    }
    if(month<1 || month>12){
        displayError("monthError","Must be a valid month");
        monthLabel.classList.add('errormsg');
    }
    if( year < 1){       
         displayError("yearError", "Must be a valid year");
         yearLabel.classList.add('errormsg');
         return;
    }
    if (inputDate.getTime() > currentDate.getTime()) {
        displayError("yearError", "Must be in the past");
        yearLabel.classList.add('errormsg');
        return;
    }

    // Calculate age
    var ageDate = new Date(currentDate - inputDate);
    var ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);

    document.getElementById("years").textContent = ageYears;
    document.getElementById("months").textContent = ageDate.getUTCMonth();
    document.getElementById("days").textContent = ageDate.getUTCDate() - 1; // Subtract 1 to get days instead of date
}

function displayError(elementId, errorMessage) {
    document.getElementById(elementId).textContent = errorMessage;
}

function clearErrors() {
    document.getElementById("dayError").textContent = "";
    document.getElementById("monthError").textContent = "";
    document.getElementById("yearError").textContent = "";
    document.querySelector('label[for="day"]').classList.remove('errormsg');
    document.querySelector('label[for="month"]').classList.remove('errormsg');
    document.querySelector('label[for="year"]').classList.remove('errormsg');
}

function getDaysInMonth(month, year) {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
            return 30;
        case 2:
            return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
        default:
            return 0;
    }
}
