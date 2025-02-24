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
  { label: "THE", y: 3.51 },
  { label: "AND", y: 1.59 },
  { label: "ING", y: 1.15 },
  { label: "HER", y: 0.82 },
  { label: "HAT", y: 0.65 },
  { label: "HIS", y: 0.60 },
  { label: "THA", y: 0.59 },
  { label: "ERE", y: 0.56 },
  { label: "FOR", y: 0.56 },
  { label: "ENT", y: 0.53 },
  { label: "ION", y: 0.51 },
  { label: "TER", y: 0.46 },
  { label: "WAS", y: 0.46 },
  { label: "YOU", y: 0.44 },
  { label: "ITH", y: 0.43 },
  { label: "VER", y: 0.43 },
  { label: "ALL", y: 0.42 },
  { label: "WIT", y: 0.40 },
  { label: "THI", y: 0.39 },
  { label: "TIO", y: 0.38 },
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
