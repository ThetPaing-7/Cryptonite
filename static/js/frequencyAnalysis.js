function renderChart() {
    // Determine colors based on theme
    const textColor = "#E82561";

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // Chart theme
        backgroundColor: "transparent", // Background based on theme
        title: {
            text: "Simple Column Chart with Index Labels",
            fontColor: textColor // Title color
        },
        axisY: {
            includeZero: true,
            gridThickness: 0,
            labelFontColor: textColor, // Y-axis label color
            tickColor: textColor, // Y-axis tick color
        },
        axisX: {
            labelFontColor: textColor, // X-axis label color
            tickColor: textColor, // X-axis tick color
			interval: 1,
			labelAngle: 0,

        },
        data: [{
            type: "column",
            indexLabelFontColor: textColor, // Index label color
            indexLabelFontSize: 16,
            indexLabelPlacement: "outside",
            dataPoints: [
                { label: "A", y: 8.50 },
                { label: "B", y: 2.07 },
                { label: "C", y: 4.54 },
                { label: "D", y: 3.38 },
                { label: "E", y: 11.16},
                { label: "F", y: 1.81 },
                { label: "G", y: 2.47 },
                { label: "H", y: 3.00 },
                { label: "I", y: 7.54 },
                { label: "J", y: 0.20 },
                { label: "K", y: 1.10 },
                { label: "L", y: 5.49 },
                { label: "M", y: 3.01 },
                { label: "N", y: 6.65 },
                { label: "O", y: 7.16 },
                { label: "P", y: 3.17 },
                { label: "Q", y: 0.20 },
                { label: "R", y: 7.58 },
                { label: "S", y: 5.74 },
                { label: "T", y: 6.95 },
                { label: "U", y: 3.63 },
                { label: "V", y: 1.01 },
                { label: "W", y: 1.29 },
                { label: "X", y: 0.29 },
                { label: "Y", y: 1.78 },
                { label: "Z", y: 0.27 }
            ]
        }]
    });
    chart.render();
}

// Render the chart
renderChart()

class frequencyAnalysis{
    
    constructor(text){
        this._data = {}
        this.text = text
    }

    set text(value){
        if(value === ""){
            alert("Enter text")
            return;
        }

        this._text = value;
    }

    analysis(){
        let letters = this._text.split("");
        for(let i = 0; i < letters.length; i++){
            let key = letters[i].toLowerCase()
            if(key in this._data){
                this._data[key]++;
            }else{
                this._data[key] = 1
            }
        }
    }

    analysisLettersOnly(){
        for(let key in this._data){
            if(key.toLocaleLowerCase() !== key.toUpperCase()){
                delete this._data[key]
            }
        }
    }

    get data(){
        return this._data
    }
}

let sentence = new frequencyAnalysis("Hello World! This is cs50 and 5O is great")
sentence.analysis()
console.log(sentence.data);

sentence.analysisLettersOnly()
console.log(sentence.data)