$(document).ready(function () {
    //init();

    //when the search button is clicked this code runs
var storedCities = JSON.parse(localStorage.getItem("City")) || [];

    $("#button").on("click", function (e) {
        e.preventDefault()
        var userCity = $("#searchInput").val().trim();
        storedCities.push(userCity);
        localStorage.setItem("City", JSON.stringify(storedCities));

        //displayContents();


        // with the user input we build the API query and send it
        var APIkey = "526092ea9b2c65dd4c4d6ee0811a5950"
        var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIkey

        $.ajax({
            url: queryURLFiveDay,
            method: "GET"
        })
            //with the API response we get the data we want and display it on screen

            .then(function (response) {
                var results = response;
                console.log(results);
                var cityName = results.city.name;
                var dateToday = moment(results.list[3].dt_txt, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY");
                var iconCode = results.list[3].weather[0].icon;
                var iconToday = $("<img>").attr("src", "https://openweathermap.org/img/w/" + iconCode + ".png").attr("width", 50).attr("height", 50);
                $("#city-date-icon").text(cityName + "   " + dateToday).append(iconToday);
                var temp = results.list[3].main.temp;
                var tempInt = parseInt(temp - 273.15);
                $("#temperature").text("Temperature: " + tempInt + "°C");
                var humidity = results.list[3].main.humidity;
                $("#humidity").text("Humidity: " + humidity);
                var windspeed = results.list[3].wind.speed;
                $("#windspeed").text("Windspeed: " + windspeed);
                var lat = results.city.coord.lat;
                var lon = results.city.coord.lon;

                //query for UV index

                var queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey

                $.ajax({
                    url: queryUV,
                    method: "GET"
                })
                    .then(function (response) {
                        var UVresults = response.value;
                        $("#indexColor").text(UVresults);


                        switch (Math.floor(UVresults)) {
                            case 0:
                                $("li span").css("background-color", "green");
                                break;
                            case 1:
                                $("li span").css("background-color", "green");
                                break;
                            case 2:
                                $("li span").css("background-color", "green");
                                break;
                            case 3:
                                $("li span").css("background-color", "yellow");
                                break;
                            case 4:
                                $("li span").css("background-color", "yellow");
                                break;
                            case 5:
                                $("li span").css("background-color", "yellow");
                                break;
                            case 6:
                                $("li span").css("background-color", "orange");
                                break;
                            case 7:
                                $("li span").css("background-color", "orange");
                                break;
                            case 8:
                                $("li span").css("background-color", "red");
                                break;
                            case 9:
                                $("li span").css("background-color", "red");
                                break;
                            case 10:
                                $("li span").css("background-color", "red");
                                break;
                        }
                    })
                var id = 0

                //display 5 day forecast
                for (i = 0; i < results.list.length; i++) {
                    if (results.list[i].dt_txt.includes("12:00:00")){
                        var dateToUse = moment(results.list[i].dt_txt, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY");
                        $("#cardDate" + id).text(dateToUse);
                        var iconcodeNew = results.list[i].weather[0].icon;
                    
                        var iconFiveDay = $("<img>").attr("src", "https://openweathermap.org/img/w/" + iconcodeNew + ".png").attr("width", 50).attr("height", 50);
                        $("#cardIcon" + id).html(iconFiveDay);

                        var tempFiveDay= results.list[i].main.temp;
                        var tempInt5 = parseInt(tempFiveDay - 273.15);
                        $("#cardTemp" + id).text("Temp " + tempInt5 + "°C");

                        var humFiveDay = results.list[i].main.humidity;
                        $("#cardHum" + id).text("Humidity " + humFiveDay + "%");

                        id++
                    }

                }
            })

        //local storage to display search history table
        console.log(storedCities);

        //onclick function to display contents when search history table is clicked

        // when the page loads this tells the browser what to display from local storage

        // function init() {
        //     loadStorage()
        // }


        // }
    });
});
