class Entry {
	constructor(name, url) {
		this.name = name;
		this.url = url;
	}
};



let bracket = [];
let round_number = 0;
let bout_number = 0;
let bracketName = 's5-ride-themes';

const bracketTitle = $('#bracket-title').text()

getEntries = function(filename) {
	bracketName = filename.split('.')[0];

	$.ajax({
		type: "GET",
		url: '../../data/' + filename,
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
		let line = lines[i].split('\t');

		if (line.length != 2) {
			// not a line with name and url, so we can ignore it
			continue;
		}

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
		console.log(JSON.stringify(bracket));
		showcaseWinner();

		return;
	}


	bracket.push([]);
	$('#round').text('Round of ' + bracket[round_number].length);
	bout_number = 0;
	loadBout();
	
}

loadBout = function() {
	clearSelection();

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

		$('#bout_number').text('Bout ' + (bout_number + 1) + ' of ' + (bracket[round_number].length / 2));
	}
	else {
		// load next round
		round_number++;
		loadRound();
	}
}

selectEntry = function(entry) {
	$('.selected').removeClass('selected');
	$(entry).addClass('selected');
	
}

clearSelection = function() {
	$('.selected').removeClass('selected');
}

confirmWinner = function() {
	if ($('.selected').length == 0) {
		// no winner has been selected
		alert('Please select a winner.');
		return;
	}
	else if ($('.selected').length > 1) {
		// multiple winners have been selected (this should never be able to happen, but better safe than sorry)
		alert('Please select only one winner.');
		return;
	}
	else {
		// winner has been selected
		if ($('#entry1').hasClass('selected')) {
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

showcaseWinner = function() {
	$('#bracket-container').html('');
	$('#bracket-container').attr('id', 'winner-showcase');
	$('#winner-showcase').html(`
        <h2>And the winner is...</h2>
        <div id="entry-winner">
            <iframe id="video-winner" width="560" height="315" src="${bracket[round_number][0].url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <h4 id="winner-name">${bracket[round_number][0].name}</h4>
        </div>
        <div class="button-container">
            <a href="../../" class="button">Home</a>
			<button class="button" onclick="viewBracket();">View Bracket</button>
		</div>
		<div id="overlay2" >
        <div id ="canvas-container">
            <canvas id="bracket-canvas" width="100" height="100"></canvas>
            
        </div>
        <div class="clickable1" onclick="$('#overlay2').css('visibility', 'hidden');"></div>
        <div class="clickable2" onclick="$('#overlay2').css('visibility', 'hidden');"></div>
        <div class="clickable3" onclick="$('#overlay2').css('visibility', 'hidden');"></div>
        <div class="clickable4" onclick="$('#overlay2').css('visibility', 'hidden');">
            <p>RIGHTCLICK bracket to save as an image.</p>
            <p>LEFTCLICK empty space to return.</p>
        </div>
    </div>`

	);
}

viewBracket = function() {
	data = bracket;

	$('#overlay2').css('visibility', 'visible');

	const titleFont = '64px Arial Black';
	const subtitleFont = 'bold 32px Arial';
	const watermarkFont = '16px Arial';
	const font = ' bold 16px Arial';
	const vPadding = 150;
	const hPadding = 100;
	const entryWidths = getEntryWidths(data, font);
	const entryHeight = getEntryHeight(data, font);
	const roundGap = 80;
	const lineWidth = 4;
	const entryHPadding = 5;
	const entryVPadding = 5;
	const boutGap = 20;
	const entryGap = 4;

	const xpos_default = hPadding;
	const ypos_default = 1.5 * vPadding;


	const canvasWidth = 
		hPadding * 2 + 
		getSum(entryWidths) + 
		entryWidths.length * entryHPadding * 2 + 
		roundGap * (data.length - 1);

	console.log(canvasWidth);

	const canvasHeight = 
		vPadding * 2 + 
		data[0].length * entryHeight + 
		entryVPadding * data[0].length * 2 + 
		entryGap * data[0].length / 2 + 
		boutGap * data[0].length / 2 + 1;

	console.log(canvasHeight);

	$('#bracket-canvas').attr('width', canvasWidth).attr('height', canvasHeight);

	const ctx = document.getElementById('bracket-canvas').getContext('2d');
	ctx.font = font;


	// 1 - Create gradient background
	const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
	gradient.addColorStop(0, 'rgb(0, 0, 0)');
	gradient.addColorStop(0.1, 'rgb(0, 0, 15)');
	gradient.addColorStop(0.2, 'rgb(2, 0, 36)');
	gradient.addColorStop(0.7, 'rgb(150, 20, 20)');
	gradient.addColorStop(.95, 'rgb(255, 0, 26)');

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	ctx.fillStyle = 'rgba(200, 160, 90, .13)';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);


	// 2 - Create bracket lines
	ctx.strokeStyle = 'black';
	ctx.lineWidth = lineWidth;

	let xpos = xpos_default;
	let ypos = ypos_default;
	let dynamicBoutGap = boutGap;

	ctx.beginPath();

	for (let i = 0; i < data.length - 1; i++) {
		let x = xpos;
		let widthsum = 0;
		for (let k = 0; k < i; k++) {
			widthsum += entryWidths[k];
		}
		x += i * (roundGap + 2 * entryHPadding) + widthsum;

		let dynamicBoutGap = 
			entryHeight * Math.pow(2, i) +
			entryVPadding * Math.pow(2, i+1) +
			entryGap * Math.pow(2, i-1) +
			boutGap * Math.pow(2, i-1);
		let y = ypos + dynamicBoutGap;
		for (let j = 0; j < data[i].length; j+=2) {
			let yoffset = dynamicBoutGap / 2;
			let xoffset = entryWidths[i] + entryHPadding;

			ctx.moveTo(x + xoffset, y - yoffset);
			ctx.lineTo(x + xoffset + entryHPadding + roundGap / 2, y - yoffset);
			
			ctx.lineTo(x + xoffset + entryHPadding + roundGap / 2, y + yoffset);
			ctx.lineTo(x + xoffset, y + yoffset);

			ctx.moveTo(x + xoffset + entryHPadding + roundGap / 2, y)
			ctx.lineTo(x + xoffset + entryHPadding * 2+ roundGap, y);

			y += 2 * dynamicBoutGap;
			
		}
	}

	ctx.stroke();

	
	// 3 - Create entry backgrounds
	ctx.strokeStyle = 'rgb(230, 230, 230)';
	ctx.lineWidth = entryHeight + entryHPadding * 2;
	ctx.lineCap = 'round';
	

	xpos = xpos_default;
	ypos = ypos_default;
	dynamicBoutGap = boutGap;

	ctx.beginPath();

	for (let i = 0; i < data.length; i++) {
		// x calculation formula is correct, do not change
		let x = xpos;
		let widthsum = 0;
		for (let k = 0; k < i; k++) {
			widthsum += entryWidths[k];
		}
		x += i * (roundGap + 2 * entryHPadding) + widthsum;

		let dynamicBoutGap = 
			entryHeight * Math.pow(2, i) +
			entryVPadding * Math.pow(2, i+1) +
			entryGap * Math.pow(2, i-1) +
			boutGap * Math.pow(2, i-1);
		let y = ypos + dynamicBoutGap;
		for (let j = 0; j < data[i].length; j+=2) {
			let yoffset = dynamicBoutGap / 2;
			
			if (i < data.length - 1) {
				ctx.moveTo(x, y - yoffset);
				ctx.lineTo(x + entryWidths[i] + entryHPadding * 2, y - yoffset);
			
				ctx.moveTo(x, y + yoffset);
				ctx.lineTo(x + entryWidths[i] + entryHPadding * 2, y + yoffset);
			}
			else {
				ctx.moveTo(x, y - yoffset);
				ctx.lineTo(x + entryWidths[i] + entryHPadding * 2, y - yoffset);
			}

			y += 2 * dynamicBoutGap;
			
		}
	}

	ctx.stroke();


	// 4 - Create entry name text
	ctx.fillStyle = 'rgb(150, 20, 20)';
	ctx.textAlign = 'center';
	
	xpos = xpos_default;
	ypos = ypos_default;
	dynamicBoutGap = boutGap;

	for (let i = 0; i < data.length; i++) {
		let x = xpos;
		let widthsum = 0;
		for (let k = 0; k < i; k++) {
			widthsum += entryWidths[k];
		}
		x += i * (roundGap + 2 * entryHPadding) + widthsum;

		let dynamicBoutGap = 
			entryHeight * Math.pow(2, i) +
			entryVPadding * Math.pow(2, i+1) +
			entryGap * Math.pow(2, i-1) +
			boutGap * Math.pow(2, i-1);
		let y = ypos + dynamicBoutGap;
		for (let j = 0; j < data[i].length; j+=2) {
			let yoffset = dynamicBoutGap / 2;

			if (i < data.length - 1) {
				ctx.fillText(
					data[i][j].name, 
					x + entryWidths[i] / 2 + entryHPadding, 
					y - yoffset + (entryHeight - entryVPadding) / 2
				);

				ctx.fillText(
					data[i][j+1].name, 
					x + entryWidths[i] / 2 + entryHPadding, 
					y + yoffset + (entryHeight - entryVPadding) / 2
				);
			} else {
				// last entry
				ctx.fillText(
					data[i][j].name, 
					x + entryWidths[i] / 2 + entryHPadding, 
					y - yoffset + (entryHeight - entryVPadding) / 2
				);
			}

			y += 2 * dynamicBoutGap;
			
		}
	}


	// 5 - Create bracket title and subtitle (top right)
	title = getTitle();
	ctx.font = titleFont;
	ctx.fillStyle = 'white';
	ctx.textAlign = 'right';
	
	const titleHeight = getHeight(ctx, title);

	const rightPadding = 60;
	const topPadding = 10;

	ctx.fillText(
		title, 
		canvasWidth - rightPadding, 
		topPadding + titleHeight
		);

	subtitle = getSubtitle(bracketName);
	ctx.font = subtitleFont;
	const subtitleHeight = getHeight(ctx, subtitle);
	
	ctx.fillText(
		subtitle, 
		canvasWidth - rightPadding, 
		topPadding + titleHeight + subtitleHeight + 10
		);
	

	// 6 - Create watermark (bottom right)
	ctx.font = watermarkFont;
	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
	const watermark = 'jacob-ressler.github.io/pmm';
	const watermarkHeight = getHeight(ctx, watermark);

	ctx.fillText(
		watermark, 
		canvasWidth - rightPadding/2, 
		canvasHeight - (watermarkHeight + topPadding)
		);
}



getEntryWidths = function(data, font) {
	let entryWidths = [];
	const canvas = document.createElement('canvas');
	const canvasContext = canvas.getContext('2d');
	canvasContext.font = font;

	for (let i = 0; i < data.length; i++) {
		let currMax = 0;
		for (let j = 0; j < data[i].length; j++) {
			let text = data[i][j].name;
			let w = Math.ceil(canvasContext.measureText(text).width);
			if ( w > currMax) {
				currMax = w;
			}
		}

		entryWidths.push(currMax);
	}

	return entryWidths;
}

getSum = function(arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}

	return sum;
}


getEntryHeight = function(data, fontSize) {
	let entryHeight = 0;
	const canvas = document.createElement('canvas');
	const canvasContext = canvas.getContext('2d');
	canvasContext.font = fontSize;

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			let text = data[i][j].name;
			//console.log(canvasContext.measureText(text));
			let h = Math.ceil(canvasContext.measureText(text).fontBoundingBoxAscent + canvasContext.measureText(text).fontBoundingBoxDescent);
			if ( h > entryHeight) {
				entryHeight = h;
			}
		}
	}
	// console.log(entryHeight);
	return entryHeight;
}

getHeight = function(ctx, text) {
	return Math.ceil(ctx.measureText(text).fontBoundingBoxAscent + ctx.measureText(text).fontBoundingBoxDescent);
}


getTitle = function() {
	return bracketTitle.toUpperCase();
}


getSubtitle = function(filename) {
	switch (filename.substring(0, 2)) {
		case 's1':
			return 'PMM Season 1: Favorite Pokémon';
		case 's2':
			return 'PMM Season 2: Gym Leaders';
		case 's3':
			return 'PMM Season 3: The Grab Bag';
		case 's4':
			return 'PMM Season 4: "Smush or Push"';
		case 's5':
			return 'PMM Season 5: Soundtracks';
		
	}
}