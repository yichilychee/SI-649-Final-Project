/* Referred to mbostock's [normalized stacked barchart](https://gist.github.com/mbostock/3886394) */

moveRows("0");

function moveRows(index_num){
d3.select(".timelinegraph").remove();
var move_name = index_num.toString();

var margin = {top: 20, right: 100, bottom: 30, left: 40},
    width = 1400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
 
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width*(15 / 18)], .05);
 
var y = d3.scale.linear()
	//.domain([0,1,2,3,4,5,6,7,8])
    .rangeRound([height, 0]);
/*
var legend_y = d3.scale.ordinal()
    .rangeRoundBands([height / 2, 0], .05);
*/ 
var color = d3.scale.ordinal()
 
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickValues("")
    .tickSize(0, 0, 0)
    .tickPadding(6);
 
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".0%"))
    .tickSize(0, 0, 0)
    .tickPadding(-1);
 
var svg = d3.select("#timeline").append("svg")
	.attr("class", "timelinegraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
d3.csv("data/stackdata.txt", function(error, data) {
    var categories = d3.keys(data[0]).filter(function(key) { return key !== "Sample"; });
    var categories_shift = categories;
    console.log(categories);
    color.domain(categories);
    color.range(colorbrewer.Spectral[categories.length]);
 
    data.forEach(function(d) {
  	var y0 = 0;
	d.genes = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
	d.genes.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
    });
 
    x.domain(data.map(function(d) { return d.Sample; }));
 	//legend_y.domain(data[0].genes.map(function(d) { return d.name; }));

    svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
 
    svg.append("g")
	.attr("class", "y axis t")
	.call(yAxis);
 
    var rotate = function(arr){
	var temp = arr.shift();
	arr.push(temp);
    }
    
    var sample = svg.selectAll(".sample")
	.data(data)
	.enter().append("g")
	.attr("class", "sample")
	.attr("transform", function(d) { return "translate(" + x(d.Sample) + ",0)"; });
 
  sample.selectAll("rect")
  	.data(function(d) { return d.genes; })
	  .enter().append("rect")
	  .attr("width", x.rangeBand())
	  .attr("y", function(d) { return y(d.y1); })
	  .attr("height", function(d) { return y(d.y0) - y(d.y1); })
	  .style("fill", function(d) { return color(d.name);})
	  .on("mouseenter", function(d) {
	      var gene_index = categories_shift.indexOf(move_name);
	      moveStuff(gene_index);
	   });

	var curcolor;

	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, -7])
	  .html(function(d) {
	  	  console.log(d);
	  	  y_pct=d.y1-d.y0;
	      //console.log(y_pct); 
	      return "Topic: "+d.name+"<br>Percentage: "+Math.floor(y_pct*1000)/10+"%";//"Percentage: <span style='color:white'>" + d.name + y_pct +"%</span>";
	  })

	  
	svg.selectAll("rect")
    .attr("opacity", 1)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

    svg.call(tip);
/*
	var legend = svg.append("g")
	.attr("class", "legend")
	.attr("x", 1000)
	.attr("y", 0)
	.attr("height", height)
	.attr("width", x.rangeBand());

    
    legend.selectAll("rect")
      	.data(data[0].genes)
    	.enter().append("rect")
    	.attr("width", 15)
    	.attr("height", 15)
    	.attr("y", function(d,i) { return legend_y(d.name); })
    	.attr("x", 1000)
    	.style("fill", function(d) { return color(d.name); })
	.on("click", function(d) {
	    var gene_index = categories_shift.indexOf(d.name);
	    moveStuff(gene_index);
	});

    legend.selectAll("text")
		.data(data[0].genes)
	    	.enter().append("text")
	   	.attr("y", function(d,i) { return legend_y(d.name) + legend_y.rangeBand()/2; })
		.attr("x", 1020)
		.text(function(d) { return "Topic"+d.name; })
		.on("click", function(d) {
		    var gene_index = categories_shift.indexOf(d.name);
		    moveStuff(gene_index);
		});
*/ 
  var moveStuff = function(gene_index){
	categories_shift = categories;
	for (var i=0; i<gene_index; i++){
	    rotate(categories_shift);
	}
	data.forEach(function(d) {
	    var y0 = 0;
	    d.genes = categories_shift.map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
	    d.genes.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
	})
	
	x.domain(data.map(function(d) { return d.Sample; }));
	//legend_y.domain(data[0].genes.map(function(d) { return d.name; }));
	svg.select(".x.axis")
	    .transition()
	    .duration(1000)
	    .call(xAxis);
	sample = svg.selectAll(".sample")
	    .data(data)
	    .attr("transform", function(d) { return "translate(" + x(d.Sample) + ",0)"; });
 
	sample.selectAll("rect")
	    .data(function(d) { return d.genes; })
	    .transition()
	    .delay(function(d, i) { return i * 50})
	    .attr("y", function(d) {return y(d.y1);})
	    .attr("height", function(d) { return y(d.y0) - y(d.y1); })
	    .style("fill", function(d) { return color(d.name);});
/*
	legend.selectAll("rect")
	    .data(data[0].genes)
	    .transition()
	    .delay(function(d, i) { return i * 50; })
    	    .style("fill", function(d) { return color(d.name); });

	legend.selectAll("text")
	    .data(data[0].genes)
	    .transition()
	    .delay(function(d, i) { return i * 50; })
	    .text(function(d) { return "Topic"+d.name; });
*/ 
	last_sample = data[data.length - 1];
  };
});
}