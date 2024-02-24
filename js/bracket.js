class Entry {
	constructor(name, url) {
		this.name = name;
		this.url = url;
	}
};



let bracket = [];
let round_number = 0;
let bout_number = 0;

getEntries = function(filename) {
	$.ajax({
		type: "GET",
		url: filename,
		dataType: "text",
		success: function (data) {
			processData(data);
		}
	});
	
}



processData = function(data) {
	let lines = data.split('\n');
	bracket.push([]);
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].split(',');

		// extract video id from url since yt uses a different url for embedding
		// (works for both 'youtube.com' and 'youtu.be' urls)
		let yt_id = line[1].split('/');
		yt_id = yt_id[yt_id.length - 1];
		yt_id = yt_id.split('&')[0];
		yt_id = yt_id.split('v=');
		yt_id = yt_id[yt_id.length - 1];
		yt_id = yt_id.split('\r')[0];
		
		bracket[0].push(new Entry(line[0], 'https://youtube.com/embed/' + yt_id));
	}

	console.log(bracket);

	loadRound();
}

loadRound = function() {
	if (bracket[round_number].length == 1) {
		// end of bracket
		console.log('bracket end');
		console.log(bracket);
		//cookies.set('bracket_results', JSON.stringify(bracket));
		return;
		// TODO - end of bracket screen
	}


	bracket.push([]);
	$('#round').text('Round of ' + bracket[round_number].length);
	bout_number = 0;
	loadBout();
	
}

loadBout = function() {
	if (bout_number < bracket[round_number].length / 2) {

		if (bracket[round_number][bout_number * 2].name == 'bye' || bracket[round_number][bout_number * 2 + 1].name == 'bye') {
			// this bout is a bye, so advance the non-bye entry
			if (bracket[round_number][bout_number * 2].name == 'bye') {
				bracket[round_number + 1].push(bracket[round_number][bout_number * 2 + 1]);
			}
			else {
				bracket[round_number + 1].push(bracket[round_number][bout_number * 2]);
			}
			
			// load next bout
			bout_number++;
			loadBout();
		}
		else {
			// load bout
			$('#video1').attr('src', bracket[round_number][bout_number * 2].url);
			$('#entry1-name').text(bracket[round_number][bout_number * 2].name);
			$('#video2').attr('src', bracket[round_number][bout_number * 2 + 1].url);
			$('#entry2-name').text(bracket[round_number][bout_number * 2 + 1].name);
		}
	}
	else {
		// load next round
		round_number++;
		loadRound();
	}
}

selectEntry = function(entry) {
	// idk if this works lol, may need to be fixed later
	$('.selected').removeClass('selected');
	$(entry).addClass('selected');
	
}


confirmWinner = function() {
	if ($('.selected').length == 0) {
		// no winner has been selected
		alert('Please select a winner.');
		return;
	}
	else if ($('.selected').length > 1) {
		// multiple winners have been selected (this should never happen but better safe than sorry)
		alert('Please select only one winner.');
		return;
	}
	else {
		// winner has been selected
		if ($('.selected').text() == bracket[round_number][bout_number * 2].name) {
			// winner is entry 1
			bracket[round_number + 1].push(bracket[round_number][bout_number * 2]);
		}
		else {
			// winner is entry 2
			bracket[round_number + 1].push(bracket[round_number][bout_number * 2 + 1]);
		}

		//console.log(bracket[round_number + 1]);

		// load next bout
		bout_number++;
		loadBout();
	}
}
