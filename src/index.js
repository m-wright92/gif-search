import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$('#search-button').click(function() {
  
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=5&rating=pg&lang=en`;
  
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
    let gifs = response.data;
    let gifList = "<ul>";
    console.log(gifs);
    gifs.forEach(function (gif) {
    let src = gif.url;
    gifList.concat("<li>" + "<img src='" + src + "class='listed-gif' />" + "</li>");
    console.log(gifList);
  });

  $('.gif-display').html(gifList + "</ul>");
  }
});