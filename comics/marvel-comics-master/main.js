var PUBLIC_KEY = "9aa9e3583d9b753266038ba24568db26";
var ts = "1520515127";
var hash = "395613d2363f39658cad46a385eb4ecc";

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
        var html = "<li class='comics'><a href='pagePersonnage.html?id=" + comics[i].id + "'>";
        html += "<img class='thumb' src='" + imgSrc + "'>";
        html += "<span class='title'>" + comics[i].title + "</span>";

        html += "</a></li>"
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

function getCharacters() {

    comicID = $_GET('id');
    alert(comicID);
    var url = 'https://gateway.marvel.com:443/v1/public/comics/' + comicID + '/characters?apikey=' + PUBLIC_KEY + '&hash=' + hash + '&ts=' + ts;
    $.getJson(url, function(json_data) {
        var hero = json_data.data.results[0];

        var name = hero.name;
        var portrait = hero.thumbnail.path + "/standard_xlarge." + hero.thumbnail.extension;
        var description = hero.description;

        alert(name);


    });
}

function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

$(document).ready(function() {


    var mySlider = $("#slider").slider();

    $( "#search" ).click(function() {
        getComics();
    });

    getCharacters();

});


