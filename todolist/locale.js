/******************************************************************************
* LOAD Will make a XMLHTTPRequest that will call an API to return the location
* based on the caller's IP (Just an example)
******************************************************************************/
var load = function loadIp() {
    'use strict';
    
    // Get the output's container
    var load = document.getElementsByClassName('loadContainer'),
        
        // Start the XMLHTTPRequest object
        xhttp = new XMLHttpRequest(),
        
        // Declare the variable for storing the result
        reg,
        
        // Get the output's location
        info = document.getElementById('info');
    
    // Make the XMLHTTPRequest
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 &&     this.status === 200) {
                    
            // Hide the loading animation 
            load[0].style.display = 'none';
            
            // Stored the retrieved data
            reg = JSON.parse(this.responseText);
			
            // Display it in the output field
            document.getElementById("info").innerHTML = "Country: " + reg[0].country + "<br>" 
                + "State: " + reg[0].region + "<br>" + "City: " 
                + reg[0].city + "<br>" + "Postal Code: " + reg[0].postalCode + "<br>";
            
            // Display the output field
            info.style.display = 'block';
            
        } else {
	   		
            // Hide the output field 
            info.style.display = 'none';
            
            // Display the loading animation
            load[0].style.display = 'block';
        }
    };
    
    // Get the API from this address
    xhttp.open("GET", "http://setgetgo.com/geoiplookup/get.php?ip=1.2.3.4", true);
    xhttp.send();
},
    
    // Get the cover for action
    cover = document.getElementById("cover"),
    
    // Get the output's container
    infoBar = document.getElementById('infoContainer');

/******************************************************************************
* INFO BUTTON ON CLICK EVENT Will display the information's output field and
* the cover area. Then, it will make the XMHLHTPPRequest for the API
******************************************************************************/
document.getElementById('infoButton').addEventListener('click', function () {
    'use strict';
    
    // Display the contents
    cover.style.display = 'block';
    infoBar.style.display = 'block';
    
    // Make the XMLHTTPRequest
    load();
});