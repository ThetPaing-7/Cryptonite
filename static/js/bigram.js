function renderChart(containerId, title, dataPoints) {
  const textColor = "#E82561";
  var chart = new CanvasJS.Chart(containerId, {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1",
    backgroundColor: "transparent",
    title: {
      text: title,
      fontColor: textColor,
    },
    axisY: {
      includeZero: true,
      gridThickness: 0,
      labelFontColor: textColor,
      tickColor: textColor,
    },
    axisX: {
      labelFontColor: textColor,
      tickColor: textColor,
      interval: 1,
      labelAngle: 0,
    },
    data: [{
      type: "column",
      indexLabelFontColor: textColor,
      indexLabelFontSize: 16,
      indexLabelPlacement: "outside",
      dataPoints: dataPoints,
    }],
  });
  chart.render();
}


const englishFrequencies = [
  { label: "TH", y: 3.88 }, 
  { label: "HE", y: 3.68 }, 
  { label: "IN", y: 2.28 }, 
  { label: "ER", y: 2.18 }, 
  { label: "AN", y: 2.14 }, 
  { label: "RE", y: 1.75 }, 
  { label: "ND", y: 1.57 }, 
  { label: "ON", y: 1.42 }, 
  { label: "EN", y: 1.38 }, 
  { label: "AT", y: 1.34 }, 
  { label: "OU", y: 1.29 }, 
  { label: "ED", y: 1.28 }, 
  { label: "HA", y: 1.27 }, 
  { label: "TO", y: 1.17 }, 
  { label: "OR", y: 1.15 }, 
  { label: "IT", y: 1.13 }, 
  { label: "IS", y: 1.11 }, 
  { label: "HI", y: 1.09 }, 
  { label: "ES", y: 1.09 }, 
  { label: "NG", y: 1.05 }, 
];

class BigramAnalysis {
  constructor(text) {
    this._data = {};
    this._text = text || "";
  }

  analyzeBigramsOnly() {
    const cleanText = this._text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    for (let i = 0; i < cleanText.length - 1; i++) {
      const bigram = cleanText[i] + cleanText[i + 1];
      this._data[bigram] = (this._data[bigram] || 0) + 1;
    }
  }

  analyzeBigramsAndDigits() {
    const cleanText = this._text.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    for (let i = 0; i < cleanText.length - 1; i++) {
      const bigram = cleanText[i] + cleanText[i + 1];
      this._data[bigram] = (this._data[bigram] || 0) + 1;
    }
  }

  get data() {
    return this._data;
  }
}

document.getElementById("bigrambtn").addEventListener("click", function () {
  const inputText = document.getElementById("sentence").value.trim();
  if (!inputText) {
    alert("Please enter some text");
    return;
  }
  
  renderChart("englishLetterChart", "English Letter Frequencies", englishFrequencies);

  const bigramAnalyzer = new BigramAnalysis(inputText);
  let selectedOption = document.querySelector('input[name="filterOption"]:checked');

  if (selectedOption) {
    if (selectedOption.value === "onlyBigrams") {
      bigramAnalyzer.analyzeBigramsOnly();
    } else if (selectedOption.value === "bigramsAndDigits") {
      bigramAnalyzer.analyzeBigramsAndDigits();
    }
  } else {
    bigramAnalyzer.analyzeBigramsOnly();
  }

  const dataPoints = Object.entries(bigramAnalyzer.data).map(([label, y]) => ({ label, y }));
  dataPoints.sort((a, b) => b.y - a.y);

  renderChart("inputTextChart", "Bigram Frequencies", dataPoints.slice(0, 20));
});
