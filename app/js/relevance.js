$(function() {
  // Put surface relevance javascript here




function income_to_color(income, mn, mx) {
    return Math.round(9*(income-mn)/(mx-mn))
}

states_arr = [{state: 'AZ', income: 10}, {state: 'NE', income:12}, {state:'CA',  income:14}, {state:'TX',  income:20}]

incomes = []
for(i=0; i < states_arr.length; i++){
    incomes[i] = states_arr[i].income
    }

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

mn = incomes.min()
mx = incomes.max()

dat = {}
for(i=0; i < states_arr.length; i++){
    dat[states_arr[i].state] = {'Median Income': states_arr[i].income,
                                'fillKey': income_to_color(states_arr[i].income, mn, mx)}
}
console.log('data:')
console.log(dat)

var election = new Datamap({
  scope: 'usa',
  element: document.getElementById('container'),
  geographyConfig: {
    highlightBorderColor: '#bada55',
   popupTemplate: function(geography, data) {
      return '<div class="hoverinfo">' + geography.properties.name + ' Median Salary:' +  data['Median Income'] + ' '
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



dat = {
  "AZ": {
      "fillKey": "Republican",
      "Median Income": 5
  },
  "CO": {
      "fillKey": "Light Democrat",
      "Median Income": 5
  },
  "DE": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "FL": {
      "fillKey": "UNDECIDED",
      "Median Income": 29
  },
  "GA": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "HI": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "ID": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "IL": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "IN": {
      "fillKey": "Republican",
      "Median Income": 11
  },
  "IA": {
      "fillKey": "Light Democrat",
      "Median Income": 11
  },
  "KS": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "KY": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "LA": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "MD": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "ME": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "MA": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "MN": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "MI": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "MS": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "MO": {
      "fillKey": "Republican",
      "Median Income": 13
  },
  "MT": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "NC": {
      "fillKey": "Light Republican",
      "Median Income": 32
  },
  "NE": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "NV": {
      "fillKey": "Heavy Democrat",
      "Median Income": 32
  },
  "NH": {
      "fillKey": "Light Democrat",
      "Median Income": 32
  },
  "NJ": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "NY": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "ND": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "NM": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "OH": {
      "fillKey": "UNDECIDED",
      "Median Income": 32
  },
  "OK": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "OR": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "PA": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "RI": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "SC": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "SD": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "TN": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "TX": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "UT": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "WI": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "VA": {
      "fillKey": "Light Democrat",
      "Median Income": 32
  },
  "VT": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "WA": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "WV": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "WY": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "CA": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "CT": {
      "fillKey": "Democrat",
      "Median Income": 32
  },
  "AK": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "AR": {
      "fillKey": "Republican",
      "Median Income": 32
  },
  "AL": {
      "fillKey": "Republican",
      "Median Income": 32
  }
}





























var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").insert("svg", "#create-button")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// d3.tsv("data.tsv", type, function(error, data) {
  // if (error) throw error;

// x.domain(data.map(function(d) { return d.letter; }));
// y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

x.domain(['You', 'Average']);
y.domain([0,20]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Pay");

svg.selectAll(".bar")
  .data([{nm: 'You', salary: 10}, {nm: 'Average', salary: 12}])
.enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.nm); })
  .attr("width", x.rangeBand())
  .attr("y", function(d) { return y(d.salary); })
  .attr("height", function(d) { return height - y(d.salary); });
// });

// function type(d) {
//   d.frequency = +d.frequency;
//   return d;
// }






var job = 'Teller'
var city = 'Minneapolis'
var groupname = 'Empowering ' + job + 's in ' + city

var groupbase = 'https://www.facebook.com/groups/'
var groupid = 0

$.ajax({
  url: 'https://graph.facebook.com/v2.6/1783565611855361/groups?access_token=1783565611855361|M1cyLOVShsOmi55BLsIsa4ffazA',
  data: {
     format: 'json'
  },
  error: function() {
     $('#info').html('<p>An error has occurred</p>');
  },
  dataType: 'jsonp',
  success: function(data) {
     console.log(data)
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
        $("#create-button").show();
        $('#create-button')
        .append("Found the group '" + groupname + "'")

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
            console.log(data)
          }
        });
        text = 'join "' + text + '"'//'" (' + group_members + ' members)');
    console.log(text)
     $('#join-button')
         .append(text + '"');
     $("#join-button").show();

    }
  },
  type: 'GET'
});



$('#create-button').click(function() {
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
      },
      type: 'POST'
   });
});

$("#campaign-button").attr("href", "https://www.change.org/search?q=" + job + ' ' + city)




});