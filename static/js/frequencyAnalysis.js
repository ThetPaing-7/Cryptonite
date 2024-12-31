function renderChart() {
    // Determine colors based on theme
    const textColor = "#E82561";

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // Chart theme
        backgroundColor: "transparent", // Background based on theme
        title: {
            text: "English Letters of Frequencies",
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

    analysis(letters){
        for(let i = 0; i < letters.length; i++){
            let key = letters[i].toLowerCase()
            if(key in this._data){
                this._data[key]++;
            }else{
                this._data[key] = 1
            }
        }
    }

    // Analysis letters only
    analysisLettersOnly(){
        let letters = this._text.split("");
        letters = letters.filter(x => x.charCodeAt(0) >= 65 && x.charCodeAt(0) <= 90 ||
        x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        return letters
    }

    // Analysis digits only
    analysisDigitsOnly(){
        let numbers = this._text.split("");
        numbers = numbers.filter(x => x.charCodeAt(0) >= 48 && x.charCodeAt(0) <= 57 )
        return numbers
    }

    // Analysis without space
    withoutSpaceAndSpecial(){
        let letters = this._text.split("")
        letters = letters.filter(x =>  x.charCodeAt(0) >= 48 && x.charCodeAt(0) <= 57 || 
        x.charCodeAt(0) >= 65 && x.charCodeAt(0) <= 90 ||
        x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122 )
        return letters
    }

    get data(){
        return this._data
    }
}

let sentence = new frequencyAnalysis("Hello World! This is cs50 and 50 is great!,@$%&*(%*^*^*^(%")
sentence.analysis(sentence.analysisDigitsOnly())
console.log(sentence.data)
