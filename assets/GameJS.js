/********** GAMEPLAY SPECIFIC JAVASCRIPT **********/
//This function resets the entire game and includes everything that needs to be reset, including updating the numbers. This will be different for each game
var restartGame = function() {
	document.getElementById("outro-container").style.display = 'none';
	//YOUR CODE HERE
	//YOUR CODE HERE
	//
	//
	//
	//YOUR CODE HERE
	//YOUR CODE HERE
}
// CALL THIS WHEN THE USER FINISHES PLAYING YOUR BUILD
// this sends the user to the end of the game if the retry is clicked and the dl is not clicked
var finishGameplay = function() {
	if (typeof gotoEndScreen != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		gotoEndScreen();
		//report that the user has finished the game
		if (typeof mn != 'undefined'){mn("play","100%");}
	}
	else {
		displayInstallScreen();
	}
}
/********** GAMEPLAY SPECIFIC JAVASCRIPT **********/
//all number variables that are effected by each other:
var mNectarGame = {};
	mNectarGame.credits = 10000;
	mNectarGame.currentBet = 200;
	mNectarGame.potAmount = 500;
	mNectarGame.animationTime = 1000;
	mNectarGame.animationSteps = 10000;
	mNectarGame.totalBet = 0;
	mNectarGame.player1CurrentBet = 100;
	mNectarGame.player1Credits = 10200;
	mNectarGame.player2CurrentBet = 200;
	mNectarGame.player2Credits = 10800;
	mNectarGame.bigwinAmount = 0;
	mNectarGame.minimumBet = 200;
	mNectarGame.maximumBet = 10000;

	mNectarGame.betSliderAdjustFlag = false;
	mNectarGame.isPlayerBetAnimating = false;

	mNectarGame.isUserTurn = true;


//check to see if how many cards to show after each round:
	var secondTableCardShown = false;
	var thirdTableCardShown = false;
	var fourthTableCardShown = false;
	var fifthTableCardShown = false;

	var didPlayer1Call = false;
	var didPlayer2Call = false;
	var didUserCall = false;

	var didPlayer1Check = false;
	var didPlayer2Check = false;
	var didUserCheck = false;

	var didUserGoAllIn = false;

	mNectarGame.swipeTriggerValue = 0;

var incrementNumbers = function(period,finalValueOfCredits,increaseAmountOfCredits,increaseAmountOfWin,currentBet) {
	//run what you want to run here:
	mNectarGame.potAmount += increaseAmountOfWin;
	mNectarGame.credits += increaseAmountOfCredits;

	updateNumbers();

	numberIncrementInterval = setInterval(function(){
		//only if we have not reached our target
		if (mNectarGame.credits < finalValueOfCredits){
			mNectarGame.potAmount += increaseAmountOfWin;
			mNectarGame.credits += increaseAmountOfCredits;

			updateNumbers();
		
		} else if (mNectarGame.credits >= finalValueOfCredits) {
			clearInterval(numberIncrementInterval);
		};
	}, period);
}

// var bigWin = function() {


// 	document.getElementById("pot-chips").className += " potchips-bigwin";

// }



//this is where the maximum bet is calculated:
var increaseBet = function() {
	if(typeof mn != 'undefined'){mn("play","other: increase bet");}
	  
	if (mNectarGame.currentBet != mNectarGame.credits) {
		mNectarGame.currentBet += 100;
	
		var updateCurrentBet = delimitNumbers(mNectarGame.updateCurrentBet);
		document.getElementById("player3chipstobet").innerHTML = "$" + updateCurrentBet;
	} 

	calculateTotalBet();

	updateNumbers();
}

//store the new pot total as a variable and add the new bets for round 2 to the new pot total:

//this is where the minimum bet is calculated:
var decreaseBet = function() {
	if(typeof mn != 'undefined'){mn("play","other: decrease bet");}

	if (mNectarGame.currentBet != mNectarGame.minimumBet) {
		mNectarGame.currentBet -= 100;
		var updateBet = delimitNumbers(mNectarGame.currentBet);
		var updateCurrentBet = delimitNumbers(mNectarGame.updateCurrentBet);
		document.getElementById("player3chipstobet").innerHTML = "$" + updateCurrentBet;
	} 

	calculateTotalBet();
	
	updateNumbers();
}

