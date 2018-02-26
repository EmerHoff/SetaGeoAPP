import { Component, OnInit } from '@angular/core';
import { Console } from '@angular/core/src/console';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapService } from '../map.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/Rx';

declare var Highcharts: any;

@Component({
    selector: 'app-mapgasto',
    templateUrl: './mapgasto.component.html',
    styleUrls: ['./mapgasto.component.css']
})
export class MapgastoComponent implements OnInit {

    public json: any;
    public values: any;
    public dados: any;
    constructor(private clienteService: MapService) {

    }

    openNav() {
        document.getElementById("myMenu").style.width = "50%";
        document.getElementById("myMenu").style.marginTop = "21px";
    }
    
    closeNav() {
        document.getElementById("myMenu").style.width = "0";
    }

    ngOnInit(){
        var _self2 = this;
        Observable.forkJoin(
            this.clienteService.gastoContagemUFs('BR'),
            this.clienteService.getConfig()
        ).subscribe(([res0, res1]) => {
            //console.log("Resultados do forkjoin");
            Highcharts.maps["SETA.BR"] = res1;
            //console.log(res0);

            var b = res0;
            var aux = _self2.clienteService.formatJSON(b);
            _self2.values = JSON.parse(aux.toString());

            var data = Highcharts.geojson(Highcharts.maps['SETA.BR']);
            var _self = _self2;
            data.forEach(function (i) {

                //console.log(data);
                i.drilldown = i.properties['hc-key'];
                //console.log(i.drilldown);
                i.value = _self.values[i.properties['hc-key']];
                //console.log(i.value);
            });

            //preenche os primeiros 
            //Adiciona os valores do json chamado
            var count = 0;
            // data.forEach(function (i) {
            //     i.drilldown = i.properties['hc-key'];  
            //     i.value = _self.dados[count].value;
            //     count++;
            // });

            // Instantiate the map

            Highcharts.mapChart('container', {
                chart: {
                    events: {
                        drilldown: function (e) {
                            //TODO Carregar pelo banco as informações dos caras clicados.
                            //e  jogar num objeto chamado Highcharts.maps;
                            var estado = e.point.drilldown;
                            var mapKey = e.point.drilldown;
                            estado = estado.replace("SETA.BR.", "");
                            if (Highcharts.maps[mapKey] == null) {

                                //console.log(estado);
                                Observable.forkJoin(// Faz as duas requisições do shape do banco e adiciona o valor do banco no shape
                                    _self.clienteService.getShape(e.point.drilldown),
                                    _self.clienteService.requisicaoGasto(mapKey)
                                ).subscribe(([res0, res1]) => {
                                    mapKey = e.point.drilldown;
                                    _self.json = res0;
                                    var b = res1;
                                    var aux = _self.clienteService.formatJSON(b);
                                    _self.values = JSON.parse(aux.toString());


                                    Highcharts.maps[mapKey] = res0;

                                    data = Highcharts.geojson(Highcharts.maps[mapKey]);
                                    if (!e.seriesOptions) {
                                        var chart = this,
                                            mapKey = e.point.drilldown,
                                            //modificar o icon de loading futuramente
                                            fail = setTimeout(function () {
                                                if (!Highcharts.maps[mapKey]) {
                                                    chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                                                    fail = setTimeout(function () {
                                                        chart.hideLoading();
                                                    }, 1000);
                                                }
                                            }, 3000);


                                        // Show the spinner
                                        //chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner trocar pelo do Seta futuramente

                                        // TODO Isso daqui carrega o script do Mapa Clicado, contudo tem que ser modificado pelo angular depois.

                                        //data = Highcharts.geojson(Highcharts.maps[mapKey]);
                                        data.forEach(function (i) {
                                            i.drilldown = i.properties['hc-key'];
                                            var value = _self.values[i.properties['hc-key']];
                                            if (value != undefined) {
                                                i.value = value;
                                            } else {
                                                i.value = 0;
                                            }
                                            //TODO no terceiro nivel não pode existir mais drilldown.
                                        });


                                        var count = 0;
                                        var _newself = _self;
                                        //console.log(_self.dados[count].value);

                                        // data.forEach(function (i) {
                                        //     //var value = _self.values[i.properties['hc-key']];
                                        //     if(count <= 45){
                                        //         i.value = _newself.dados[count].value;
                                        //     }
                                        //     else {
                                        //         i.value = 100;
                                        //     }

                                        //     //console.log(i.value);  
                                        //     /*if (value != undefined) {
                                        //         i.value = value;
                                        //     } else {
                                        //         i.value = 0;
                                        //     }*/
                                        //     //TODO no terceiro nivel não pode existir mais drilldown.
                                        //     i.drilldown = i.properties['hc-key'];
                                        //     count++;
                                        // });

                                        // Hide loading and add series
                                        chart.hideLoading();
                                        clearTimeout(fail);
                                        chart.addSeriesAsDrilldown(e.point, {
                                            name: e.point.name,
                                            data: data,
                                            dataLabels: {
                                                enabled: false,
                                                format: '{point.name}'
                                            }
                                        });
                                    }
                                });

                            }
                            else {

                                _self.clienteService.requisicaoGasto(mapKey).subscribe((res1) => {
                                    _self.values = JSON.parse(res1.toString());
                                    //data = Highcharts.geojson(Highcharts.maps[estado]);
                                    if (!e.seriesOptions) {
                                        var chart = this,
                                            mapKey = e.point.drilldown,
                                            //modificar o icon de loading futuramente
                                            fail = setTimeout(function () {
                                                if (!Highcharts.maps[mapKey]) {
                                                    chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                                                    fail = setTimeout(function () {
                                                        chart.hideLoading();
                                                    }, 1000);
                                                }
                                            }, 3000);


                                        // Show the spinner
                                        //chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner trocar pelo do Seta futuramente

                                        // TODO Isso daqui carrega o script do Mapa Clicado, contudo tem que ser modificado pelo angular depois.

                                        data = Highcharts.geojson(Highcharts.maps[mapKey]);
                                        data.forEach(function (i) {
                                            i.drilldown = i.properties['hc-key'];
                                            var value = _self.values[i.properties['hc-key']];
                                            if (value != undefined) {
                                                i.value = value;
                                            } else {
                                                i.value = 0;
                                            }
                                            //TODO no terceiro nivel não pode existir mais drilldown.
                                        });


                                        var count = 0;
                                        var _newself = _self;
                                        //console.log(_self.dados[count].value);

                                        // data.forEach(function (i) {
                                        //     //var value = _self.values[i.properties['hc-key']];
                                        //     if(count <= 45){
                                        //         i.value = _newself.dados[count].value;
                                        //     }
                                        //     else {
                                        //         i.value = 100;
                                        //     }

                                        //     //console.log(i.value);  
                                        //     /*if (value != undefined) {
                                        //         i.value = value;
                                        //     } else {
                                        //         i.value = 0;
                                        //     }*/
                                        //     //TODO no terceiro nivel não pode existir mais drilldown.
                                        //     i.drilldown = i.properties['hc-key'];
                                        //     count++;
                                        // });

                                        // Hide loading and add series
                                        chart.hideLoading();
                                        clearTimeout(fail);
                                        chart.addSeriesAsDrilldown(e.point, {
                                            name: e.point.name,
                                            data: data,
                                            dataLabels: {
                                                enabled: false,
                                                format: '{point.name}'
                                            }
                                        });
                                    }
                                })
                            }

                        },
                        drillup: function () {
                            this.setTitle(null, { text: '' });
                        }
                    }
                },

                title: {
                    text: 'SetaDigital - Mapa de gastos dos clientes'
                },

                subtitle: {
                    text: '',
                    floating: true,
                    align: 'right',
                    y: 50,
                    style: {
                        fontSize: '16px'
                    }
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                colorAxis: {
                    min: 0,
                    minColor: '#E6E7E8',
                    maxColor: '#005645'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                plotOptions: {
                    map: {
                        states: {
                            hover: {
                                color: '#EEDD66'
                            }
                        }
                    }
                },

                series: [{
                    data: data,
                    name: 'Brasil',
                    dataLabels: {
                        enabled: true,
                        format: '{point.properties.postal-code}'
                    }
                }],

                drilldown: {
                    activeDataLabelStyle: {
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        textOutline: '1px #000000'
                    },
                    drillUpButton: {
                        relativeTo: 'spacingBox',
                        position: {
                            x: 0,
                            y: 60
                        }
                    }
                }
            });
        });
    }

}