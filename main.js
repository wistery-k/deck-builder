var mp = {};

function opt(str) {
    var option = document.createElement("option");
    option.text = str;
    option.value = str;
    return option;
}

function setCardText(s) {
    if(s.selectedIndex >= 0)
	document.getElementById("cardtext").innerHTML = mp[s.options[s.selectedIndex].value];
}

function removeSelected(s) {
    var index = s.selectedIndex;
    var o = s.options[index];
    var value = o.value;
    s.removeChild(o);
    s.selectedIndex = Math.min(index, s.options.length-1);
    setCardText(s);
    return value;
}

window.onload = function() {

    var selectBox = document.getElementById("selectbox");

    var sets = ["Theros", "BornofTheGods", "JourneyintoNyx", "Magic2015", "KlansofTarkir"];
    for(var i = 0; i < sets.length; i++) {
	$.get(sets[i] + ".html", {}, function(data) {
	    var d = new DOMParser().parseFromString(data, "text/html");
	    var cards = d.getElementsByClassName("card");
	    for(var j = 0; j < cards.length; j++) {
		cardName = cards[j].firstChild.innerText;
		mp[cardName] = cards[j].innerText.toLowerCase();

		selectBox.add(opt(cardName));
	    }
	});
    }

    var mainDeck = document.getElementById("maindeck");
    var sideBoard = document.getElementById("sideboard");
    var cardText = document.getElementById("cardtext");

    selectBox.addEventListener("keydown", function(e) {
	if(e.keyCode === 13) { // Enter Key
	    var box = (e.shiftKey || e.ctrlKey) ? sideBoard : mainDeck;
	    box.add(opt(selectBox.options[selectBox.selectedIndex].value));
	    if(box.selectedIndex < 0) box.selectedIndex = 0;
	}
    });

    selectBox.addEventListener("dblclick", function(e) {
	mainDeck.add(opt(selectBox.options[selectBox.selectedIndex].value));
	if(mainDeck.selectedIndex < 0) mainDeck.selectedIndex = 0;
    });

    selectBox.addEventListener("change", function(e) {
	setCardText(selectBox);
    });

    selectBox.addEventListener("focus", function(e) {
	setCardText(selectBox);
    });

    mainDeck.addEventListener("keydown", function(e) {
	if(e.keyCode === 13) { // Enter Key
	    var name = removeSelected(mainDeck);
	    if((e.shiftKey || e.ctrlKey)) {
		sideBoard.add(opt(name));
		if(sideBoard.selectedIndex < 0) sideBoard.selectedIndex = 0;
	    }
	}
    });

    mainDeck.addEventListener("dblclick", function(e) {
	removeSelected(mainDeck);
    });

    mainDeck.addEventListener("change", function(e) {
	setCardText(mainDeck);
    });

    mainDeck.addEventListener("focus", function(e) {
	setCardText(mainDeck);
    });

    sideBoard.addEventListener("keydown", function(e) {
	if(e.keyCode === 13) { // Enter Key
	    var name = removeSelected(sideBoard);
	    if((e.shiftKey || e.ctrlKey)) {
		mainDeck.add(opt(name));
		if(mainDeck.selectedIndex < 0) mainDeck.selectedIndex = 0;
	    }
	}
    });

    sideBoard.addEventListener("dblclick", function(e) {
	removeSelected(sideBoard);
    });

    sideBoard.addEventListener("change", function(e) {
	setCardText(sideBoard);
    });

    sideBoard.addEventListener("focus", function(e) {
	setCardText(sideBoard);
    });

    var search = $("#search");

    search.on("textchange", function(e, prevText) {
	while(selectBox.lastChild) selectBox.removeChild(selectBox.lastChild);

	var q = this.value.trim().toLowerCase().split(/\s/);
	for(key in mp) {
	    if(q.length == 1 && q[0] == "") {
		selectBox.add(opt(key));
	    }
	    else {
		var ok = true;
		for(var i = 0; i < q.length ; i++) {
		    if(mp[key].indexOf(q[i]) == -1) {
			ok = false;
			break;
		    }
		}
		if(ok) selectBox.add(opt(key));
	    }
	}
	selectBox.selectedIndex = 0;
	setCardText(selectBox);
    });

    search.focus();

    $("#exportbutton").on("click", function(e) {
	alert("Not Implemented");
    });

};