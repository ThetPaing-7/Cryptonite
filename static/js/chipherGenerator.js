export class CeasarCipher {
    constructor(text, offset = 1) {
        this.text = text;
        this.offset = offset;
    }

    encrypt() {
        let cipherText = '';

        let word = this.text.split('');
        for (let i = 0; i < word.length; i++) {
            let charCode = word[i].charCodeAt(0);
            let newCharCode;

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

    decrypt() {
        let plainText = '';

        let word = this.text.split('');

        // loop through the word and subtract the key
        for (let i = 0; i < word.length; i++) {
            let charCode = word[i].charCodeAt(0);
            let newCharCode;

            // If the cap letters
            if (charCode >= 65 && charCode <= 90) {
                newCharCode = (((charCode - 65 - this.offset) + 26) % 26) + 65; 
            } else if (charCode >= 97 && charCode <= 122) {
                newCharCode = (((charCode - 97 - this.offset) + 26) % 26) + 97;
            } else {
                newCharCode = charCode;
            }

            plainText += String.fromCharCode(newCharCode);
        }

        return plainText;
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


export class Binary {
  constructor(text) {
    this.text = text;
  }

  encrypt() {
    return this.text.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
  }

  decrypt(binary) {
    return binary.split(" ").map(byte => String.fromCharCode(parseInt(byte, 2))).join("");
  }
}

export class Hexadecimal{
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


export class Decimal{
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
export class Bulb {
  constructor(text) {
    this.text = text;
  }

  encrypt() {
    return this.text.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0").replace(/0/g, "⚫").replace(/1/g, "🟡")).join(" ");
  }

  decrypt(bulbs) {
    return bulbs.split(" ").map(byte => String.fromCharCode(parseInt(byte.replace(/⚫/g, "0").replace(/🟡/g, "1"), 2))).join("");
  }
}



export class LengthFactorialEncryption {
    constructor(text, padding = 1) {
        this.text = text;
        this.padding = padding;
    }

    encrypt() {
        // Generate random padding (rubbish)
        let rubbish = "";
        for (let i = 0; i < this.padding; i++) {
            rubbish += String.fromCharCode(33 + Math.floor(Math.random() * 94)); // Random printable character
        }

        // Add rubbish to the original message
        let paddedMessage = this.text + rubbish;
        let indices = [];

        // Generate indices (1-based position in the shuffled string)
        for (let i = 0; i < paddedMessage.length; i++) {
            indices.push(i + 1);
        }

        // Shuffle indices (representing the character positions in encrypted form)
        for (let i = indices.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        // Create the encrypted message
        let shuffledMessage = "";
        for (let i = 0; i < indices.length; i++) {
            shuffledMessage += paddedMessage[indices[i] - 1];
        }

        // Generate the key
        let key = `p${this.padding}[${indices.join("-")}]`;

        return { encrypted: shuffledMessage, key };
    }

    decrypt(encryptedText, key) {
        let match = key.match(/p(\d+)\[(.+)\]/);
        let rubbishCount = parseInt(match[1]); 
        let positions = match[2].split("-").map(Number); 

        let originalTextArray = new Array(positions.length);
        for (let i = 0; i < positions.length; i++) {
            originalTextArray[positions[i] - 1] = encryptedText[i];
        }

        // Remove rubbish
        return originalTextArray.slice(0, originalTextArray.length - rubbishCount).join("");
    }
}

// Example Usage
// let lfe = new LengthFactorialEncryption("codewars", 10);
// let { encrypted, key } = lfe.encrypt();
// console.log("Encrypted:", encrypted);
// console.log("Key:", key);
// console.log("Decrypted:", lfe.decrypt(encrypted, key));

export class Reverse {
    constructor(text) {
        this.text = text;
    }

    encrypt() {
        return this.#process(this.text);
    }

    decrypt() {
        return this.#process(this.encrypt()); 
    }

    #process(input) {
        let chars = input.split('');
        let letters = [];

        // Extract letters 
        for (let char of chars) {
            if (char !== ' ') {
                letters.push(char);
            }
        }

        // Reverse the letters 
        letters.reverse();

        let result = [];
        let letterIndex = 0;

        for (let char of chars) {
            if (char === ' ') {
                result.push(' '); 
            } else {
                result.push(letters[letterIndex]);
                letterIndex++;
            }
        }

        return result.join('');
    }
}


export class Multiplicate {
  constructor(text, offset = 1) {
    if (this.gcd(offset, 26) !== 1) throw new Error("Offset must be coprime with 26");
    this.text = text;
    this.offset = offset;
  }

  encrypt() {
    return this.text.replace(/[a-z]/gi, (char) => {
      let base = char >= "a" ? 97 : 65;
      return String.fromCharCode(((char.charCodeAt(0) - base) * this.offset % 26) + base);
    });
  }

  decrypt() {
    let modInverse = this.modInverse(this.offset, 26);
    return this.text.replace(/[a-z]/gi, (char) => {
      let base = char >= "a" ? 97 : 65;
      return String.fromCharCode(((char.charCodeAt(0) - base) * modInverse % 26) + base);
    });
  }

  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  modInverse(a, m) {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    throw new Error("No modular inverse found");
  }
}
