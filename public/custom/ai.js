google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {
   var initdata = [
      ['Age', 'Weight'],
      [ 8,      12],
      [ 4,      5.5],
      [ 11,     14],
      [ 4,      5],
      [ 3,      3.5],
      [ 6.5,    7]
   ]
   var data = google.visualization.arrayToDataTable(initdata)

   var options = {
      title: 'Age vs. Weight comparison',
      titleTextStyle: {color: 'white'},
      colors: ["white"],
      hAxis: {
      title: 'Age',
      minValue: 0, 
      maxValue: 15,
      titleTextStyle: {color: 'white'},
      textStyle: { color: 'white', fontName: 'Roboto', fontSize: '12', bold: true}
   },
      vAxis: {
         title: 'Weight', 
         minValue: 0, 
         maxValue: 15,
         titleTextStyle: {color: 'white'},
            textStyle: { color: 'white', fontName: 'Roboto', fontSize: '12', bold: true}
      },
      legend: 'none',
      backgroundColor: 'transparent'
   };

   var chart = new google.visualization.ScatterChart(document.getElementById('chart_div1'));

   chart.draw(data, options);
   function getRandomIntInclusive(min, max) {
      return (Math.random() * (max - min) + min).toFixed(1); //The maximum is inclusive and the minimum is inclusive 
   }
   function update(){
      var x = getRandomIntInclusive(3.5, 10)
      var y = getRandomIntInclusive(2.5, 10.4)
      return initdata.push([x,y])
   }
   setInterval(function(){
      update()
      data = google.visualization.arrayToDataTable(initdata)
      chart.draw(data, options);
   }, 1000)
}

