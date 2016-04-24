$(function() {
  $('#the_form').submit(function(e){
    e.preventDefault();

    var job_title = $('#job_title').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var salary = $('#salary').val();

    if(job_title && city && state) {
      $.ajax({
        url: 'https://bayeshack-io.herokuapp.com/stats_by_state_city_occ',
        method: 'GET',
        dataType: 'jsonp',
        data: {
          occ_code: '11-2011',
          city: 'Anchorage',
          state: 'AK'
        },
        success: function (data) {
          window.location.replace('./surface_relevance.html');
        }
      });
    }
  });
});