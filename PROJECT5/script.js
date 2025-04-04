document.addEventListener("DOMContentLoaded", () => {
    const moodButtons = document.querySelectorAll(".mood-btn");
    const moodHistory = document.getElementById("mood-history");
    const clearButton = document.getElementById("clear-history");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Load saved history & dark mode state
    const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";
    if (darkModeEnabled) document.body.classList.add("dark-mode");
    renderMoodHistory();

    function setMood(mood, color) {
        document.body.style.backgroundColor = color;
        const date = new Date().toLocaleDateString();
        savedMoods.push({ mood, date });
        saveHistory();
        renderMoodHistory();
    }

    moodButtons.forEach(button => {
        button.addEventListener("click", () => {
            setMood(button.dataset.mood, button.dataset.color);
        });
    });

    function renderMoodHistory() {
        moodHistory.innerHTML = "";
        savedMoods.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = `${entry.date} - ${entry.mood}`;
            moodHistory.appendChild(li);
        });
    }

    function saveHistory() {
        localStorage.setItem("moodHistory", JSON.stringify(savedMoods));
    }

    clearButton.addEventListener("click", () => {
        localStorage.removeItem("moodHistory");
        savedMoods.length = 0;
        renderMoodHistory();
    });

    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });
});
