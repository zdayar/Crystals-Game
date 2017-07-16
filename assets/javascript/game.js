$(document).ready(function () {

    var crystalsGame = {
        wins: 0,                        // keep track of # of wins here
        losses: 0,                      // keep track of # of losses here
        targetNum: 0,                   // the target number to try to match this round
        crystalVals: [0,0,0,0],         // the random values assigned to the 4 crystals for this round
        userScore: 0,                   // user's current score this round

        initRound: function() {
            var crystalVal;

            // hide the play button
            $("#play-button").hide();

            // reset user score for the round and display
            this.userScore = 0;
            $("#your-score").text(this.userScore);

            // generate target number between 19 and 120 and display
            this.targetNum = Math.floor((Math.random() * 102) + 19);
            $("#target-number").text(this.targetNum);

            // for each of the 4 crystals, generate a random value between 1 and 12
            for (var i=0; i<4; i++){
                crystalVal = Math.floor((Math.random() * 12) + 1);
                // make sure the values for the 4 crystals are unique
                while (this.crystalVals.indexOf(crystalVal) !== -1) {
                    crystalVal = Math.floor((Math.random() * 12) + 1);
                }

                // ok we got a unique one
                this.crystalVals[i] = crystalVal;
            }

            // display wins and losses
            $("#wins").text(this.wins);
            $("#losses").text(this.losses);

            // display message of good luck
            $("#play-message").text("Good Luck!");

            // enable the crystal buttons
            $(".btn-group .btn").prop("disabled", false);
        },

        processWin: function () {
            // display message for the winner, increment wins and display
            $("#play-message").text("Good Job! You Win!");
            this.wins++;
            $("#wins").text(this.wins);

            this.endRound();
        },

        processLoss: function () {
            // put up message for the loser, increment losses and display
            $("#play-message").text("Sorry! You lose.");
            this.losses++;
            $("#losses").text(this.losses);

            this.endRound();
        },

        endRound: function() {
            // Show "play" button
            $("#play-button").show();

            // disable crystal buttons until next round starts
            $(".btn-group .btn").prop("disabled", true);
        }
    };

    crystalsGame.initRound();

    // click handler for "Play" button to start new rounds
    $("#play-button").on("click", function() {
        crystalsGame.initRound();
    });

    // click handler for the crystal buttons
    $(".btn-group .btn").on("click", function() {
        var crystalIndex;

        // id of these buttons is of the form "crystalx" where x is an index 0-3
        crystalIndex = this.id.replace("crystal","");                       // extract the index
        crystalsGame.userScore += crystalsGame.crystalVals[crystalIndex];   // add crystal value to the running score
        $("#your-score").text(crystalsGame.userScore);                      // display user score

        // See if they matched the target or went above and end game if one of those things happened;
        // if neither, round continues
        if (crystalsGame.userScore === crystalsGame.targetNum) {
            crystalsGame.processWin();
        }
        else if (crystalsGame.userScore > crystalsGame.targetNum) {
            crystalsGame.processLoss();
        }
    });

});