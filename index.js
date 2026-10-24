// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

fetchButton.addEventListener("click", async function () {
    const state = stateInput.value.trim().toUpperCase();

    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    if (state === "") {
        errorMessage.textContent = "Please enter a state abbreviation.";
        errorMessage.classList.remove("hidden");
        return;
    }

    try {
        const response = await fetch(weatherApi + state);

        if (!response.ok) {
            errorMessage.textContent = "Network issue";
            errorMessage.classList.remove("hidden");
            return;
        }

        const data = await response.json();
        const alerts = data.features;

        alertsDisplay.innerHTML = "";

        const heading = document.createElement("h2");
        heading.textContent = `${data.title}: ${alerts.length}`;
        alertsDisplay.appendChild(heading);

        alerts.forEach(function (alert) {
            const alertItem = document.createElement("p");
            alertItem.textContent =
                alert.properties.headline || "No headline available";
            alertsDisplay.appendChild(alertItem);
        });

        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
        stateInput.value = "";

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
});
