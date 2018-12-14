fetch("https://jsonplaceholder.typicode.com/todos")
  .then(e => e.json())
  .then(coming => renderList(coming));

// remove
var ol = document.querySelector("ol");
ol.addEventListener("click", removeIt);
function removeIt(e) {
  if (e.target.classList.contains("button")) {
    var li = e.target.parentElement;
    ol.removeChild(li);
  }
}
//add
var form = document.querySelector("form");
form.addEventListener("submit", addList);
function addList(e) {
  e.preventDefault();
  var newItem = document.getElementById("list").value;
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  var deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("X"));
  deleteBtn.className = "button";
  li.appendChild(deleteBtn);
  ol.appendChild(li);
}

//search
var search = document.getElementById("search");
search.addEventListener("keyup", searchList);
function searchList(e) {
  // text without any special chars and lowercased
  var text = e.target.value.replace(/\W/g, "").toLowerCase();
  var lists = ol.getElementsByTagName("li");
  // Convert to an array
  Array.from(lists).forEach(function(list) {
    var listName = list.firstChild.textContent;
    if (
      listName
        .replace(/\W/g, "")
        .toLowerCase()
        .indexOf(text) != -1
    ) {
      list.style.display = "block"; //show
    } else {
      list.style.display = "none"; //hide
    }
  });
}

function renderList(data) {
  for (i = 0; i < data.length; i++) {
    var title = data[i].title;
    var li = document.createElement("li");
    ol.appendChild(li).innerText = title;
    var btn = document.createElement("button");
    li.appendChild(btn).innerText = "X";
    btn.addEventListener("click", removeList);
    function removeList(e) {
      var li = e.target.parentElement;
      ol.removeChild(li);
    }
    if (data[i].completed) {
      ol.appendChild(li).style.textDecoration = "line-through";
    }
  }
}
