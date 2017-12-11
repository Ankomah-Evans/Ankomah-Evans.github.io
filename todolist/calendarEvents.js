/******************************************************************************
* PREVIOUS BUTTON ONCLICK EVENT Will move to the previous month, updating the
* calendar's display by rewriting it
******************************************************************************/
prev.addEventListener('click', function () {
    'use strict';

    // If the calendar goes to a negative amount of months, restart it by
    // pointing back to the preivous year
    if (calendar.getMonth() <= 0) {
        calendar.setMonth(11);  // Set the month to December of the previous year
        calendar.setYear(calendar.getYear() - 1); // Set the year to a previous year
    } else {
        calendar.setMonth(calendar.getMonth() - 1); // walk back in the months
    }

    // Update the month and the year in the calendar display
    m.innerHTML = calendar.monthLabel[calendar.getMonth()];
    y.innerHTML = calendar.getYear();
    
    
    var cells = document.getElementsByTagName('td'), // Get all the cells
        i = 0,                                       // Global iterator
        offsetAmount = calendar.getFirstDay() + 7,   // Define the offset amount
        j = 0,                                       // Another global iterator
        remaining = cells.length;                    // The cells number size
    
    // Redraw the days' label
    for (i; i < 7; i++) {
        cells[i].innerHTML = calendar.dayLabel[i];
    }
    
    // Update the offset
    for (i; i < offsetAmount; i++) {
        cells[i].className = 'offset';
        cells[i].innerHTML = '';
    }
    
    // UPDATE THE DAYS
    for (i; j < calendar.getDaysAmount(); i++) {
        cells[i].className = 'cell';
        cells[i].innerHTML = ++j;
        cells[i].style.color = '#333';
        cells[i].style.borderRadius = '0%';
        cells[i].style.backgroundColor = 'whitesmoke';        
        if ( j === date.getDate() && calendar.getMonth() === date.getMonth()){
            cells[i].style.borderRadius = '0%';
            cells[i].style.backgroundColor = 'whitesmoke';            
            cells[i].style.color = 'orange';
        }
    }
    
    // Check the remaining amount
    remaining += i; 
    
    // Substitute the remaining cells by blank ones
    for (i; i < remaining; i++) {
        cells[i].style.borderRadius = '0%';
        cells[i].style.backgroundColor = 'whitesmoke';
        cells[i].removeAttribute('class');
        cells[i].innerHTML = '';
    }
});

/******************************************************************************
* NEXT BUTTON ONCLICK EVENT Will move to the next month, updating the
* calendar's display by rewriting it
******************************************************************************/
next.addEventListener('click', function () {
    'use strict';
    
    // If the calendar goes to an amount of months bigger than the total, 
    // restart it by pointing to the next year
    if (calendar.getMonth() >= 11) {
        calendar.setMonth(0);  // Set the month to January of the next year
        calendar.setYear(calendar.getYear() + 1); // Set the year to a next year
    } else {
        calendar.setMonth(calendar.getMonth() + 1); // walk the months forward
    }

    // Update the month and the year in the calendar display
    m.innerHTML = calendar.monthLabel[calendar.getMonth()];
    y.innerHTML = calendar.getYear();
    
    
    var cells = document.getElementsByTagName('td'), // Get all the cells
        i = 0,                                       // Global iterator
        offsetAmount = calendar.getFirstDay() + 7,   // Define the offset amount
        j = 0,                                       // Another global iterator
        remaining = cells.length;                    // The cells number size
    
    // Redraw the days' label
    for (i; i < 7; i++) {
        cells[i].innerHTML = calendar.dayLabel[i];
    }
    
    // Update the offset
    for (i; i < offsetAmount; i++) {
        cells[i].className = 'offset';
        cells[i].innerHTML = '';
    }
    
    // UPDATE THE DAYS
    for (i; j < calendar.getDaysAmount(); i++) {
        cells[i].className = 'cell';
        cells[i].innerHTML = ++j;
        cells[i].style.color = '#333';
        cells[i].style.borderRadius = '0%';
        cells[i].style.backgroundColor = 'whitesmoke';        
        if ( j === date.getDate() && calendar.getMonth() === date.getMonth()){
            cells[i].style.borderRadius = '0%';
            cells[i].style.backgroundColor = 'whitesmoke';            
            cells[i].style.color = 'orange';
        }
    }
    
    // Check the remaining amount
    remaining += i; 
    
    // Substitute the remaining cells by blank ones
    for (i; i < remaining; i++) {
        cells[i].style.borderRadius = '0%';
        cells[i].style.backgroundColor = 'whitesmoke';
        cells[i].removeAttribute('class');
        cells[i].innerHTML = '';
    }
});

/******************************************************
* UNMARK Will check if a cell was marked and "free" it
* if the cell is not a day number it will not be marked.
*******************************************************/
var unmark = function (pick, cell) {
    'use strict';
    
    // Get the table's cells
    var remove = document.getElementsByTagName('td'),
        
        // Global index
        i = 0;
    
    // Remove any mark inside the calendar table
    for (i; i < remove.length; i++) {
        remove[i].style.borderRadius = '0%';
        remove[i].style.backgroundColor = 'whitesmoke';
    }
    
    // If the cell is not a number or empty, remove the mark as well
    if (isNaN(pick) || pick === '') {
        cell.style.borderRadius = '0%';
        cell.style.backgroundColor = 'whitesmoke';
    } else {                     // Otherwise, leave it marked
        cell.style.borderRadius = '50%';
        cell.style.backgroundColor = '#FDE1B8';
    }
};

/******************************************************
* SELECT DAY Will mark the clicked cell and pass its 
* innerHMTL value to CALENDAR :: SET PICK
******************************************************/
var selectDay = function () {
        'use strict';
    
        // get the previous picked value and the cells
        var pick = this.innerHTML,
            cell = this;
    
        calendar.setPick(pick);           // Update the pick value
        d.innerHTML = calendar.getPick(); // Update the day's to equal the pick
        unmark(pick, cell);               // Unmark any other cell

    };

// GET THE VALUE OF THE TABLE CELLS
var cells = document.getElementsByTagName('td'),
    i = 0;

// Add SELECT DAY to each cell with a CELL class
for (i; i < cells.length; i++) {
    cells[i].addEventListener('click', selectDay);
}