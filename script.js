document.getElementById("searchButton").addEventListener("click", function() {
    const countryName = document.getElementById("countryInput").value.trim();
    if (!countryName) {
        alert("Please enter a country name.");
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then(data => {
            displayCountryInfo(data[0]);
        })
        .catch(error => {
            document.getElementById("countryInfo").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
            document.getElementById("borderingCountries").innerHTML = "";
        });
});

function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById("countryInfo");
    countryInfoDiv.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag">
    `;

    displayBorderingCountries(country.borders || []);
}

function displayBorderingCountries(borderCountries) {
    const bordersDiv = document.getElementById("borderingCountries");
    bordersDiv.innerHTML = "<h3>Bordering Countries:</h3>";

    if (borderCountries.length === 0) {
        bordersDiv.innerHTML += "<p>No bordering countries.</p>";
        return;
    }

    borderCountries.forEach(code => {
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
            .then(response => response.json())
            .then(data => {
                const country = data[0];
                bordersDiv.innerHTML += `
                    <div>
                        <p>${country.name.common}</p>
                        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="border-flag">
                    </div>
                `;
            });
    });
}
