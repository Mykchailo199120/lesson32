document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const resultsContainer = document.getElementById("results");
    const apiKey = '6677b2ba'; // Замініть на ваш API ключ


    async function fetchMovies(query) {
        if (!query) {
            resultsContainer.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`);
            const data = await response.json();

            if (data.Response === "True") {
                displayResults(data.Search);
            } else {
                resultsContainer.innerHTML = `<p>Не знайдено результатів для "${query}".</p>`;
            }
        } catch (error) {
            console.error("Помилка при запиті:", error);
            resultsContainer.innerHTML = `<p>Виникла помилка. Спробуйте ще раз.</p>`;
        }
    }

    function displayResults(movies) {
        resultsContainer.innerHTML = ''; // Очищаємо попередні результати

        movies.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.className = "movie";
            movieElement.innerHTML = `
                <h2>${movie.Title} (${movie.Year})</h2>
                <img src="${movie.Poster}" alt="${movie.Title} Poster" />
                <p>Тип: ${movie.Type}</p>
            `;
            resultsContainer.appendChild(movieElement);
        });
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();
        fetchMovies(query);
    });
});
