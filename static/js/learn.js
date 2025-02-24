class Lesson {
    constructor(title, introduction, content, assignments = []) {
        this.title = title;
        this.introduction = introduction;
        this.content = content;
        this.assignments = assignments;
        this.completed = false;
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }
}

class CourseManager {
    constructor(lessons) {
        this.lessons = lessons;
        this.currentIndex = 0;
    }

    get currentLesson() {
        return this.lessons[this.currentIndex];
    }

    get progress() {
        const completed = this.lessons.filter(lesson => lesson.completed).length;
        return (completed / this.lessons.length) * 100;
    }

    navigate(direction) {
        if (direction === 'previous' && this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        if (direction === 'next' && this.currentIndex < this.lessons.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }
}

class CourseUI {
    constructor(manager) {
        this.manager = manager;
        this.bindElements();
        this.bindEvents();
        this.render();
    }

    bindElements() {
        this.sidebar = document.getElementById('sidebar');
        this.lessonTitle = document.getElementById('lessonTitle');
        this.introduction = document.getElementById('introduction');
        this.lessonBody = document.getElementById('lessonBody');
        this.assignments = document.getElementById('assignments');
        this.progressFill = document.getElementById('progressFill');
        this.progressPercentageBox = document.getElementById('progressPercentageBox');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.completeBtn = document.getElementById('completeBtn');
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.handleNavigation('previous'));
        this.nextBtn.addEventListener('click', () => this.handleNavigation('next'));
        this.completeBtn.addEventListener('click', () => this.toggleCompletion());
        this.sidebar.addEventListener('click', (e) => this.handleLessonClick(e));
    }

    handleNavigation(direction) {
        if (this.manager.navigate(direction)) {
            this.render();
        }
    }

    handleLessonClick(event) {
        const lessonItem = event.target.closest('.lesson-item');
        if (lessonItem) {
            const index = parseInt(lessonItem.dataset.index);
            this.manager.currentIndex = index;
            this.render();
        }
    }

    toggleCompletion() {
        this.manager.currentLesson.toggleCompletion();
        this.render();
    }

    renderSidebar() {
        this.sidebar.innerHTML = this.manager.lessons
            .map((lesson, index) => `
                <div class="lesson-item ${index === this.manager.currentIndex ? 'active' : ''}" 
                    data-index="${index}">
                    ${lesson.completed ? '✓ ' : ''}${lesson.title}
                </div>
            `).join('');
    }

    renderContent() {
        const current = this.manager.currentLesson;
        this.lessonTitle.textContent = current.title;
        this.introduction.innerHTML = current.introduction;
        this.lessonBody.innerHTML = current.content;
        this.assignments.innerHTML = current.assignments
            .map(link => `
                <a href="${link.url}" class="assignment-link" target="_blank">
                    ${link.title}
                </a>
            `).join('');

        const progress = this.manager.progress;
        this.progressFill.style.width = `${progress}%`;
        this.progressPercentageBox.textContent = `${Math.round(progress)}%`;
        
        this.prevBtn.disabled = this.manager.currentIndex === 0;
        this.nextBtn.disabled = this.manager.currentIndex === this.manager.lessons.length - 1;
        this.completeBtn.textContent = current.completed ? 
            'Mark Incomplete' : 'Mark as Complete';
    }

    render() {
        this.renderSidebar();
        this.renderContent();
    }
}

// Initialize Course
const lessons = [
    new Lesson(
        "How This Course Will Work",
        "This curriculum works by aggregating the best content from across the internet to teach a specific topic. In each lesson, we’ll introduce the topic and try to provide some useful context before pointing you to external resources made by others.",
        `<p>In this module you'll learn:</p>
         <ul>
            <li>What is cryptography?</li>
            <li>Classical cryptography</li>
            <li>Most useful tools to decrypt</li>
         </ul>`,
        [
            { title: "Perfect to start video of the chipers method you gonna use in this project.", url: "https://www.youtube.com/watch?v=ArQ35BRRA1M&t=27s" },
        ]
    ),
    new Lesson(
        "What is cryptography?",
        "Cryptography is the practice and study of techniques for securing information and communications, ensuring confidentiality, integrity, and authenticity. It involves transforming readable data (plaintext) into an unreadable format (ciphertext) through various algorithms, making it accessible only to authorized parties who possess the appropriate decryption key.",
        `<p><strong>Key Terms in Cryptography</strong></p><br>
         <ul>
            <li>Plaintext: The original readable data before encryption.</li><br>
            <li>Ciphertext: The encrypted output that is not readable without decryption</li><br>
            <li>Encryption: The process of converting plaintext into ciphertext using an algorithm and a key.</li><br>
            <li>Decryption: The reverse process of converting ciphertext back into plaintext using a key.</li><br>
            <li>Key: A piece of information used in the encryption and decryption processes; it can be symmetric (the same for both processes) or asymmetric (different for each process)</li>
         </ul>`,
        [
            { title: "Professer David J. Malan's perfect introudctio of cryptography", url: "https://youtu.be/4vU4aEFmTSo?si=WvpthEKzTqD_vXSp&t=7557" },
            { title: "itu comprehensive explaination about cryptography", url: "https://www.itu.int/en/ITU-D/Cybersecurity/Documents/01-Introduction%20to%20Cryptography.pdf" }
        ]
    ),
     new Lesson(
        "Type of Cryptography",
        "Cryptography can be broadly categorized into three main types",
        `<p>Key topics include:</p>
         <ul>
            <li>Symmetric Key Cryptography: Also known as secret-key cryptography, this method uses a single key for both encryption and decryption. Both the sender and receiver must securely share this key.</li><br>
            <li>Asymmetric Key Cryptography: Also known as public-key cryptography, this approach uses two keys: a public key (shared openly) and a private key (kept secret). Data encrypted with the public key can only be decrypted with the corresponding private key</li><br>
            <li>Hash Functions: These are cryptographic algorithms that transform input data into a fixed-size string of characters, which is typically a digest that represents the original data. Hash functions are mainly used for verifying data integrity.</li>
         </ul>`,
        [
            { title: "IBM official article for what is cryptography and the area of the used", url: "https://www.ibm.com/think/topics/cryptography" },
            { title: "Fireship cool comprehensive seven concept", url: "https://youtu.be/NuyzuNBFWxQ?si=HMKFaIQdu91NyLaL" }
        ]
    ),
    new Lesson(
        "Representation",
        "Before you learn anything about cryptography,Let me ask you an interesting question?How does computer can represent letter and numbers when it can only understand one and zeor> The answer to that is Mapping.More precisely, Mapping by using standardized numerical codes, primarily through encoding systems like ASCII and Unicode to specific character.<br>For example, the letter 'A' is represented by the number 65 in decimal, which is 1000001 in binary",
        `<p>Character Representation:</p>
         <ul>
            <li>Binary Data: At the core, all characters are stored as binary data. Each character is assigned a unique binary code that the computer can process, store, and display.</li><br>
            <li>the letter ‘a’ has the binary number 0110 0001 (this is the denary number 97)</li><br>
            <li>the letter ‘c’ has the binary number 0110 0011 (this is the denary number 99)</li><br>
         </ul>`,
        [
            { title: "Explanation about representation with visual for starter.", url: "https://youtu.be/PhOSnWnnfGM?si=TTVeveHv5Zg80aoQ" },
            { title: "CS50T perfect presentation lecture.The lecture is long but pack various useful concepet if you were curious", url: "https://youtu.be/6mbFO0ZLMW8?si=TClLNWZjabkkySkW" }
        ]
    ),
    new Lesson(
        "Caesar cipher",
        "The Caesar cipher is one of the simplest and most well-known encryption techniques, classified as a type of substitution cipher. It works by shifting each letter in the plaintext by a fixed number of positions down the alphabet.",
        `<p>Key points:</p>
         <ul>
            <li>Encryption Process: To encrypt a message, each letter is replaced by another letter that is a fixed number of positions down the alphabet.The word "HELLO" would be encrypted as "KHOOR" using a shift of 3</li><br>
            <li>To decrypt the message, the recipient reverses the shift. For example, to decode "KHOOR" back to "HELLO," you would shift each letter back by 3</li>
         </ul>`,
        [
            { title: "Simple and clear introduction to caesar cipher", url: "https://www.youtube.com/watch?v=cefmnVaDab4&t=267s" },
        ]
    ),
    new Lesson(
    "Reverse String Maintaining Spaces",
    "Reverse chipher is to reverse a string while preserving the positions of any spaces within the string.  This means the reversed characters will fill the non-space positions, leaving the spaces exactly where they were in the original string.",
    `<p>Key points:</p>
        <ul>
            <li><b>Character Reversal:</b> The core task is to reverse the order of all *non-space* characters in the string.</li>
            <li><b>Space Preservation:</b>  Spaces should remain in their original locations.  They act as anchors during the reversal process.</li>
            <li><b>Example 1:</b> "our code" becomes "edo cruo". The space at index 3 remains in the reversed string.</li>
            <li><b>Example 2:</b> "your code rocks" becomes "skco redo cruoy".  Spaces are maintained.</li>
            <li><b>Example 3:</b> "codewars" becomes "srawedoc".  No spaces, so a standard reversal.</li>
        </ul><br>
        <p>Approach:</p>
        <ol>
            <li><b>Extract Non-Space Characters:</b> Create a new string containing only the non-space characters from the original string.</li>
            <li><b>Reverse:</b> Reverse this new string of non-space characters.</li>
            <li><b>Reconstruct:</b> Build the final result by iterating through the original string.  If a character is a space, add it to the result. If it's not a space, take the next character from the reversed non-space string and add it to the result.</li>
        </ol>
    `,
    [
        { title: "You can sharp your coding skill about the concept here", url: "https://www.codewars.com/kata/5a71939d373c2e634200008e/train/javascript" }, 
    ]
),

new Lesson(
    "Decimal Cipher",
    "The Decimal Cipher encrypts text by converting each character to its ASCII decimal representation. This numerical representation is then used as the ciphertext.  Decryption reverses this process, converting the decimal numbers back to their corresponding characters.",
    `<p>Key points:</p>
        <ul>
            <li><b>ASCII Conversion:</b> Each character in the plaintext is converted to its equivalent decimal ASCII value.</li>
            <li><b>Numerical Ciphertext:</b> The ciphertext consists of these decimal ASCII values, often separated by spaces or other delimiters.</li>
            <li><b>Example:</b> The word "Cat" would be encoded as "67 97 116" (assuming space delimiters), as these are the decimal ASCII codes for C, a, and t respectively.</li>
            <li><b>Decryption:</b> To decrypt, each decimal number is converted back to its corresponding character using ASCII decoding.</li>
        </ul><br>
        <p>Use Cases:</p>
        <p>While simple, the Decimal Cipher illustrates the basic principle of representing text numerically. It's often used as a foundational example in cryptography education.</p>
    `,
    [
        { title: "Representing Numbers and Letters with Binary: Crash Course Computer Science", url: "https://www.youtube.com/watch?v=1GSjbWt0c9M&t=1s" },
    ]
),

new Lesson(
    "Binary Cipher",
    "The Binary Cipher takes the Decimal Cipher a step further by converting the ASCII decimal value of each character into its binary representation. The ciphertext then consists of these binary strings, often separated by spaces or other delimiters.",
    `<p>Key points:</p>
        <ul>
            <li><b>ASCII to Decimal:</b>  First, each character is converted to its decimal ASCII value, just like in the Decimal Cipher.</li>
            <li><b>Decimal to Binary:</b> This decimal value is then converted into its binary equivalent.</li>
            <li><b>Binary Ciphertext:</b> The ciphertext is a sequence of these binary strings.</li>
            <li><b>Example:</b> "Cat" might be encoded as "01000011 01100001 01110100" (binary representations of 67, 97, and 116).</li>
            <li><b>Decryption:</b>  The decryption process involves converting each binary string back to decimal, and then from decimal to its corresponding character.</li>
        </ul><br>
        <p>Use Cases:</p>
        <p>The Binary Cipher demonstrates the representation of characters in binary, a fundamental concept in computer science and cryptography.</p>
    `,
    [
        { title: "Why can't computers use base 3 instead of binary? Voltage states explained.", url: "https://www.youtube.com/watch?v=fXwSFhUVFmE" },
        { title: "Why do we still use binary numbers in modern computers?", url: "https://www.youtube.com/watch?v=98CcIln2gJU&t=22s" }
    ]
),

new Lesson(
    "Hexadecimal Cipher",
    "The Hexadecimal Cipher is similar to the Binary Cipher, but instead of using binary, it uses hexadecimal representation.  The ASCII decimal value of each character is converted to its hexadecimal equivalent.  This results in a more compact ciphertext compared to binary.",
    `<p>Key points:</p>
        <ul>
            <li><b>ASCII to Decimal:</b> Each character is first converted to its decimal ASCII value.</li>
            <li><b>Decimal to Hexadecimal:</b> This decimal value is then converted to its hexadecimal representation.</li>
            <li><b>Hexadecimal Ciphertext:</b> The ciphertext is a series of these hexadecimal strings.</li>
            <li><b>Example:</b> "Cat" might be encoded as "43 61 74" (hexadecimal representations of 67, 97, and 116).</li>
            <li><b>Decryption:</b> Decryption involves converting the hexadecimal strings back to decimal and then to characters.</li>
        </ul><br>
        <p>Use Cases:</p>
        <p>Hexadecimal is often used in computer systems due to its conciseness.  The Hexadecimal Cipher demonstrates this representation and its relationship to ASCII encoding.</p>
    `,
    [
        { title: "Khan academy introduction and explaination to hexadecimal system", url: "https://www.youtube.com/watch?v=4EJay-6Bioo" },
         { title: "RGB-HexColors-Explained", url: "https://www.youtube.com/watch?v=hhI4x6hx21s" },
    ]
),
new Lesson(
    "Length Factorial Encryption",
    "This lesson introduces a custom encryption algorithm called 'Length Factorial Encryption.'  This method shuffles a message after padding it with random characters. The key to decryption reveals the original positions of the message characters within the shuffled string.",
    `<p>Key points:</p><br>
        <ul>
            <li><b>Padding:</b> The original message is padded with a certain number of random characters (the 'rubbish').</li><br>
            <li><b>Shuffling:</b> The padded string is then shuffled.  The example uses a simple reversal, but in a real-world scenario, a more complex shuffling algorithm would be used.</li><br>
            <li><b>Key Format:</b> The key has the format <code>pN[x1-x2-x3-...-xn]</code>, where:
                <ul>
                    <li><code>p</code> indicates padding.</li>
                    <li><code>N</code> is the number of padding characters.</li>
                    <li><code>x1, x2, ..., xn</code> are the 1-based indices of the original message characters in the shuffled string.</li>
                </ul>
            </li><br>
            <li><b>Decryption:</b> The goal is to use the key to reconstruct the original message from the shuffled string.</li><br>
            <li><b>Factorial Complexity:</b> The algorithm is named 'Length Factorial' because the number of possible shuffles (and thus the decryption difficulty without the key) grows factorially with the length of the padded string.</li>
        </ul><br>
        <p>Example:</p>
        <br>
        <p>Let's say <code>message = "codewars"</code>, and we add 10 padding characters and reverse the string. The shuffled string becomes <code>"snes@%jhrjsrawedoc"</code>, and the key is <code>"p10[18-17-16-15-14-13-12-11-10-9-8-7-6-5-4-3-2-1]"</code>.  The '18' in the key means the first character of the original message ('c') is at index 18 (1-based) in the shuffled string. The '17' means the second character ('o') is at index 17, and so on.</p>
        <p>Decryption steps:</p>
        <ol>
            <li>Parse the key to get the padding length and the index mapping.</li>
            <li>Create an empty string to store the decrypted message.</li>
            <li>Iterate through the index mapping from the key.</li>
            <li>For each index in the mapping, retrieve the character at that index from the shuffled string and append it to the decrypted message.</li>
        </ol>
    `,
    [
        { title: "You can play here", url: "https://www.codewars.com/kata/5e9c773f33e83600146338d2" },
    ]
),
    new Lesson(
        "Bulbs",
        "Bulb is a system that will convert text messages into binary numbers and visually represent binary representation of the text through an array of light bulbs.Vice versathe system will convert the light bulbs into text messages.",
        `<p>Key points:</p>
         <ul>
            <li>Each letter will convert to ASCII code and then, convert the ASCII code into binary format.</li><br>
            <li>1 or on state is represent by 🟡</li>
            <li>0 or off state is represent by ⚫</li>
         </ul>`,
        [
            { title: "Ideas taken from cs50 week 0.", url: "https://youtu.be/gs4Sb4ar4qw?si=7EC8d2rC16BIxqcK" },
        ]
    ),
    new Lesson(
    "Multiplication Cipher",
    "A multiplicative cipher is a type of monoalphabetic substitution cipher that encodes messages by replacing each letter with another letter based on a multiplication operation involving a key. This key is typically an integer that must be coprime to the size of the alphabet used, which is commonly 26 for the English alphabet",
    `<p>Key points:</p><br>
        <ul>
            <li><b>Numerical Representation:</b> Each letter is assigned a numerical value.  A common approach is to use 0-based indexing (A=0, B=1, C=2, ..., Z=25).</li><br>
            <li><b>Encryption Function:</b> The encryption function is <code>E(x) = (kx) mod 26</code>, where:
                <ul>
                    <li><code>E(x)</code> is the ciphertext letter's numerical value.</li>
                    <li><code>x</code> is the plaintext letter's numerical value.</li>
                    <li><code>k</code> is the secret key (an integer).</li>
                    <li><code>mod 26</code> means the remainder after dividing by 26 (the alphabet size).</li>
                </ul>
            </li><br>
            <li><b>Decryption Function:</b> The decryption function is <code>D(x) = (k<sup>-1</sup>x) mod 26</code>, where <code>k<sup>-1</sup></code> is the modular multiplicative inverse of <code>k</code>. This is the key to decryption.</li>
            <li><b>Modular Multiplicative Inverse:</b>  The modular multiplicative inverse of <code>k</code> (mod 26) is an integer <code>k<sup>-1</sup></code> such that <code>(k * k<sup>-1</sup>) mod 26 = 1</code>.  It only exists if <code>k</code> and 26 are coprime (their greatest common divisor is 1).</li>
        </ul><br>

        <p>Example:</p>
        <p>Let's encrypt the letter 'C' using a key of 7.</p>
        <ol>
            <li>'C' is represented numerically as 2 (0-based indexing).</li>
            <li><code>E(2) = (7 * 2) mod 26 = 14 mod 26 = 14</code>.</li>
            <li>14 corresponds to the letter 'O'.</li>
        </ol>
        <p>So, 'C' is encrypted as 'O' with a key of 7.</p><br>

        <p>Decryption Example:</p>
        <p>To decrypt 'O' back to 'C' with the same key, we need the modular multiplicative inverse of 7 (mod 26). In this case, it's 15, because (7 * 15) mod 26 = 1. </p>
        <ol>
            <li>'O' is represented numerically as 14.</li>
            <li><code>D(14) = (15 * 14) mod 26 = 210 mod 26 = 2</code>.</li>
            <li>2 corresponds to the letter 'C'.</li>
        </ol><br>

        <p>Reverse Index (Important for Decryption):</p><br>
        <p>The "reverse index" concept is crucial for understanding how the modular multiplicative inverse works.  It helps find the decryption key.  Think of it this way: you need a number that, when multiplied by your encryption key (and then taking the modulo), gives you 1.  The reverse index is that number.  Finding it often involves trying different numbers or using the Extended Euclidean Algorithm.</p>
        <p>In our example, the reverse index of 7 (mod 26) is 15. Because (7 * 15) mod 26 = 1. It is very important to note that not all number have reverse index. Only numbers that are coprime with the size of the alphabet (26 in this case) have reverse index.</p>

    `,
    [
        { title: "Modular Arithmetic", url: "https://www.youtube.com/watch?v=K6sNRSPwha8" },
        { title: "Full explaination", url: "https://www.youtube.com/watch?v=0qT1hDSwWYg" },
    ]
),
new Lesson(
    "Frequency Analysis",
    "Frequency analysis is a powerful cryptanalytic technique used to break substitution ciphers. It exploits the statistical properties of language, specifically the fact that certain letters and combinations of letters occur more frequently than others. By analyzing the frequency of characters in a ciphertext, one can make educated guesses about the corresponding plaintext characters.",
    `<p>Key points:</p>
        <ul>
            <li><b>Letter Frequencies:</b> In English, letters like E, T, A, and O are far more common than Z, Q, and X. Frequency analysis counts the occurrences of each letter in the ciphertext.  The most frequent ciphertext letters are likely to correspond to the most frequent plaintext letters.</li>
            <li><b>Bigrams and Trigrams:</b>  Frequency analysis extends beyond single letters.  Common pairs (bigrams, like TH, ER, IN) and triplets (trigrams, like THE, AND, ING) of letters are also analyzed.  Matching frequent bigrams/trigrams in the ciphertext with known English bigrams/trigrams can provide further clues.</li>
            <li><b>Ciphertext-Only Attack:</b> Frequency analysis is typically used in a ciphertext-only attack scenario, where the attacker only has the ciphertext and no other information about the plaintext or the key.</li>
            <li><b>Substitution Ciphers:</b> This technique is most effective against simple substitution ciphers (like the Caesar cipher or a monoalphabetic substitution cipher), where each plaintext letter is consistently replaced by a single ciphertext letter.</li>
        </ul>

        <p>How it Works:</p>
        <ol>
            <li><b>Count Frequencies:</b> Count the occurrences of each letter (and potentially bigrams/trigrams) in the ciphertext.</li>
            <li><b>Compare to Expected Frequencies:</b> Compare these frequencies to the known frequencies of letters in the language of the plaintext (e.g., English).</li>
            <li><b>Make Guesses:</b>  The most frequent ciphertext letters are assumed to correspond to the most frequent plaintext letters (e.g., the most frequent ciphertext letter is likely to be E).</li>
            <li><b>Test and Refine:</b> Substitute the guessed letters and see if any recognizable words or patterns emerge.  Refine the guesses based on the results. This is often an iterative process.</li>
        </ol>

        <p>Limitations:</p>
        <ul>
            <li><b>Short Texts:</b> Frequency analysis is less reliable with short ciphertexts, as the frequency distribution may not be representative of the language.</li>
            <li><b>Unusual Language:</b> Texts with specialized vocabulary, or deliberately altered letter frequencies (e.g., literary works with constrained writing), can make frequency analysis more difficult.</li>
            <li><b>Complex Ciphers:</b> Frequency analysis is generally ineffective against more complex ciphers like polyalphabetic substitution ciphers (e.g., Vigenère cipher) or transposition ciphers.</li>
        </ul>

        <p>Historical Significance:</p>
        <p>Frequency analysis is an old technique.  Its development is often attributed to the 9th-century Arab polymath Al-Kindi, making it one of the earliest known cryptanalytic methods.</p>

    `,
    [
        { title: "Frequency Analysis of English", url: "https://www.youtube.com/watch?v=opqgXvGsk6U" },
    ]
),
     new Lesson(
        "Bigram analysis",
        "Bigram analysis involves examining sequences of two adjacent elements, typically letters or words, within a given text. This method is widely used in various fields, including cryptography, natural language processing, and speech recognition",
        `<p>Key Concepts of Bigram Analysis</p>
         <ul>
            <li>Definition: A bigram (or digram) is a pair of consecutive elements from a sequence. In the context of text, these elements can be letters, syllables, or words. For example, in the phrase "I am," "I" and "am" form a bigram</li><br>
            <li>Frequency Distribution: By analyzing the frequency of each bigram in a text, researchers can gain insights into the structure and patterns of the language used. This frequency distribution is crucial for statistical analysis in computational linguistics and cryptography</li><br>
            <li>Applications in Cryptography: In cryptographic contexts, bigram analysis can be employed to break ciphers. Specifically, it helps identify common pairs of letters that appear in the ciphertext. This technique is particularly useful against substitution ciphers where letter pairs maintain their frequency characteristics from the plaintext</li>
         </ul>`,
        [
            { title: "How to Break an Unknown Cipher", url: "https://www.youtube.com/watch?v=td-mS7jkOy8" },
        ]
    ),
     new Lesson(
        "Shift Tester",
        "In cryptography, a shift tester typically refers to a tool or method used to analyze or decrypt messages encoded using a shift cipher, also known as the Caesar cipher. The shift cipher is a substitution cipher where each letter in the plaintext is replaced by another letter shifted by a fixed number of positions in the alphabet. This fixed number is called the key.",
        `<p>How a Shift Tester Works</p>
         <ul>
            <li>A shift tester helps determine the key used in encryption by systematically testing all possible shifts (keys) and analyzing the resulting text. Since there are only 25 possible shifts (excluding a shift of 0), this process can be performed quickly, even manually or with simple software tools.</li>
         </ul>`,
        [
            { title: "Forcepoint brute forece attack explain", url: "https://www.forcepoint.com/cyber-edu/brute-force-attack" },
        ]
    ),     
new Lesson(
    "Index of Coincidence (IC)",
    "The Index of Coincidence (IC) is a statistical measure used in cryptanalysis to determine whether a ciphertext was likely encrypted using a monoalphabetic or polyalphabetic substitution cipher. It quantifies the probability that two randomly selected letters from a text are identical.",
    `<p>Key points:</p>
        <ul>
            <li><b>Definition:</b> The IC measures the likelihood of two randomly chosen letters in a text being the same.</li><br>
            <li><b>Calculation:</b> The IC is calculated using the formula:
                <p><code>IC = (26 * Σ [f<sub>i</sub> * (f<sub>i</sub> - 1)]) / (N * (N - 1))</code></p>
                <p>Where:</p>
                <ul>
                    <li><code>f<sub>i</sub></code> is the frequency of each letter (A-Z).</li>
                    <li><code>N</code> is the total number of letters in the text.</li>
                    <li>The factor 26 normalizes the index for the 26 letters of the English alphabet.</li>
                </ul>
            </li><br>
            <li><b>Random Text IC:</b> In completely random text, the IC is approximately 0.0385.</li>
            <li><b>English Text IC:</b> In typical English text, the IC is approximately 0.0667.</li>
            <li><b>Monoalphabetic Cipher IC:</b> Ciphertext encrypted with a monoalphabetic substitution cipher tends to have an IC close to 0.0667 (similar to plain English).</li>
            <li><b>Polyalphabetic Cipher IC:</b> Polyalphabetic ciphers tend to have IC values closer to random text unless analyzed in segments corresponding to the cipher's period.</li>
        </ul><br>

        <p>Applications in Cryptanalysis:</p>
        <ol>
            <li><b>Cipher Type Determination:</b> The IC helps distinguish between monoalphabetic and polyalphabetic ciphers.  A high IC suggests monoalphabetic, while a lower IC suggests polyalphabetic.</li>
            <li><b>Period Estimation (Polyalphabetic):</b> By calculating the IC of different segments of the ciphertext, cryptanalysts can estimate the period (number of alphabets used) of a polyalphabetic cipher like the Vigenère cipher.  If a segment's IC is high, it suggests that segment might be encrypted with a single alphabet, thus revealing a clue to the period.</li>
        </ol><br>

        <p>Example:**</p>
        <p>Imagine a ciphertext. If its IC is calculated to be close to 0.0667, it's a strong indicator that a monoalphabetic substitution cipher was used. If it's closer to 0.0385, it hints at a polyalphabetic cipher. Further analysis, like dividing the ciphertext into segments and calculating the IC of those segments, can then help determine the period.</p>

        <p>Historical Context:</p>
        <p>The IC was developed by William F. Friedman, a pioneering figure in cryptanalysis, in the early 20th century.  It has since become a fundamental tool in the field.</p>
    `,
    [
        { title: "Index of Coincidence Explained", url: "https://www.youtube.com/watch?v=Ge_mreVqVC4" },
        { title: "William F. Friedman and Cryptanalysis", url: "https://youtu.be/jn4mBiMfFEs?si=xllWDx9bN3LOuD-L" }
    ]
),
new Lesson(
    "Monoalphabetic Substitution Cipher",
    "The Monoalphabetic Substitution Cipher is a type of substitution cipher where each letter in the plaintext is replaced by a *single*, corresponding letter in the ciphertext.  The substitution is consistent throughout the message, meaning a given letter always maps to the same replacement. This contrasts with polyalphabetic ciphers where a letter can have multiple mappings.",
    `<br><p>Key points:</p><br>
        <ul>
            <li><b>One-to-One Mapping:</b> Each plaintext letter maps to exactly one ciphertext letter.</li>
            <li><b>Key-Dependent Substitution:</b> The specific mapping is determined by a secret key, which is typically a permutation of the alphabet.</li>
            <li><b>Simple Encryption:</b> To encrypt, each letter in the plaintext is replaced by its corresponding letter according to the key.</li>
            <li><b>Simple Decryption:</b> To decrypt, each letter in the ciphertext is replaced by its corresponding letter from the key's inverse mapping.</li>
            <li><b>Vulnerability to Frequency Analysis:</b> Monoalphabetic ciphers are vulnerable to frequency analysis because the letter frequencies in the ciphertext maintain a similar distribution to the plaintext language.</li>
        </ul><br>

        <p>Example:</p><br>
        <p>Let's say our key is <code>"qwertyuiopasdfghjklzxcvbnm"</code> (a simple shifted alphabet).  This means 'a' becomes 'q', 'b' becomes 'w', 'c' becomes 'e', and so on.</p>
        <p>Plaintext: <code>"hello"</code></p>
        <p>Ciphertext: <code>"jgnnq"</code></p><br>

        <p>Encryption Process:</p>
        <ol>
            <li>For each letter in the plaintext:</li>
            <li>Find its index in the standard alphabet (a=0, b=1, ...).</li>
            <li>Use that index to look up the corresponding letter in the key.</li>
            <li>Append the key's letter (or its uppercase version if the plaintext letter was uppercase) to the ciphertext.</li>
        </ol><br>

        <p>Decryption Process:</p>
        <ol>
            <li>For each letter in the ciphertext:</li>
            <li>Find its index in the key.</li>
            <li>Use that index to look up the corresponding letter in the standard alphabet.</li>
            <li>Append the alphabet's letter (or its uppercase version if the ciphertext letter was uppercase) to the plaintext.</li>
        </ol>
    `,
    [
        { title: "Substitution Ciphers", url: "https://www.youtube.com/watch?v=J-utjSeUq_c" },
    ]
),
];

const courseManager = new CourseManager(lessons);
const courseUI = new CourseUI(courseManager);