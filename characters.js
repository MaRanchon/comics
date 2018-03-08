var PUBLIC_KEY = "9aa9e3583d9b753266038ba24568db26";
var ts = "1520515127";
var hash = "395613d2363f39658cad46a385eb4ecc";

function getCharacters() {
    var url = 'https://gateway.marvel.com:443/v1/public/comics/' + comicID + '/characters?apikey=' + PUBLIC_KEY + '&hash=' + hash + '&ts=' + ts;
    $.getJson(url, function(json_data) {

    });
}