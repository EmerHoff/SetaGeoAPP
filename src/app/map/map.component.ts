import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  poligonos: any;
  polbool: any;
  markers: any;
  pesquisa: any;
  getNativeDocument(): any { return document; }
  constructor() { }

  ngOnInit() {
    
    this.pesquisa = new Array();
    this.poligonos = new Array();
    this.polbool = new Array();
    const script = this.getNativeDocument().createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.onload = function () {
      console.log("Script loaded and ready");
    };


    const callbackName: string = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBd7MUEhkazm-_uVSCyR7NL_3mm_rGI23w&libraries=geometry&libraries=visualization&libraries=drawing`;
    script.src = callbackName;
    document.head.appendChild(script);


    const script2 = this.getNativeDocument().createElement('script');
    script2.type = 'text/javascript';


    const callbackName2: string = `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js`;
    script2.src = callbackName2;
    document.head.appendChild(script2);

  }
  showMap() {

    console.log('Google Maps Working!');

    //Localizacao Lat - Long
    let location = new google.maps.LatLng(-24.948293, -53.441691);
    //Map options
    let options = {
      center: location,
      zoom: 18
    }
    let element = document.getElementById('map');
    this.map = new google.maps.Map(element, options);
    this.pesquisa = new Array();
    document.getElementById('info').innerHTML = "";


    this.addDrawingManager();

  }
  addHeatMap() {
    /* Data points defined as an array of LatLng objects */
    var heatmapData = new Array();
    var i;
    var latitude = -24.948293;
    var longitude = -53.441691;
    for (i = 0; i < 70000; i++) {
      latitude = this.getRandom(-33.639776, 4.841944);
      longitude = this.getRandom(-73.696289, -35.024414);
      let location = new google.maps.LatLng(latitude, longitude);
      //var infowindow = new google.maps.InfoWindow({
      //  content: 'aiai'
      ///});
      //let marker = new google.maps.Marker({
      //   position: location
      //});
      //marker.addListener('click', function() {
      //  infowindow.open(this.map, marker);
      //});

      //marker.setMap(this.map);
      heatmapData.push(location);

      //latitude=this.getRandom(-25.003471,-24.913673);
      //longitude+=this.getRandom(-53.511615,-53.399949);

    }
    this.imprimeMarkers(heatmapData);

    var markerCluster = new MarkerClusterer(this.map, this.markers,
      { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    //var sanFrancisco = new google.maps.LatLng(-24.948293, -53.441691);

    //this.map = new google.maps.Map(document.getElementById('map'), {
    //  center: sanFrancisco,
    //  zoom: 13
    //});

    //var heatmap = new google.maps.visualization.HeatmapLayer({
    //  data: heatmapData,
    //  dissipating: true
    //});
    //heatmap.setMap(this.map);


  }
  imprimeMarkers(markersArray) {
    
    this.showMap();
    var t0 = performance.now();
    this.markers = markersArray.map(function (location, i) {
      
      var marker = new google.maps.Marker({
        position: location,
        id: i,
        nome: 'jose fino',
        idade: 50,
        sexo: 'M',
        cidade: 'cascavel',
        tamanho: 40,
        estadocivil: 'solteiro',
        calcado: 'tenis',
        cpf: '000.000.000-00'
        
      });
      marker.addListener('click', function () {
        document.getElementById('infoPessoa').innerHTML = "id = " + marker.get("id") +
        "<br>nome = " + marker.get("nome")+
        "<br>idade = " + marker.get("idade")+
        "<br>sexo = " + marker.get("sexo")+
        "<br>cidade = " + marker.get("cidade")+
        "<br>tamanho = " + marker.get("tamanho")+
        "<br>estadocivil = " + marker.get("estadocivil")+
        "<br>calcado = " + marker.get("calcado")+
        "<br>cpf = " + marker.get("cpf");
        //console.log(marker.get("readfasdfgh"));
        //var infowindow = new google.maps.InfoWindow({
        //  content: 'aiai'
        //});
        //infowindow.open(this.map, marker);
      });
      return marker;
    });
    var t1 = performance.now();
    
    console.log("time = "+(t1-t0)+"ms");
  }
  addDrawingManager() {
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: ['circle', 'polygon', 'rectangle']
      },
      circleOptions: {
        clickable: false,
        editable: true,
        zIndex: 1
      },
      rectangleOptions: {
        clickable: false,
        editable: true,
        zIndex: 1
      },
      polygonOptions: {
        clickable: false,
        editable: true,
        zIndex: 1
      }

    });
    drawingManager.setMap(this.map);
    this.addPolygon(drawingManager);
    this.addCircle(drawingManager);
    this.addRectangle(drawingManager);


    //this.pesquisa = new Array();
  }
  addPolygon(drawingManager) {
    var _self = this;
    var retangulo;
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
      _self.poligonos.push(polygon);
      _self.polbool.push(true);
      //this.retangulo = new google.maps.Polygon({paths: _self.poligonos});

      var markerCnt = 0;
      for (var i = 0; i < _self.markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(_self.markers[i].getPosition(), polygon)) {
          _self.pesquisa.push(_self.markers[i].getPosition());
          markerCnt++;
        }
      }
      document.getElementById('info').innerHTML = "markers in polygon: " + markerCnt;
      _self.imprimepesquisa();
      polygon.getPath().addListener('set_at', function (poligono) {
        var markerCnt = 0;
        _self.pesquisa = new Array();
        for (var i = 0; i < _self.poligonos.length; i++) {
          var poligono = _self.poligonos[i];
          console.log(typeof (poligono));
          for (var j = 0; j < _self.markers.length; j++) {
            if(_self.polbool[i]==false){
              if (poligono.getBounds().contains(_self.markers[j].getPosition())) {
                _self.pesquisa.push(_self.markers[j].getPosition());
                markerCnt++;
              }
            }
            else {
              if (google.maps.geometry.poly.containsLocation(_self.markers[j].getPosition(), poligono)) {
                _self.pesquisa.push(_self.markers[j].getPosition());
                markerCnt++;
              }
            }

          }
        }
        console.log(_self.poligonos)
        _self.imprimepesquisa();
      });

    });


  }
  addCircle(drawingManager) {
    var _self = this;
    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
      //var center = (circle.getCenter());
      //var radius = (circle.getRadius());
      _self.poligonos.push(circle);
      _self.polbool.push(false);
      var markerCnt = 0;
      for (var i = 0; i < _self.markers.length; i++) {
        if (circle.getBounds().contains(_self.markers[i].getPosition())) {
          _self.pesquisa.push(_self.markers[i].getPosition());
          markerCnt++;
        }
      }
      document.getElementById('info').innerHTML = "markers in circle: " + markerCnt;
      _self.imprimepesquisa();
      circle.addListener('bounds_changed', function (circle) {
        var markerCnt = 0;
        _self.pesquisa = new Array();
        for (var i = 0; i < _self.poligonos.length; i++) {
          var circulo = _self.poligonos[i];
          for (var j = 0; j < _self.markers.length; j++) {
            
            if(_self.polbool[i]==false){
              if (circulo.getBounds().contains(_self.markers[j].getPosition())) {
                _self.pesquisa.push(_self.markers[j].getPosition());
                markerCnt++;
              }
            }
            else {
              if (google.maps.geometry.poly.containsLocation(_self.markers[j].getPosition(), circulo)) {
                _self.pesquisa.push(_self.markers[j].getPosition());
                markerCnt++;
              }
            }
          }
        }
        console.log(_self.poligonos)
        _self.imprimepesquisa();
      });
      //console.log('center = ');
      //console.log(center);
      //console.log('radius = ');
      //console.log(radius);
    });
  }
  addRectangle(drawingManager) {
    var _self = this;
    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
      //var rectangle = (rectangle.getBounds());
      _self.poligonos.push(rectangle);
      _self.polbool.push(false);
      var markerCnt = 0;
      for (var i = 0; i < _self.markers.length; i++) {

        if (rectangle.getBounds().contains(_self.markers[i].getPosition())) {
          _self.pesquisa.push(_self.markers[i].getPosition());
          markerCnt++;
        }
      }
      document.getElementById('info').innerHTML = "markers in rectangle: " + markerCnt;
      _self.imprimepesquisa();
      rectangle.addListener('bounds_changed', function (rectangle) {
        var markerCnt = 0;
        _self.pesquisa = new Array();
        for (var i = 0; i < _self.poligonos.length; i++) {
          var quadrado = _self.poligonos[i];
          console.log(typeof (quadrado));
          for (var j = 0; j < _self.markers.length; j++) {
            if(_self.polbool[i]==false){
              if (quadrado.getBounds().contains(_self.markers[j].getPosition())) {
                _self.pesquisa.push(_self.markers[j].getPosition());
                markerCnt++;
              }
            }
            else {
              if (google.maps.geometry.poly.containsLocation(_self.markers[j].getPosition(), quadrado)) {
                _self.pesquisa.push(_self.markers[j].getPosition());
                markerCnt++;
              }
            }

          }
        }
        console.log(_self.poligonos)
        _self.imprimepesquisa();
      });
      //console.log("rectangle = ");
      //console.log(rectangle);
    });
  }
  imprimepesquisa() {
    console.log(this.pesquisa);
    document.getElementById('info').innerHTML += "<br>Quantidade de pontos da pesquisa: " + this.pesquisa.length;
    //this.showMap();
    //this.imprimeMarkers(this.pesquisa);

  }


  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
}
