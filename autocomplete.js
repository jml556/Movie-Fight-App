const autocomplete = ({root}) => {
    root.innerHTML = `
        <label><b>Search for a Movie</b></label>
        <input class="input"/>
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results">
                </div>
            </div>
        </div>
    `
    const input = root.querySelector('input')
    const dropdown = root.querySelector('.dropdown')
    const resultsWrapper = root.querySelector('.results')

    const getInput = async event => {
        resultsWrapper.innerHTML = ''
        const movies = await getData(event.target.value)

        if(!movies.length) {
            dropdown.classList.remove('is-active')
            return;
        }

        dropdown.classList.add('is-active')

        for (let movie of movies) {
            const option = document.createElement('a')
            option.classList.add('dropdown-item')
            const imgSrc = movie.Poster == 'N/A' ? '' : movie.Poster 

            option.innerHTML = `
                <img src="${imgSrc}">
                ${movie.Title}
            `
            resultsWrapper.appendChild(option)

            option.addEventListener('click', () => {
                input.value = movie.Title
                dropdown.classList.remove('is-active')
                onMovieSelect(movie)
            })

        }
    }
    document.addEventListener('click', (event) => {
        if(!root.contains(event.target)) {
            dropdown.classList.remove('is-active')
        }
    })
    input.addEventListener('keyup', debounce(getInput))
}

async function onMovieSelect(movie) {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'ab8357e1',
            i: movie.imdbID
        }
    });
    
    document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}">
            </p>
            </figure>
            <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
            </div>
        </article>
    `
}
