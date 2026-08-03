
function openNav() {
  document.getElementById("mySidenav").style.width = "500px";
  //document.getElementById("menu-toggle").classList.toggle("change");
  //document.getElementById('menu-toggle').setAttribute( "onClick", "closeNav(this)" );
  /* not working, the element is only the sidebar, not work for tab
  window.onclick = function(event) {
    if (event.target != document.getElementById("mySidenav")) {
      closeNav();
    }
  }*/
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  //document.getElementById("menu-toggle").classList.toggle("change");
  //document.getElementById('menu-toggle').setAttribute( "onClick", "openNav(this)" );
}



window.addEventListener("keydown", function (event) {
  if (!(document.getElementById("searchModal").style.display === "block")) { // prevent toc when search bar is on
    if (event.key === 'q') {
      if (document.getElementById("mySidenav").style.width === "500px") {
        closeNav();
      } else {
        openNav();
      }
    }
  }
}, true);
