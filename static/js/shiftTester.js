class ShifTester {
    constructor(text) {
        this._text = text;
        this._result = [];
    }

    set text(value) {
        if (value.trim() === "") {
            alert("Enter Cipher Text");
            return;
        }
        this._text = value;
    }

    get text() {
        return this._text;
    }

    bruteforcer() {
        let splitText = this._text.split("");
        for (let key = 1; key < 27; key++) {
            let sentence = "";
            for (let i = 0; i < splitText.length; i++) {
                let ascii = splitText[i].charCodeAt(0);
                if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
                    if (ascii >= 65 && ascii <= 90) {
                        sentence += String.fromCharCode(((ascii - 65 + key) % 26) + 65);
                    } else if (ascii >= 97 && ascii <= 122) {
                        sentence += String.fromCharCode(((ascii - 97 + key) % 26) + 97);
                    }
                } else {
                    sentence += splitText[i];
                }
            }
            this._result.push(sentence);
        }
    }

    get result() {
        return this._result;
    }
}

let test = new ShifTester("abcd");
test.bruteforcer();
console.log(test.result);


document.getElementById("shiftTesterbtn").addEventListener("click", () => {
    let containerHolder = document.getElementById("resultHolder");
    let inputChiper = document.getElementById("sentence").value;

    if (inputChiper.trim() === "") {
        alert("Enter Cipher Text");
        return;
    }

    let Attacker = new ShifTester(inputChiper);
    Attacker.bruteforcer();
    let sentences = Attacker.result;

    containerHolder.innerHTML = "";

    sentences.forEach((sentence, index) => {
        let container = document.createElement("div");
        container.classList.add("container");

        let num = document.createElement("div");
        num.classList.add("num");
        num.textContent = index + 1;

        let result = document.createElement("div");
        result.classList.add("result");
        result.textContent = sentence;

        container.appendChild(num);
        container.appendChild(result);

        // Apply animation with delay
        container.style.animationDelay = `${index * 0.1}s`;
        containerHolder.appendChild(container);
    });
});
