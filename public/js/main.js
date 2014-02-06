'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    // highlight appropriate nav item
    var pathStart = location.pathname.split('/')[1];
    if (pathStart === '') {
        pathStart = 'index';
    }
    console.log(pathStart);
	$('#' + pathStart + '-nav').addClass("active");
}