document.addEventListener("DOMContentLoaded", function () {
    const countryList = document.getElementById("countryList");
    const filterContinent = document.getElementById("filterContinent");
    const filterPhilosophy = document.getElementById("filterPhilosophy");
    const searchCountry = document.getElementById("searchCountry");
    const currentCountriesLink = document.getElementById("currentCountries");
    const formerCountriesLink = document.getElementById("formerCountries");
    const otherSectionLink = document.getElementById("otherSection");
    const sortBySelect = document.getElementById("sortBy"); // Added for sort option

    // Assuming the 'images' folder structure is: images/country1.jpg, images/country2.jpg, ...
    const imagePath = "images/";

    // Sample data, replace with your actual country data
    const countries = [
        { name: "Thailand", image: "Thailand.png", details: "Home country yeah!!!!", status: "current", politicalPhilosophy: "Monarchy", continent: "Asia" },
        { name: "Viet Cong", image: "Viet Cong.png", details: "Me when Vietnam War", status: "former", politicalPhilosophy: "Communist", continent: "Asia" },
        { name: "Sweden", image: "Sweden.png", details: "Ikea", status: "current", politicalPhilosophy: "Capitalist", continent: "Europe" },
        { name: "North Macedonia", image: "North Macedonia.png", details: "Land of the Rising sun, but not really", status: "current", politicalPhilosophy: "Capitalist", continent: "Europe" },
        { name: "Japan", image: "Japan.png", details: "SUSHI RAMEN POKEMON GUNDAM LAND", status: "current", politicalPhilosophy: "Capitalist", continent: "Asia" },
        { name: "China", image: "China.png", details: "Xiàn zài wǒ yǒu BING CHILLING", status: "current", politicalPhilosophy: "Communist", continent: "Asia" },
        { name: "Ukraine", image: "Ukraine.png", details: '"you-crane" -Luke Tran, 2024', status: "current", politicalPhilosophy: "Capitalist", continent: "Europe" },
        { name: "South Vietnam", image: "South Vietnam.png", details: "South part of Viet Cong", status: "former", politicalPhilosophy: "Capitalist", continent: "Asia" },
        { name: "Niger", image: "Niger.png", details: "Don't even bro...", status: "current", politicalPhilosophy: "Capitalist", continent: "Africa" },
        { name: "Bahamas", image: "Bahamas.png", details: '"The right side is suicide" -Bahamas tour guide, 2023', status: "current", politicalPhilosophy: "Monarchy", continent: "North America" },
        { name: "Qing Dynasty", image: "Qing Dynasty.png", details: "They are the OG rice farmers.", status: "other", politicalPhilosophy: "Imperialist", continent: "Asia" },
        { name: "Myanmar", image: "Myanmar.png", details: "Kinda like Thailand, ngl.", status: "current", politicalPhilosophy: "Capitalist", continent: "Asia" },
];

    let activeSection = "current";
    let sortOption = "newest";

    function displayCountries(status) {
        const selectedContinent = filterContinent.value;
        const selectedPhilosophy = filterPhilosophy.value;
        const searchKeyword = searchCountry.value.toLowerCase();

        countryList.innerHTML = "";
        let sectionCountries = countries.filter(country => {
            return (
                (selectedContinent === "all" || country.continent === selectedContinent) &&
                (selectedPhilosophy === "all" || country.politicalPhilosophy === selectedPhilosophy) &&
                country.status === status &&
                (country.name.toLowerCase().includes(searchKeyword))
            );
        });

        // Sort countries based on the selected option
        if (sortOption === "newest") {
            sectionCountries.sort((a, b) => countries.indexOf(b) - countries.indexOf(a));
        } else if (sortOption === "oldest") {
            sectionCountries.sort((a, b) => countries.indexOf(a) - countries.indexOf(b));
        } else if (sortOption === "alphabetical") {
            sectionCountries.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (sectionCountries.length === 0) {
            // If no countries match the filter, stay on the current section
            displayCountries(activeSection);
        } else {
            activeSection = status;

            sectionCountries.forEach(country => {
                createCountryCard(country);
            });

            // Activate the corresponding top navigation link
            if (status === "current") {
                currentCountriesLink.classList.add("active");
                formerCountriesLink.classList.remove("active");
                otherSectionLink.classList.remove("active");
            } else if (status === "former") {
                currentCountriesLink.classList.remove("active");
                formerCountriesLink.classList.add("active");
                otherSectionLink.classList.remove("active");
            } else if (status === "other") {
                currentCountriesLink.classList.remove("active");
                formerCountriesLink.classList.remove("active");
                otherSectionLink.classList.add("active");
            }
        }
    }

    function showModal(country) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.classList.add("close-btn");
    closeBtn.addEventListener("click", () => {
        document.body.removeChild(modal);
    });

    const countryDetails = document.createElement("div");
    countryDetails.classList.add("countryDetails");

    const countryImage = document.createElement("img");
    countryImage.src = imagePath + country.image;
    countryImage.alt = country.name;
    countryImage.classList.add("countryImage-top"); // Added class for styling

    const countryName = document.createElement("h2");
    countryName.textContent = country.name;

    const countryInfo = document.createElement("p");
    countryInfo.innerHTML = `<strong>Type:</strong> ${country.politicalPhilosophy}<br><strong>Continent:</strong> ${country.continent}<br><br>${country.details}`;

    countryDetails.appendChild(countryImage); // Add the image to the modal
    countryDetails.appendChild(countryName);
    countryDetails.appendChild(countryInfo);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(countryDetails);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    }


    function createCountryCard(country) {
        const countryCard = document.createElement("div");
        countryCard.classList.add("countryCard", country.politicalPhilosophy);
        countryCard.addEventListener("click", () => {
            showModal(country);
        });

        const countryImage = document.createElement("img");
        countryImage.src = imagePath + country.image;
        countryImage.alt = country.name;
        countryImage.classList.add("countryImage");

        const countryName = document.createElement("div");
        countryName.textContent = country.name;
        countryName.classList.add("countryName");

        countryCard.appendChild(countryImage);
        countryCard.appendChild(countryName);
        countryList.appendChild(countryCard);
    }

    currentCountriesLink.addEventListener("click", () => {
        currentCountriesLink.classList.add("active");
        formerCountriesLink.classList.remove("active");
        otherSectionLink.classList.remove("active");
        displayCountries("current");
    });

    formerCountriesLink.addEventListener("click", () => {
        currentCountriesLink.classList.remove("active");
        formerCountriesLink.classList.add("active");
        otherSectionLink.classList.remove("active");
        displayCountries("former");
    });

    otherSectionLink.addEventListener("click", () => {
        currentCountriesLink.classList.remove("active");
        formerCountriesLink.classList.remove("active");
        otherSectionLink.classList.add("active");
        displayCountries("other");
    });

    currentCountriesLink.click();

    // Event listeners for filter changes
    filterContinent.addEventListener("change", () => {
        displayCountries(activeSection);
    });

    filterPhilosophy.addEventListener("change", () => {
        displayCountries(activeSection);
    });

    searchCountry.addEventListener("input", () => {
        displayCountries(activeSection);
    });

    // Event listener for sort option change
    sortBySelect.addEventListener("change", () => {
        sortOption = sortBySelect.value;
        displayCountries(activeSection);
    });
});
