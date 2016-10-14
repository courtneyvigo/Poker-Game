/********** OUTRO SPECIFIC JAVASCRIPT **********/
displayIdleScreen = function() {
	//uncomment the following code for midcore:
	// document.getElementById("end-scenario").classList.remove('winning');
	// document.getElementById("end-scenario").classList.remove('losing');
	document.getElementById("outro-container").style.display = 'block';
	document.getElementById("top-button").className = 'mng-install-idle';
	document.getElementById("top-button").onclick = clickDownload;
	document.getElementById("bottom-button").className = 'mng-idle-retry';
	document.getElementById("bottom-button").onclick = clickRetry;
	document.getElementById("dl-div").className = 'mng-idle-click-url';
}
//uncomment and replace line 12 with the following code:
// displayInstallScreen = function(isvictory = true) {
displayInstallScreen = function() {
	//uncomment the following code for midcore:
	// document.getElementById("bottom-button").classList.remove('idle-retry');
	//document.getElementById("bottom-button").classList.remove('error-dl');
	// if(isvictory) {
	// 	document.getElementById("end-scenario").className = 'winning';	
	// }
	// else {
	// 	document.getElementById("end-scenario").className = 'losing';
	// }
	document.getElementById("outro-container").style.display = 'block';
	
	document.getElementById("top-button").className = 'mng-install-dl';
	document.getElementById("top-button").onclick = clickDownload;
	//for midcore only: there will be no 'mng-install-thanks':
	document.getElementById("bottom-button").className = 'mng-install-thanks';
	document.getElementById("bottom-button").onclick = clickDownload;
	document.getElementById("dl-div").className = 'mng-install-click-url';
}

displayErrorScreen = function() {
	//uncomment the following code for midcore:
	// document.getElementById("end-scenario").classList.remove('winning');
	// document.getElementById("end-scenario").classList.remove('losing');
	document.getElementById("outro-container").style.display = 'block';
	document.getElementById("top-button").className = 'mng-error-retry';
	document.getElementById("top-button").onclick = clickRetry;
	document.getElementById("bottom-button").className = 'mng-error-dl';
	document.getElementById("bottom-button").onclick = clickDownload;
	document.getElementById("dl-div").className = 'mng-error-click-url';
}
// this sends the user to the beginning of the game if the retry is clicked and the dl is not clicked
var clickRetry = function() {
	if (typeof startTestDrive != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		startTestDrive();
	}
	else {
		restartGame();
	}
}
// this sends the user to the itunes page where they can download the game. It also is compatable with our UI
var clickDownload = function() {
	if (typeof mnUserClickDownload != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		mnUserClickDownload();
	}
	else {
		window.location.href = 'https://itunes.apple.com/us/app/wizard-oz-free-slots-vegas/id916869395?mt=8';
	}
}
/********** OUTRO SPECIFIC JAVASCRIPT **********/