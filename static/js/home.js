import { CeasarCipher, Binary, Hexadecimal, Decimal, Reverse, Bulb, LengthFactorialEncryption, Multiplicate } from './chipherGenerator.js';

document.addEventListener('DOMContentLoaded', function () {
    const cipherSelect = document.getElementById('cipherSelect');
    const keysgp = document.getElementById('keysgp');
    const transformBtn = document.getElementById('transform');
    const displaySection = document.getElementById('displaySection');

    cipherSelect.addEventListener('change', function () {
        const selectedCipher = cipherSelect.value;
        let keyInputHTML = '';

        switch (selectedCipher) {
            case 'caesar':
                keyInputHTML = `<label for="caesarKey">Caesar Key:</label>
                    <input type="number" id="caesarKey" name="caesarKey" min="1" max="25">`;
                break;
            case 'substitution':
            case 'garbage':
                keyInputHTML = `<label for="${selectedCipher}Key">${selectedCipher.charAt(0).toUpperCase() + selectedCipher.slice(1)} Key:</label>
                    <input type="text" id="${selectedCipher}Key" name="${selectedCipher}Key">`;
                break;
            case 'multiplicate':
                keyInputHTML = `<label for="multiplicateKey">Multiplicate Key (Coprime with 26):</label>
                    <input type="number" id="multiplicateKey" name="multiplicateKey" min="1" list="validMultiplicativeKeys">
                    <datalist id="validMultiplicativeKeys">
                        <option value="1"></option>
                        <option value="3"></option>
                        <option value="5"></option>
                        <option value="7"></option>
                        <option value="9"></option>
                        <option value="11"></option>
                        <option value="15"></option>
                        <option value="17"></option>
                        <option value="19"></option>
                        <option value="21"></option>
                        <option value="23"></option>
                        <option value="25"></option>
                    </datalist>`;
                break;
            default:
                keyInputHTML = '';
                break;
        }

        keysgp.innerHTML = keyInputHTML;
    });

    function processCipher() {
        const selectedCipher = cipherSelect.value;
        const text = document.getElementById('inputText').value;
        const method = document.querySelector('input[name="method"]:checked');
        
        if (!method) {
            displaySection.innerHTML = '<p style="color: red;">Please select Encryption or Decryption</p>';
            return;
        }

        const isEncrypt = method.value === 'encrypt';
        let result = '';
        let key;
        

        switch (selectedCipher) {
            case 'caesar': {
                const offset = parseInt(document.getElementById('caesarKey').value);
                const cipher = new CeasarCipher(text, offset);
                result = isEncrypt ? cipher.encrypt() : cipher.decrypt();
                break;
            }
            case 'reverse':
                const cipher = new Reverse(text)
                result = isEncrypt ? cipher.encrypt(text) : cipher.decrypt(text);
                break;
            case 'binary': {
                const cipher = new Binary(text);
                result = isEncrypt ? cipher.encrypt() : cipher.decrypt(text);
                break;
            }
            case 'hexadecimal': {
                const cipher = new Hexadecimal(text);
                result = isEncrypt ? cipher.encrypt() : cipher.decrypt();
                break;
            }
            case 'decimal': {
                const cipher = new Decimal(text);
                result = isEncrypt ? cipher.encrypt() : cipher.decrypt();
                break;
            }
            case 'bulb': {
                const cipher = new Bulb(text);
                result = isEncrypt ? cipher.encrypt() : cipher.decrypt(text);
                break;
            }
            case 'garbage': {
            const padding = parseInt(document.getElementById('garbageKey').value);
            const cipher = new LengthFactorialEncryption(text, padding);
            if (isEncrypt) {
                const { encrypted, key: generatedKey } = cipher.encrypt();
                result = encrypted;
                key = generatedKey; // Store the key for display
            } else {
                const decryptionKey = document.getElementById('garbageKey').value;
                result = cipher.decrypt(text, decryptionKey);
            }
            break;
            }
            case 'multiplicate': {
                const offset = parseInt(document.getElementById('multiplicateKey').value);
    
                // Ensure the offset is coprime with 26
                const coprimes = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
                if (!coprimes.includes(offset)) {
                    displaySection.innerHTML = '<p style="color: red;">Error: Key must be coprime with 26. Choose from [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]</p>';
                    return;
                }

                const cipher = new Multiplicate(text, offset);
                result = isEncrypt ? cipher.encrypt() : cipher.decrypt();
                break;
            }

        }

       function typeWriterEffect(element, text, speed = 30) {
                let i = 0;
                function type() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    }
                }
                element.innerHTML = ''; // Clear the element before starting the effect
                type();
            }

            if (key) {
                displaySection.innerHTML = `<p class="typewriter"></p><strong>Key:</strong><p class="typewriter shrink-text"></p>`;
                const resultElement = displaySection.querySelector('.typewriter:first-of-type');
                const keyElement = displaySection.querySelector('.shrink-text');
                typeWriterEffect(resultElement, result);
                typeWriterEffect(keyElement, key);
            } else {
                displaySection.innerHTML = `<p class="typewriter"></p>`;
                const resultElement = displaySection.querySelector('.typewriter');
                typeWriterEffect(resultElement, result);
            }

    }

    transformBtn.addEventListener('click', processCipher);
});



document.getElementById('displaySection').addEventListener('click', () => {
    const textToCopy = displaySection.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Copied!');
    }).catch(() => {
        alert('Failed to copy text.');
    });
});

// import { CeasarCipher } from './ciphers.js';

// console.log(CeasarCipher);

document.getElementById("save").addEventListener("click", function () {
    const inputText = document.getElementById('inputText').value.trim(); // Trim to remove whitespace
    const selectedCipher = document.getElementById('cipherSelect').value;
    const method = document.querySelector('input[name="method"]:checked').value;
    const displayText = document.querySelector('#displaySection p').innerText.trim(); // Trim to remove whitespace

    if (inputText === "" || displayText === "") {
        alert("Please input text and generate the output before saving.");
        return; 
    }

    const data = {
        plaintext: inputText,
        cphier_method: selectedCipher,
        cphier_text: displayText
    };

    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Record saved successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error saving record!');
    });
});


