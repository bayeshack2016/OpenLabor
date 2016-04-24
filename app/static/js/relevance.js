$(function() {
  var a_median = getParameterByName('a_median'),
      city = getParameterByName('city'),
      h_median = getParameterByName('h_median'),
      occ_title = getParameterByName('occ_title'),
      state = getParameterByName('state'),
      tot_emp = getParameterByName('tot_emp'),
      salary = getParameterByName('salary'),
      occ_code = getParameterByName('occ_code');

  $('#job_title').html(occ_title);
  $('#your_salary').html('$' + salary);
  $('#average_salary').html('$' + a_median);
  $('.city').html(city);
  $('.state').html(state);

  if(parseInt(salary) > parseInt(a_median)) {
    $('#equality_sign').html('>');
  } else {
    $('#equality_sign').html('<');
  }

  $.ajax({
      url: 'http://api.glassdoor.com/api/api.htm?t.p=62299&t.k=bFtWtvzAmSI&userip=208.90.215.204&useragent=Mozilla/5.0&format=json&v=1&action=jobs-prog&countryId=1&jobTitle=' + occ_title,
      dataType: 'jsonp',
      type: 'GET',
      contentType: "application/json",
      success: function(dataWeGotViaJsonp) {
        var text = '',
            length = dataWeGotViaJsonp.response.results.length,
            item;

        for(var i = 0; i < 7; i++) {
          item = dataWeGotViaJsonp.response.results[i];
          text += '<li class="chip">' + item.nextJobTitle + '</li>';
        }

        $('#glassdoor_job_list').html(text);
      }
  });
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}