//this is NOT running - IS being called properly:
var stopChipAnimation = function() {
	if (mNectarGame.currentBet == mNectarGame.minimumBet || mNectarGame.currentBet == mNectarGame.credits) {
		console.log("stop chips from animating");
		
		document.getElementById("fallingchips").style.visibility = "hidden";
		document.getElementById("fallingchips2").style.visibility = "hidden";
		document.getElementById("fallingchips3").style.visibility = "hidden";
	} else {
		document.getElementById("fallingchips").style.visibility = "visible";
		document.getElementById("fallingchips2").style.visibility = "visible";
		document.getElementById("fallingchips3").style.visibility = "visible";
	}
}

//this is when a bet is calculated - pot is effecte:
var calculateTotalBet = function() {
	var updateTotalBet = delimitNumbers(mNectarGame.totalBet);
	mNectarGame.totalBet = mNectarGame.player1CurrentBet + mNectarGame.currentBet;
	document.getElementById("player3chipstobet").innerHTML = updateTotalBet;

	if (mNectarGame.currentBet === mNectarGame.credits) {
		document.getElementById("player3chipstobet").className = "player3chipstobet-max";

		


    } else if (mNectarGame.currentBet < mNectarGame.credits) {
		document.getElementById("player3chipstobet").className = "player3chipstobet";
	}
}


var updatePlayer1 = function(pokeraction) {
	if (pokeraction == "call") {

		didPlayer1Call = true;
		//console.log(didPlayer1Call + " Called1 it is!");
		
		mNectarGame.player1CurrentBet = mNectarGame.currentBet + mNectarGame.player2CurrentBet - mNectarGame.player1CurrentBet;
		
		var updatePlayer1Bet = delimitNumbers(mNectarGame.player1CurrentBet);
		document.getElementById("player1bet").innerHTML = "$" + updatePlayer1Bet;

		updateTotalPot(mNectarGame.player1CurrentBet);
	}

	if (pokeraction == "check") {
		didPlayer1Check = true;

		mNectarGame.player1CurrentBet = mNectarGame.currentBet + 0;

		var updatePlayer1Bet = delimitNumbers(mNectarGame.player1CurrentBet);
		document.getElementById("player1bet").innerHTML = "$" + updatePlayer1Bet;

		
	}

	if (pokeraction == "fold") {
		//console.log("player 1 folding");
		document.getElementById("player1overlay").className = "playerout";
	}
}
var updatePlayer2 = function(pokeraction) {
	if (pokeraction == "call") {

		didPlayer2Call = true;

		mNectarGame.player2CurrentBet = mNectarGame.currentBet;
		
		var updatePlayer2Bet = delimitNumbers(mNectarGame.player2CurrentBet);
		document.getElementById("player2bet").innerHTML = "$" + updatePlayer2Bet;

		updateTotalPot(mNectarGame.player2CurrentBet);
	}

	if (pokeraction == "check") {
		didPlayer2Check = true;

		mNectarGame.player2CurrentBet = mNectarGame.player1CurrentBet + 0;

		var updatePlayer2Bet = delimitNumbers(mNectarGame.player2CurrentBet);
		document.getElementById("player2bet").innerHTML = "$" + updatePlayer2Bet;

	}

	if (pokeraction == "bet") {

		mNectarGame.player2CurrentBet = mNectarGame.minimumBet;

		var updatePlayer2Bet = delimitNumbers(mNectarGame.player2CurrentBet);
		document.getElementById("player2bet").innerHTML = "$" + updatePlayer2Bet;

		updateTotalPot(mNectarGame.player2CurrentBet);
	}

}

