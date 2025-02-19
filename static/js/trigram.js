// Trigram Analysis with Filtering Options
class TrigramAnalysis {
  constructor(text) {
    this._data = {};
    this._text = text || "";
  }

  analyzeTrigramsOnly() {
    const filteredText = this._text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    this._analyze(filteredText);
  }

  analyzeTrigramsAndDigits() {
    const filteredText = this._text.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    this._analyze(filteredText);
  }

  _analyze(text) {
    for (let i = 0; i < text.length - 2; i++) {
      const trigram = text[i] + text[i + 1] + text[i + 2];
      this._data[trigram] = (this._data[trigram] || 0) + 1;
    }
  }

  get data() {
    return this._data;
  }
}

function renderChart(containerId, title, dataPoints) {
  const textColor = "#E82561";
  var chart = new CanvasJS.Chart(containerId, {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1",
    backgroundColor: "transparent",
    title: { text: title, fontColor: textColor },
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
  { label: "A", y: 8.50 }, { label: "B", y: 2.07 }, { label: "C", y: 4.54 },
  { label: "D", y: 3.38 }, { label: "E", y: 11.16 }, { label: "F", y: 1.81 },
  { label: "G", y: 2.47 }, { label: "H", y: 3.00 }, { label: "I", y: 7.54 },
  { label: "J", y: 0.20 }, { label: "K", y: 1.10 }, { label: "L", y: 5.49 },
  { label: "M", y: 3.01 }, { label: "N", y: 6.65 }, { label: "O", y: 7.16 },
  { label: "P", y: 3.17 }, { label: "Q", y: 0.20 }, { label: "R", y: 7.58 },
  { label: "S", y: 5.74 }, { label: "T", y: 6.95 }, { label: "U", y: 3.63 },
  { label: "V", y: 1.01 }, { label: "W", y: 1.29 }, { label: "X", y: 0.29 },
  { label: "Y", y: 1.78 }, { label: "Z", y: 0.27 },
];

document.getElementById("trigramBtn").addEventListener("click", function () {
  const inputText = document.getElementById("sentence").value.trim();
  if (!inputText) {
    alert("Please enter some text");
    return;
  }

  renderChart("englishLetterChart", "English Letter Frequencies", englishFrequencies);

  const trigramAnalyzer = new TrigramAnalysis(inputText);
  let selectedOption = document.querySelector('input[name="filterOption"]:checked');

  if (selectedOption) {
    if (selectedOption.value === "onlyTrigrams") {
      trigramAnalyzer.analyzeTrigramsOnly();
    } else if (selectedOption.value === "trigramsAndDigits") {
      trigramAnalyzer.analyzeTrigramsAndDigits();
    }
  } else {
    trigramAnalyzer.analyzeTrigramsOnly();
  }

  const dataPoints = Object.entries(trigramAnalyzer.data).map(([label, y]) => ({ label, y }));
  dataPoints.sort((a, b) => b.y - a.y);

  renderChart("inputTextChart", "Trigram Frequencies", dataPoints.slice(0, 20));
});
