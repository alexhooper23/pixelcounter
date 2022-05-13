// all code ©2022 alex hooper
document.addEventListener('contextmenu', event => event.preventDefault());
window.addEventListener("keydown",  function (e) {if (e.key[0] != "F" || e.key == "F12") {e.preventDefault(); }}, true);
window.addEventListener("keyup",    function (e) {if (e.key[0] != "F" || e.key == "F12") {e.preventDefault(); }}, true);
window.addEventListener("keypress", function (e) {if (e.key[0] != "F" || e.key == "F12") {e.preventDefault(); }}, true);
var //Declare variables 
psTxt = document.getElementById("posTxt"),
pointerX = -1,
pointerY = -1,
usrClkCrcl = document.getElementById("usrCrclWrp"),
bgcrcl = document.getElementsByClassName("bx3")[0],
mdcrcl = document.getElementsByClassName("bx2")[0],
smcrcl = document.getElementsByClassName("bx1")[0],
crcls = document.getElementsByClassName("bx"),
bgCrclDm = 150,
crclEm = [bgcrcl, mdcrcl, smcrcl],
crclDm = [bgCrclDm, bgCrclDm * .4, bgCrclDm * .2],
wH = [0, 0],
x = 0,
tmOut = "x",
intCnt = "x"
score = [],
ptsElem = document.getElementById("pts"),
mxWdth = window.innerWidth,
mxHght = window.innerHeight,
rnd = 1,
tlrnd = 0,
gameStart = false,
tlplys = 0,
intl_ply = 0,
tmr = 1,
tmrChk = document.getElementById("tmrAct"),
tmrMen = document.getElementById("tmrDur")
crclAsoc = ["bg","md","sm"],
tmoDr = 3500,
thmStr = localStorage.getItem('th');

// Set dimensions of circles
for (var i = 0; i < crclDm.length; i++) {
	crclEm[i].style.height = crclDm[i] + "px";
	crclEm[i].style.width = crclDm[i] + "px";
}

// Find out if theme is already stored, if not store as light
if (thmStr == undefined) {
	thmStr = 'l'
	localStorage.setItem("th",thmStr)
} else {
	if (thmStr == 'l') {
		thmStr = 'd'
		theme()
	} else {
		thmStr = 'l'
		theme()
		document.getElementById('thm_cg').checked = true;

	}
}
// Function to change theme
function theme() {
	var p, s;
	if (thmStr == 'l') {
		p = 'white'
		s = 'black'
		thmStr = 'd';
		document.getElementById("ftr").style.color = '#232323'
		localStorage.setItem("th",thmStr);
	} else {
		p = 'black'
		s = 'white'
		thmStr = 'l';
		document.getElementById("ftr").style.color = '#cecece'
		localStorage.setItem("th",thmStr);
	}
	document.body.style.backgroundColor = s;
		document.body.style.color = p;
		document.getElementById("st_gm").style.border = '1px solid ' + p;
		document.getElementById("usrCrcl").style.backgroundColor = p;
		for (var i = 0; i < 2; i++) {
		document.getElementsByClassName("btn")[i].style.border = '1px solid ' + p;
		}
}
document.getElementById("plyrnm").innerHTML = String(1).padStart(2,"0")


//Change the amount of time each player has
 function tmrChg() {
	if (tmrChk.checked == true) {
		tmrMen.style.visibility = "visible"
	} else {
		tmrMen.style.visibility = "hidden"
	}
}
function tmrUpdt(neg) {
	if (neg == "+" && tmr != 120) {
		if (tmr < 10) {
			tmr += 1
		} else {
			tmr += 5
		}
	} else if (neg == "-" && tmr != 1) {
		if (tmr > 10) {
		tmr -= 5;
		} else {
			tmr -= 1;
		}
	}
	document.getElementById("tmrLbl").innerHTML = String(tmr).padStart(3, "0");
}

//Change the number of players on setup screen
function plyUpdt(neg) {
	if (neg == "+" && tlplys != 10) {
		tlplys += 1
	} else if (neg == "-" && tlplys != 1) {
		tlplys -= 1;
	}
	document.getElementById("plys").innerHTML = String(tlplys).padStart(2, "0");
}
plyUpdt("+")

