// Add Filter
function scatterPlot(index_num){
d3.select(".sp_overall").remove();
d3.select(".sp_likes").remove();
d3.select(".sp_hugs").remove();
d3.select(".sp_metoos").remove();
d3.select(".sp_remainder").remove();
d3.select(".sp_bigview").remove();
var data_size = data_size_update;
    index_update=index_num;
var data_num = index_num;
var overall_filter=0,likes_filter=0, hugs_filter=0, metoos_filter=0, remainder_filter=0;

//draw xy axis
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1020 - margin.left,
    height = 300 - margin.top;
    margin_small = 6,
    width_small=120-margin_small,
    height_small=120-margin_small;

var x = d3.scale.linear()
    .range([50, width]);

var y = d3.scale.linear()
    .range([height, 20]);

var x_small = d3.scale.linear()
    .range([2, width_small]);

var y_small = d3.scale.linear()
.range([height_small, 2]);

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(10).tickSubdivide(10)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(5).tickSubdivide(5)
    .orient("left");

var xAxis_small = d3.svg.axis()
    .scale(x_small)
    .ticks(0)
    .tickSize(0)
    .orient("bottom");

var yAxis_small = d3.svg.axis()
    .scale(y_small)
    .ticks(0)
    .tickSize(0)
    .orient("left");

var svg_overall = d3.select("#scatterplot_overall").append("svg")
        //.attr("class", "scatterPlotgraph1")
        .attr("class", "sp_overall")
        .append("g");

var svg_likes= d3.select("#scatterplot_likes").append("svg")
        //.attr("class", "scatterPlotgraph2")
        .attr("class", "sp_likes")
        .append("g");

var svg_hugs = d3.select("#scatterplot_hugs").append("svg")
        //.attr("class", "scatterPlotgraph3")
        .attr("class", "sp_hugs")
        .append("g");

var svg_metoos = d3.select("#scatterplot_metoos").append("svg")
        //.attr("class", "scatterPlotgraph4")
        .attr("class", "sp_metoos")
        .append("g");

var svg_remainder = d3.select("#scatterplot_remainder").append("svg")
        //.attr("class", "scatterPlotgraph5")
        .attr("class", "sp_remainder")
        .append("g");

var svg = d3.select("#scatterplot").append("svg")
        //.attr("class", "scatterPlotgraph6")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "sp_bigview")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        x.domain([-1,1]);
        y.domain([0,1]);
        x_small.domain([-1,1]);
        y_small.domain([0,1]);

/*Draw overall view scatterplot*/
    svg_overall.append("g")
        .attr("class", "x_small axis grid")
        .attr("transform", "translate(0," + height_small/2 + ")")
        .call(xAxis_small);

    svg_overall.append("g")
        .attr("class", "y_small axis grid")
        .attr("transform", "translate(" + width_small/2 + ",0)")
        .call(yAxis_small);

/*Draw likes view scatterplot*/
     svg_likes.append("g")
        .attr("class", "x_small axis grid")
        .attr("transform", "translate(0," + height_small/2 + ")")
        .call(xAxis_small);

    svg_likes.append("g")
        .attr("class", "y_small axis grid")
        .attr("transform", "translate(" + width_small/2 + ",0)")
        .call(yAxis_small);

/*Draw hugs view scatterplot*/
     svg_hugs.append("g")
        .attr("class", "x_small axis grid")
        .attr("transform", "translate(0," + height_small/2 + ")")
        .call(xAxis_small);

    svg_hugs.append("g")
        .attr("class", "y_small axis grid")
       .attr("transform", "translate(" + width_small/2 + ",0)")
        .call(yAxis_small);

/*Draw metoos view scatterplot*/
     svg_metoos.append("g")
        .attr("class", "x_small axis grid")
       .attr("transform", "translate(0," + height_small/2 + ")")
        .call(xAxis_small);

    svg_metoos.append("g")
        .attr("class", "y axis grid")
        .attr("transform", "translate(" + width_small/2 + ",0)")
        .call(yAxis_small);

/*Draw remainder view scatterplot*/
     svg_remainder.append("g")
        .attr("class", "x_small axis grid")
       .attr("transform", "translate(0," + height_small/2 + ")")
        .call(xAxis_small);

    svg_remainder.append("g")
        .attr("class", "y axis grid")
        .attr("transform", "translate(" + width_small/2 + ",0)")
        .call(yAxis_small);

/*Draw big view scatterplot*/
     svg.append("g")
        .attr("class", "x axis grid")
        .attr("transform", "translate(0," + height/2 + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label-positive")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("sentiment");

    var w=width/2+20;
    svg.append("g")
        .attr("class", "y axis grid")
        .attr("transform", "translate(" + w + ",0)")
        .call(yAxis)
        .append("text")
        .attr("class", "label-polarrity")
        .attr("x", 50)
        // .attr("transform", "rotate(-90)")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("polarity");

// var Topic_frequency = [18663,15115,11457,18862,21771,26240,23141,23794,30837,31849];

function reset(){ 
    clear_dots();
    data_size = data_size_update;
    update("overall","overall",0);
}
reset();

d3.select("#overall-slider").on("input", function() {
    overall_filter = +this.value;
    update("overall","overall",+this.value);
});

d3.select("#likes-slider").on("input", function() {
    likes_filter = +this.value;
    update("likes","likes",+this.value);
});

d3.select("#hugs-slider").on("input", function() {
    hugs_filter = +this.value;
    update("hugs","hugs",+this.value);
});

d3.select("#metoos-slider").on("input", function() {
    metoos_filter = +this.value;
    update("metoos","metoos",+this.value);
});

d3.select("#remainder-slider").on("input", function() {
    remainder_filter = +this.value;
    update("remainder", "remainder",+this.value);

});

d3.select(".sp_overall").on("click", function() {
    update("overall","changebigview",overall_filter);
});

d3.select(".sp_likes").on("click", function() {
    update("likes","changebigview",likes_filter);
});

d3.select(".sp_hugs").on("click", function() {
    update("hugs","changebigview",hugs_filter);
});

d3.select(".sp_metoos").on("click", function() {
    update("metoos","changebigview",metoos_filter);
});

d3.select(".sp_remainder").on("click", function() {
    update("remainder","changebigview",remainder_filter);
});

function update(bigview, slider_name, filter) {
    // adjust the text on the range slider
    clear_dots();
    update_color(slider_name);
    d3.selectAll("."+slider_name+"-slider-value").text(filter);
    d3.select("#"+slider_name+"-slider").property("value",filter);
          if (slider_name=="overall") {
            update_slider(filter);
            drawTopics(bigview,data_size,data_num,filter,filter,filter);
          }
          if(slider_name=="likes"){
            drawTopics(bigview,data_size,data_num,filter,hugs_filter,metoos_filter);
          }
          if(slider_name=="hugs"){
            drawTopics(bigview,data_size,data_num,likes_filter,filter,metoos_filter);
           
          }
          if(slider_name=="metoos"){
            drawTopics(bigview,data_size,data_num,likes_filter,hugs_filter,filter);
          }
          if(slider_name=="remainder"){
            update_slider(filter);
            drawTopics(bigview,data_size,data_num,filter,filter,filter);
          }
          if(slider_name=="changebigview"){
             drawTopics(bigview,data_size,data_num,likes_filter,hugs_filter,metoos_filter);
             update_color(bigview);
          }
}

function update_color(slider_name){
  d3.select(".sp_likes").style("border-color","#666").style("border-width","1px")
  d3.select(".sp_hugs").style("border-color","#666").style("border-width","1px")
  d3.select(".sp_metoos").style("border-color","#666").style("border-width","1px")
  d3.select(".sp_overall").style("border-color","#666").style("border-width","1px")
  d3.select(".sp_remainder").style("border-color","#666").style("border-width","1px")

  d3.select(".sp_"+slider_name).style("border-color",color(data_num)).style("border-width","2px");
  // d3.selectAll(".dot_big").transition().style("fill","#f3822a");
  console.log(".dot_small_"+slider_name);
}

function update_slider(filter){
    d3.selectAll("#overall-slider-value").text(filter);
    d3.selectAll(".likes-slider-value").text(filter);
    d3.selectAll(".hugs-slider-value").text(filter);
    d3.selectAll(".metoos-slider-value").text(filter);
    d3.selectAll("#remainder-slider-value").text(filter);

    d3.select("#overall-slider").property("value",filter);
    d3.select("#likes-slider").property("value",filter);
    d3.select("#hugs-slider").property("value",filter);
    d3.select("#metoos-slider").property("value",filter);
    d3.select("#remainder-slider").property("value",filter);
}

function drawTopics(bigview,data_size,data_num,likes_filter,hugs_filter,metoos_filter){
  drawTopicsView(data_size,data_num,"big",bigview,likes_filter,hugs_filter,metoos_filter);

  drawTopicsView(data_size,data_num,"small","overall",likes_filter,hugs_filter,metoos_filter);
  drawTopicsView(data_size,data_num,"small","likes",likes_filter,hugs_filter,metoos_filter);
  drawTopicsView(data_size,data_num,"small","hugs",likes_filter,hugs_filter,metoos_filter);
  drawTopicsView(data_size,data_num,"small","metoos",likes_filter,hugs_filter,metoos_filter);
  drawTopicsView(data_size,data_num,"small","remainder",likes_filter,hugs_filter,metoos_filter);
}

//   queue()
//   .defer(d3.csv, "data/all_topic0.csv")
//   .await(ready);  
// function ready (error, data){
//       console.log(data);
//       // alert(json);
// }
      function drawTopicsView(data_size,data_num,view,map,likes_filter,hugs_filter,metoos_filter){
            d3.csv("data/all_topic"+data_num+".csv")
            .row(function(d) { return {  ID: d.ID, 
                                         PostID: d.PostID, 
                                         text: d.Text,
                                         URL:d.URL, 
                                         Likes:+d.Likes,
                                         Hugs:+d.Hugs,
                                         MeToos:+d.Metoos,
                                         sentiment: +d.sentiment,
                                         sentiment_tag: d.sentiment_tag,
                                         polarity: +d.polarity,
                                         polarity_tag: +d.polarity_tag,
                                         concept_text: d.concept_text, //changed to TopicNum in the new data file
                                         concept_type: d.concept_type}; //changed to TopicText in the new data file
            })
            .get(function(error, rows) { 
              if(data_size>rows.length){
                data_size=rows.length;
              }
               d3.selectAll(".dot_small_"+map).remove();
               d3.selectAll(".g_small_"+map).remove();

                  for(var i=0; i<data_size;i++){
                       if((rows[i].polarity>=0)&&(rows[i].polarity<=1)&&(rows[i].sentiment>=-1)&&(rows[i].sentiment<=1)){
                               if (view=="small") {
                                     if (map=="overall") {
                                          if(rows[i].Likes>=likes_filter || rows[i].Hugs>=hugs_filter || rows[i].MeToos>=metoos_filter ){
                                            draw_small_plot(rows[i],map,data_num);
                                            }
                                      }
                                      if (map=="likes") {
                                         if(rows[i].Likes>=likes_filter){
                                         draw_small_plot(rows[i],map,data_num);
                                         }
                                      }
                                      if (map=="hugs") {
                                         if(rows[i].Hugs>=hugs_filter){
                                         draw_small_plot(rows[i],map,data_num);
                                         }
                                      }
                                      if (map=="metoos") {
                                         if(rows[i].MeToos>=metoos_filter){
                                         draw_small_plot(rows[i],map,data_num);
                                         }
                                      }
                                      if (map=="remainder") {
                                          if(rows[i].Likes>=likes_filter && rows[i].Hugs>=hugs_filter && rows[i].MeToos>=metoos_filter ){
                                         draw_small_plot(rows[i],map,data_num);
                                        }
                                      }
                               }
                               else{
                                     if (map=="overall") {
                                          if(rows[i].Likes>=likes_filter || rows[i].Hugs>=hugs_filter || rows[i].MeToos>=metoos_filter ){
                                            draw_big_plot(rows[i],data_num);
                                            }
                                      }
                                      if (map=="likes") {
                                         if(rows[i].Likes>=likes_filter){
                                         draw_big_plot(rows[i],data_num);
                                         }
                                      }
                                      if (map=="hugs") {
                                         if(rows[i].Hugs>=hugs_filter){
                                         draw_big_plot(rows[i],data_num);
                                         }
                                      }
                                      if (map=="metoos") {
                                         if(rows[i].MeToos>=metoos_filter){
                                         draw_big_plot(rows[i],data_num);
                                         }
                                      }
                                      if (map=="remainder") {
                                          if(rows[i].Likes>=likes_filter && rows[i].Hugs>=hugs_filter && rows[i].MeToos>=metoos_filter ){
                                         draw_big_plot(rows[i],data_num);
                                        }
                                      }
                               }
                        }
                   }

            });
      }


function draw_big_plot(data,data_num){
   d3.select(".sp_bigview")
      .append("g")
      .attr("class", "g_big")
      .append("circle")
      .attr("class", "dot_big")
      .attr("transform", "translate(80,20)")
      .attr("r",5)
      .attr("cx", x(data.sentiment))
      .attr("cy", y(data.polarity))
      .style("fill", "#999")
      .style("stroke","#fff")
      .on("mouseover", function(){
              d3.select(this).transition()
                .duration(500)
                .style("fill", "#999")
                .attr("opacity", 1);

                var xPosition=parseFloat(d3.select(this).attr("cx"))+126;
                var yPosition=parseFloat(d3.select(this).attr("cy"))-20;
                d3.select("#tooltip")
                    .style("left",xPosition+"px")
                    .style("top",yPosition+"px")
                    .select("#post-id")
                    .text("#"+data.PostID);
               d3.select("#tooltip").select("#post_value")
                    .text(data.text);
               d3.select("#tooltip").select("#post_likes")
                    .text(data.Likes);
               d3.select("#tooltip").select("#post_hugs")
                    .text(data.Hugs);
                d3.select("#tooltip").select("#post_metoos")
                    .text(data.MeToos +" sentiment:"+ data.sentiment + " polarity:" +data.polarity);

                d3.select("#tooltip").style("visibility","visible");
      })
      .on("mouseout", function(){
            d3.select("#tooltip").style("visibility","hidden");
            d3.select(this).transition()
              .attr("opacity", 1)
              .transition()
              .style("fill", color(data_num))
              .attr("opacity", 0.5)
      })
      .transition().duration(5000)
      .style("fill", color(data_num))
      .attr("r",20)
      .style("opacity",0.5)
      .ease("bounce");
}

function draw_small_plot(data,map,data_num){
   d3.select(".sp_"+map)
      .append("g")
      .attr("class", "g_small_"+map)
      .append("circle")
      .attr("class", "dot_small_"+map)
      .attr("r",2)
      .style("fill", "#999")
      .attr("cx", x_small(data.sentiment))
      .attr("cy", y_small(data.polarity))
      .style("stroke","#f2f2f2")
      .transition().duration(5000)
      .attr("r",3)
      .style("fill", color(data_num))
      .style("opacity",0.5)
      .ease("cubic-out");
}

function clear_dots(){
    d3.selectAll(".dot_big").remove();
    d3.selectAll(".g_big").remove();
    d3.selectAll(".dot_small_overall").remove();
    d3.selectAll(".g_small_overall").remove();
    d3.selectAll(".dot_small_likes").remove();
    d3.selectAll(".g_small_likes").remove();
    d3.selectAll(".dot_small_hugs").remove();
    d3.selectAll(".g_small_hugs").remove();
    d3.selectAll(".dot_small_metoos").remove();
    d3.selectAll(".g_small_metoos").remove();
    d3.selectAll(".dot_small_remainder").remove();
    d3.selectAll(".g_small_remainder").remove();
}
}
scatterPlot("0");
