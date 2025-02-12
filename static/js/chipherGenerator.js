class CeasarCipher {
    constructor(text, offset) {
        this.text = text;
        this.offset = offset;
    }

    encrypt() {
        let cipherText = '';

        let word = this.text.split('');
        for (let i = 0; i < word.length; i++) {
            let charCode = word[i].charCodeAt(0);
            let newCharCode; // Declare newCharCode here

            // If the cap letters
            if (charCode >= 65 && charCode <= 90) {
                newCharCode = (((charCode - 65 + this.offset) % 26) + 65); 
            } else if (charCode >= 97 && charCode <= 122) {
                newCharCode = (((charCode - 97 + this.offset) % 26) + 97); 
            } else {
                newCharCode = charCode; 
            }

            cipherText += String.fromCharCode(newCharCode);
        }

        return cipherText;
    }


    decrypt(){
        let plainText = ""

        let word = this.text.split("")

        // loop through the word subtract the key
        for(let i = 0; i < word.length; i++){
            let charCode = word[i].charCodeAt(0)
            let newCharCode

            // If the cap letters
            if (charCode >= 65 && charCode <= 90) {
                newCharCode = (((charCode - 65 - this.offset) % 26) + 65); 
            } else if (charCode >= 97 && charCode <= 122) {
                newCharCode = (((charCode - 97 - this.offset) % 26) + 97); 
            } else {
                newCharCode = charCode; 
            }

            plainText += String.fromCharCode(newCharCode);

        }

        return plainText
    }
}


// Example usage:
const cipher = new CeasarCipher("Hello World!", 3);
const encryptedText = cipher.encrypt();
console.log(encryptedText); // Output: Khoor Zruog!

const cipher2 = new CeasarCipher("Khoor Zruog!", 3); // Decrypting
const decryptedText = cipher2.decrypt();
console.log(decryptedText); // Output: Hello World!


const cipher3 = new CeasarCipher("abcXYZ123", 3);
const encryptedText3 = cipher3.encrypt();
console.log(encryptedText3); // Output: defABC123

const cipher4 = new CeasarCipher("defABC123", 3); // Decrypting
const decryptedText4 = cipher4.decrypt();
console.log(decryptedText4); // Output: abcXYZ123