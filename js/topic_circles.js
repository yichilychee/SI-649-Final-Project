  //draw ten topic circles
  var Topic_frequency = [{"name":"love husband sex good years", "num":18663, "topic_num": 0},{name:"today didn told wanted made", "num":15115, "topic_num": 1},{name:"dh fucking fuck shit ass", "num":11457, "topic_num": 2},{name:"day time work home house", "num":18862, "topic_num": 3}, {name: "hate people friends family friend", "num": 21771, "topic_num": 4},{name: "eat fat food big dinner", "num": 26240, "topic_num": 5},{name: "kids mom kid im child", "num": 23141, "topic_num": 6},{name:"baby back year son school","num":23794, "topic_num": 7},{name: "dd ds night dh bed", "num":30837, "topic_num": 8},{name: "don feel bad make life", "num":31849, "topic_num": 9}];

  function color(i){
    var color = d3.scale.ordinal()
                .domain([0,1,2,3,4,5,6,7,8,9])
                .range(["#D36B80","#C65D83","#DD5858","#E7793B","#E0A75B","#A5AF68","#618E62","#51A0A8","#4870AF","#706096"]);
    return color(i);
  }
  
  // Topic_frequency.sort(function(a, b){ return (b.num - a.num); });

  var tip = d3.tip()
  // .data("data/topic"+data_num+"_keywordfrequency.csv")
  // .data("data/topic0_keywordfrequency.csv")
  .attr('class', 'd3-tip')
  .offset([-10, -7])
  .html(function(d) {
      return "Frequency: <span style='color:white'>" + d.num + "</span>";
  })


  Topic_frequency.sort(function(a, b){ return (b.num - a.num); });

  
  // var color = d3.scale.category10();
   var topicC = d3.select("#topics").append("svg")
      .attr("width", 1300)
      .attr("height", 200);

   topicC.call(tip);   

   var circles = topicC.selectAll("g")
      .data(Topic_frequency)
      .enter()
      .append("g")
      .append("a")
      .attr("xlink:href", function(d) {console.log(); return "#secondPage"})
      .append("circle")
      .attr("class","topic_circle")
      .attr("r", function(d,i){
          return (d.num/900);
      })
      .attr("cx", function(d,i){ return (d.topic_num*100+100);})
      .attr("cy", 50)
      .style("fill", function(d, i) { return color(d.topic_num); })
      .on("click", function(d, i){
            //console.log(d.topic_num);
			d3.selectAll(".onehcircle").style("stroke-width", 0);
            drawKeywordFreq(d.topic_num);
            post_board(d.topic_num);
            moveRows(d.topic_num);
            scatterPlot(d.topic_num);

      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .transition().duration(2000).ease("linear")
      .attr("cx", function(d,i){ return (i*100+100);});
 

    //draw topic title under topic circles
    d3.selectAll("g")
      .data(Topic_frequency)
      .append("text")
      .each(function(d){
        var word = d.name.split(" ");
        for( var j=0; j<word.length; j++){
          d3.select(this).append("tspan")
          .text(function(d,i){
            // console.log(word[j]);
            return word[j];
            })
          .attr("dy", j ? "1.2em" : 0)
          .attr("x", 0)
          .attr("text-anchor", "middle");
        }
      })
      .attr("transform", function(d,i){return "translate(" +(d.topic_num*100+100)+", 100)"})
      .style("fill", function(d, i) { return color(d.topic_num); })
      .transition().duration(2000).ease("linear")
      .attr("transform", function(d,i){return "translate(" +(i*100+100)+", 100)"});


      //add frequence number to circles
      d3.selectAll("g")
      .data(Topic_frequency)
      .append("text")
      .text(function(d,i){return d.topic_num;})
      .attr("text-anchor", "middle")
      .attr("transform", function(d,i){return "translate(" +(d.topic_num*100+100)+", 55)"})
      .style("fill", "#ffffff")
      .style("font-size","15px")
      .transition().duration(2000).ease("linear")
      .attr("transform", function(d,i){return "translate(" +(i*100+100)+", 55)"});

      var tcircles = d3.select(".hcircles").append("svg").attr("width",1000).attr("height", 100).append("g")
      
      tcircles.selectAll("g")
      .data(Topic_frequency)
      .enter()
      .append("circle")
      .attr("class", "onehcircle")
      .attr("r", 7)
      .attr("cx", function(d,i){ return (i*50+50);})
      .attr("cy", 50)
      .style("fill", function(d, i) { return color(d.topic_num); })
      .on('mouseover', function(d,i){
                 d3.select(this).transition()
                .duration(500)
                .style("fill", "#999")
                .attr("opacity", 1); }
          )
      .on('mouseout', function(d,i){
                 d3.select(this).transition()
                .duration(500)
                .style("fill", color(d.topic_num))
                .attr("opacity", 1); }
                )
      .on("click", function(d, i){
            //console.log(d.topic_num);
            drawKeywordFreq(d.topic_num);
            post_board(d.topic_num);
            moveRows(d.topic_num);
            scatterPlot(d.topic_num);
            d3.selectAll(".onehcircle").style("stroke-width", 0);
            d3.select(this).style("stroke-width", 2);
            d3.select(this).style("stroke", "grey");
      });

