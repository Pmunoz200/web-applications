'use strict';

let movie_id = 1;

function Film(title, favorites=false, date=undefined, rating=0, id = movie_id){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date==null? undefined: dayjs(date);
    this.rating = rating;
    movie_id += 1;
}

function FilmLibrary (){
    this.films = [];

    this.addNewFilm = (film) =>{
        this.films.push(film);
    }

    this.sortByDate = () =>{

        let filmsDate = [...this.films.filter(x => x.date != null)];
        let filmsNotDate = [... this.films.filter(x => x.date == null)];
        let returnList = [... filmsDate].sort((a, b) => (a.date.isAfter(b.date))? 1 : -1 );
        return returnList.concat(filmsNotDate);
        //return [... this.films.filter(x => x.date != null)].sort((a, b) => (a.date.isAfter(b.date))? 1 : -1);
    }

    this.deleteFilm = (id) =>{
        let newList = [...this.films.filter(x => x.id != id)];
        this.films = [... newList];
    }

    this.resetWatchedFilms = () => {
        this.films.forEach(function(film) {
            film.date = undefined;
        });
    }

    this.sortedScore = () => {
        return [...this.films.filter(x => x.rating != null)].sort((a, b) => b.rating - a.rating);
    }

    this.print = () =>{
        for(let f of this.films){
            f.date != null ? 
            console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.favorites}, Watch date: ${f.date.format("MMM DD, YYYY")}, Score: ${f.rating}`):
            console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.favorites}, Watch date: ${f.date}, Score: ${f.rating}`);
        }
    }

    this.setAllFilms = (films) => {
        this.films = [... films];
    }

    this.init = () => {
        this.films.push(
            new Film('Pulp Fiction', true, "03/10/2023", 5),
            new Film('21 Grams', true, "03/17/2023", 4),
            new Film('Shrek'),
            new Film('Star Wars'),
            new Film('Madagascar', false, "02/25/2023", 3),
            new Film('Matrix')
        )
    }
}

function createElement(film, movieLib){
    const tr = document.createElement("tr");

    const tdTitle = document.createElement("td");
    tdTitle.innerText = film.title;
    if(film.favorites){
        tdTitle.classList.add("favorite")
    }
    tr.appendChild(tdTitle);

    const tdFavorites = document.createElement("td");
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.ID = "favorite"
    const label = document.createElement("label");
    label.setAttribute("for", "favorite");
    label.innerText = "Favorite";
    check.checked = film.favorites;
    tdFavorites.appendChild(check);
    tdFavorites.appendChild(label);
    tr.appendChild(tdFavorites);

    const tdDate = document.createElement("td");
    let date_str = film.date==null?"":film.date.format("MMMM D, YYYY");
    tdDate.innerText = date_str;
    tr.appendChild(tdDate);

    const tdRank = document.createElement("td");
    for(let i = 0; i<film.rating; i++){
        tdRank.insertAdjacentHTML("beforeend", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>`);
    }

    for(let i = 0; i<5-film.rating; i++){
        tdRank.insertAdjacentHTML("beforeend", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
    </svg>`);
    }
    tr.appendChild(tdRank);

    const tdAction = document.createElement("td");
    tdAction.innerHTML =`<button id="film-${film.id}" class="btn btn-light">
    <svg xmlns="http://www.w3.org/2000/svg" id="film-${film.id}" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></button>`;


    tr.appendChild(tdAction);

    //tdAction.addEventListener('click', e =>{
    //    const id_del = e.target.id.split('-')[1];
    //    tr.parentNode.removeChild(tr);
    //});
    tdAction.addEventListener('click', e =>{
        const id_del = e.target.id.split('-')[1];
        movieLib.deleteFilm(id_del);
    }
    );

    return tr;
}



function generateTable(films, movieLib){
    const films_table = document.getElementById("films_table");
    films_table.replaceChildren();
    for(let f of films){
        const film_element = createElement(f, movieLib);
        films_table.appendChild(film_element);
    }
}

function filters(films){
    const all = document.getElementById("All");
    const favorite = document.getElementById("Favorites");
    const best_rated = document.getElementById("Best_rated");
    const last_month = document.getElementById("Last_month");
    const list_filters = document.getElementById("filter_list");
    const title = document.getElementById("main_title");

    all.addEventListener('click', e =>{
        if(!all.classList.contains("active")){
            favorite.classList.remove("active");
            best_rated.classList.remove("active");
            last_month.classList.remove("active");
            all.classList.add("active");
            generateTable([...films]);
        }
    });

    favorite.addEventListener('click', e=>{
        if(!favorite.classList.contains("active")){
            all.classList.remove("active");
            best_rated.classList.remove("active");
            last_month.classList.remove("active");
            favorite.classList.add("active");
            let fav_films = films.filter(f => f.favorites);
            generateTable([... fav_films]);
        }
    });

    best_rated.addEventListener('click', e => {
        if(!best_rated.classList.contains("active")){
            all.classList.remove("active");
            favorite.classList.remove("active");
            last_month.classList.remove("active");
            best_rated.classList.add("active");
            let best_films = films.filter(f => f.rating == 5);
            generateTable([... best_films]);
        }
    });

    last_month.addEventListener('click', e => {
        if(!last_month.classList.contains("active")){
            console.log("Entered");
            all.classList.remove("active");
            favorite.classList.remove("active");  
            best_rated.classList.remove("active");
            last_month.classList.add("active");
            let last = films.filter((f) => {
                const today = dayjs();
                if(f.date!=null){
                    return !f.date.diff(today, 'month');
                }
                return false;
            });
            generateTable([...last]);
        }
    });


    filter_list.addEventListener('click', e => {
    const all_filters = filter_list.children;
    for(let i = 0; i<all_filters.length; i++){
        if(all_filters[i].classList.contains("active")){
            title.innerText = all_filters[i].innerText;
            break;
        }
    }
});
}

function deleter(movieLib){
    const film_table = document.getElementById("films_table");
    const film_list = film_table.children;
    for(let i = 0; i<film_list.length; i++){
        let elem = film_list[i].children[4];
        elem.addEventListener('click', e =>{
            const id_del = e.target.id.split('-')[1];
            movieLib.deleteFilm(id_del);
        }
        );
    }
    //movieLib.deleteFilm(id);
}


let main = () =>{
    const movieLibrary = new FilmLibrary();
    movieLibrary.init();
    generateTable([...movieLibrary.films], movieLibrary);
    filter 
    //deleter(movieLibrary);
    console.log(movieLibrary.films);
}

main();



