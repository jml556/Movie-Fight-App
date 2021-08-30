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
                console.log('g')
                input.value = movie.Title
                dropdown.classList.remove('is-active')
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