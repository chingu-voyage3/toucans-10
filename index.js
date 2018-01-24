$(document).ready(function() {
  //Materialize dropdown trigger
  $(".dropdown-button").dropdown({ hover: false });
  $(".menu-trigger").click(function(e) {
    $(".large-menu").toggleClass();
  });

  // Embed pens on the page
  embedPens();
});

// Makes calls to CodePen and renders oEmbed pens
function embedPens() {
  // RSS call to get editor picks
  var ajax = $.ajax({
    url: 'https://codepen.io/picks/feed/',
    dataType: 'xml'
  });

  var penURLs = [];

  // Return result when call is done
  return ajax.done(function(feed) {
    // Find each pen link in RSS feed
    $(feed).find("item").each(function () {
      var linkUrl = $(this).find("link").text();
      penURLs.push('url='+linkUrl);
    });
    // Get the oEmebed iframes for each pen
    getEmbedablePens(penURLs);

  });
};

// Makes a call to get the oEmbed iframes and renders them on the page
function getEmbedablePens(penURLs) {
  var penList = [];

  // Set the height of the returned iFrame
  var height = '&height=500';

  // Get iframes 
  $(penURLs).each(function(i, pURL) {
    var ajax = $.ajax({
      url: "https://codepen.io/api/oembed?",
      data: pURL + height,
      crossDomain: true,
      dataType: "jsonp"
    });

    // Push the deffered calls to the list
    penList.push(ajax);
  });

  // When calls are finished, embed each one to the page
  $.when.apply($, penList).then(function() {
    var openingHTML = '<div class="col s12 l6">';
    var closingHTML = '</div>'

    // Hide container for fade in
    $("#card-container").hide();

    // Embed
    $(penList).each(function(i) {
      var pen = penList[i].responseJSON.html;
      var html = openingHTML + pen + closingHTML;
      $(html).appendTo("#card-container");
    });

    // Fade in container when last iframe is loaded
    $("iframe").last().on("load", function () {
      $("#card-container").fadeIn(1000);
    });
  });
};

//Toggles menu display property
let trigger = document.getElementsByClassName("menu-trigger")[0];
let counter = 0;
let menu = document.getElementsByClassName("nav-menu")[0];

trigger.onclick = function() {
  console.log(counter);
  console.log(window.innerWidth);
  menuTrigger();
};

function menuTrigger() {
  if (counter === 0) {
    menu.style.display = "flex";
    counter = 1;
  } else {
    menu.style.display = "none";
    counter = 0;
  }
}

$(".card").on('click', function() {
	/* The position of the container will be set to fixed, so set the top & left properties of the container */ 
	var bounding_box = $(".card").get(0).getBoundingClientRect();
	$(this).css({ top: bounding_box.top + 'px', left: bounding_box.left + 'px' });

	/* Set container to fixed position. Add animation */
	$(this).addClass('in-animation');

	/* To animate the container from full-screen to normal, we need dynamic keyframes */
	var styles = '';
	styles = '@keyframes outlightbox {';
		styles += '0% {'; 
		styles += 'height: 100%;';
		styles += 'width: 100%;';
		styles += 'top: 0px;';
		styles += 'left: 0px;';
		styles += '}';
		styles += '50% {'; 
		styles += 'height: 200px;';
		styles += 'top: ' + bounding_box.y + 'px;';
		styles += '}';
		styles += '100% {';
		styles += 'height: 200px;';
		styles += 'width: 500px;';
		styles += 'top: ' + bounding_box.y + 'px;';
		styles += 'left: ' + bounding_box.x + 'px;';
		styles += '}';
	styles += '}';

	/* Add keyframe to CSS */
	$("#lightbox-animations").get(0).sheet.insertRule(styles, 0);

	/* Hide the window scrollbar */
	$("body").css('overflow', 'hidden');
});

/* Click on close button when full-screen */
$("#close").on('click', function(e) {
	$("#close").hide();

	/* Window scrollbar normal */
	$("body").css('overflow', 'auto');

	/* Show animation */
	$("#container-1").addClass('out-animation');

	e.stopPropagation();
});

/* On animationend : from normal to full screen & full screen to normal */
$("#container-1").on('animationend', function(e) {
	/* On animation end from normal to full-screen */
	if(e.originalEvent.animationName == 'inlightbox') {
		$("#close").show();
	}
	/* On animation end from full-screen to normal */
	else if(e.originalEvent.animationName == 'outlightbox') {
		/* Remove fixed positioning, remove animation rules */
		$("#container-1").removeClass('in-animation').removeClass('out-animation');
		
		/* Remove the empty container that was earlier added */
		$("#empty-container").remove();

		/* Delete the dynamic keyframe rule that was earlier created */
		$("#lightbox-animations").get(0).sheet.deleteRule(0);
	}
});
