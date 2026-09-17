// API : https://ghibliapi.vercel.app/films      22 films

async function main () {
    const films = await fetch("https://ghibliapi.vercel.app/films");
    const filmsData = await films.json();
    const filmListEl = document.querySelector('.film-list');
    filmListEl.innerHTML = filmsData.map((film) => filmsHTML(film)).join("");
};

main();

function filmsHTML(film) {
    return `<div class="film-card">
        <img src="${film.image}" alt="${film.movie_banner}">
        <div class="film-card__container">
            <h3>${film.title}</h3>
            <p><b>Original Title:</b> ${film.original_title}</p>
            <p><b>Description:</b> ${film.description}</p>
            <p><b>Release Year:</b> ${film.release_date}</p>
        </div>
    </div>`
};