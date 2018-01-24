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
