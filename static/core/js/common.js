function domExport(nodeSelector,type){
  var node = document.getElementById(nodeSelector);
  
  if(type=="png"){
   domtoimage.toBlob(node)
    .then(function (blob) {
        window.saveAs(blob, 'chart.png');
    }); 
  }else if(type=="svg"){
    domtoimage.toSvg(node)
      .then(function(dataUrl){
        var dataSplit = dataUrl.split(",");
        dataSplit.shift();
        var data = dataSplit.join(",").replace(new RegExp("%0A", 'g'), "");
        var blob = new Blob([data],{type:"image/svg+xml"});
        window.saveAs(blob,'chart.svg');
      });
  }  
}

function resize_via_form(chart){
  var width = $("[name='width']").val()+"px",
  height = $("[name='height']").val()+"px",
  top = $("[name='padding_top']").val()+"px ",
  right = $("[name='padding_right']").val()+"px ",
  bottom = $("[name='padding_bottom']").val()+"px ",
  left = $("[name='padding_left']").val()+"px";
  
  $(chart).css("width",width);
  $(chart).css("height",height);
  $(chart).css("padding",top+right+bottom+left);
}

function resize_via_config(chart,config){
  var width = config.width+"px",
  height = config.height+"px",
  top = config.padding_top+"px ",
  right = config.padding_right+"px ",
  bottom = config.padding_bottom+"px ",
  left = config.padding_left+"px";
  
  $(chart).css("width",width);
  $(chart).css("height",height);
  $(chart).css("padding",top+right+bottom+left);
}

function filter_and_sort(filter_by,selectedFilter,sort,sort_direction,divisor,linearAxis,csvDat){
  var csvCopy = [];
  //Copy and apply divisor to linear axis
  csvDat.forEach(function(d,i){csvCopy[i]=$.extend({}, d); if(linearAxis!=="None"){csvCopy[i][linearAxis]=csvCopy[i][linearAxis]/divisor;}});
  
  if (filter_by=="None") {
        //Nothing to filter by, data is csvCopy
        data = csvCopy;
        d3.select("select[name='filter_selection']").selectAll("option").remove();
    }else if(selectedFilter===null){
        d3.select("select[name='filter_selection']").selectAll("option").remove();
        var uniqueFilters = d3.map(csvCopy,function(d){return d[filter_by];}).keys();
        d3.select("select[name='filter_selection']").selectAll("option").data(uniqueFilters)
          .enter()
          .append("option")
          .attr("value",function(d){return d;})
          .text(function(d){return d;});
          
        selectedFilter = uniqueFilters[0];
          
        data = csvCopy.filter(function(d){return d[filter_by]==selectedFilter;});
    }else{
        //Filter by selected filter
        d3.select("select[name='filter_selection']").selectAll("option").remove();
        var uniqueFilters = d3.map(csvCopy,function(d){return d[filter_by];}).keys();
        d3.select("select[name='filter_selection']").selectAll("option").data(uniqueFilters)
          .enter()
          .append("option")
          .attr("value",function(d){return d;})
          .text(function(d){return d;})
          .property("selected",function(d){return d==selectedFilter?true:null;});
          
        data = csvCopy.filter(function(d){return d[filter_by]==selectedFilter;});
  }
  //Now that data is filtered, let's sort it
  if(sort!=="None"){
    var sortedData = _.orderBy(data,[sort],[sort_direction])
  }else{
    var sortedData = data;
  }
    return(sortedData);
}

function clean_value(value){
  if(value==="None" || value===""){
    return(null);
  }
  var valueFloat = parseFloat(value);
  if(isNaN(valueFloat)){
    return(value);
  }else{
    return(valueFloat);
  }
}

function nest_config(config){
  var result = {};
  for(var key in config){
    var path = key.split(".");
    //Special case for arrays
    if(path[path.length-1]=="colors"){
      var value = config[key].split(",");
    }else{
     var value = clean_value(config[key]);
    };
    if(value !== null){
      if(path[0]=="config"){
        if(result.hasOwnProperty(path[1])){
          if(path.length==2){
            result[path[1]]["value"] = value;
          }else{
            result[path[1]][path[2]] = value;
          }
        }else{
          if(path.length==2){
            result[path[1]] = value;
          }else{
            result[path[1]] = {};
            result[path[1]][path[2]] = value;
          }
        }
      } 
    }
  }
  return(result);
}

function form2config(formSelector) {
    var config = {};
    var inputs = d3.select(formSelector).selectAll("input");
    var selects = d3.select(formSelector).selectAll("select");
    //Iterate through inputs
    inputs.each(function(){
      var input = d3.select(this),
      name = input.attr("name"),
      value = input.property("value");
      config[name] = value;
      });
    //Repeat, ensuring to overwrite duplicate names with checked values
    inputs.each(function(){
        var input = d3.select(this),
        name = input.attr("name"),
        value = input.property("value"),
        type = input.attr("type");
        if (type=="checkbox") {
            var checked = input.property("checked");
            if (checked) {
                config[name] = true;
            }else{
              config[name] = false;
            }
        }else if (type=="radio") {
            var checked = input.property("checked");
            if (checked) {
                config[name] = value;
            }
        }
    });
    
    //Iterate through selects
    selects.each(function(){
      var select = d3.select(this),
      name = select.attr("name"),
      option = select.select("option:checked");
      if (option.size()>0) {
        value = option.property("value");
        config[name] = value;
      }
      });
    
    return(nest_config(config));
}

//Get and Set Params functions
function getParams() {
    var paramArr = window.location.search.substr(1).split("&")[0] === "" ? [] : window.location.search.substr(1).split("&");
    var params = {};
    for (var i = 0; i < paramArr.length; i++) {
        var param = paramArr[i];
        params[param.split("=")[0]] = decodeURI(param.split("=")[1]);
    }
    return params;
}
