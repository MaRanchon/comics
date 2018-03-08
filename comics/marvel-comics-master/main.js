var PUBLIC_KEY = "xxxxxxxxxxxxxx";
var ts = "xxxxx";
var hash = "xxxxxxxxxxxx";

var limit = 25;

// todo : add characters in modal popup (http://getbootstrap.com/docs/4.0/components/modal/)

function getComics() {

    $("#search-load").show();
    $("#search-badge").text("");

    var dates = $("#slider").slider('getValue');
    var url = "https://gateway.marvel.com:443/v1/public/comics?apikey=" + PUBLIC_KEY + "&hash=" + hash + "&ts=" + ts;
    var filter = "&format=magazine&dateRange=" + dates[0] + "-01-01%2C" + dates[1] + "-12-31&limit=" + limit;

    $.getJSON( url + filter )
        .done(function(data) {
            $("#search-load").hide();
            $("#search-badge").html(data.data.count + " / " + data.data.total);
            $("#attribution").html(data.attributionHTML);
            displayComics(data.data.results);
            displayPagination(data.data.count, data.data.total, limit);
        })
        .fail(function(err){
            $("#search-load").hide();
            $("#search-badge").text("Erreur !");
            console.log(err);
        });
};


function displayComics(comics) {
    $("#result").html("");
    for(var i=0; i < comics.length; i++) {
        var imgSrc = comics[i].thumbnail.path + "/standard_xlarge." + comics[i].thumbnail.extension;
        var html = "<li class='comics'>"
        html += "<img class='thumb' src='" + imgSrc + "'>";
        html += "<span class='title'>" + comics[i].title + "</span>";

        html += "</li>"
        $("#result").append(html);
    }
}


function displayPagination(count, total, limit) {

    var pg = $("nav ul.pagination");
    pg.empty();
    var html = "";

    if (total > limit) {
        nb_page = Math.ceil(total / count);
        for(var i=1; i <= nb_page; i++) {
            html += "<li class=\"page-item\"><a class=\"page-link\" href=\"#\">" + i + "</a></li>";
            // todo : add click action
        }
        pg.html(html);

    }

}

$(document).ready(function() {


    var mySlider = $("#slider").slider();

    $( "#search" ).click(function() {
        getComics();
    });

});

