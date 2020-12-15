$(document).ready(function () {
    init();

    //when the search button is clicked this code runs

    $("#button").on("click", function(e) {
        e.preventDefault()
        var userCity = $("#searchInput").val().trim();
        localStorage.setItem("City", JSON.stringify(userCity));
        buildQueryURLL();
        displayContents();
    })

    // withthe user input we build the API query and send it

    function buildQueryURL();

    //with the API response we get the data we want and display it on screen
    
    function displayContents()

    //local storage to display search history table

    //onclick function to display contents when search history table is clicked

    // when the page loads this tells the browser what to display from local storage

    // function init() {
    //     loadStorage()
    // }
   

    // }
});