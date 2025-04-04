document.addEventListener("DOMContentLoaded", () => {
    const bucketList = document.getElementById("bucket-list");
    const addButton = document.getElementById("add-btn");
    const clearButton = document.getElementById("clear-btn");
    const newItemInput = document.getElementById("new-item");

    // Load saved data
    const savedList = JSON.parse(localStorage.getItem("bucketList")) || [];

    // Function to render list
    function renderList() {
        bucketList.innerHTML = "";
        savedList.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.text;
            li.dataset.id = item.id;
            if (item.completed) li.classList.add("completed");

            // Toggle complete on click
            li.addEventListener("click", () => {
                item.completed = !item.completed;
                saveList();
                renderList();
            });

            bucketList.appendChild(li);
        });
    }

    // Function to save list in localStorage
    function saveList() {
        localStorage.setItem("bucketList", JSON.stringify(savedList));
    }

    // Add new item
    addButton.addEventListener("click", () => {
        const text = newItemInput.value.trim();
        if (text === "") return;
        
        const newItem = { id: Date.now().toString(), text, completed: false };
        savedList.push(newItem);
        saveList();
        newItemInput.value = "";
        renderList();
    });

    // Clear all items
    clearButton.addEventListener("click", () => {
        localStorage.removeItem("bucketList");
        savedList.length = 0;
        renderList();
    });

    // Initialize list on page load
    renderList();
});

  
  