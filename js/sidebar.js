
// TODO - remove comment tags after Seasons 1-4 have working brackets
createSidebar = function(backdirs = '') {
    $('#side-bar').html(`        
    <!-- TODO - remove comment tags after Seasons 1-4 have working brackets -->
    <!--
    <div id="season-1" class="side-bar-item-container">
        <div class="side-bar-item">
            <div class="dropdown-toggle" onclick="toggleDropdown('season-1-dropdown')">
                <div class="dropdown-text">
                    <h1>Season 1 (2020)</h1>
                    <p>Pokémon by Generation</p>
                </div>
                <i id="season-1-dropdown-arrow" class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div id="season-1-dropdown" class="side-bar-expandable-container hidden">
            <a href="${backdirs}s1/gen1" class="side-bar-expandable">Generation 1</a>
            <a href="${backdirs}s1/gen2" class="side-bar-expandable">Generation 2</a>
            <a href="${backdirs}s1/gen3" class="side-bar-expandable">Generation 3</a>
            <a href="${backdirs}s1/gen4" class="side-bar-expandable">Generation 4</a>
            <a href="${backdirs}s1/gen5" class="side-bar-expandable">Generation 5</a>
            <a href="${backdirs}s1/gen6" class="side-bar-expandable">Generation 6</a>
            <a href="${backdirs}s1/gen7" class="side-bar-expandable">Generation 7</a>
            <a href="${backdirs}s1/gen8" class="side-bar-expandable">Generation 8</a>
        </div>
    </div>
    <div id="season-2" class="side-bar-item-container">
        <div class="side-bar-item">
            <div class="dropdown-toggle" onclick="toggleDropdown('season-2-dropdown')">
                <div class="dropdown-text">
                    <h1>Season 2 (2021)</h1>
                    <p>Gym Leaders</p>
                </div>
                <i id="season-2-dropdown-arrow" class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div id="season-2-dropdown" class="side-bar-expandable-container hidden">
            <a href="${backdirs}s2/gen1" class="side-bar-expandable">Generation 1</a>
            <a href="${backdirs}s2/gen2" class="side-bar-expandable">Generation 2</a>
            <a href="${backdirs}s2/gen3" class="side-bar-expandable">Generation 3</a>
            <a href="${backdirs}s2/gen4" class="side-bar-expandable">Generation 4</a>
            <a href="${backdirs}s2/gen5" class="side-bar-expandable">Generation 5</a>
            <a href="${backdirs}s2/gen6" class="side-bar-expandable">Generation 6</a>
            <a href="${backdirs}s2/gen7" class="side-bar-expandable">Generation 7</a>
            <a href="${backdirs}s2/gen8" class="side-bar-expandable">Generation 8</a>
        </div>
    </div>
    <div id="season-3" class="side-bar-item-container">
        <div class="side-bar-item">
            <div class="dropdown-toggle" onclick="toggleDropdown('season-3-dropdown')">
                <div class="dropdown-text">
                    <h1>Season 3 (2022)</h1>
                    <p>The Grab Bag</p>
                </div>
                <i id="season-3-dropdown-arrow" class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div id="season-3-dropdown" class="side-bar-expandable-container hidden">
            <a href="${backdirs}s3/gen1" class="side-bar-expandable">Generation 1</a>
            <a href="${backdirs}s3/gen2" class="side-bar-expandable">Generation 2</a>
            <a href="${backdirs}s3/gen3" class="side-bar-expandable">Generation 3</a>
            <a href="${backdirs}s3/gen4" class="side-bar-expandable">Generation 4</a>
            <a href="${backdirs}s3/gen5" class="side-bar-expandable">Generation 5</a>
            <a href="${backdirs}s3/gen6" class="side-bar-expandable">Generation 6</a>
            <a href="${backdirs}s3/gen7" class="side-bar-expandable">Generation 7</a>
            <a href="${backdirs}s3/gen8" class="side-bar-expandable">Generation 8</a>
        </div>
    </div>
    <div id="season-4" class="side-bar-item-container">
        <div class="side-bar-item">
            <div class="dropdown-toggle" onclick="toggleDropdown('season-4-dropdown')">
                <div class="dropdown-text">
                    <h1>Season 4 (2023)</h1>
                    <p>Pokémon "Smush or Push"</p>
                </div>
                <i id="season-4-dropdown-arrow" class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div id="season-4-dropdown" class="side-bar-expandable-container hidden">
            <a href="${backdirs}s4/gen1" class="side-bar-expandable">Generation 1</a>
            <a href="${backdirs}s4/gen2" class="side-bar-expandable">Generation 2</a>
            <a href="${backdirs}s4/gen3" class="side-bar-expandable">Generation 3</a>
            <a href="${backdirs}s4/gen4" class="side-bar-expandable">Generation 4</a>
            <a href="${backdirs}s4/gen5" class="side-bar-expandable">Generation 5</a>
            <a href="${backdirs}s4/gen6" class="side-bar-expandable">Generation 6</a>
            <a href="${backdirs}s4/gen7" class="side-bar-expandable">Generation 7</a>
            <a href="${backdirs}s4/gen8" class="side-bar-expandable">Generation 8</a>
        </div>
    </div>
    -->

    <div id="season-5" class="side-bar-item-container">
        <div class="side-bar-item">
            <div class="dropdown-toggle" onclick="toggleDropdown('season-5-dropdown')">
                <div class="dropdown-text">
                    <h1>Season 5 (2024)</h1>
                    <p>Pokémon Soundtracks</p>
                </div>
                <i id="season-5-dropdown-arrow" class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div id="season-5-dropdown" class="side-bar-expandable-container hidden">
            <a href="${backdirs}s5/areas-of-interest" class="side-bar-expandable">Areas of Interest</a>
            <a href="${backdirs}s5/champion-battles" class="side-bar-expandable">Champion Battles</a>
            <a href="${backdirs}s5/elite-four-battles" class="side-bar-expandable">Elite Four Battles</a>
            <a href="${backdirs}s5/evil-team-battles" class="side-bar-expandable">Evil Team Battles</a>
            <a href="${backdirs}s5/gym-leader-battles" class="side-bar-expandable">Gym Leader Battles</a>
            <a href="${backdirs}s5/legendary-mythical-battles" class="side-bar-expandable">Legendary &amp; Mythical Battles</a>
            <a href="${backdirs}s5/mystery-dungeons" class="side-bar-expandable">Mystery Dungeons</a>
            <a href="${backdirs}s5/npc-themes" class="side-bar-expandable">NPC Themes</a>
            <a href="${backdirs}s5/ride-themes" class="side-bar-expandable">Ride Themes</a>
            <a href="${backdirs}s5/rival-battles" class="side-bar-expandable">Rival Battles</a>
            <a href="${backdirs}s5/routes-wild-areas" class="side-bar-expandable">Routes &amp; Wild Areas</a>
            <a href="${backdirs}s5/towns" class="side-bar-expandable">Towns</a>
            <a href="${backdirs}s5/trainer-battles" class="side-bar-expandable">Trainer Battles</a>
            <a href="${backdirs}s5/wild-battles" class="side-bar-expandable">Wild Battles</a>
            <a href="${backdirs}s5/miscellaneous" class="side-bar-expandable">Miscellaneous Tracks</a>
            </div>
    </div>
    <div id= "side-bar-bottom"></div>`
    );
    
}

toggleSidebar = function() {
	if ($('#side-bar').hasClass('hidden')) {
		$('#side-bar').removeClass('hidden');
		$('.overlay').css('visibility', 'visible');
	}
	else {
		$('#side-bar').addClass('hidden');
		$('.overlay').css('visibility', 'hidden');
	}
}

toggleDropdown = function(id) {
		$('#' + id).toggleClass('hidden');
		
		if ($('#' + id + '-arrow').hasClass('fa-caret-down')) {
			$('#' + id + '-arrow').removeClass('fa-caret-down');
			$('#' + id + '-arrow').addClass('fa-caret-up');
		}
		else {
			$('#' + id + '-arrow').removeClass('fa-caret-up');
			$('#' + id + '-arrow').addClass('fa-caret-down');
		}

}