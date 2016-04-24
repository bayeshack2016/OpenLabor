$(function() {
  $('#the_form').submit(function(e){
    e.preventDefault();

    var job_title = $('#job_title').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var salary = $('#salary').val();

    if(job_title && city && state) {
      $.get('http://glebslink.com', {
        job_title: job_title,
        city: city,
        state: state
      }).done(function(data) {
        console.log(data);
      });
    }
  });
});