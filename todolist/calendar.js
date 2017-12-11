//START THE CALENDAR
var date = new Date();

/********************************************************************************
* CALENDAR Will contain methods to compute the  calendar offset, the days and the
* years as well as the day picked by the user
********************************************************************************/
var calendar = {
    
    // A referral for the months' names
    monthLabel: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST',
             'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
    
    // The days to be displayed in the calendar body
    dayLabel: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    
    // store the month, day, year and selected day.
    month: date.getMonth(),
    day: date.getDate(),
    year: date.getFullYear(),
    pick: 0,
    
    // Return the value for the month
    getMonth: function () {
        'use strict';
        return calendar.month;
    },
    
    // Set a new value for month
    setMonth: function (month) {
        'use strict';
        this.month = month;
    },
    
    // Return the value for the year
    getYear: function () {
        'use strict';
        return calendar.year;
    },

    // Set a new value for the year
    setYear: function (year) {
        'use strict';
        this.year = year;
    },
    
    // Return the user's selected day
    getPick: function () {
        'use strict';
        
        // If the selected cell has a value of 0, return the preivous value
        if (this.pick === 0) {
            return date.getDate();
        } else {                                  // Return the selected day
            return calendar.pick;
        }
    },
    
    // Set the value for the selected day according to the user's selection
    setPick: function (pick) {
        'use strict';
        
        // If the chosen value is not a number or an empty array, keep the
        // previous value
        if (isNaN(pick) || pick === '') {
            pick = this.getPick();
            if (pick === 0) {     // If the value is 0, keep the previous value
                pick = date.getDate();
            }
            this.pick = pick; // Update the calendar's pick value
        } else { this.pick = pick; } // If the value is valid, update it
    },
    
    /*************************************************
    * GET CURRENT DATE Will return the current date, 
    * highlighting the first day of the month
    *************************************************/
    getCurrentDate: function () {
        'use strict';
        
        // Store the first day of the month of the current year in the calendar
        var currentDate =  this.monthLabel[this.getMonth()] + ' 1 ' + this.getYear();
        
        return currentDate;
    },
    
    /************************************************************
    * GET FIRST DAY Will return the index of the first weekday of
    * the month as a string
    ************************************************************/
    getFirstDay: function () {
        'use strict';
        
        // Store the data about the first day of the month in a string
        var firstDay = "" + new Date(this.getCurrentDate()),
            
            // An array containing the week's days names for further comparison
            dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            
            // Index for day names
            weekdayIndex = dayName.indexOf(firstDay.substring(0, 3));
        
        
        // Return the index of the month's first weekday
        return weekdayIndex;
    },
    /*******************************************************************
    * GET DAYS AMOUNT Will return the number of days inside of the month
    *******************************************************************/
    getDaysAmount: function () {
        'use strict';
        
        // Get the number of days of that given month
        var numDays = new Date(this.getYear(), this.getMonth() + 1, 0).getDate();
        
        // Return the amount of days in the month
        return numDays;
    }
    
};

/******************************************************************************
* The Calendar visual will be displayed outside so it is easier to be updated
* or rewritten when needed
******************************************************************************/

// Create the HTML elements inside the variables
var d = document.createElement('div'),
    y = document.createElement('div'),
    m = document.createElement('div'),
    container = document.createElement("div"),
    socket = document.getElementById('calSocket');
        
// Put the header container inside the socket
container.id = "headContainer";
socket.appendChild(container);
        
// Create the Month label
m.id = "month";
m.innerHTML = calendar.monthLabel[calendar.getMonth()];
container.appendChild(m);
        
// Create the Day label
d.id = "dayNum";
d.innerHTML = date.getDate();
container.appendChild(d);
        
// Create the Year label
y.id = "year";
y.innerHTML = calendar.getYear();
container.appendChild(y);

// Use the socket as a reference to the tag and create table and rows for the
// calendar's body
var socket  = document.getElementById('calSocket'),
    table = document.createElement('table'),
    row = document.createElement('tr');

// Get the Calendar Socket and add The Calendar into it
table.id = "bodyContainer";
socket.appendChild(table);
        
// Draw the week lable 
for (var k = 0; k < calendar.dayLabel.length; k++){
    var node = document.createElement('td');
    node.className = 'week';
    node.innerHTML = calendar.dayLabel[k];
    row.appendChild(node);
    table.appendChild(row);
}

// Draw the offset
row = document.createElement('tr'); // Restart the row
for (var i = 0; i < calendar.getFirstDay(); i++){
    var node = document.createElement('td');
    node.className = 'offset';
    row.appendChild(node);
    table.appendChild(row);
    }

// Draw the calendar body
for (var j = 0; j < calendar.getDaysAmount();) {
    
    // Create a table cell
    var node = document.createElement('td');
    
    // Count the days as human beings do (iteration will start for 1 to 31)
    node.innerHTML = ++j;
    node.className = 'cell';
    row.appendChild(node);
    table.appendChild(row);
    
    // Highligh the current day
    if (j === date.getDate() && calendar.getMonth() === date.getMonth()) {
        node.style.color = "orange";
    }
    
    // Start over the rows at each 7th cell
    if ((j + i) % 7 === 0) {
        row = document.createElement('tr');
    }
}
    
// Create the elements
var container = document.createElement('div'),
    socket = document.getElementById('calSocket'),
    prev = document.createElement('button'),
    next = document.createElement('button');
    
// Put the container inside the calendar socket
container.id = 'calButtons';
socket.appendChild(container);

// Add ids to each button
prev.id = 'prev';
confirm.id = 'confirm';
next.id = 'next';

// Write inside the buttons
prev.innerHTML = '<';
next.innerHTML = '>';

// Put the buttons inside the container
container.appendChild(prev);
container.appendChild(next);