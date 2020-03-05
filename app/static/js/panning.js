$(function() {
  panZoomInstance = svgPanZoom('#svgmap', {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: true,
    center: true,
    minZoom: 1, 
    maxZoom: 200,
    zoomScaleSensitivity: 1
  });
  
  // zoom out
  //panZoomInstance.zoom(0.5)
  var counter = 0

  $("#move").on("click", function() {
    // Pan by any values from -80 to 80
   panZoomInstance.zoomAtPoint(8,{x: 434, y: 395});
   
   console.log('got here');
    //zoomToPathWithID("node23");
    });
    
    });
    
    function zoomToPathWithID(id){
  panZoomInstance.reset();
  function checkX(x, maxwidth){
	  if (x < 0){
			  x =0
		}else if( x > maxwidth){
			x = maxwidth
		}
	  return x
  }

  //REM: Apparently the values need some times to adjust after reset() is called, yet is seems to have no callback.
  window.setTimeout(function(){
	  //console.log('got here');
  //var heightTest = $('#canvasclass');
   //var hAdj = heightTest.height();
   console.log(document.getElementsByClassName('canvasclass'));
   var hAdj = document.getElementsByClassName('canvasclass')[0].clientHeight;
   var wAdj = document.getElementsByClassName('canvasclass')[0].clientWidth;
   //var hAdj = 500;
   console.log(wAdj);
      var tViewport = document.querySelector('g.svg-pan-zoom_viewport');
      var tMatrix = tViewport.transform.baseVal.getItem(0).matrix;
	  //console.log('got here');
	  
      console.log(tMatrix);
      var tBBox = document.getElementById(id).getBBox();
      //var tPoint = {x: -((tBBox.x + tBBox.width / 2) * tMatrix.a + tMatrix.e), y: (tBBox.y + tBBox.height /2) * (tMatrix.d) + (tMatrix.f) + (hAdj) * 2.25}
      var tPoint = {x: 0, y: 0}
      console.log(tBBox.x);
	  console.log(wAdj / 2);
      /* if(tBBox.x < (wAdj / 3)){
      	tPoint = {x: -((tBBox.x + tBBox.width) * tMatrix.a + tMatrix.e), y: (tBBox.y + tBBox.height /2) * (tMatrix.d) + (hAdj) - (tMatrix.f)}
      }else if(tBBox.x < (wAdj / 2)){
      	tPoint = {x: ((tBBox.x) * tMatrix.a + tMatrix.e), y: (tBBox.y + tBBox.height /2) * (tMatrix.d) + (hAdj) - (tMatrix.f)}
      }else{
		  tPoint = {x: ((tBBox.x + tBBox.width * 2) * tMatrix.a + tMatrix.e), y: (tBBox.y + tBBox.height /2) * (tMatrix.d) + (hAdj) - (tMatrix.f)}
	  } */
	  var s = panZoomInstance.getSizes();
	  var origs = s.viewBox.width;
      console.log(origs);
	  var xx =0;
	  if(tBBox.x < (wAdj / 2)){
		  xx = (tBBox.x / wAdj) * (wAdj * tMatrix.a) - (tBBox.width / 2);
		  xx = checkX(xx,wAdj);
      	tPoint = {x: xx, y: (tBBox.y + tBBox.height /2) * (tMatrix.d) + (hAdj) - (tMatrix.f)}
      }else if(tBBox.x > (wAdj / 2) && tBBox.x < (origs - wAdj)){
		  xx = ((tBBox.x / wAdj) * (wAdj * tMatrix.a));
		  xx = checkX(xx,wAdj);
      	tPoint = {x: xx , y: (tBBox.y + tBBox.height /2) * (tMatrix.d) + (hAdj) - (tMatrix.f)}
      }else{
		  xx = ((tBBox.x / wAdj) * (wAdj * tMatrix.a)) + (tBBox.width / 2);
		  xx = checkX(xx,wAdj);
		  tPoint = {x: xx, y: (tBBox.y + tBBox.height /2) * (tMatrix.d) + (hAdj) - (tMatrix.f)}
	  }
	  
      //tPoint = {x: (tBBox.x * tMatrix.a) - tBBox.width /2, y: (tBBox.y + tBBox.height /2) * (tMatrix.d) + (hAdj) - (tMatrix.f)}
	  console.log(tBBox);
      console.log(tPoint);
	  
	  console.log(origs);
	  var zoomP = 8;
	  if(origs >= 5000){
		  zoomP = 8;
	  }else if(origs < 5000 && origs >= 4000){
		  zoomP = 6;
	  }else if(origs < 4000 && origs >= 2000){
		  zoomP = 4;
	  }else{
		  zoomP = 2;
	  }
      
      panZoomInstance.zoomAtPoint(zoomP, tPoint);
	  //console.log('got here');
}, 500)
}

window.onload=function(){
	//document.getElementsByClassName('dataframe')[0].addEventListener("click",function(e) {
	// e.target was the clicked element
	//console.log(e.currentTarget);
	//});
	var table = document.getElementsByClassName('dataframe')[0];
	
	if (table) {
		for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			var aifid= tableText(this);
			zoomToPathWithID(aifid);
			};
		}
	}

	function tableText(tableRow) {
		var aifid = tableRow.childNodes[1].innerHTML;
		return aifid;

	}
	
	}