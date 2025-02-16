import { CeasarCipher, Binary, Hexadecimal, Decimal, Reverse, Bulb, LengthFactorialEncryption } from './chipherGenerator.js';

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
                keyInputHTML = `<label for="multiplicateKey">Multiplicate Key:</label>
                    <input type="number" id="multiplicateKey" name="multiplicateKey" min="1">`;
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
        }

         if (key) {
            displaySection.innerHTML = `<strong>Result:</strong><p>${result}</p><strong>Key:</strong><p>${key}</p>`;
        } else {
        displaySection.innerHTML = `<strong>Result:</strong><p>${result}</p>`;
        }

    }

    transformBtn.addEventListener('click', processCipher);
});


// import { CeasarCipher } from './ciphers.js';

// console.log(CeasarCipher);