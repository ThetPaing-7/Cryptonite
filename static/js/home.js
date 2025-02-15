document.addEventListener('DOMContentLoaded', function() {
    const cipherSelect = document.getElementById('cipherSelect');
    const keysgp = document.getElementById('keysgp');

    cipherSelect.addEventListener('change', function() {
        const selectedCipher = cipherSelect.value;
        let keyInputHTML = '';

        switch (selectedCipher) {
            case 'reverse':
                // No key needed for reverse cipher
                keyInputHTML = '';
                break;
            case 'caesar':
                keyInputHTML = `
                    <label for="caesarKey">Caesar Key (Shift):</label>
                    <input type="number" id="caesarKey" name="caesarKey" min="1" max="25">
                `;
                break;
            case 'substitution':
                keyInputHTML = `
                    <label for="substitutionKey">Substitution Key:</label>
                    <input type="text" id="substitutionKey" name="substitutionKey" placeholder="Enter substitution key">
                `;
                break;
            case 'bulb':
                keyInputHTML = `
                    <label for="bulbKey">Bulb Key:</label>
                    <input type="text" id="bulbKey" name="bulbKey" placeholder="Enter bulb key">
                `;
                break;
            case 'garbage':
                keyInputHTML = `
                    <label for="garbageKey">Garbage Key:</label>
                    <input type="text" id="garbageKey" name="garbageKey" placeholder="Enter garbage key">
                `;
                break;
            case 'multiplicate':
                keyInputHTML = `
                    <label for="multiplicateKey">Multiplicate Key:</label>
                    <input type="number" id="multiplicateKey" name="multiplicateKey" min="1">
                `;
                break;
            default:
                keyInputHTML = '';
                break;
        }

        keysgp.innerHTML = keyInputHTML;
    });
});