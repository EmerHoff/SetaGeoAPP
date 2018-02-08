import { Component, OnInit } from '@angular/core';

declare var Highcharts: any;

@Component({
  selector: 'app-highmap',
  templateUrl: './highmap.component.html',
  styleUrls: ['./highmap.component.css']
})
export class HighmapComponent implements OnInit {


  constructor() {
    
  }

  ngOnInit() {
    this.action();
  }

  openNav() {
    document.getElementById("myMenu").style.width = "50%";
    document.getElementById("myMenu").style.marginTop = "21px";
  }

  closeNav() {
      document.getElementById("myMenu").style.width = "0";
  }

  action(){
    // Prepare demo data
    // Data is joined to map using value of 'hc-key' property by default.
    // See API docs for 'joinBy' for more info on linking data and map.
    var data = [
      ['br-sp', 10000],
      ['br-ma', 100],
      ['br-pa', 2000],
      ['br-sc', 3000],
      ['br-ba', 540],
      ['br-ap', 522],
      ['br-ms', 6120],
      ['br-mg', 7111],
      ['br-go', 2118],
      ['br-rs', 5219],
      ['br-to', 910],
      ['br-pi', 11],
      ['br-al', 712],
      ['br-pb', 4513],
      ['br-ce', 5214],
      ['br-se', 1215],
      ['br-rr', 1600],
      ['br-pe', 1007],
      ['br-pr', 9000],
      ['br-es', 1900],
      ['br-rj', 2000],
      ['br-rn', 2100],
      ['br-am', 2200],
      ['br-mt', 2300],
      ['br-df', 2124],
      ['br-ac', 2475],
      ['br-ro', 5026]
    ];

    // Create the chart
    Highcharts.mapChart('mapa', {
      chart: {
        map: 'countries/br/br-all'
      },

      title: {
        text: ''
      },

      subtitle: {
        //text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/br/br-all.js">Brazil</a>'
      },
      
      legend: {
        enabled: true
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },

      colorAxis: {
        min: 0
      },

      series: [{
        data: data,
        name: 'Detalhes:',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        }
      }]

      
    });

    ///Map Brazil with points

    /*function showMap(mapKey) {

      var supportsLatLon = !!Highcharts.maps[mapKey]['hc-transform'];
  
      // Initiate the chart
      Highcharts.mapChart('container', {
  
          chart: {
              events: {
                  click: function (e) {
                      var series = this.get($('input[name=series]:checked').val()),
                          x = Math.round(e.xAxis[0].value),
                          y = Math.round(e.yAxis[0].value);
  
                      series.addPoint(supportsLatLon ? this.fromPointToLatLon({
                          x: x,
                          y: y
                      }) : {
                          x: x,
                          y: y
                      });
                      
                  }
              },
              animation: false
          },
          
          title: {
              text: ''
          },
  
          subtitle: supportsLatLon ? {} : {
              text: 'This map does not support latitude/longitude - x/y coordinates will be used',
              style: {
                  color: 'red'
              }
          },
  
          mapNavigation: {
              enabled: true,
              buttonOptions: {
                  verticalAlign: 'bottom'
              }
          },
  
          legend: {
              enabled: false
          },
  
          tooltip: {
              pointFormatter: function () {
                  return supportsLatLon ? 'Lat: ' + this.lat.toFixed(3) + ', Lon: ' + this.lon.toFixed(3) : 'x: ' + this.x + ', y: ' + this.y;
              }
          },
  
          plotOptions: {
              series: {
                  point: {
                      events: {
                          // Update lat/lon properties after dragging point
                          drop: function () {
                              var newLatLon;
                              if (supportsLatLon) {
                                  newLatLon = this.series.chart.fromPointToLatLon(this);
                                  this.lat = newLatLon.lat;
                                  this.lon = newLatLon.lon;
                              }
                          }
                      }
                  }
              }
          },
  
          series: [{
              mapData: Highcharts.maps[mapKey]
          }, {
              type: 'mappoint',
              id: 'points',
              name: 'Points',
              draggableX: true,
              draggableY: true,
              cursor: 'move'
          }]
      });
  }
  
  showMap('countries/br/br-all');*/
    

  }

}
