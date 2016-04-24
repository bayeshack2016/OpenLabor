$(function() {

  var options = {
    url: function(phrase) {
      return "http://bayeshack-io.herokuapp.com/search_state?state=" + phrase;
    },
    listLocation: 'results',
    getValue: 'state',
    ajaxSettings: {
      dataType: 'JSONP'
    }
  };

  $('#state').easyAutocomplete(options);


  var options2 = {
    url: function(phrase) {
      return "/search_city?city=" + phrase;
    },
    listLocation: 'results',
    getValue: 'city',
    ajaxSettings: {
      dataType: 'JSONP'
    }
  };

  $('#city').easyAutocomplete(options2);

  var occ_code = '';
  var options3 = {
    url: function(phrase) {
      return "/search_occ?occ_title=" + phrase;
    },
    listLocation: 'results',
    getValue: function(results) {
      occ_code = results.occ_code;
      return results.occ_title;
    },
    ajaxSettings: {
      dataType: 'JSONP'
    }
  };

  $('#job_title').easyAutocomplete(options3);


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
          occ_code: occ_code,
          city: city,
          state: state
        },
        success: function (data) {
          var params = data.data[0],
              a_median = params.a_median,
              city = params.city,
              h_median = params.h_median,
              occ_title = params.occ_title,
              state = params.state,
              tot_emp = params.tot_emp,
              salary = $('#salary').val(),
              occ_code = params.occ_code;


          var url = './surface_relevance?' +
            'a_median=' + a_median +
            '&city=' + city +
            '&h_median=' + h_median +
            '&occ_title=' + occ_title +
            '&state=' + state +
            '&tot_emp=' + tot_emp +
            '&salary=' + salary +
            '&occ_code=' + occ_code;

          window.location.replace(url);
        }
      });
    }
  });
});