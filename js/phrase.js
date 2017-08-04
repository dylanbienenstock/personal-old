Array.prototype.shuffle = function(last) {
    var input = this;
    var first = last;

    while (first == last) {
	    for (var i = input.length - 1; i >= 0; i--) {
	        var randomIndex = Math.floor(Math.random() * (i + 1)); 
	        var itemAtIndex = input[randomIndex];
	         
	        input[randomIndex] = input[i]; 
	        input[i] = itemAtIndex;
	    }

	    first = input[0];
	}

    return input;
}

var phrases = [
	"aspiring entrepreneur",
	"privacy fanatic",
	"coffee guzzler",
	"graphic designer",
	"avid music lover",
	"self-aware A.I.",
	"binge coder",
	"night owl",
	"free thinker",
	"game designer",
	"tech camp instructor",
	"DIY techie",
	"efficiency freak"
];

var phraseIndex = 0;
var phrasesUnshuffled = true;

var firstPhraseWait = 750;
var phraseDeleteWait = 1500;
var newPhraseWait = 500;

// Always types phrases[0] first
function typePhrase(phrase, index, backwards, wait) {
	if (index == null) {
		phrase = phrase + " }";
		index = 0;

		if (phrase == "self-aware A.I. }") {
			phrase += " // only joking";
		}
	}

	setTimeout(function() {
		if (backwards) {
			document.getElementById("phrase").innerHTML = phrase.substring(0, index);

			if (index == 0) { // Finished typing phrase
				phraseIndex++;

				if (phrasesUnshuffled != undefined) {
					phrases.shuffle(phrases[0]);
					phraseIndex = 0;
					phrasesUnshuffled = false;
				}

				if (phraseIndex == phrases.length) {
					phrases.shuffle(phrase.substring(0, phrase.length - 2));
					phraseIndex = 0;
				}

				typePhrase(phrases[phraseIndex], null, false, newPhraseWait);

				return;
			}

			typePhrase(phrase, index - 1, backwards);
		}
		else {
			document.getElementById("phrase").innerHTML += phrase.charAt(index);

			if (index == phrase.length - 1) {
				typePhrase(phrase, index, true, phraseDeleteWait);
			} else {
				typePhrase(phrase, index + 1, backwards);
			}
		}
	}, wait || (backwards ? 50 : 50 + Math.random() * 100));
}

$(function() {
	typePhrase(phrases[0], null, false, firstPhraseWait);
});