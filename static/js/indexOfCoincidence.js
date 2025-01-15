class IndexOfCoincidence {
  constructor(inputId, resultId, filterName) {
    this.inputElement = document.getElementById(inputId);
    this.resultElement = document.getElementById(resultId);
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

  handleCalculation() {
    const filterOption = this.getSelectedFilter();
    let text = this.inputElement.value;

    text = this.filterText(text, filterOption);

    const ic = this.calculateIC(text);
    this.resultElement.textContent = ic;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const icCalculator = new IndexOfCoincidence("sentence", "resultID", "filterOption");

  document.getElementById("ICbtn").addEventListener("click", () => {
    icCalculator.handleCalculation();
  });
});
