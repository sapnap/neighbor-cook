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
  $('#' + pathStart + '-nav').addClass("active");
  $('#' + pathStart + '-nav a').attr('href', '#');

  $('#sendMessageButton').click(sendEmail);
  $('#searchBtn').click(performSearch);
  $('#searchQuery').keypress(function (e) {
	  // press enter key on search box
	  if (e.which == 13) {
	    $('#searchBtn').click();
	    return false;
	  }
	});
}

function sendEmail(e) {
	var subject = $("#messageSubject").val();
	var body = $("#messageBody").val();
	var email = $("#messageEmail").text();
	var url = "mailto:" + email + "?subject=" + subject + "&body=" + body; 
	console.log(subject, body, email, url);
	window.open(url,'_blank');
}

function performSearch(e) {
	var query = $("#searchQuery").val();
	if (query === "") return;
	
	$.get('/search?query=' + query, function(data) {
		var repString = "";
		for (var i = 0; i < data.results.length; i++) {
			repString += '<a href="/profile/' + data.results[i].id + '"" class="list-group-item">';
			repString += '<h5 class="list-group-item-heading">' + data.results[i].first_name + ' ' + data.results[i].last_name + '</h5>';
			repString += '<p class="list-group-item-text">' + data.results[i].location + '</p>';
			repString += '</a>';
		}
		// Very hacky, but hopefully this will get better if we move to Angular
		var htmlString = 
		'<div id="searchTemplate">' +
	  	'<div class="list-group">' + 
	  	'<p>Your search for <strong>' + query + '</strong> returned ' + data.results.length +' results.</p>' + 
	  			repString
  		'</div>' +
		'</div>';
		$("#searchResults").html(htmlString);
	});
}

// HTML for search results
// <div id="searchTemplate">
//   <div class="list-group">
//   <p>Your search for <strong>{{query}}</strong> returned {{results.length}} results:</p>
//   {{#each results}}
//       <a href="/profile/{{id}}" class="list-group-item">
//         <h5 class="list-group-item-heading">{{first_name}}</h5>
//         <img src="{{img_path}}"></img>
//         <p class="list-group-item-text">{{location}}</p>
//       </a>
//   {{/each}}
//   <!-- TODO: support infinite scroll -->
//   </div>
// </div>