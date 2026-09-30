// API : https://ghibliapi.vercel.app/films      22 films

async function main () {
    const filmShows = await fetch("https://ghibliapi.vercel.app/films");
    const filmsData = await filmShows.json();
    displayFilms(filmsData);
};

function displayFilms(films) {
    const filmListEl = document.querySelector('.film-list');
    filmListEl.innerHTML = films.map((film) => filmsHTML(film)).join("");
}

function filmsHTML(film) {
    return `<div class="film-card">
        <img src="${film.image}" alt="${film.movie_banner}">
        <div class="film-card__container">
            <h3>${film.title}</h3>
            <p><b>Original Title:</b> ${film.original_title}</p>
            <p><b>Release Year:</b> ${film.release_date}</p>
        </div>
    </div>`
};

async function applyFilter() {
    const filterValue = document.getElementById('filter').value;
    const filmShows = await fetch("https://ghibliapi.vercel.app/films");
    const filmsData = await filmShows.json();

    let filteredFilms = [...filmsData];

    switch (filterValue) {
        case "aToZ":
            filteredFilms.sort((a,b) => a.title.localeCompare(b.title));
            break;
        case "zToA":
            filteredFilms.sort((a,b) => b.title.localeCompare(a.title));
            break;
        case "newest":
            filteredFilms.sort((a,b) => a.release_date - b.release_date);
            break;
        case "oldest":
            filteredFilms.sort((a,b) => b.release_date - a.release_date);
            break;
    }
    displayFilms(filteredFilms)
}

main();