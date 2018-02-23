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
                //Estado, marca 1, marca 2, marca 3, marca 4, marca 5, total, ganhador
                ['São Paulo', 729547, 1318255, 44467, 9391, 100, 2101760, 0],
                ['Paraná', 116454, 163387, 18725, 5735, 100, 304301, 2],
                ['Rio Grande do Sul', 1161167, 1252401, 106327, 100, 34345, 2554340, 0],
                ['Acre', 380494, 684782, 29829, 9473, 100, 1104578, 3],
                ['Santa Catarina', 8577206, 4390272, 467370, 271047, 100, 13705995, 1],
                ['Tocantins', 1338870, 1202484, 144121, 38437, 100, 2723912, 4],
                ['Minas Gerais', 897572, 673215, 48676, 22841, 100, 1642304, 1],
                ['Rio de Janeiro', 235603, 185127, 14757, 6103, 100, 441590, 3],
                ['Espírito Santo', 282830, 12723, 4906, 4258, 100, 304717, 1],
                ['Goiás', 4504975, 4617886, 207043, 64399, 100, 9394303, 2],
                ['Maranhão', 1877963, 2089104, 125306, 0, 100, 4092373, 2],
                ['Piauí', 266891, 128847, 15954, 12737, 100, 424429, 1],
                ['Pernambuco', 189765, 409055, 28331, 8496, 100, 635647, 3],
                ['Amazonas', 2977498, 2118179, 208682, 74112, 100, 5378471, 1],
                ['Mato Grosso', 1039126, 1557286, 133993, 7841, 100, 2738246, 4],
                ['Mato Grosso do Sul', 653669, 800983, 59186, 11479, 100, 1525317, 0],
                ['Sergipe', 427005, 671018, 55406, 23506, 100, 1176935, 4],
                ['Roraima', 628854, 1202971, 53752, 13913, 100, 1899490, 0],
                ['Rondônia', 780154, 1178638, 37978, 14031, 100, 2010801, 2],
                ['Pará', 352156, 332418, 37578, 13995, 100, 736147, 1],
                ['Amapá', 1502820, 878615, 78225, 33380, 100, 2493040, 1],
                ['Bahia', 1995196, 1090893, 138018, 47661, 100, 3271768, 3],
                ['Rio Grande do Norte', 2268839, 2279543, 172136, 51463, 100, 4771981, 0],
                ['Alagoas', 1367716, 1322951, 112972, 36985, 100, 2840624, 2],
                ['Ceará', 462127, 678284, 14411, 3595, 100, 1158417, 0],
                ['Distrito Federal', 1054889, 1585753, 96404, 25086, 100, 2762132, 3],
                ['Paraíba', 174281, 273879, 28036, 7868, 100, 484064, 4],
                ['CASCAVEL', 174281, 273879, 28036, 7868, 100, 484064, 4],
            ],
            maxVotes = 0,
            corMarca1 = 'rgba(74, 131, 240, 0.9)',
            corMarca2 = 'rgba(220,71,71, 0.9)',
            corMarca3 = 'rgba(240,190,50, 0.9)',
            corMarca4 = 'rgba(90,200,90, 0.9)',
            corMarca5 = 'rgba(40,70,50, 0.9)';

            //console.log(dados);

            
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
                        from: 0,
                        to: 0,
                        color: 'rgba(74, 131, 240, 0.5)',
                        name: 'Dakota'
                    }, {
                        from: 1,
                        to: 1,
                        color: 'rgba(220,71,71, 0.5)',
                        name: 'Cavalera'
                    }, {
                        from: 2,
                        to: 2,
                        name: 'Nike',
                        color: 'rgba(240,190,50, 0.5)'
                    }, {
                        from: 3,
                        to: 3,
                        name: 'Adidas',
                        color: 'rgba(90,200,90, 0.5)'
                    }, {
                        from: 4,
                        to: 4,
                        name: 'Arezzo',
                        color: 'rgba(40,70,50, 0.5)'
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
                    joinBy: ['name', 'id'],
                    keys: ['id', 'countMarca1', 'countMarca2', 'countMarca3', 'countMarca4', 'countMarca5',
                        'total', 'value', 'pieOffset'],
                    tooltip: {
                        headerFormat: '',
                        pointFormatter: function () {
                            var hoverVotes = this.hoverVotes; // Used by pie only
                            return '<b>' + this.id + ' - Marcas:</b><br/>' +
                                Highcharts.map([
                                    ['Dakota', this.countMarca1, corMarca1],
                                    ['Cavalera', this.countMarca2, corMarca2],
                                    ['Nike', this.countMarca3, corMarca3],
                                    ['Adidas', this.countMarca4, corMarca4],
                                    ['Arezzo', this.countMarca5, corMarca5]
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