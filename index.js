//$(document).ready(function() {
  //Materialize dropdown trigger
  //$(".dropdown-button").dropdown({ hover: false });
  //$(".card").click(function(e) {
    //$(this).toggleClass("flipped");
  //});
//});

//document.getElementById('flip-embed').style.display = 'none';

function hidden1() {
  document.getElementById('flip-card-image').classList.toggle('hidden');
}
function hidden2() {
  document.getElementById('flip-card-content').classList.toggle('hidden');
}
function nowVisible() {
  document.getElementById('flip-embed').classList.toggle('visible');
}
function cardFlip() {
  document.getElementById('flip').classList.toggle('animation');
  setTimeout(hidden1, 1500);
  setTimeout(hidden2, 1500);
  setTimeout(nowVisible, 1500);
}




/* Replace elements when flipping card
function myFunction() {
    const parent = document.getElementById('flip');
    const child1 = document.getElementById('card-img');
    const child2 = document.getElementById('card-content');

    if (document.getElementById('flip').className === 'card') {
        document.getElementById('flip').classList.add('animation');
        parent.removeChild(child1);
        parent.removeChild(child2);
        document.getElementsByClassName('embed').style.visibility = 'visible';
    }
    else if (document.getElementById('flip').className === "card animation") {
        document.getElementById('flip').classList.remove('animation');
        document.getElementById('flip').classList.add('animation-back');
    }
    else {
        document.getElementById('flip').classList.remove('animation-back');
        document.getElementById('flip').classList.add('animation');
    }
  }
  */

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
