$(function() {
  var a_median = getParameterByName('a_median'),
      city = getParameterByName('city'),
      h_median = getParameterByName('h_median'),
      occ_title = getParameterByName('occ_title'),
      state = getParameterByName('state'),
      tot_emp = getParameterByName('tot_emp'),
      salary = getParameterByName('salary'),
      occ_code = getParameterByName('occ_code');

  $('.job_title').html(occ_title);
  $('#your_salary').html('$' + salary);
  $('#average_salary').html('$' + a_median);
  $('.city').html(city);
  $('.state').html(state);
  $('#number_of_people').html(tot_emp);

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
          text += '<li class="chip simptip-position-bottom" data-tooltip="National Median Salary: $'+ item.medianSalary +'">' + item.nextJobTitle + '</li>';
        }

        $('#glassdoor_job_list').html(text);
      }
  });









  function income_to_color(income, mn, mx) {
      return Math.round(9*(income-mn)/(mx-mn))
  }

  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };

  $.ajax({
    url: 'https://bayeshack-io.herokuapp.com/a_mean_by_state_occ',
    data: {
       occ_code: '11-2011'
    },
    error: function() {
       console.log('An error has occurred.');
    },
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      states_arr = data;

      incomes = [];
      for(i=0; i < states_arr.data.length; i++){
        incomes[i] = states_arr.data[i].a_mean;
      }

      mn = incomes.min();
      mx = incomes.max();
      console.log(incomes);
      dat = {};
      for(i=0; i < states_arr.data.length; i++){
          dat[states_arr.data[i].state] = {'Median Income': '$' + Math.round(incomes[i]),
                                      'fillKey': income_to_color(incomes[i], mn, mx)};
      }
      console.log('data:');
      console.log(dat);

      var election = new Datamap({
        scope: 'usa',
        element: document.getElementById('the_map'),
        geographyConfig: {
          highlightBorderColor: '#000000',
         popupTemplate: function(geography, data) {
            return '<div class="hoverinfo">' + geography.properties.name + ' Median Salary: ' +  data['Median Income'] + ' ';
          },
          highlightBorderWidth: 3,
        },

        fills: {
          0: '#e3f2fd',
          1: '#bbdefb',
          2: '#90caf9',
          3: '#64b5f6',
          4: '#42a5f5',
          5: '#2196f3',
          6: '#1e88e5',
          7: '#1976d2',
          8: '#1565c0',
          9: '#0d47a1',
        defaultFill: '#e3f2fd'
      },
      data:dat});
      election.labels();
    }
  });













var job = occ_title;
var groupname = 'Empowering ' + job + 's in ' + city;
var n_occs = tot_emp

// When people join together and raise their voices about an issue they care about, the message is hard to ignore.
// Starting a petition on Change.org helps you quickly build awareness for your cause, mobilize supporters, and propose a solution directly to the person who can make the change.

$('#fb-explain').append('The people who understand you best are those who do what you do, where you do it, every day. Power comes through working with others and organizing around important topics. There are about ' + n_occs +  ' people working as ' + job + 's in your area. Connect with them, share advice, and advocate for common needs. We have created a Facebook group specifically for this purpose; join it and start sharing today!')

var groupbase = 'https://www.facebook.com/groups/'
var groupid = 0

$.ajax({
  url: 'https://graph.facebook.com/v2.6/1783565611855361/groups?access_token=1783565611855361|M1cyLOVShsOmi55BLsIsa4ffazA',
  data: {
     format: 'json'
  },
  error: function() {
    console.log('didnt work at all')
     $('#info').html('<p>An error has occurred</p>');
  },
  dataType: 'jsonp',
  success: function(data) {
     groupname = 'Empowering ' + job + 's in ' + city
     console.log(groupname)
     var text = ''
     for (i = 0; i < data.data.length; i++) {
        nm = data.data[i].name
        if(nm == groupname){
            var href = groupbase + data.data[i].id
            var lnk = '<a style="color:white;" href="' + href +  '">' + data.data[i].name + '</a>'
            text += lnk + "<br>";
            console.log(lnk)
            groupid = data.data[i].id
            }
     }
     if(text == ''){
        console.log("no group found")
        $('#fb-link').attr("href", href)
        $('#fb-link-inside').attr("href", href)
        $('#fb-button')
            .append("Found the group '" + groupname + "'")
        $('#fb-button-inside')
            .append("Found the group '" + groupname + "'")

        $('#fb-button').click(function() {
         $.ajax({
            url: 'https://graph.facebook.com/v2.6/1783565611855361/groups?access_token=1783565611855361|M1cyLOVShsOmi55BLsIsa4ffazA',
            data: {
               name: groupname,
               description: 'Making life better for ' + job + ' in ' + city + '.',
               privacy: 'open'
            },
            error: function() {
               $('#info').html('<p>An error has occurred</p>');
            },
            // dataType: 'jsonp',
            success: function(data) {
               console.log(data)
               window.open("http://www.facebook.com/groups/" + data.id, '_blank');
            },
            type: 'POST'
         });
      });

     } else {
        var group_members = 0
            $.ajax({
          url: 'https://graph.facebook.com/v2.6/' + groupid + '/members',
          data: {
             access_token: '1783565611855361|M1cyLOVShsOmi55BLsIsa4ffazA',
             format: 'json'
          },
          success: function(data) {
            // group_members = data.
            group_members = data.data.length
            // console.log(data)
          }
        });
        var text = 'Join "' + job + 's in ' + city + '"'
        console.log('found')


         $('#fb-button')
             .append(text + '"');
         $('#fb-link').attr("href", href)
         $('#fb-button-inside')
             .append(text + '"');
         $('#fb-link-inside').attr("href", href)

    }
  },
  type: 'GET'
});



$("#search-for-petitions").attr("href", "https://www.change.org/search?q=" + job + ' ' + city)
$("#search-for-petitions-inside").attr("href", "https://www.change.org/search?q=" + job + ' ' + city)













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