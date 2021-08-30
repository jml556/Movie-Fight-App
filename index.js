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

autocomplete({
    root: document.querySelector('.autocomplete')
})

