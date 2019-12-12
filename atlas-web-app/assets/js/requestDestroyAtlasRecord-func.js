
function requestDestroyAtlasRecord(id) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "http://localhost:1337/record/"+id);
  xhr.onload = function () {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.table(users);
    } else {
      console.error(users);
    }
  }
  xhr.send(null);
}
