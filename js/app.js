// document.getElementById("searchText").addEventListener("click", getMovies);
// console.log(searchText);

//declaring variables

$(document).ready(() => {
  $("#searchForm").on("click", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

const searchBox = document.querySelector(".form-control");
searchBox.addEventListener("keypress", setQuery);

function setQuery(eve) {
  if (event.keyCode == 13) {
    getMovies(searchBox.value);
    console.log(searchBox.value);
    eve.preventDefault();
  }
}

//api function
function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com?s=" + searchText + "&apikey=450ba111")
    .then((response) => {
      //   console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">More Details</a>
            </div>
          </div>
        `;
      });

      //this function dispalys on the DOM
      $("#movies-call").html(output);
    })

    .catch((err) => {
      console.log(err);
    });
}
//for every selected movie
function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=450ba111")
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let output = `
            <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8 ">
            <h2 class="well-plot">${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Box Office:</strong> ${movie.BoxOffice}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <div class="well-plot">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            </div>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDB</a>
            <a href="index.html" class="btn btn-light">Go Back To Search</a>
          </div>
        </div>
            
        `;
      $("#movie-call").html(output);
    })

    .catch((err) => {
      console.log(err);
    });
}