var updateUserStatus = function(pokeraction) {
	if (pokeraction == "call") {
		document.getElementById("playerstatus-endvalue").innerHTML = "Call";


	}
	
	if (pokeraction == "check") {
		//call updateUserStatus("check"); when the check button is tapped. TO DO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		document.getElementById("playerstatus-endvalue").innerHTML = "Check";
		
	}

	if (pokeraction == "raise") {
		document.getElementById("playerstatus-endvalue").innerHTML = "Raise";


	}

	if (pokeraction == "all-in") {
		console.log("User is all in");
		document.getElementById("playerstatus-endvalue").innerHTML = "All In";
		
		
		setTimeout(function(){ 
			player1status.innerHTML = "fold";
			player1overlay.className = "playerout";
			player1bet.style.visibility = "hidden";
	 	}, 2500);

	 	setTimeout(function(){ 
			player2status.innerHTML = "fold";
			player2overlay.className = "playerout";
			player2bet.style.visibility = "hidden";
	 	}, 3500);
		
	}

}


var updateTotalPot = function(amount){
	mNectarGame.potAmount += amount;
	
	var updateTotalPot = delimitNumbers(mNectarGame.potAmount);
	document.getElementById("pot").innerHTML = updateTotalPot;
}

//this is how much the user has after they place a bet:
var calculateCurrentBank = function() {
	var currentCredits = delimitNumbers(mNectarGame.credits - mNectarGame.currentBet);
	document.getElementById("player3bank").innerHTML = "$" + currentCredits;
}
//this is how much the smallBlind has after they place a bet:
var calculatePlayer1Bank = function() {
	//console.log("player 1 bank is running");
	var currentPlayer1Credits = mNectarGame.player1Credits - mNectarGame.player1CurrentBet;
	
	var updatePlayer1Bank = delimitNumbers(currentPlayer1Credits);
	document.getElementById("player1bank").innerHTML = "$" + updatePlayer1Bank;
}

calculatePlayer1Bank();

//this is how much the bigBlind has after they place a bet:
var calculatePlayer2Bank = function() {
	//console.log("player 2 bank is running");
	var currentPlayer2Credits = mNectarGame.player2Credits - mNectarGame.player2CurrentBet;
	
	var updatePlayer2Bank = delimitNumbers(currentPlayer2Credits);

	document.getElementById("player2bank").innerHTML = "$" + updatePlayer2Bank;
}

calculatePlayer2Bank();

//this function is to add the comma to any variable that calls this function.
function delimitNumbers(str) {
	return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
		return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
	});
}

var showUserUI = function() {
	
	//show the check circle and betting circle:
	document.getElementById("betcircle").style.visibility = "visible";
	//START fallingchips animation 1-3
	document.getElementById("chipsfallinganim").style.visibility = "visible";

	document.getElementById("player3chipstobet").className = "player3chipstobet";
}
var hideUserUI = function() {
	//hide the check circle and betting circle:
	document.getElementById("betcircle").style.visibility = "hidden";
	//STOP fallingchips animation 1-3
	document.getElementById("chipsfallinganim").style.visibility = "hidden";
}

//updating UI numbers as 1 function. This is what is adding the comma and $ sign to the updated numbers:
var updateNumbers = function() {
	var localWinning = delimitNumbers(Math.round(mNectarGame.potAmount));
	document.getElementById("pot").innerHTML = localWinning;

	var localBet = delimitNumbers(mNectarGame.currentBet, mNectarGame.totalBet);
	document.getElementById("player3chipstobet").innerHTML = "$" + localBet;

	var totalUserCredits = delimitNumbers(mNectarGame.credits);
	document.getElementById("player3bank").innerHTML = "$" + totalUserCredits;

}

//immediately running the above function
updateNumbers();

//drag code:
var element = document.getElementById('increase-decrease-bet');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(element);