//Change the number of rounds on setup screen
function rndUpdt(neg) {
	if (neg == "+" && tlrnd != 95) {
		if (tlrnd < 10) {
		tlrnd += 1
		} else {
			tlrnd += 5
		}
	} else if (neg == "-" && tlrnd != 1) {
		if (tlrnd > 10) {
			tlrnd -= 5;
		} else {
			tlrnd -= 1;
		}
	}
	// Set number of rounds on setup screen
	document.getElementById("rnds").innerHTML = String(tlrnd).padStart(2, "0");
	// Set number of rounds on game screen
	document.getElementById("tlRd").innerHTML = String(tlrnd).padStart(2, "0");
}
rndUpdt("+")

// Hide setup container, show regular container and set gamestart trigger to true
function startGame() {
	document.getElementById("mn-wrp").style.opacity = 0;
	if (tmrChk.checked == false) {
		document.getElementById("tmrTxt").style.display = 'none';
	} else {
		document.getElementById("tmr").innerHTML = String(tmr).padStart(3,"0")
	}
	if (tlplys == 1) {
		document.getElementById("plyTxt").style.display = 'none';
	}
	document.getElementById("tlply").innerHTML = String(tlplys).padStart(2,"0");
	for (var i = 0; i < tlplys; i++) {score.push(0)}
	setTimeout(function() {
		document.getElementById("mn-wrp").style.display = 'none';
		document.getElementById("gm-cnt").style.display = 'inline-block';
		setTimeout(function() {
		document.getElementById("gm-cnt").style.opacity = 1;
		}, 300)
		gameStart = true;
	
	setRandomPos()
	}, 300)
}

// Set the coordinates in each corner, reset if the window is resized
function setCrds() {
for (var i = 0; i < 2; i++) {
document.getElementsByClassName("screenX")[i].innerHTML = mxWdth;
document.getElementsByClassName("screenY")[i].innerHTML = mxHght;
}
}
setCrds()

function smlScrn() {
	if (window.innerWidth < 700 || window.innerHeight < 500) {
		document.getElementById("dsp-sm").style.display = 'grid';
		document.getElementById("act-cnt").style.display = 'none';
	} else {
		document.getElementById("dsp-sm").style.display = 'none';
		document.getElementById("act-cnt").style.display = 'inline-block';
	}
}
smlScrn()
window.addEventListener("resize",function() {
 	mxWdth = window.innerWidth;
	mxHght = window.innerHeight;
	smlScrn()
	setCrds()
})


function rndNum(mx) {
	var min = Math.ceil(mx);
  	var max = Math.floor(0);
  	return Math.floor(Math.random() * (max - min) + min);
}

// Add points to score
function scr(sz) {
	if (sz == "bg") {
		score[intl_ply] += 1;
	} else if (sz == "md") {
		score[intl_ply] += 3;
	} else if (sz == "sm") {
		score[intl_ply] += 5;
	}
	// Change the score value on screen
	ptsElem.innerHTML = String(score[intl_ply]).padStart(3, "0");
}

// Hide the cursor at the end of each round
function elemVis(x = 0) {
	for (var i = 0; i < crclEm.length; i++) {
	crclEm[i].style.opacity = x;
	}
	usrClkCrcl.style.opacity = x;
}

