
function openModal() {
  // Get the modal
  var modal = document.getElementById("searchModal");
  modal.style.display = "block";

  slideshow.pause();  // for preventing keyboard events

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("closeSearch")[0];
  span.onclick = function() {
    closeModal();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  }
}

function closeModal() {
  document.getElementById("searchModal").style.display = "none";
  slideshow.resume();
}

function markHints(result) {
  const hints = {};

  result.terms.forEach((term) => {
    const regexp = new RegExp(`(${term})`, 'gi');

    result.match[term].forEach((field) => {
      const value = result[field];

      if (typeof value === 'string') {
        hints[field] = value.replace(regexp, '<mark>$1</mark>');
      } else if (field === 'headings') {
        const markedValue = value.reduce((items, h) => {
          if (h.title.toLowerCase().includes(term)) {
            items.push({
              id: h.id,
              title: h.title.replace(regexp, '<mark>$1</mark>'),
            });
          }
          return items;
        }, []);
        hints[field] = markedValue.length ? markedValue : null;
      }
    });
  });

  return hints;
}

function searching() {
  var el = document.getElementById("searchText");
  var ul = document.getElementById("searchResult");
  if (el.value.length==0) {
    ul.innerHTML = "<span>Searching ...</span>";
  } else if (el.value.length>=3) {
    ul.innerHTML = "";
    let results = miniSearch.search(el.value);
    if (results.length>0) {
      for (i=0;i<results.length;i++) {
        let res = results[i];
        res.hints = markHints(res);
        let p = res["id"];
        let title = res["title"];
        let text = res["hints"]["text"];
        //var li = document.createElement("li");
        var a = document.createElement('a'); 
        let linkstr = ""; //"Page " + p + ": "  
        if (title.length>0) {
          //var link = document.createTextNode(title);
          linkstr +=  title;
        } else if (text.length>0) {
          //var link = document.createTextNode(text.substring(0, 100));
          linkstr +=  text.substring(0, 100);
        } else {
          //var link = document.createTextNode("Page "+p);
          linkstr = linkstr;//.substring(0, linkstr.length - 2);
        }
        linkstr += '......... Page ' + p + '';
        var link = document.createTextNode(linkstr);
        a.appendChild(link);
        //a.title = title;
        a.href = "#"+p; 
        //li.appendChild(a);
        //li.setAttribute("class", "resultEle");
        ul.appendChild(a);
      }
    } else {
      ul.innerHTML = "<span>Not found.</span>";
    }
  }
}

function clearSearch() {
  var el = document.getElementById("searchText");
  el.value = '';
  searching();
}

window.addEventListener("keydown", function (event) {
  if (event.key === 's') {
    if (!(document.getElementById("searchModal").style.display === "block")) {
      openModal();
    }
  }
}, true);
