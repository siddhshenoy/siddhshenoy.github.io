const CHANCE_X = 0;
const CHANCE_O = 1;
var currentChance = CHANCE_X;
var chanceText = null;
var gameWon = false;
var ticTacArray = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];
var ticTacElementArray = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

var patterns = [
	[[0,0], [0,1], [0,2]],
	[[1,0], [1,1], [1,2]],
	[[2,0], [2,1], [2,2]],
	//Vertical
	[[0,0], [1,0], [2,0]],
	[[0,1], [1,1], [2,1]],
	[[0,2], [1,2], [2,2]],
	//Diagonal
	[[0,0], [1,1], [2,2]],
	[[0,2], [1,1], [2,0]]
]


$(document).ready(function()
{
	appEvents.windowEvents.init();
	appEvents.glEvents.init();
	appEvents.glEvents.draw();

	chanceText = drawUIText(50,50, "Chance for: ", 20);
	randomChancePicker();
	//Top
	ticTacElementArray[0][0] = addClickableBox((appData.windowData.screenWidth / 2) - 100	, (appData.windowData.screenHeight / 2) - 100, 100, 100, "box_0_0", "", boxClick);
	ticTacElementArray[0][1] = addClickableBox((appData.windowData.screenWidth / 2) 		, (appData.windowData.screenHeight / 2) - 100, 100, 100, "box_0_1", "", boxClick);
	ticTacElementArray[0][2] = addClickableBox((appData.windowData.screenWidth / 2) + 100	, (appData.windowData.screenHeight / 2) - 100, 100, 100, "box_0_2", "", boxClick);
	//Middle
	ticTacElementArray[1][0] = addClickableBox((appData.windowData.screenWidth / 2) - 100	, (appData.windowData.screenHeight / 2)		 , 100, 100, "box_1_0", "", boxClick);
	ticTacElementArray[1][1] = addClickableBox((appData.windowData.screenWidth / 2) 		, (appData.windowData.screenHeight / 2) 	 , 100, 100, "box_1_1", "", boxClick);
	ticTacElementArray[1][2] = addClickableBox((appData.windowData.screenWidth / 2) + 100	, (appData.windowData.screenHeight / 2) 	 , 100, 100, "box_1_2", "", boxClick);
	//Bottom
	ticTacElementArray[2][0] = addClickableBox((appData.windowData.screenWidth / 2) - 100	, (appData.windowData.screenHeight / 2) + 100, 100, 100, "box_2_0", "", boxClick);
	ticTacElementArray[2][1] = addClickableBox((appData.windowData.screenWidth / 2) 		, (appData.windowData.screenHeight / 2) + 100, 100, 100, "box_2_1", "", boxClick);
	ticTacElementArray[2][2] = addClickableBox((appData.windowData.screenWidth / 2) + 100	, (appData.windowData.screenHeight / 2) + 100, 100, 100, "box_2_2", "", boxClick);
	//console.log(ticTacElementArray);
});
function randomChancePicker()
{
	var r = random(0,1);
	currentChance = r;
	chance = (r == CHANCE_X) ? "X" : "O";
	chanceText.innerHTML = "Chance for: " + chance;
}
//Thanks to w3schools
function random(mn,mx) {
	 return Math.floor(Math.random() * (mx - mn) ) + mn;
}
function boxClick()
{
	if(!gameWon)
	{
		if(this.innerHTML == "")
		{
			switch(currentChance)
			{
				case CHANCE_X:
				{
					this.innerHTML = "X";

					break;
				}
				case CHANCE_O:
				{
					this.innerHTML = "O";
					break;
				}
			}
			currentChance = currentChance == CHANCE_X ? CHANCE_O : CHANCE_X;
			chance = (currentChance == CHANCE_X) ? "X" : "O";
			chanceText.innerHTML = "Chance for: " + chance;
			console.log(checkWinner());
		}
	}
}
function checkWinner()
{
	var value = "";
	var wonPattern = null;
	if(!gameWon) {
		for(var p = 0; p < patterns.length; p++) {
			var x = patterns[p][0][0];
			var y = patterns[p][0][1];
			value = $("#box_" + x + "_" + y).html();
			for(var i = 1; i < patterns[p].length; i++) {
				x = patterns[p][i][0];
				y = patterns[p][i][1];
				if($("#box_" + x + "_" + y).html() == value && value != "" && $("#box_" + x + "_" + y).html() != "") {
					gameWon = true;
					continue;
				}
				else {
					gameWon = false;
					break;
				}
			}
			if(gameWon){
				chanceText.innerHTML = "Winner of the game is \"" + value + "\"";
				wonPattern = patterns[p];
				for(var i = 0 ; i < wonPattern.length; i++) {
					//console.log(wonPattern[i]);
					$("#box_" + wonPattern[i][0] + "_" + wonPattern[i][1]).css("color","red");
				}

				break;
			}
		}
	}
	return wonPattern;
}
function addClickableBox(posX, posY, width, height, id, classname, onclickfunc)
{
	let clickableBox = document.createElement("div");
	clickableBox.id = id;
	clickableBox.className = classname;
	clickableBox.style.display = "flex";
	clickableBox.style.justifyContent = "center";
	clickableBox.style.alignItems = "center";
	clickableBox.style.fontFamily = "Arial";
	clickableBox.style.fontWeight = "bold";
	clickableBox.style.position = "absolute";
	clickableBox.style.fontSize = "64px";
	clickableBox.style.top = (posY - height/2)  + "px";
	clickableBox.style.left = (posX - width/2)  + "px";
	clickableBox.style.width = width  + "px";
	clickableBox.style.height = height  + "px";
	clickableBox.style.border = "0px solid red";
	clickableBox.style.color = "white";
	clickableBox.style.textAlign = "center";
	clickableBox.style.verticalAlign = "middle";
	clickableBox.onclick = onclickfunc;
	document.body.appendChild(clickableBox);
	return clickableBox;
}
function drawUIText( posX, posY, text, size, font="Arial") {
	let renderText = document.createElement("div");
	renderText.style.position = "absolute";
	renderText.style.fontSize = size + "px";
	renderText.style.fontFamily = font;
	renderText.style.top = posY  + "px";
	renderText.style.left = posX  + "px";
	renderText.style.color = "white";
	renderText.innerHTML = text;
	document.body.appendChild(renderText);
	return renderText;
}

function addLine( start, end, scene , lineColor = 0xFFFFFF)
{
	//console.log(scene);
	const material = new THREE.LineBasicMaterial( { color: lineColor } );
	const points = [];
	points.push( start );
	points.push( end );
	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometry, material );
	scene.add( line );
	return line;
}