// Set position of circles
function setRandomPos() {
	// Generate random x and y coordinates for point
	var x = rndNum(mxWdth - crclDm[0])
	var y = rndNum(mxHght - crclDm[0])
	// Hide circles
	elemVis(0)
	// Move each circle to the right spot, centering the smaller ones
	smcrcl.style.left =  (x + ((crclDm[0] / 2) - (crclDm[2] / 2))).toString() + "px"
	mdcrcl.style.left = (x + ((crclDm[0] / 2) - (crclDm[1] / 2))).toString() + "px"
	bgcrcl.style.left = x.toString() + "px"
	smcrcl.style.top = (y + ((crclDm[0] / 2) - (crclDm[2] / 2))).toString() + "px"
	mdcrcl.style.top = (y + ((crclDm[0] / 2) - (crclDm[1] / 2))).toString() + "px"
	bgcrcl.style.top = y.toString() + "px"
	// Show the position of the point onsceen
    psTxt.innerHTML = "(" + String(x + bgCrclDm/2).padStart(4,"0") + ", " + String(y + bgCrclDm/2).padStart(4,"0") + ")"
	if (tmrChk.checked == true) {
		var cntTmt = tmr;
		document.getElementById("tmr").innerHTML = String(cntTmt).padStart(3,"0")
		intCnt = setInterval(function() {
			cntTmt -= 1
			document.getElementById("tmr").innerHTML = String(cntTmt).padStart(3,"0")
		}, 1000)
		tmOut  = setTimeout(function() {
			click()
			clearInterval(intCnt)
		}, tmr*1000)
	}
}
var timeout = false;
// Main Event Handeler
function click(event = 'none') {
	
	// Check to make sure the game isn't over and the previous circles are offscreen
	if (timeout == false && rnd <= tlrnd && gameStart == true) {
		if (tmrChk.checked == true) {
			clearTimeout(tmOut);
			clearInterval(intCnt)
		}
		// Hide cursor for reveal
		document.body.style.cursor = "none"
		// Stop user from clicking on buttons
		for (var i = 0; i < crcls.length; i++) {
			crcls[i].setAttribute("onclick","")
		}
		// Set position of the coordinate marker and its label
		if (event != 'none') {
			usrClkCrcl.style.top = (event.pageY - 5) + "px";
			usrClkCrcl.style.left = (event.pageX - 5) + "px";
			document.getElementById("clkX").innerHTML = String(event.pageX).padStart(4,"0");
			document.getElementById("clkY").innerHTML = String(event.pageY).padStart(4,"0");
		} else {
			usrClkCrcl.style.top = "0px";
			usrClkCrcl.style.left =  "0px";
			document.getElementById("clkX").innerHTML = "0000";
			document.getElementById("clkY").innerHTML = "0000";
		}
		// Show the circles
		elemVis(0.8)
		// Don't let the user click until the circls are bag
		timeout = true;
		setTimeout(function() {
			// Set new coorinates
			if (rnd <= tlrnd) {
				setRandomPos()
				timeout = false;
			}
			// Show cursor
			document.body.style.cursor = "crosshair"
			// Make buttons clickable
			for (var i = 0; i < crcls.length; i++) {
				crcls[i].setAttribute("onclick","scr('" + crclAsoc[i] + "')")
			}
			// Show the round number onscreen
			if (rnd <= tlrnd) {
				document.getElementById("rnd").innerHTML = String(rnd).padStart(2,"0");
			}
			// Check if game is over, switch to to that screen if so
			if (rnd >= tlrnd && tlplys == intl_ply+1) {
					document.getElementById("gm-cnt").style.display = 'none';
					document.getElementById("sc-wrp").style.display = 'grid';
					document.body.style.cursor = "pointer"
					gameStart = false
					if (tlplys > 1) {
					for (var i = 0; i < tlplys; i++) {
						document.getElementById("rst").innerHTML += String(i + 1).padStart(2,"0") + "&nbsp;-&#9;" + String(score[i]).padStart(3,"0") + "<br>"
					}
					} else {
						document.getElementById("rst").innerHTML += "<span class='center'>" + String(score[0]).padStart(3,"0") + "</span>"
					}
			}
			// Increase round if there is only one player
			if (tlplys == 1) {
				rnd += 1;
				document.getElementById("rnd").innerHTML = String(rnd).padStart(2,"0");
			// Handling if there is only one player
			} else {
				if (intl_ply + 1 != tlplys) {
					intl_ply += 1;
				} else if (rnd != tlrnd) {
					rnd += 1;
					intl_ply = 0;
					document.getElementById("rnd").innerHTML = String(rnd).padStart(2,"0");
				}
				// Show the points for the current player
				ptsElem.innerHTML = String(score[intl_ply]).padStart(3, "0");
				// Show the player number
				document.getElementById("plyrnm").innerHTML = String(intl_ply + 1).padStart(2,"0");
			}
		}, tmoDr)
	}
}
document.addEventListener("click", function(e) {
	click(e)
})



