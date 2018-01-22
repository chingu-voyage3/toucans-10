$(document).ready(function() {
  //Materialize dropdown trigger
  $(".dropdown-button").dropdown({ hover: false });
  $(".card").click(function(e) {
    $(this).toggleClass("flipped");
  });
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

  // Get iframes
  $(penURLs).each(function(i, pURL) {
    var ajax = $.ajax({
      url: "https://codepen.io/api/oembed?",
      data: pURL,
      crossDomain: true,
      dataType: "jsonp"
    });

    // Push the deffered calls to the list
    penList.push(ajax);
  });
  
  let cardNumber = penList.length;
  let i = 0;
  while (i < cardNumber) {
    $("#card-container").append('<div class="col s12 m6 l4"><div class="card"><div class="front"><div class="card-image"><img src=""></div><div class="card-content"><div class="card-title-black"></div><p></p></div><div class="card-action"><a href="https://codepen.io/rkchauhan/pen/NNKgJY/">Material Design Buttons</a></div></div><div class="back"><iframe id="cp_embed_zpyyBB" src="https://codepen.io/shubniggurath/embed/preview/zpyyBB?height=300&amp;slug-hash=zpyyBB&amp;default-tabs=js,result&amp;host=https://codepen.io&amp;embed-version=2" title="Fractional" scrolling="no" frameborder="0" height="300" allowtransparency="true" class="cp_embed_iframe" style="width: 100%; overflow: hidden;"></iframe></div></div></div>');
    i++;
  }

  // When calls are finished, embed each one to the page
  $.when.apply($, penList).then(function() {
    var openingHTML = '<div class="col s12 m6 l4">';
    var closingHTML = "</div></div>";
    $(penList).each(function(i) {
      var pen = penList[i].responseJSON.html;
      $("#card-container").append(openingHTML + pen + closingHTML);
      $(".card-title-black")[i].innerHTML = penList[i].responseJSON.title;
      $("img")[i].src = penList[i].responseJSON.thumbnail_url;
    });
  });

  $(".card")[0].click(function(e) {
    $(this).toggleClass("flipped");
    console.log("clicked");
  });
};

let trigger = document.getElementsByClassName("menu-trigger")[0];
//Toggles menu display property
//JS was not working with media query display change, ran out of time for better solution
let counter = 0;
trigger.onclick = function() {
  menuTrigger();
};

function menuTrigger() {
  let menu = document.getElementsByClassName("nav-menu")[0];
  if (counter === 0) {
    menu.style.display = "flex";
    counter = 1;
  } else {
    menu.style.display = "none";
    counter = 0;
  }
}

/* TODO: Cleanup below. Old code that may be useful later */

/*
const cardInfo =
  "<ul><li>Name: Jane Doe</li><li>Profession: Photographer</li><li>Location: Arizona</li><li>Interests: Music, hiking, archery, hanging out with friends, spending time with family</li></ul>";
*/

/*
    $(".panel").click(function(e) {
    $(this).toggleClass("flipped");
  });
  $(".panel").hover(
    function() {
      $(".info")
        .empty()
        .append(function() {
          return cardInfo;
        });
    },
    function() {
      $(".info")
        .empty()
        .append(function() {
          return "Card Info";
        });
    }
  );
  $("#nav-icon").click(function() {
    $(this).toggleClass("open");
  });

  // Query body and toggle for later use
  const body = document.querySelector("body"),
    toggle = document.querySelector(".toggle-drawer");
  // Remember the last state
  const drawerOpen = false;

  // Bind the toggle function on MOUSEDOWN.
  // You can use click element too, but you will
  // get rid of the ~300ms delay on touchscreens.
  toggle.addEventListener("mousedown", function(event) {
    event.preventDefault();
    ToggleDrawer();
  });

  const ToggleDrawer = function() {
    if (!drawerOpen) {
      // classList API comes with HTML%, so you might want to use an older way to get it working with the legacy browsers.
      $(".drawer-container").click(function() {
        $("#nav-icon").show();
      });
      body.classList.toggle("drawer-open");
      drawerOpen = true;
    }
  };

});
*/
