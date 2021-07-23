const getData = async (searchTerm) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'ab8357e1',
            s: searchTerm
        }
    });

    console.log(response.data)
}

let timeoutID;

const getInput = (e) => {
    if(timeoutID) {
        clearTimeout(timeout)
    }
    timeoutID = setTimeout(() => {
        getData(e.target.value)
    }, 1000)
}

const input = document.querySelector('input')
input.addEventListener('keyup', getInput)