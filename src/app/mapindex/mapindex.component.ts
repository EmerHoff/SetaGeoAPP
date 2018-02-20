import { Component, OnInit } from '@angular/core';
import { Console } from '@angular/core/src/console';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapIndexService } from './mapindex.service';

declare var Highcharts: any;

@Component({
    selector: 'app-mapindex',
    templateUrl: './mapindex.component.html',
    styleUrls: ['./mapindex.component.css']
})
export class MapindexComponent implements OnInit {
    
    public json: any;
    public values: any;
    public dados: any;
    constructor(private clienteService: MapIndexService) {

    }

    ngOnInit() {

        //melhorar a forma de armazenamento
        this.values = this.clienteService.contagemPessoaUFs('BR');
        console.log(this.values[0]);
         /*this.values = {
            'SETA.BR.RS': 3104,
            'SETA.BR.ES': 1299,
            'SETA.BR.PA': 503,
            'SETA.BR.EX': 3,
            'SETA.BR.AM': 192,
            'SETA.BR.MT': 749,
            'SETA.BR.MG': 4900,
            'SETA.BR.PR': 5480,
            'SETA.BR.CE': 594,
            'SETA.BR.BA': 1983,
            'SETA.BR.SP': 6925,
            'SETA.BR.PI': 262,
            'SETA.BR.AL': 285,
            'SETA.BR.GO': 1559,
            'SETA.BR.MA': 378,
            'SETA.BR.MS': 744,
            'SETA.BR.AC': 74,
            'SETA.BR.SE': 276,
            'SETA.BR.RI': 1,
            'SETA.BR.PE': 938,
            'SETA.BR.DF': 1336,
            'SETA.BR.RJ': 4746,
            'SETA.BR.RR': 44,
            'SETA.BR.AP': 66,
            'SETA.BR.SC': 3581,
            'SETA.BR.RO': 290,
            'SETA.BR.TO': 310,
            'SETA.BR.PB': 429,
            'SETA.BR.RN': 355,
            'SETA.BR.PR.FRANCISCO BELTRAO': 978,
            'SETA.BR.PR.CURITIBA': 1731,
            'SETA.BR.PR.CASCAVEL': 1172,
            'SETA.BR.PR.PATO BRANCO': 1166,
            'SETA.BR.PR.LONDRINA': 334,
            'SETA.BR.PR.MARINGA': 271,
            'SETA.BR.PR.PONTA GROSSA': 237,
            'SETA.BR.PR.MARMELEIRO': 197,
            'SETA.BR.PR.SAO JOSE DOS PINHAIS': 145,
            'SETA.BR.PR.FOZ DO IGUACU': 141,
            'SETA.BR.PR.GUARAPUAVA': 116,
            'SETA.BR.PR.UMUARAMA': 98,
            'SETA.BR.PR.DOIS VIZINHOS': 97,
            'SETA.BR.PR.CASCAVEL.ESMERALDA': 6,
            'SETA.BR.PR.CASCAVEL.RECANTO TROPICAL': 28,
            'SETA.BR.PR.CASCAVEL.SANTA FELICIDADE': 12,
            'SETA.BR.PR.CASCAVEL.CASCAVEL VELHO': 21,
            'SETA.BR.PR.CASCAVEL.PACAEMBU': 31,
            'SETA.BR.PR.CASCAVEL.PARQUE VERDE': 41,
            'SETA.BR.PR.CASCAVEL.UNIVERSITARIO': 46,
            'SETA.BR.PR.CASCAVEL.PARQUE SAO PAULO': 46,
            'SETA.BR.PR.CASCAVEL.FAG': 9,
            'SETA.BR.PR.CASCAVEL.COQUEIRAL': 43,
            'SETA.BR.PR.CASCAVEL.ALTO ALEGRE': 41,
            'SETA.BR.PR.CASCAVEL.INTERLAGOS': 13,
            'SETA.BR.PR.CASCAVEL.FLORESTA': 20,
            'SETA.BR.PR.CASCAVEL.REGIAO DO LAGO': 13,
            'SETA.BR.PR.CASCAVEL.CANCELLI': 54,
            'SETA.BR.PR.CASCAVEL.CLAUDETE': 2,
            'SETA.BR.PR.CASCAVEL.GUARUJA': 34,
            'SETA.BR.PR.CASCAVEL.BRAZMADEIRA': 19,
            'SETA.BR.PR.CASCAVEL.SAO CRISTOVAO': 76,
            'SETA.BR.PR.CASCAVEL.COUNTRY': 31,
            'SETA.BR.PR.CASCAVEL.SANTOS DUMONT': 5,
            'SETA.BR.PR.CASCAVEL.14 DE NOVEMBRO': 10,
            'SETA.BR.PR.CASCAVEL.NEVA': 58,
            'SETA.BR.PR.CASCAVEL.CENTRO': 280,
            'SETA.BR.PR.CASCAVEL.PERIOLO': 15,
            'SETA.BR.PR.CASCAVEL.SANTO ONOFRE': 7,
            'SETA.BR.PR.CASCAVEL.BRASILIA': 35,
            'SETA.BR.PR.CASCAVEL.MARIA LUIZA': 36,
            'SETA.BR.PR.CASCAVEL.CIRO NARDI': 18,
            'SETA.BR.PR.CASCAVEL.CATARATAS': 7,
            'SETA.BR.PR.CASCAVEL.MORUMBI': 6,
            'SETA.BR.PR.CASCAVEL.ESPIGAO AZUL': 1,
            'SETA.BR.PR.CASCAVEL.CANADA': 19,
            'SETA.BR.PR.CASCAVEL.PIONEIROS CATARINENSES': 22,
            'SETA.BR.PR.CASCAVEL.SANTA CRUZ': 20,
            'SETA.BR.PR.CASCAVEL.NOVA CIDADE': 17
         }*/

        //chama json com os valores
        this.clienteService.getValues().subscribe(clienteResult => {
            this.dados = this.clienteService.contagemPessoaUFs('BR');
        });

        this.clienteService.getConfig().subscribe(clienteResult => {
            this.json = clienteResult;
            Highcharts.maps["SETA.BR"] = clienteResult;

            //puxa o primeiro mapa principal, que é "SETA.BR"
            var data = Highcharts.geojson(Highcharts.maps['SETA.BR']);

            //preenche os primeiros 
            var _self = this;
            data.forEach(function (i) {
                i.drilldown = i.properties['hc-key'];
                i.value = _self.values[i.properties['hc-key']];    
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

                            _self.clienteService.getData(e.point.drilldown).subscribe(clienteResult => {
                                mapKey = e.point.drilldown;
                                console.log(mapKey);
                                
                                this.json = clienteResult;
                                Highcharts.maps[mapKey] = clienteResult;

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
                                    console.log(data);
                                    
                                    data.forEach(function (i) {
                                        var value = _self.values[i.properties['hc-key']];
                                        
                                        if (value != undefined) {
                                            i.value = value;
                                        } else {
                                            i.value = 0;
                                        }
                                        //TODO no terceiro nivel não pode existir mais drilldown.
                                        i.drilldown = i.properties['hc-key'];
                                        count++;
                                    });
                                    

                                    var count = 0;
                                    var _newself = _self;
                                    console.log(_self.dados[count].value);

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

                                    console.log('saiu');

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
                                
                        },
                        drillup: function () {
                            this.setTitle(null, { text: '' });
                        }
                    }
                },

                title: {
                    text: 'SetaDigital, Exemplo DrillDown'
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
        
        //console.log(this.json);

    };

}