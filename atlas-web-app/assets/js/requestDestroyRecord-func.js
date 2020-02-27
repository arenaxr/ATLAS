// TODO: consider inlining in update-record-form.ejs as that is the only page that will use this func?

function requestDestroyRecord(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/record/'+id);
  xhr.onload = function () {
    var records = JSON.parse(xhr.responseText);

    // TODO : upgrade "==" to "===" but do test that it doesn't break Destroy
    //        --ltj
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.table(records);
    } else {
      console.error(records);
    }
  };
  xhr.send(null);
}
