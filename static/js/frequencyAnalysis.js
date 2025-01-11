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

// English letter frequencies (predefined)
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

class FrequencyAnalysis {
    constructor(text) {
        this._data = {};
        this.text = text;
    }

    set text(value) {
        if (value === "") {
            alert("Please enter text");
            return;
        }
        this._text = value;
    }

    analysis(letters) {
        for (let i = 0; i < letters.length; i++) {
            const key = letters[i].toLowerCase();
            if (key in this._data) {
                this._data[key]++;
            } else {
                this._data[key] = 1;
            }
        }
    }

    analysisLettersOnly() {
        const letters = this._text.split("").filter((char) => {
            const ascii = char.charCodeAt(0);
            return (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122);
        });
        return letters;
    }

    analysisDigitsOnly() {
        const digits = this._text.split("").filter((char) => {
            const ascii = char.charCodeAt(0);
            return ascii >= 48 && ascii <= 57;
        });
        return digits;
    }

    analysisLettersAndDigits() {
        const validChars = this._text.split("").filter((char) => {
            const ascii = char.charCodeAt(0);
            return (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || (ascii >= 48 && ascii <= 57);
        });
        return validChars;
    }

    get data() {
        return this._data;
    }
}

class GenerateChart {
    constructor(frequencyAnalysis) {

        this.onlyNumbers = document.getElementById("numbersOnly").checked;
        this.onlyLetters = document.getElementById("onlyletters").checked;
        this.numbersAndLetters = document.getElementById("numbersAndLetters").checked;
        this.frequencyAnalysis = frequencyAnalysis;
    }

    generateData() {
        if (this.numbersAndLetters) {
            const chars = this.frequencyAnalysis.analysisLettersAndDigits();
            document.getElementById("numbersOnly").disabled = true;
            document.getElementById("onlyletters").disabled = true;
            this.frequencyAnalysis.analysis(chars);
        } else if (this.onlyNumbers) {
            const digits = this.frequencyAnalysis.analysisDigitsOnly();
            document.getElementById("onlyletters").disabled = true;
            this.frequencyAnalysis.analysis(digits);
        } else if (this.onlyLetters) {
            const letters = this.frequencyAnalysis.analysisLettersOnly();
            document.getElementById("numbersOnly").disabled = true;
            this.frequencyAnalysis.analysis(letters);
        } else {
            alert("Please select at least one filter option.");
        }

       document.getElementById("numbersOnly").disabled = false
       document.getElementById("onlyletters").disabled = false
       document.getElementById("numbersAndLetters").disabled = false;

        return this.frequencyAnalysis.data;
        
    }
}

// Event listener for button to generate chart
document.getElementById("frequecnybtn").addEventListener("click", function(){
    const inputText = document.getElementById("sentence").value;
    if(!inputText.trim()){
        alert("Please enter some text")
        return
    }

    // RenderChart for english letter
    renderChart("englishLetterChart","English letters Frequencies",englishFrequencies)

    const analyer = new FrequencyAnalysis(inputText)
    const chartGenerator = new GenerateChart(analyer)
    const data = chartGenerator.generateData();
    const dataPoints = Object.entries(data).map(([label, y]) => ({ label, y }));
    
    renderChart("inputTextChart", "Input Text Frequencies", dataPoints);
})


