const month = {
    1: {  name: 'JANUARY',
            length: 31},
    2: {  name: 'FEBRUARY',
            length: 28},
    3: {  name: 'MARCH',
            length: 31},
    4: {  name: 'APRIL',
            length: 30},
    5: {  name: 'MAY',
            length: 31},
    6: {  name: 'JUN',
            length: 30},
    7: {  name: 'JULY',
            length: 31},
    8: {  name: 'AUGUST',
            length: 31},
    9: {  name: 'SEPTEMBER',
            length: 30},
    10: {  name: 'OCTOBER',
            length: 31},
    11: {  name: 'NOVEMBER',
            length: 30},
    12: {  name: 'DECEMBER',
            length: 31},
};

const btn = document.querySelector('.btn');

function isLeapYear(year)
{
    if((parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) || parseInt(year) % 400 === 0) {
        month[2].length = 29;
        return true;
    }
    month[2].length = 28;
    return false;
}

function isInteger(input){
    return isNaN(input) || parseInt(input) - Math.floor(input) !== 0;
}

function checkYear(yearInput){
    return !(isInteger(yearInput) || (parseInt(yearInput) > 2022 || parseInt(yearInput) < 1900));
}

function checkMonth(monthInput) {
    return !(isInteger(monthInput) || (parseInt(monthInput) > 12 || parseInt(monthInput) < 1));
}

function checkDay(dayInput, monthInput, yearInput){
    const leapYear = isLeapYear(yearInput);
    return !(isInteger(dayInput) || (parseInt(dayInput) > month[monthInput].length || parseInt(monthInput) < 1));
}

function checkDate(type, year, month, day){
    if (!checkYear(year) || !(checkMonth(month)) || !(checkDay(day, month, year))) {
        return false;
    }
    return true;
}

function isDueDateGreaterOrEqualThenFromDate(y1, m1, d1, y2, m2, d2){
    let diffYear = y2 - y1;
    let diffMonth = m2 - m1;
    let diffDay = d2 - d1;

    if(diffYear < 0) {
        return false;
    }

    if(diffYear > 0) {
        return true;
    }

    if(diffMonth < 0) {
        return false;
    }

    if(diffMonth > 0) {
        return true;
    }

    if(diffDay < 0) {
        return false;
    }

    if(diffDay >= 0) {
        return true;
    }
}

btn.addEventListener('click', function () {
    //From date:
    const fromYearInput= document.getElementById('from_year').value;
    const fromMonthInput= document.getElementById('from_month').value;
    const fromDayInput= document.getElementById('from_day').value;

    let testCount = 3;

    let isTrue = checkDate('from', fromYearInput, fromMonthInput, fromDayInput);
    if(!isTrue){
        testCount--;
        alert('Neispravan "Od" datum!');
    }

    //Due date:
    const dueYearInput= document.getElementById('due_year').value;
    const dueMonthInput= document.getElementById('due_month').value;
    const dueDayInput= document.getElementById('due_day').value;

    isTrue = checkDate('due', dueYearInput, dueMonthInput, dueDayInput);
    if(!isTrue){
        testCount--;
        alert('Neispravan "Do" datum!');
    }

    //Due date has to be greater then From date:
    isTrue = isDueDateGreaterOrEqualThenFromDate(fromYearInput,fromMonthInput,fromDayInput,dueYearInput,dueMonthInput,dueDayInput);
    if(!isTrue){
        testCount--;
        alert('Datum "Od" je veci od datuma "Do", neispravan unos!');
    }

    if(testCount === 3) {
        alert('Datumi su VALIDNI!');
    }

});