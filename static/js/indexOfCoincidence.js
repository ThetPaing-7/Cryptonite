class IndexOfCoincidence {
  constructor(inputId, resultId, keyLengthResultId, filterName) {
    this.inputElement = document.getElementById(inputId);
    this.resultElement = document.getElementById(resultId);
    this.keyLengthResultElement = document.getElementById(keyLengthResultId);
    this.filterName = filterName;
  }

  getSelectedFilter() {
    return document.querySelector(`input[name="${this.filterName}"]:checked`).value;
  }

  filterText(text, filterOption) {
    if (filterOption === "onlyletters") {
      return text.toUpperCase().replace(/[^A-Z]/g, ""); // Only letters
    } else if (filterOption === "numbersOnly") {
      return text.replace(/[^0-9]/g, ""); // Only digits
    } else if (filterOption === "numbersAndLetters") {
      return text.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Letters and digits
    }
    return text; // Default: No filtering
  }

  calculateIC(text) {
    const N = text.length;
    if (N <= 1) return "Not enough data";

    const frequencies = {};
    for (const char of text) {
      frequencies[char] = (frequencies[char] || 0) + 1;
    }

    let numerator = 0;
    for (const freq of Object.values(frequencies)) {
      numerator += freq * (freq - 1);
    }

    const denominator = N * (N - 1);

    return (numerator / denominator).toFixed(6);
  }

 calculatePossibleKeyLengths(text, alphabetSize = 26) {
  const N = text.length;
  const IC = this.calculateIC(text);
  if (N <= 1) return [];

  const expectedIC = 1 / alphabetSize;  // Expected IC for a random text
  const deviation = 1 / (alphabetSize * (N - 1));  // Deviation for IC calculation
  const results = [];

  // Calculate the possible key lengths from 1 to 26
  for (let L = 1; L <= 26; L++) {
    // Calculate the IC value for the given L using the formula
    const ICValue = (L / (L - 1)) * (IC - expectedIC) + expectedIC;
    const error = deviation * Math.sqrt(L);  // Calculate error margin
    // Push the result in the required format
    results.push(`L=${L} IC ≈ ${ICValue.toFixed(5)} ± ${error.toFixed(3)}`);
  }

  return results;
}


  handleCalculation() {
    const filterOption = this.getSelectedFilter();
    let text = this.inputElement.value;

    // Apply filtering
    text = this.filterText(text, filterOption);

    // Calculate IC
    const ic = this.calculateIC(text);
    this.resultElement.textContent = `IC: ${ic}`; // Display IC value in the result container

    // Remove the redundant appending of IC:
    // const icContainer = document.createElement('div');
    // icContainer.classList.add('icContainer');
    // icContainer.textContent = `IC: ${ic}`;
    // this.resultElement.appendChild(icContainer); // This line is redundant and can be removed.

    // Calculate possible key lengths
    const possibleKeyLengths = this.calculatePossibleKeyLengths(text);

    // Clear the previous key length results
    this.keyLengthResultElement.innerHTML = ''; // Clear the container for fresh results

    // Check if there are possible key lengths and display them with smooth fade-in
    if (possibleKeyLengths.length > 0) {
        possibleKeyLengths.forEach((keyLength, index) => {
            setTimeout(() => {
                const keyLengthDiv = document.createElement('div');
                keyLengthDiv.classList.add('keyLengthDiv');
                keyLengthDiv.textContent = `Possible Key Length: ${keyLength}`;
                this.keyLengthResultElement.appendChild(keyLengthDiv);

                // Trigger fade-in animation by adding the "show" class
                setTimeout(() => {
                    keyLengthDiv.classList.add('show');
                }, 100); // Slight delay before the fade-in starts (adjust as needed)

                // Fade-out after 2.5 seconds (adjust as needed)
            }, index * 500); // Delay each key length by 500ms for sequential appearance
        });
    } else {
        const noResultDiv = document.createElement('div');
        noResultDiv.classList.add('keyLengthDiv');
        noResultDiv.textContent = "No key lengths calculated. Ensure the text is long enough.";
        this.keyLengthResultElement.appendChild(noResultDiv);
    }

    // Show the result containers
    const resultContainer = document.querySelectorAll('.result-container');
    resultContainer.forEach(container => container.classList.add('show'));
}




}

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
  const icCalculator = new IndexOfCoincidence(
    "sentence",
    "resultID",
    "keyLengthResult",
    "filterOption"
  );

  document.getElementById("ICbtn").addEventListener("click", () => {
    icCalculator.handleCalculation();
  });
});
