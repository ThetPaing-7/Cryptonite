
// Frequecies of english language
window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	exportEnabled: true,
	theme: "light1", // "light1", "light2", "dark1", "dark2"
	backgroundColor: "rgba(255, 255, 255, 0)",
	title:{
		text: "Frequencies of the English language"
	},
  	axisY: {
      includeZero: true,
	  gridThickness: 0
    },
	axisX:{
		interval: 1,
		labelAngle: 0
	},
	data: [{
		type: "column", //change type to bar, line, area, pie, etc
		//indexLabel: "{y}", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
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
			{ label: "Z", y: 0.27 },
		]
	}]
});
chart.render();
}

