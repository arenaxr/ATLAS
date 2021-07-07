


function getAllRecordsRN() {
  var pgs_c = -17;

  // [Get all records]
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/record' );

  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == '200') {
      var records = JSON.parse(xhr.responseText);

      var rem = records.length % page_size;
      full_pages = ( records.length - rem ) / page_size;

      if (rem !== 0) {
        full_pages = full_pages + 1;
      }

      // TODO : BOOKMARK: figure out how to get seomthing back from callback,
      //                  outside of document manipulation ... ?
      console.log("full pages: " + full_pages);

    } else {
      // [Set error message and display]
      // TODO : upgrade to something on page!
      console.log("getLastPage GET request had other than 200 status");
    }
  };

  xhr.send(null);

  return full_pages;
}


/**
 *
 * @param nth_page
 * @param page_size
 */
function viewRecordsBulk(nth_page, page_size) {

  // Clear previous contents of output paragraph
  // DEBUG : may cause page thrash
  document.getElementById('records-output').innerHTML = '';

  // [Get a page full or less of records]
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/record?limit=' + page_size + '&skip=' + (nth_page * page_size - page_size));

  // TODO : remove DEBUGGING
  console.log( '/record?limit=' + page_size + '&skip=' + (nth_page * page_size - page_size));

  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == '200') {

      var records = JSON.parse(xhr.responseText);

      // TODO : ensure this works for just 1 record in db
      records.forEach(fillRecords);

    } else {
      // [Set error message and display]
      // TODO : upgrade to something on page!
      console.log("viewRecordsBulk GET request had other than 200 status");
      console.log("status: " + xhr.status );
      console.log("readyState: " + xhr.readyState );
    }
  };

  xhr.send(null);
}

function fillRecords(value) {
  // TODO : pass in the desired innerHTML as an object somehow, to make generic
  // TODO : outline unwieldy prepending line
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + '<strong>' + value.name + '</strong> <br>';
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + value.id + '<br>';
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + '<a href="' + value.url + '">Associated URL</a><br>';
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + 'Latitude: ' + value.lat + '<br>';
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + 'Longitude: ' + value.long + '<br>';
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + 'Elevation: ' + value.ele + '<br>';
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + 'Radius: ' + value.radius + '<br>';
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + 'Pose: ' + value.pose + '<br>';
  document.getElementById('records-output').innerHTML = document.getElementById('records-output').innerHTML + 'objectType: ' + value.objectType + '<br><br>';
}

function clearRecords() {
  // TODO : pass in the desired innerHTML as an object somehow, to make generic
  document.getElementById('records-output').innerHTML = "";

}

function viewFirstPage(records_per_page) {
  viewRecordsBulk(1, records_per_page);
  return 1;
}

function viewPrevPage(current_page, records_per_page) {
  if ( current_page >= 2 ) {
    viewRecordsBulk(current_page - 1, records_per_page);
    return current_page - 1;
  }

  return current_page;
}

function viewNextPage(current_page, records_per_page, last_page) {
  if ( current_page < last_page ) {
    viewRecordsBulk(current_page + 1, records_per_page);
    return current_page + 1;
  }

  return current_page;
}
