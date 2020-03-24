/**
 * Request record on client's behalf.
 * @param id - id of the record to get.
 * @returns {Array} Tuple of [server_success, JSON_server_response].
 */
function requestGetRecord(id) {
  var server_success;

  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/record/'+ id);

  xhr.onload = function () {
    var responseJSON = JSON.parse(xhr.responseText);

    // eslint-disable-next-line eqeqeq
    if (xhr.readyState == 4 && xhr.status == '200') {
      server_success = true;
      return [server_success, responseJSON];
    } else {
      server_success = false;
      return [server_success, responseJSON];
    }
  };

  xhr.send(null);
}