var betSliderPostion = 200;

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events (panup)...
mc.on("panup", function(ev) {
	if (mNectarGame.isUserTurn == true) {
    	increaseBet();
    	calculateCurrentBank();


    	
    	//stopChipAnimation();
    	
    	betSliderPostion -= 2;
    	if (betSliderPostion < 120) {
    		betSliderPostion = 120;
    	}
    	//chips value
    	document.getElementById("player3chipstobet").style.left = 376 + "px";
    	document.getElementById("player3chipstobet").style.top = betSliderPostion + "px";
    	//fallingchips animation 1-3
    	document.getElementById("fallingchips").className = "sprite chipsIndividual_iPhone fallingchipsanim";
    	document.getElementById("fallingchips").style.top = betSliderPostion + 20 + "px";
	
    	document.getElementById("fallingchips2").className = "sprite chipsIndividual_iPhone fallingchipsanim2";
    	document.getElementById("fallingchips2").style.top = betSliderPostion + 20 + "px";
	
    	document.getElementById("fallingchips3").className = "sprite chipsIndividual_iPhone fallingchipsanim3";
    	document.getElementById("fallingchips3").style.top = betSliderPostion + 20 + "px";
    	//chips
		document.getElementById("chipsstack1").style.top = betSliderPostion + 70 + "px";
		document.getElementById("chipsstack2").style.top = betSliderPostion + 70 + "px";
		document.getElementById("chipsstack3").style.top = betSliderPostion + 70 + "px";
	}
});
// listen to events (pandown)...
mc.on("pandown", function(ev) {
	if (mNectarGame.isUserTurn == true) {
    	
		if (mNectarGame.currentBet > mNectarGame.minimumBet) {
    		decreaseBet();
    		calculateCurrentBank();
		
    		//this is not running:
    		//stopChipAnimation();

		
    		betSliderPostion += 2;
    		if (betSliderPostion > 200) {
    			betSliderPostion = 200;
    		}
		
    		//chips value
    		document.getElementById("player3chipstobet").style.left = 376 + "px";
    		document.getElementById("player3chipstobet").style.top = betSliderPostion + "px";
    		//fallingchips animation 1-3
    		document.getElementById("fallingchips").className = "sprite chipsIndividual_iPhone reversefallingchipsanim";
    		document.getElementById("fallingchips").style.top = betSliderPostion + 20 + "px";
		
    		document.getElementById("fallingchips2").className = "sprite chipsIndividual_iPhone reversefallingchipsanim2";
    		document.getElementById("fallingchips2").style.top = betSliderPostion + 20 + "px";
		
    		document.getElementById("fallingchips3").className = "sprite chipsIndividual_iPhone reversefallingchipsanim3";
    		document.getElementById("fallingchips3").style.top = betSliderPostion + 20 + "px";
    		//chips
    		document.getElementById("chipsstack1").style.top = betSliderPostion + 70 + "px";
    		document.getElementById("chipsstack2").style.top = betSliderPostion + 70 + "px";
			document.getElementById("chipsstack3").style.top = betSliderPostion + 70 + "px";

		}
	}
});
// listen to events (panleft) - we made it mc2 for a whole new div that will call this function to prevent the animation bug...
mc.on("panleft", function(ev) {

	if (mNectarGame.isUserTurn == true) {
		mNectarGame.swipeTriggerValue += 1;
		//console.log(mNectarGame.swipeTriggerValue);
		if (mNectarGame.currentBet == mNectarGame.minimumBet || mNectarGame.currentBet == mNectarGame.player2CurrentBet) {
			didUserCall = true;
			updateUserStatus("call");
			var userWantsToCall = delimitNumbers(mNectarGame.player2CurrentBet);
			document.getElementById("player3chipstobet").innerHTML = "$" + userWantsToCall;
			setTimeout(function(){
				goToNextRound();
			}, 2500);
		} else if (mNectarGame.currentBet == mNectarGame.credits){
			didUserGoAllIn = true
			updateUserStatus("all-in");
		} else {
			didUserBet = true;
			updateUserStatus("raise");
			setTimeout(function(){
				goToNextRound();
			}, 2500);
		}
	
		
		//this code executes if the user definately panned left
		if (mNectarGame.swipeTriggerValue >= 9) {
			mNectarGame.swipeTriggerValue = -300;
			
			mNectarGame.isUserTurn = false;
			
			//hide all the tutorial stuff except the up and down arrows... we will need those for later
			document.getElementById("tutchar").style.visibility = "hidden";
			document.getElementById("speechbubble").style.visibility = "hidden";
			document.getElementById("tuthand").style.visibility = "hidden";
			document.getElementById("tut-arrow-up").style.visibility = "hidden";

   			updateTotalPot(mNectarGame.currentBet);
   			calculateCurrentBank();
			
			hideUserUI();

   			//saving the new value of credits for next rounds:
   			mNectarGame.credits = mNectarGame.credits - mNectarGame.currentBet;
		
   			mNectarGame.isPlayerBetAnimating = true;
   			
   			//add the betting chips animation to add to the pot
			document.getElementById("player3chipstobet").className += " player3chipstobet-readyforbet";
			document.getElementById("chipstobetanimation").className = "sprite chipsStackanimation_iPhone chipsmovetocenter";
			document.getElementById("fallingchips").className = "sprite chipsIndividual_iPhone";
			document.getElementById("fallingchips2").className = "sprite chipsIndividual_iPhone";
			document.getElementById("fallingchips3").className = "sprite chipsIndividual_iPhone";

			//animation that happens with the status: //test this some more... might be buggy. TO DO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			document.getElementById("player3chipstobet-endvalue").className += " playerbet-anim";
			document.getElementById("player3chipstobet-endvalue").innerHTML = "$" + delimitNumbers(mNectarGame.currentBet);
			document.getElementById("playerstatus-endvalue").className += " playerstatus-anim";

			
			
   			
   			setTimeout(function(){ 
				mNectarGame.isPlayerBetAnimating = false;
			 }, 1000);

   		}
	}
});

