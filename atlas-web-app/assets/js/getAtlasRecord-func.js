
function getAtlasRecord(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/record/'+id);
  xhr.onload = function () {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.table(users);
    } else {
      console.error(users);
    }
  };
  xhr.send(null);
}
