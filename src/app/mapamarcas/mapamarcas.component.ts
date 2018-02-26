import { Component, OnInit } from '@angular/core';
import { Console } from '@angular/core/src/console';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapamarcasService } from './mapamarcas.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/Rx';

declare var Highcharts: any;

@Component({
    selector: 'app-mapamarcas',
    templateUrl: './mapamarcas.component.html',
    styleUrls: ['./mapamarcas.component.css']
})
export class MapamarcasComponent implements OnInit {
    
    public json: any;
    public values: any;
    public dados: any;
    public dateShape: any;
    

    constructor(private clienteService: MapamarcasService) {

    }
    
    openNav() {
        document.getElementById("myMenu").style.width = "50%";
        document.getElementById("myMenu").style.marginTop = "21px";
    }
    
    closeNav() {
        document.getElementById("myMenu").style.width = "0";
    }

    ngOnInit() {

        var levelDrilldown = 0;
        var _self2 = this;
        Observable.forkJoin(
            this.clienteService.contagemPessoaUFs('BR'),
            this.clienteService.getConfig()
        ).subscribe(([res0, res1]) => {
            //console.log("Resultados do forkjoin");
            Highcharts.maps["SETA.BR"] = res1;
            //console.log(res1)
            this.values = JSON.parse(res0.toString());
            //console.log(this.values);

            var shape = Highcharts.geojson(Highcharts.maps['SETA.BR']);
            var _self = _self2;

            var _self = this;

            shape.forEach(function (i) {
                i.drilldown = i.properties['hc-key'];
            });

            Highcharts.seriesType('mappie', {
                center: null, // Can't be array by default anymore
                clip: true, // For map navigation
                states: {
                    color: 'rgba(74,131,240,0.80)',
                    hover: {
                        halo: {
                            size: 5
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                }
            });

            var dados = [
                //Estado, marca 1, quant, marca 2, marca 3, marca 4, marca 5, total, ganhador
                ['SETA.BR.RS', 'Dakota', 124454, 'Nike', 63387, 'Cavalera', 181725, 'Adidas', 55735, 'VIZZANO', 45100, 304301, 3],
                ['SETA.BR.PR', 'Dakota', 164454, 'Nike', 43387, 'Cavalera', 127254, 'Adidas', 57035, 'VIZZANO', 11400, 304301, 1],
            ],
            maxVotes = 0;

            var corMarcas = [ ['rgba(74, 131, 240, 0.9)'],
                              ['rgba(220,71,71, 0.9)'],
                              ['rgba(240,190,50, 0.9)'],
                              ['rgba(90,200,90, 0.9)'],
                              ['rgba(40,70,50, 0.9)']
            ];

            
            var mapKey;
            var _self = this;
            var count = 0;
            
            var chart = Highcharts.mapChart('container', {
                chart: {
                    events: {
                        drilldown: function (e) {
                            //TODO Carregar pelo banco as informações dos caras clicados.
                            //e  jogar num objeto chamado Highcharts.maps;
                            if(levelDrilldown < 2){
                                levelDrilldown++; //controla em que nivel o drilldown esta
                                var estado = e.point.drilldown;
                                var mapKey = e.point.drilldown;
                                estado = estado.replace("SETA.BR.", "");
                                if (Highcharts.maps[mapKey] == null) {

                                    //console.log(estado);
                                    Observable.forkJoin(// Faz as duas requisições do shape do banco e adiciona o valor do banco no shape
                                        _self.clienteService.getShape(e.point.drilldown),
                                        _self.clienteService.requisicaoContagem(mapKey)
                                    ).subscribe(([res0, res1]) => {
                                        mapKey = e.point.drilldown;
                                        _self.json = res0;
                                        _self.values = JSON.parse(res1.toString());
                                        Highcharts.maps[mapKey] = res0;

                                        shape = Highcharts.geojson(Highcharts.maps[mapKey]);
                                        
                                        mapKey = e.point.drilldown;
                                        console.log(mapKey);

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

                                            chart.showLoading('<i class="icon-spinner icon-spin icon-large icon-css"></i>'); // Font Awesome spinner trocar pelo do Seta futuramente
                                            var count = 1;
                                            shape.forEach(function (i) {
                                                /*var value = _self.dados[i.properties['name']][6];
                                                console.log(value);
                                                if (value != undefined) {
                                                    i.value = value;
                                                } else {
                                                    i.value = 0;
                                                }
                                                //TODO no terceiro nivel não pode existir mais drilldown.*/
                                                i.drilldown = i.properties['hc-key'];
                                                count++;

                                                
                                            });
                                            chart.hideLoading();
                                            clearTimeout(fail);
                                            //console.log(dados);
                                            chart.addSeriesAsDrilldown(e.point, {                                            
                                                name: e.point.name,
                                                data: shape,
                                                dataLabels: {
                                                    enabled: false,
                                                    format: '{point.properties.postal-code}'
                                                }
                                            });
                                            this.setTitle(null, { text: e.point.name });
                                        }

                                        

                                    });

                                }
                                else {

                                    _self.clienteService.requisicaoContagem(mapKey).subscribe((res1) => {
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

                                            shape = Highcharts.geojson(Highcharts.maps[mapKey]);
                                            shape.forEach(function (i) {
                                                i.drilldown = i.properties['hc-key'];
                                                /*var value = _self.values[i.properties['hc-key']];
                                                if (value != undefined) {
                                                    i.value = value;
                                                } else {
                                                    i.value = 0;
                                                }
                                                //TODO no terceiro nivel não pode existir mais drilldown.*/
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
                                                data: shape,
                                                dataLabels: {
                                                    enabled: false,
                                                    format: '{point.name}'
                                                }
                                            });

                                        }
                                    });
                                }
                            }
                        },
                        drillup: function () {
                            this.setTitle(null, { text: '' });
                            levelDrilldown--; //controla em que nivel o drilldown esta
                        }
                        
                    }
                },

                title: {
                    text: 'SetaDigital - Mapa de Marcas'
                },

                colorAxis: {
                    dataClasses: [{
                        from: 1,
                        to: 1,
                        color: corMarcas[0][0],
                        name: dados[1][1]
                    }, {
                        from: 2,
                        to: 2,
                        color: corMarcas[1][0],
                        name: dados[1][3]
                    }, {
                        from: 3,
                        to: 3,                       
                        color: corMarcas[2][0],
                        name: dados[1][5]
                    }, {
                        from: 4,
                        to: 4,
                        color: corMarcas[3][0],
                        name: dados[1][7]
                    }, {
                        from: 5,
                        to: 5,
                        color: corMarcas[4][0],
                        name: dados[1][9]    
                    }]
                },
            
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                // Limit zoom range
                yAxis: {
                    minRange: 2300
                },
            
                tooltip: {
                    useHTML: true
                },
            
                // Default options for the pies
                plotOptions: {
                    mappie: {
                        borderColor: 'rgba(255,255,255,0.4)',
                        borderWidth: 1,
                        tooltip: {
                            headerFormat: ''
                        }
                    }
                },

                series: [{
                    mapData: shape,
                    data: dados,
                    name: 'Brasil',
                    dataLabels: {
                        enabled: true,
                        format: '{point.properties.postal-code}'
                    },
                    borderColor: '#7a7a7a',
                    showInLegend: false,
                    joinBy: ['hc-key', 'id'],
                    keys: ['id', 'nomeMarca1', 'quantMarca1', 'nomeMarca2', 'quantMarca2', 'nomeMarca3', 'quantMarca3', 'nomeMarca4', 'quantMarca4', 'nomeMarca5', 'quantMarca5',
                        'total', 'value', 'pieOffset'],
                    tooltip: {
                        headerFormat: '',
                        pointFormatter: function () {
                            var hoverVotes = this.hoverVotes; // Used by pie only
                            return '<b>' + this.id + ' - Marcas:</b><br/>' +
                                Highcharts.map([
                                    [this.nomeMarca1, this.quantMarca1, corMarcas[0][0]],
                                    [this.nomeMarca2, this.quantMarca2, corMarcas[1][0]],
                                    [this.nomeMarca3, this.quantMarca3, corMarcas[2][0]],
                                    [this.nomeMarca4, this.quantMarca4, corMarcas[3][0]],
                                    [this.nomeMarca5, this.quantMarca5, corMarcas[4][0]],
                                ].sort(function (a, b) {
                                    return b[1] - a[1]; // Sort tooltip by most votes
                                }), function (line) {
                                    return '<span style="color:' + line[2] +
                                        // Colorized bullet
                                        '">\u25CF</span> ' +
                                        // Party and votes
                                        (line[0] === hoverVotes ? '<b>' : '') +
                                        line[0] + ': ' +
                                        Highcharts.numberFormat(line[1], 0) +
                                        (line[0] === hoverVotes ? '</b>' : '') +
                                        '<br/>';
                                }).join('') +
                                '<hr/>Total: ' + Highcharts.numberFormat(this.total, 0);
                        }
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
            
            chart.redraw();

            });

    };

}