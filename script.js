function handleSubmit(event) {
    event.preventDefault(); 
    // Prevents page from reloading
    const input = document.querySelector('.search-form-input').value;
    // Gets value of input field
    const searchQuery = input.trim();
    // Removes whitespace from input
    fetchResults(searchQuery);
}

function fetchResults(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    
    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const results = data.query.search;
        // Gets array of search results objects
        displayResults(results);
    })
    .catch(() => console.log('An error occurred'));
}

function displayResults(results) {
    const searchResults = document.querySelector('.search-results');
    // Stores a reference to the class in the HTML doc
    searchResults.innerHTML = '';
    // Removes all child elements before adding new content
    results.forEach(result => {
    // Loops over array of search results objects
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
        // Appends the object title to a URL and encodes it to not contain spaces

        searchResults.insertAdjacentHTML('beforeend',
            `<div class="result-item">
                <a href="${url}" class="result-item-link" target="_blank" rel="noopener noreferrer">
                    <h2 class="result-item-title">${result.title}</h2>
                    <p class="result-item-snippet">${result.snippet}</p>
                    <p class="result-item-url"> ${url}</p>
                </a>
            </div>
            
            <div class="result-item-divider"></div>`
        );
    });
}

const form = document.querySelector('.search-form');
form.addEventListener('submit', handleSubmit);