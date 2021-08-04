

const getData = async (searchTerm) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'ab8357e1',
            s: searchTerm
        }
    });

    if(response.data.Error) {
        return [];
    }

    return response.data.Search
}

const root = document.querySelector('.autocomplete')

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
const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

const getInput = async event => {
    resultsWrapper.innerHTML = ''
    const movies = await getData(event.target.value)
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
    }

}

input.addEventListener('keyup', debounce(getInput))