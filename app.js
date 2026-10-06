// API : https://ghibliapi.vercel.app/films      22 films
let allFilms = [];
async function main () {
    const loadingEl = document.querySelector(".films__loading")
    loadingEl.style.display = "flex"
    try {
        const filmShows = await fetch("https://ghibliapi.vercel.app/films");
        const filmsData = await filmShows.json();
        displayFilms(filmsData);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        loadingEl.style.display = "none"
    }
};

function displayFilms(films) {
    const filmListEl = document.querySelector('.film-list');
    filmListEl.innerHTML = films.map((film) => filmsHTML(film)).join("");
};

function searchFilms(event) {
    const searchTerm = event.target.value.toLowerCase();
    const searchedFilms = allFilms.filter((film) =>
    film.title.toLowerCase().includes(searchTerm)
    );
    displayFilms(searchedFilms);
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