mc.on("panright", function(ev){
	if (mNectarGame.swipeTriggerValue > 0) {
		mNectarGame.swipeTriggerValue = 0;
	}
});

function startTouchHandler(ev) {
	if (mNectarGame.isUserTurn == true) {
		
		

		mNectarGame.betSliderAdjustFlag = true;
		mNectarGame.swipeTriggerValue = 0;
	}

}
//added a mouse event and 
//adding the even listeners to the divs. the betSlider thing is to make the snapping back action work. it makes the whole screen releasable. Immediatly after, it makes it not clickable to prevent bugs later on
element.addEventListener("touchstart", startTouchHandler);
element.addEventListener("mousedown", startTouchHandler);

var element2 = document.getElementById('game-container');

//this is split into an if statement for round 1 because of the tutorial. If there was no tutorial, you wouldn't need the seperation and extra if/else
function endTouchHandler(ev) {
	if (currentRound == 1) {
		//this is where all the tutorial 2 stuff is happening... tut 1 stuff is in the html to start immediately :)
		document.getElementById("tuttext").innerHTML = "swipe left to place your bet";
		document.getElementById("tut-arrow-down").style.visibility = "hidden";
		document.getElementById("tuthand").className = "sprite tuthand tuthandanim2";
		document.getElementById("tut-arrow-up").className = "sprite tutarrow tutarrowanimup2";
		document.getElementById("tut-arrow-down").className = "sprite tutarrow";
		document.getElementById("tutfade").style.visibility = "hidden";
		
		if (mNectarGame.isUserTurn == true) {
			document.getElementById("fallingchips").className = "sprite chipsIndividual_iPhone";
			document.getElementById("fallingchips2").className = "sprite chipsIndividual_iPhone";
			document.getElementById("fallingchips3").className = "sprite chipsIndividual_iPhone";



			if (mNectarGame.betSliderAdjustFlag == true && mNectarGame.isPlayerBetAnimating == false) {
		   		document.getElementById("player3chipstobet").style.left = 476 + "px";
				document.getElementById("player3chipstobet").className = "player3chipstobet";
				mNectarGame.betSliderAdjustFlag = false;
			}
		}
	} else {
		
		if (mNectarGame.isUserTurn == true) {
			
			//test this some more... might be buggy. TO DO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			document.getElementById("tut-arrow-up").style.visibility = "hidden";
			document.getElementById("tut-arrow-down").style.visibility = "hidden";
			

			document.getElementById("fallingchips").className = "sprite chipsIndividual_iPhone";
			document.getElementById("fallingchips2").className = "sprite chipsIndividual_iPhone";
			document.getElementById("fallingchips3").className = "sprite chipsIndividual_iPhone";



			if (mNectarGame.betSliderAdjustFlag == true && mNectarGame.isPlayerBetAnimating == false) {
		   		document.getElementById("player3chipstobet").style.left = 476 + "px";
				document.getElementById("player3chipstobet").className = "player3chipstobet";
				mNectarGame.betSliderAdjustFlag = false;
			}
		}
	}

	
}

