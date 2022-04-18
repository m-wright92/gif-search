import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$('#search-button').click(function(e) {
  e.preventDefault();
  let gifSearch = $('#gif-search').val().trim();
  let request = new XMLHttpRequest();

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&limit=5&offset=0&rating=g&lang=en&q=${gifSearch}`;

  let response;

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      response = JSON.parse(this.responseText);
      getElements(response);
      console.log(response);
    }
  };

  request.open("GET", url, true);
  request.send();

  function getElements(response) {
    let images = response.data;
    let container = "";
    images.forEach(function (image) {
    let src = image.images.fixed_width.url;
    container += "<img src='" + src + "'>";
  });

  $('.search-gif-display').html(container);
  }
});


$('#trendy-button').click(function() {
  
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=5&rating=pg&lang=en`;
  
  let response;

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  request.open("GET", url, true);
  request.send();

  
  

  function getElements(response) {
    let gifs = response.data;
    let container = "<ul>";
    gifs.forEach(function (gif) {
    let src = gif.images.fixed_width.url;
    container += "<img src='" + src + "'>";
  });

  $('.trendy-gif-display').html(container + "</ul>");
  }
});