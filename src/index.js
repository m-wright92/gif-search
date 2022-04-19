import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GifRandom from "./js/gifRandom.js";
import GifTrend from "./js/gifTrend.js";
import GifSearch from "./js/gifSearch.js";

function clearFields() {
  $('#gif-search').val('');
}

$('#random-button').click(function() {
  let promise = GifRandom.getRandom();
  promise.then(function(response) {
    const body = JSON.parse(response);
    let gifs = body.data.images.fixed_width.url;
    let container = "<img src=" + gifs + "></img>";
    $('#random-gif-display').html(container);
    $('#showRandErrors').text("");
  }, function(error) {
    $('#showRandErrors').text(`There was an error processing your request: ${error}`);
  });
});

$('#trendy-button').click(function() {
  let promise = GifTrend.getTrendy();
  promise.then(function(response) {
    const body = JSON.parse(response);
    let gifs = body.data;
    let container = "<ul>";
    gifs.forEach(function (gif) {
      let src = gif.images.fixed_width.url;
      container += "<img src='" + src + "'>";
    });
    $('#trendy-gif-display').html(container + "</ul>");
    $('#showTrendyErrors').text("");
  }, function(error) {
    $('#showTrendyErrors').text(`There was an error processing your request: ${error}`);
  });
});  

$('#search-button').click(function(e) {
  e.preventDefault();
  let gifSearch = $('#gif-search').val().trim();
  clearFields();
  let promise = GifSearch.getSearch(gifSearch);
  promise.then(function(response) {
    const body = JSON.parse(response);
    let gifs = body.data;
    let container = "";
    gifs.forEach(function (gif) {
      let src = gif.images.fixed_width.url;
      container += "<img src='" + src + "'>";
    });
    $('#search-gif-display').html(container);
    $('#showSearchError').text("");
  }, function(error) {
    $('#showSearchError').text(`There was an error processing your request: ${error}`);
  });
});
