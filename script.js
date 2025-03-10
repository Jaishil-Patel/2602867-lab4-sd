document.getElementById("searchButton").addEventListener("click", function () {
    const countryName = document.getElementById("countryInput").value.trim();
    
    if (!countryName) {
        alert("Search field should not be empty");
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
            document.getElementById("borderingCountries").innerHTML = "";
        });
});

function displayCountryInfo(country) {
    const countryInfoSection = document.getElementById("countryInfo");
    const bordersList = document.getElementById("borderingCountries");
    countryInfoSection.innerHTML = `
    
        <h3>${country.name.common}</h3>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag">
    `;

    bordersList.innerHTML = "";

    if (!country.borders.length === 0) {
        bordersList.innerHTML = "<li>This country does not have any bordering countries.</li>";
        alert("This country does not have any boadering countries");
        return;
    }

    country.borders.forEach(code => {
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
            .then(response => response.json())
            .then(data => {
                const borderCountry = data[0];
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    ${borderCountry.name.common}
                    <img src="${borderCountry.flags.svg}" alt="Flag of ${borderCountry.name.common}" class="border-flag" width="50">
                `;
                bordersList.appendChild(listItem);
            });
    });
}
