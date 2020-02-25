// TODO: consider inlining in update-record-form.ejs as that is the only page that will use this func?

function populateUpdateRecordForm(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/record/'+id);
  xhr.onload = function () {
    var records = JSON.parse(xhr.responseText);
    if (xhr.readyState === 4 && xhr.status === '200') {
      // TODO : plop Atlas Record JSON values into form in page --ltj
      // ltj: BOOKMARK
      console.table(records);
    } else {
      // TODO : plop JSON error into id:"error-message" in page --ltj
      console.error(records);
    }
  };
  xhr.send(null);
}
