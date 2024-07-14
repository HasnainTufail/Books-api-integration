function searchBooks() {
    let searchQuery = document.getElementById('searchQuery').value.trim();
    let apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&fields=key,title,author_name,isbn&limit=20&page=1`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            let resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; 
            if (data.docs.length === 0) {
                resultsDiv.innerHTML = '<p>No results found.</p>';
                return;
            }

            data.docs.forEach(book => {
                let bookDiv = document.createElement('div');
                bookDiv.classList.add('book');

                let title = document.createElement('p');
                title.textContent = book.title;
                bookDiv.appendChild(title);

                if (book.author_name && book.author_name.length > 0) {
                    let authors = document.createElement('p');
                    authors.textContent = 'Author(s): ' + book.author_name.join(', ');
                    bookDiv.appendChild(authors);
                }

                // if (book.isbn && book.isbn.length > 0) {
                //     let isbn = document.createElement('p');
                //     isbn.textContent = 'ISBN: ' + book.isbn.join(', ');
                //     bookDiv.appendChild(isbn);
                // }

                resultsDiv.appendChild(bookDiv);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}