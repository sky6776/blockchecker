function normalizeJapaneseText(text) {
    text = text.replace(/　/g, ' ');

    text = text.replace(/[\u30a1-\u30f6]/g, function(match) {
        var charCode = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(charCode);
    });

    text = text.replace(/[\u3041-\u3096]/g, function(match) {
        var charCode = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(charCode);
    });

    text = text.toLowerCase();

    return text;
}

        const checkboxes = document.querySelectorAll('.checkbox');

        checkboxes.forEach((checkbox) => {
            const checkboxId = checkbox.id;
            const savedState = localStorage.getItem(`${checkboxId}Checked`);
            if (savedState === 'true') {
                checkbox.checked = true;
            } else if (savedState === 'false') {
                checkbox.checked = false;
            }

            checkbox.addEventListener('change', () => {
                localStorage.setItem(`${checkboxId}Checked`, checkbox.checked);
            });
        });

        const searchBox = document.getElementById('sbox');
        const searchButton = document.getElementById('sbtn');
        const showAllButton = document.getElementById('showAllButton');
        const showUncheckedButton = document.getElementById('showUncheckedButton');

        function hideCheckbox(checkboxElement) {
            checkboxElement.parentElement.style.display = 'none';
        }

        function showCheckbox(checkboxElement) {
            checkboxElement.parentElement.style.display = 'block';
        }

        searchBox.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });

        searchButton.addEventListener('click', performSearch);

        showAllButton.addEventListener('click', () => {
            checkboxes.forEach((checkbox) => {
                showCheckbox(checkbox);
            });

            searchBox.value = '';
        });

        showUncheckedButton.addEventListener('click', () => {
            checkboxes.forEach((checkbox) => {
                if (!checkbox.checked) {
                    showCheckbox(checkbox);
                } else {
                    hideCheckbox(checkbox);
                }
            });

            searchBox.value = '';
        });

        function performSearch() {
            const keyword = normalizeJapaneseText(searchBox.value).trim();

            checkboxes.forEach((checkbox) => {
                const label = checkbox.nextElementSibling;
                const labelText = normalizeJapaneseText(label.textContent);

                if (keyword === '' || labelText.includes(keyword)) {
                    showCheckbox(checkbox);
                } else {
                    hideCheckbox(checkbox);
                }
            });
        }
