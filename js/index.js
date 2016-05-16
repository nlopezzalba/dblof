/*TOOLTIP********************/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


/*TABS********************/
$('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})


/*DROPDOWN********************/
$(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.dropdown-toggle').html($(this).text() + '<span class="caret"></span>');
    $(this).parents(".dropdown").find('.dropdown-toggle').val($(this).data('value'));
});


/*VIEW TOOGLE BUTTON********************/
$('.View').change (function(){
  if ( this.checked) {
      $('.View-expanded').addClass("active");
      $('.View-compact').removeClass("active");
  } else {
      $('.View-compact').addClass("active");
      $('.View-expanded').removeClass("active");
    }
});


/*POPULATION DISTRIBUTION BAR CHART********************/
var populationDistData = [
    {"name": "African", "amount": 90, "color": "#24AFB2"},
    {"name": "Latino", "amount": 60, "color": "#E67E23"},
    {"name": "East Asian", "amount": 5, "color": "#7F64B5"},
    {"name": "European (finnish)", "amount": 10, "color": "#F05161"},
    {"name": "European (non-finnish)", "amount": 20, "color": "#64B267"},
    {"name": "South Asian", "amount": 15, "color": "#E2BA14"}
];

//add svg space
var popDistContainer = d3.select("#PopulationDistribution").append("svg")
.attr("viewBox", "0 0 525 200")/*.attr("width", 525).attr("height", 200)*/
.attr("preserveAspectRatio", "xMidYMid meet");

//add scale
var axisScale = d3.scale.linear()
.domain([0, 100])
.range([0, 375]);

//add group of references
var referencesGroup = popDistContainer.append("g")
.attr("x", 0)
.attr("y", 0)
.attr("transform", "translate(140,10)");

//add references
var references = referencesGroup.selectAll("text")
.data(populationDistData)
.enter()
.append ("text");

//add attributes of references
var referencesAttributes = references
.text(function(d){return d.name;})
.attr("x", 0)
.attr("y", function(d, i){
    var multiply = 35;
    var returnY;
    returnY = multiply * i;
    return returnY;
})
.style("fill", "#343A41")
.style("text-anchor", "end")
.style("font-family", "'Lato', sans-serif")
.style("font-weight", "400");

//add group of bars
var populationDistGroup = popDistContainer.append("g")
.attr("x", 0)
.attr("y", 0)
.attr("transform", "translate(150,0)");

//add bars
var populationDistBars = populationDistGroup.selectAll("rect")
.data(populationDistData)
.enter()
.append ("rect");

//add attributes of bars
var barsAttributes = populationDistBars
.attr("x", 0)
.attr("y", function(d, i){
    var multiply = 35;
    var returnY;
    returnY = multiply * i;
    return returnY;
})
.attr("width", function(d){return axisScale(d.amount);})
.attr("height", 10)
.style("fill", function(d){return d.color;});

//add group of background bars
var backgroundBarsGroup = popDistContainer.append("g")
.attr("x", 0)
.attr("y", 0)
.attr("transform", "translate(150,0)");

//add background bars
var backgroundBars = backgroundBarsGroup.selectAll("rect")
.data(populationDistData)
.enter()
.append ("rect");

//add attributes of background bars
var backgroundBarsAttributes = backgroundBars
.attr("x", function(d){return axisScale(d.amount);})
.attr("y", function(d, i){
    var multiply = 35;
    var returnY;
    returnY = multiply * i;
    return returnY;
})
.attr("width", function(d){return axisScale(100);})
.attr("height", 10)
.style("fill", "#E9E9E9");


/*AGE DISTRIBUTION BAR CHART********************/
var ageDistData = [
    {"age": "20", "amount_a": 15, "amount_b": "20"},
    {"age": "25", "amount_a": 20, "amount_b": "20"},
    {"age": "30", "amount_a": 25, "amount_b": "30"},
    {"age": "35", "amount_a": 50, "amount_b": "55"},
    {"age": "40", "amount_a": 55, "amount_b": "70"},
    {"age": "45", "amount_a": 80, "amount_b": "70"},
    {"age": "50", "amount_a": 70, "amount_b": "75"},
    {"age": "55", "amount_a": 55, "amount_b": "60"},
    {"age": "60", "amount_a": 45, "amount_b": "35"},
    {"age": "65", "amount_a": 15, "amount_b": "20"},
    {"age": "70", "amount_a": 25, "amount_b": "30"},
    {"age": "75", "amount_a": 20, "amount_b": "15"},
    {"age": "80", "amount_a": 10, "amount_b": "5"}
];

