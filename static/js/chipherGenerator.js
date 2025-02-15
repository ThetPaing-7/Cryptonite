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


// Ceasar
// // Example usage:
// const cipher = new CeasarCipher("Hello World!", 3);
// const encryptedText = cipher.encrypt();
// console.log(encryptedText); // Output: Khoor Zruog!

// const cipher2 = new CeasarCipher("Khoor Zruog!", 3); // Decrypting
// const decryptedText = cipher2.decrypt();
// console.log(decryptedText); // Output: Hello World!


// const cipher3 = new CeasarCipher("abcXYZ123", 3);
// const encryptedText3 = cipher3.encrypt();
// console.log(encryptedText3); // Output: defABC123

// const cipher4 = new CeasarCipher("defABC123", 3); // Decrypting
// const decryptedText4 = cipher4.decrypt();
// console.log(decryptedText4); // Output: abcXYZ123


class Binary{
    constructor(text){
        this.text = text;
    }

    encrypt(){
        let words = this.text.split(" ")
        let bits = []

        for(let i = 0; i < words.length; i++){
            let word = words[i].split("")
            for(let j = 0; j < word.length; j++){
                bits.push(word[j].charCodeAt(0).toString(2).padStart(8,"0"))
            }
        }

        return bits.join(" ")
    }


    decrypt(){
      let bits = this.text.split(" ")
      let plainText = ""

      for(let i = 0; i < bits.length; i++){
        plainText += String.fromCharCode(parseInt(bits[i],2))
      }

      return plainText;
    }

}


class Hexadecimal{
    constructor(text){
        this.text = text;
    }

    encrypt(){
        let cipherText = []
        let word = this.text.split("")

        for(let i = 0; i < word.length; i++){
            let code = word[i].charCodeAt(0)
            cipherText.push(code.toString(16))
        }

        return cipherText.join(" ")
    }

    decrypt(){
        let plainText = []
        let word = this.text.split(" ")

        for(let i = 0; i < word.length; i++){
            plainText.push(String.fromCharCode(parseInt(word[i],16))) 
        }

        return plainText.join("")
    }
}

// // Example Usages:

// let message = "Hello World!";
// let hex = new Hexadecimal(message);

// let encrypted = hex.encrypt();
// console.log("Encrypted:", encrypted); // Output: 48 65 6c 6c 6f 20 57 6f 72 6c 64 21

// let decrypted = new Hexadecimal(encrypted).decrypt(); // Decrypting the encrypted message
// console.log("Decrypted:", decrypted); // Output: Hello World!


// message = "This is a test.";
// hex = new Hexadecimal(message);

// encrypted = hex.encrypt();
// console.log("Encrypted:", encrypted);

// decrypted = new Hexadecimal(encrypted).decrypt();
// console.log("Decrypted:", decrypted);


// message = "12345";  // Test with numbers
// hex = new Hexadecimal(message);
// encrypted = hex.encrypt();
// console.log("Encrypted (numbers):", encrypted);
// decrypted = new Hexadecimal(encrypted).decrypt();
// console.log("Decrypted (numbers):", decrypted);


// message = "!@#$%^"; // Test with special characters
// hex = new Hexadecimal(message);
// encrypted = hex.encrypt();
// console.log("Encrypted (special):", encrypted);
// decrypted = new Hexadecimal(encrypted).decrypt();
// console.log("Decrypted (special):", decrypted);


// // Example demonstrating how to use the class directly without intermediate variables:
// console.log("Directly encrypt and decrypt:", new Hexadecimal("Direct test").decrypt(new Hexadecimal("Direct test").encrypt()));


class Decimal{
    constructor(text){
        this.text = text;
    }

    encrypt(){
        let cipherText = []
        let word = this.text.split("")

        for(let i = 0; i < word.length; i++){
            let code = word[i].charCodeAt(0)
            cipherText.push(code)
        }

        return cipherText.join(" ")
    }

    decrypt(){
        let plainText = []
        let word = this.text.split(" ")

        for(let i = 0; i < word.length; i++){
            plainText.push(String.fromCharCode(parseInt(word[i]))) 
        }

        return plainText.join("")
    }
}


// // Example Usages:

// let message = "Hello World!";
// let decimal = new Decimal(message);

// let encrypted = decimal.encrypt();
// console.log("Encrypted (Decimal):", encrypted); // Output: 72 101 108 108 111 32 87 111 114 108 100 33

// let decrypted = new Decimal(encrypted).decrypt();
// console.log("Decrypted (Decimal):", decrypted); // Output: Hello World!


// message = "This is a test.";
// decimal = new Decimal(message);

// encrypted = decimal.encrypt();
// console.log("Encrypted (Decimal):", encrypted);

// decrypted = new Decimal(encrypted).decrypt();
// console.log("Decrypted (Decimal):", decrypted);


// message = "12345";  // Test with numbers
// decimal = new Decimal(message);
// encrypted = decimal.encrypt();
// console.log("Encrypted (Decimal - numbers):", encrypted);
// decrypted = new Decimal(encrypted).decrypt();
// console.log("Decrypted (Decimal - numbers):", decrypted);


// message = "!@#$%^"; // Test with special characters
// decimal = new Decimal(message);
// encrypted = decimal.encrypt();
// console.log("Encrypted (Decimal - special):", encrypted);
// decrypted = new Decimal(encrypted).decrypt();
// console.log("Decrypted (Decimal - special):", decrypted);

// //Direct Encryption/Decryption
// console.log("Directly encrypt and decrypt (Decimal):", new Decimal("Direct test").decrypt(new Decimal("Direct test").encrypt()));

class Bulb extends Binary{
    constructor(text){
        super(text);
    }


    encrypt(){
        let binary = super.encrypt();
        
    }

}