$(document).ready(function () {
    var storedCities = JSON.parse(localStorage.getItem("City")) || [];
    
    init();
    
    $("#button").on("click", function (e) {
        e.preventDefault()
        var userCity = capitalize($("#searchInput").val().trim());
        storedCities.push(userCity);
        localStorage.setItem("City", JSON.stringify(storedCities));
        var newLiPrepend = document.createElement("li");
        newLiPrepend.textContent = userCity;
        newLiPrepend.setAttribute("data-q", userCity);

        $("#storedList").prepend(newLiPrepend);
        queryResults(userCity);
    });

    function queryResults(queryCity) {
        var APIkey = "526092ea9b2c65dd4c4d6ee0811a5950"
        var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryCity + "&appid=" + APIkey

        $.ajax({
            url: queryURLFiveDay,
            method: "GET"
        }).then(function (response) {
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
                                $("li span").css("background-color", "LimeGreen");
                                break;
                            case 1:
                                $("li span").css("background-color", "LimeGreen");
                                break;
                            case 2:
                                $("li span").css("background-color", "LimeGreen");
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
                                $("li span").css("background-color", "Tomato");
                                break;
                            case 9:
                                $("li span").css("background-color", "Tomato");
                                break;
                            case 10:
                                $("li span").css("background-color", "Tomato");
                                break;
                        }
                    })

                var id = 0

                //display 5 day forecast
                for (i = 0; i < results.list.length; i++) {
                    if (results.list[i].dt_txt.includes("12:00:00")) {
                        var dateToUse = moment(results.list[i].dt_txt, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY");
                        $("#cardDate" + id).text(dateToUse);
                        var iconcodeNew = results.list[i].weather[0].icon;

                        var iconFiveDay = $("<img>").attr("src", "https://openweathermap.org/img/w/" + iconcodeNew + ".png").attr("width", 50).attr("height", 50);
                        $("#cardIcon" + id).html(iconFiveDay);

                        var tempFiveDay = results.list[i].main.temp;
                        var tempInt5 = parseInt(tempFiveDay - 273.15);
                        $("#cardTemp" + id).text("Temp " + tempInt5 + "°C");

                        var humFiveDay = results.list[i].main.humidity;
                        $("#cardHum" + id).text("Humidity " + humFiveDay + "%");

                        id++
                    }

                }
            })
    };



   
    function loadStorage() {
        for (i = 0; i < storedCities.length; i++) {
            var cityToDisplay = storedCities[i];
            var newLi = document.createElement("li");
            newLi.textContent = cityToDisplay;
            newLi.setAttribute("data-q", cityToDisplay);
            $("#storedList").append(newLi);
        }
    }
    function init() {
        loadStorage()
    }
    $("#storedList").on("click", function (e) {
        queryResults(e.target.dataset.q);
    })
    function capitalize(city) {
        return city.charAt(0).toUpperCase() + city.slice(1);
      }
});