var usersTurnNow = function(){
	//all player flags are set to false so that they can be set to true once the next round is played:
	//console.log("all previous round's flags are now set to false");
	mNectarGame.currentBet = mNectarGame.minimumBet;
	document.getElementById("player3chipstobet").innerHTML = "$" + mNectarGame.currentBet;
	//chips
	document.getElementById("chipsstack1").style.top = 270 + "px";
	document.getElementById("chipsstack2").style.top = 270 + "px";
	document.getElementById("chipsstack3").style.top = 270 + "px";
	//chips value
	document.getElementById("player3chipstobet").style.top = 200 + "px";

	didPlayer1Call = false;
	didPlayer2Call = false;
	didUserCall = false;

	didPlayer1Check = false;
	didPlayer2Check = false;
	didUserCheck = false;

	//let the betting.... begin!
	mNectarGame.isUserTurn = true;
	//add the arrow animation here
	
	showUserUI();
	//to make sure the new value is stored
}

element2.addEventListener("touchend", endTouchHandler);
element2.addEventListener("mouseup", endTouchHandler);
//declare all other IDs as variables that will be repeated...
//player elements:
var playerHighlightBottom = document.getElementById("playerHighlight-bottom");
var playerHighlightTop = document.getElementById("playerHighlight-top");
var checkCircle = document.getElementById("checkcircle");
var betCircle = document.getElementById("betcircle");
var userStatus = document.getElementById("playerstatus");
var meter = document.getElementById("meter-color");
var chips = document.getElementById("player3chipstobet");

var potchips = document.getElementById("pot-chips");
var chipsaddtopot = document.getElementById("chipstobetanimation");
//table cards:
var firstTableCard = document.getElementById("firstcard");
var secondTableCard = document.getElementById("secondcard");
var thirdTableCard = document.getElementById("thirdcard");
var fourthTableCard = document.getElementById("fourthcard");
var fifthTableCard = document.getElementById("fifthcard");
var tableCardArray = [secondTableCard, thirdTableCard, fourthTableCard, fifthTableCard];
//overlays for when the player either looses or is folding:
var player1overlay = document.getElementById("player1overlay");
var player2overlay = document.getElementById("player2overlay");
//player 1 elements:
var player1Status = document.getElementById("player1status");
var player1bet = document.getElementById("player1bet");
//player 2 elements:
var player2Status = document.getElementById("player2status");

var currentCardNumber = 0;


//adds the animation class incrimentally
var showNextCard = function(){
	
    tableCardArray[currentCardNumber].className += " showcardnext";
    
    currentCardNumber += 1;

    console.log("card " + (currentCardNumber+1) + " is shown.");
	
    if (currentCardNumber == 4) {
    	bigWin();
    }

}

updateNumbers();

calculateCurrentBank();

//turn-based function for rounds:
var currentRound = 1;
console.log("currentRound: " + currentRound);
//this will not become available until round 3:
checkCircle.style.visibility = "hidden";

