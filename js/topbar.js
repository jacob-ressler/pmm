
// TODO - remove comment tags once Brackets and Videos pages are set up. Maybe drop the Brackets page since it could be unnecessarily redundant.
createTopBar = function(backdirs = '') {
    $('#top-bar').html(`
    <div class="nav-left">
            <div id="hamburger" class="nav-item" onclick="toggleSidebar()">
                <i class="fa-solid fa-bars"></i>
            </div>
            <a id="logo" class="nav-item" href="${backdirs}">
                <img src="${backdirs}img/pmm_logo_2.png" alt="HOME">
                <div>PMM</div>
            </a>
        </div>
        <div class="nav-middle"></div>
        <div class="nav-right">
            <!-- TODO - remove comment tags once Brackets and Videos pages are set up. Maybe drop the Brackets page since it could be unnecessarily redundant. -->
            <!--
            <a href="${backdirs}brackets" class="nav-item">BRACKETS</a>
            <a href="${backdirs}videos" class="nav-item">VIDEOS</a>
            -->
        </div>`
    );
}