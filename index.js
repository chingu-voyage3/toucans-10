$(document).ready(function() {
  //Materialize dropdown trigger
  $(".dropdown-button").dropdown({ hover: false });
});


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