var goToNextRound = function(){

	if (currentRound == 1) {
		document.getElementById("tut-arrow-up").style.visibility = "hidden";
		//this is the AI's turn
		//Player2 goes
		updatePlayer1("call");

		calculatePlayer1Bank();
		
		player1Status.innerHTML = "Call";
		player1Status.className += " playerstatus-anim";
		player1bet.className += " playerbet-anim";

		//Player2 goes
		setTimeout(function(){
			updatePlayer2("check");
			
			calculatePlayer2Bank();
			
			
			player2Status.innerHTML = "Check";
			player2Status.className += " playerstatus-anim";
			player2bet.style.visibility = "hidden";
		}, 1500);


		setTimeout(function(){ 

			//console.log(didUserCall, didPlayer1Call, didPlayer2Check)
			if (didUserCall && didPlayer1Call && didPlayer2Check) {
				firstTableCard.className = "sprite tablecard1 firstcardshow";

				showNextCard();

 				showNextCard();

 				//TO DO: Put in a delay for this because it shows up early!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				userStatus.innerHTML = "You have 3 of a kind";
				// meter - TO DO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			} else if (didPlayer1Call && didPlayer2Check){
				firstTableCard.className = "sprite tablecard1 firstcardshow";
				
				//showNextCard();

				userStatus.innerHTML = "You have a pair";
				// meter - TO DO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
			
		}, 3500);

		setTimeout(function(){
			potchips.className += " potchipsfadeinanim";
			chipsaddtopot.className += " chipsmovetopot";
			document.getElementById("player3chipstobet-endvalue").className = " ";
			document.getElementById("playerstatus-endvalue").className = " ";
		}, 4000);
		//player1s turn again according to video.... else if client asks, comment out until "This is the user's turn and change timeout to 3000"
		setTimeout(function(){
			updatePlayer1("check");

			player1Status.innerHTML = "Check";
			player1Status.className += " playerstatus-anim";
			player1bet.style.visibility = "hidden";
		}, 5500);
		//player2s turn again according to video....
		setTimeout(function(){
			player2bet.style.visibility = "visible";
			
			//you can set the minimum bet to be different for each round :)
			mNectarGame.minimumBet = 400;

			updatePlayer2("bet");

			//calculatePlayer2Bank();


			player2Status.innerHTML = "Bet";
			player2Status.className += " playerstatus-anim";
			player2bet.className += " playerbet-anim";

		}, 7000);

		//This is the user's turn:
		setTimeout(function(){
			usersTurnNow();	

		}, 7500);	
	}




//problem: 1. first card doesnt show up 2. player 1 overlay class and FOLD?




	// if (currentRound == 2) {
	// 	console.log("currentRound: " + currentRound);
	// 	mNectarGame.isUserTurn = false;
	// 	//this is the AI's turn:
	// 	//player1:
	// 	//console.log("did the user call: " + didUserCall)
	// 	showNextCard();
		
	// 	setTimeout(function(){ 
	// 		updatePlayer1("fold");
	// 		calculatePlayer1Bank();

	// 		player1Status.innerHTML = "Fold";
	// 	}, 1000);

	// 	//player2:
	// 	setTimeout(function(){ 
	// 		updatePlayer2("call");
	// 		calculatePlayer2Bank();

	// 		player2Status.innerHTML = "Call";
	// 		player2Status.className += " playerstatus-anim";
	// 		player2bet.className += " playerbet-anim";
	// 		//check to see which card needs to be shown next...
	// 		showNextCard();
	// 	}, 2000);
	// 	//chips are added to the pot before the next round starts with player 2
	// 	setTimeout(function(){ 
	// 		potchips.className += " potchipsfadeinanim";
	// 		chipsaddtopot.className += " chipsmovetopot";
	// 		document.getElementById("player3chipstobet-endvalue").className = " ";
	// 		document.getElementById("playerstatus-endvalue").className = " ";
	// 		mNectarGame.minimumBet = 400;
	// 	}, 2500);

	// 	setTimeout(function(){ 
	// 		if (fifthTableCardShown == true) {
	// 			//console.log("big win function needs to be written that includes show down and some fun stuff")
	// 			//BigWin();
	// 		} else {
	// 			usersTurnNow();
	// 		}

	// 	}, 3000);
	// }







	// if (currentRound == 3) {
	// 	console.log("currentRound: " + currentRound);
	// 	mNectarGame.isUserTurn = false;
	// 	//this is the AI's turn:
	// 	//player2:
	// 	if (mNectarGame.currentBet === mNectarGame.credits) {
	// 		updatePlayer2("call");
	// 	}

	// 	updatePlayer2("check");
	// 	player2Status.innerHTML = "Check";
	// 	player2Status.className += " playerstatus-anim";
	// 	player2bet.style.visibility = "hidden";
	// 	showNextCard();

	// 	//Win happens:
	// 	setTimeout(function(){
	// 		//player3chipstobet-endvalue goes away

	// 		//increase-decrease-bet goes away

	// 		//playerstatus-endvalue goes away

	// 		//chipstobetanimation moves to center

	// 		//player2 shows cards

	// 		//playercards animate up, cover and shadow goes away

	// 		//playerstatus innerHTML updates to You have a full house!

	// 		//player2status innerHTML updates to a pair

	// 		//win animation happens

	// 		//if you have time:
	// 			//update player bank with pot amount 
	// 	}, 3000);
	// }

	currentRound += 1;
}