//add svg space
var ageDistContainer = d3.select("#AgeDistribution").append("svg")
// .attr("width", 525)
// .attr("height", 175)
.attr("viewBox", "0 0 525 175")
.attr("preserveAspectRatio", "xMidYMid meet");

//add scale
var yScale = d3.scale.linear()
.domain([0, 100])
.range([0, 145]);

//add group of background bars
var ageDistBackgroundGroup = ageDistContainer.append("g")
.attr("x", 0)
.attr("y", 0);

//add background bars
var ageDistBackground = ageDistBackgroundGroup.selectAll("rect")
.data(ageDistData)
.enter()
.append ("rect");

//add attributes of background bars
var ageDistBackgroundAttributes = ageDistBackground
.attr("x", function(d, i){
    var multiply = 42;
    var returnY;
    returnY = multiply * i;
    return returnY;
})
.attr("y", 0)
.attr("width", 20)
.attr("height", function(d){return yScale (100);})
.style("fill", "#E9E9E9");

//add group of A bars
var ageDistGroupA = ageDistContainer.append("g")
.attr("x", 0)
.attr("y", 0);

//add A bars
var ageDistBarsA = ageDistGroupA.selectAll("rect")
.data(ageDistData)
.enter()
.append ("rect");

//add attributes of A bars
var ageDistBarsAttributesA = ageDistBarsA
.attr("x", function(d, i){
    var multiply = 42;
    var returnY;
    returnY = multiply * i;
    return returnY;
})
.attr("y", function(d){
    var total = 100;
    var returnY;
    returnY = yScale(total) - yScale(d.amount_a);
    return returnY;
})
.attr("width", 10)
.attr("height", function(d){return yScale (d.amount_a);})
.style("fill", "#24AFB2");

//add group of B bars
var ageDistGroupB = ageDistContainer.append("g")
.attr("x", 0)
.attr("y", 0)
.attr("transform", "translate(10,0)");

//add B bars
var ageDistBarsB = ageDistGroupB.selectAll("rect")
.data(ageDistData)
.enter()
.append ("rect");

//add attributes of B bars
var ageDistBarsAttributesB = ageDistBarsB
.attr("x", function(d, i){
    var multiply = 42;
    var returnY;
    returnY = multiply * i;
    return returnY;
})
.attr("y", function(d){
    var total = 100;
    var returnY;
    returnY = yScale(total) - yScale(d.amount_b);
    return returnY;
})
.attr("width", 10)
.attr("height", function(d){return yScale (d.amount_b);})
.style("fill", "#E67E23");

//add group of references
var ageDistReferenceGroup = ageDistContainer.append("g")
.attr("x", 0)
.attr("y", 0)
.attr("transform", "translate(10,170)");

//add references
var ageDistReferences = ageDistReferenceGroup.selectAll("text")
.data(ageDistData)
.enter()
.append ("text");

//add attributes of references
var ageDistReferenceAttributes = ageDistReferences
.text(function(d){return d.age;})
.attr("x", function(d, i){
    var multiply = 42;
    var returnY;
    returnY = multiply * i;
    return returnY;
})
.attr("y", 0)
.style("fill", "#343A41")
.style("text-anchor", "middle")
.style("font-family", "'Lato', sans-serif")
.style("font-weight", "300");


/*VARIANT TABLE********************/
$(function() {
   var variant_information = [];

   $.getJSON('./json/variant_information.json', function(data) {
       $.each(data.variants, function(i, f) {
          var tblRow = "<tr>" +
          "<td>" + f.variant + "</td>" +
          "<td>" + f.chomosome + "</td>" +
          "<td>" + f.position + "</td>" +
          "<td>" + f.consequence + "</td>" +
          "<td>" + f.filter + "</td>" +
          "<td>" + f.annotation + "</td>" +
          "<td>" + f.flags + "</td>" +
          "<td>" + f.allele_count + "</td>" +
          "<td>" + f.allele_number + "</td>" +
          "<td>" + f.n_homozygotes + "</td>" +
          "<td>" + f.allele_frequency + "</td>" +
          "</tr>"
           $(tblRow).appendTo("#variant_table tbody");
     });
   });
});
