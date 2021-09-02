const spinner = document.getElementById('spinner');
const info = document.getElementById('info');
const searchResult = document.getElementById('search-result');

const loadSearchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchVal = searchField.value;

    // clear previous data
    searchField.value = '';
    info.textContent = '';
    searchResult.textContent = '';
    if (searchVal === '') {
        info.innerHTML = `<h2 class="text-center mb-5">please search a book name`;
    } else {
        spinner.classList.remove('d-none');
        fetch(`https://openlibrary.org/search.json?q=${searchVal}`)
            .then(response => response.json())
            .then(data => displaySearchBooks(data, data.docs))
    }
}

const displaySearchBooks = (booksFound, booksArray) => {
    // display search result found number of books
    info.innerHTML = `<h2 class="text-center mb-5">Search result found: <span class="text-danger">${booksFound.num_found}</span> Books`;
    searchResult.classList.add('d-none');

    // if search result more than 30
    if (booksArray.length > 30) {
        spinner.classList.remove('d-none');
        const books = booksArray.slice(0, 30);
        books.forEach(book => {
            const bookUrl = `<img height="400" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">`;
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col');
            bookDiv.innerHTML = `
                    <div class="card h-100">
                         ${book.cover_i ? bookUrl : `<img height="400" src="../images/download.png" class="card-img-top" alt="">`}
                        <div class="card-body">
                            <h5 class="card-title"><span class="fw-bold">Book Name: </span>${book.title}</h5>
                            <p class="text-danger"><span class="fw-bold">First Published: </span>${book.first_publish_year ? book.first_publish_year : 'Not Found'}</p>
                            <p class="text-success"><span class="fw-bold">Author Name: </span>${book.author_name ? book.author_name[0] : 'Not Found'}</p>
                        </div>
                     </div>
                `;
            searchResult.appendChild(bookDiv);
            spinner.classList.add('d-none');
            searchResult.classList.remove('d-none');
        })
    }
    // if search result less than 30
    else if (booksArray.length > 0) {
        spinner.classList.remove('d-none');
        booksArray.forEach(book => {
            const bookUrl = `<img height="350" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">`;
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col');
            bookDiv.innerHTML = `
                    <div class="card h-100">
                        ${book.cover_i ? bookUrl : `<img height="350" src="../images/download.png" class="card-img-top" alt="">`}
                        <div class="card-body">
                            <h5 class="card-title"><span class="fw-bold">Book Name: </span>${book.title}</h5>
                            <p class="text-danger"><span class="fw-bold">First Published: </span>${book.first_publish_year ? book.first_publish_year : 'Not Found'}</p>
                            <p class="text-success"><span class="fw-bold">Author Name: </span>${book.author_name ? book.author_name[0] : 'Not Found'}</p>
                        </div>
                    </div>
                    `;
            searchResult.appendChild(bookDiv);
            spinner.classList.add('d-none');
            searchResult.classList.remove('d-none');
        })
    }
    // if search result empty
    else {
        spinner.classList.add('d-none');
    }
}