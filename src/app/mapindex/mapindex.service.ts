import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapIndexService {
    
    constructor(private http: HttpClient) { }

    public nameClicked: any;

    getConfig() {
        var configUrl = 'assets/geojson/SETA.BR.json';
        return this.http.get(configUrl);
    }

    getData(nameClicked){
        var dataUrl = 'assets/geojson/' + nameClicked + '.json';
        return this.http.get(dataUrl);
    }

    getValues() {
        var configUrl = 'https://cdn.rawgit.com/highcharts/highcharts/v6.0.4/samples/data/us-population-density.json';
        return this.http.get(configUrl);
    }
}