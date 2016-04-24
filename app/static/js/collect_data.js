$(function() {

  // var options = {
  //   url: function(phrase) {
  //     return "https://bayeshack-io.herokuapp.com/search_state?query=" + phrase;
  //   },
  //   listLocation: function(retVal) {

  //     var text = '',
  //         data = retVal.data.results,
  //         length = data.length,
  //         item;

  //     for(var i = 0; i < length; i++) {
  //       item = data[i];
  //       text += '<li class="collection-item">' + item.state + '</li>';
  //     }

  //     $('#state_collection').html(text);

  //     return data;
  //   },
  //   matchResponseProperty: 'inputPhrase',
  //   ajaxSettings: {
  //     dataType: 'JSONP'
  //   }
  // };

  // $('#state').easyAutocomplete(options);


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
          var params = data.data[0],
              a_median = params.a_median,
              city = params.city,
              h_median = params.h_median,
              occ_title = params.occ_title,
              state = params.state,
              tot_emp = params.tot_emp,
              salary = $('#salary').val(),
              occ_code = $('#job_title').val();


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