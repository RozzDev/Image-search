const accessKey = 'Bgv3iamKywCQ7-wBUTBIEoBv-Urlja6JnXnAewK7xFc';

const forEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more');

let inputData = '';
let page = 1;

async function searchImages(){
    //collecting inputs from search and giving a url
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    //featching the url and turning it into a json file
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    // when page is = 1 site empty
    if (page === 1){
        searchResults.innerHTML = '';
    };
    // html attributes
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '-blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })

    //incement of page and showmore button
    page++;
    if (page > 1) {
        showMore.style.display = 'block';
    }
}
// make search btn working
forEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener('click', (event) => {
    searchImages();
})