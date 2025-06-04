window.onload = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const movieList = document.getElementById("movie-list");

  movies.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    col.innerHTML = `
      <div class="card">
        <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.description}</p>
          <a href="movie.html?id=${movie.id}" class="btn btn-primary">View Details</a>
        </div>
      </div>
    `;
    movieList.appendChild(col);
  });
};

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function renderMovies(filterText = "", genre = "", year = "") {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  movies
    .filter(movie => 
      movie.title.toLowerCase().includes(filterText.toLowerCase()) &&
      (genre === "" || movie.genre === genre) &&
      (year === "" || movie.year.toString() === year.toString())
    )
    .forEach(movie => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
      col.innerHTML = `
        <div class="card">
          <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.description}</p>
            <a href="movie.html?id=${movie.id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      `;
      movieList.appendChild(col);
    });
}

window.onload = () => {
  const user = localStorage.getItem("currentUser");
  if (!user) return (window.location.href = "login.html");

  renderMovies();

  document.getElementById("search-input").addEventListener("input", e => {
    renderMovies(e.target.value);
  });
};

document.getElementById("genre-filter").addEventListener("change", () => {
  renderMovies(
    document.getElementById("search-input").value,
    document.getElementById("genre-filter").value,
    document.getElementById("year-filter").value
  );
});

document.getElementById("year-filter").addEventListener("change", () => {
  renderMovies(
    document.getElementById("search-input").value,
    document.getElementById("genre-filter").value,
    document.getElementById("year-filter").value
  );
});


