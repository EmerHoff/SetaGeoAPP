import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapIndexService {

    constructor(private http: HttpClient) { }

    public nameClicked: any;
    private contagemPessoas = 'http://localhost:59228/api/geoseta'; // pais , uf, cidade
    private marcaContagem = 'http://localhost:59228/api/geoseta/marca'; // passa pais, UF, cidade 
    private gastoContagem = 'http://localhost:59228/api/geoseta/gasto';

    getConfig() {
        var configUrl = 'assets/geojson/SETA.BR.json';
        return this.http.get(configUrl);
    }

    getData(nameClicked) {
        var dataUrl = 'assets/geojson/' + nameClicked + '.json';
        return this.http.get(dataUrl);
    }

    getValues() {
        var configUrl = 'https://cdn.rawgit.com/highcharts/highcharts/v6.0.4/samples/data/us-population-density.json';
        return this.http.get(configUrl);
    }

    contagemPessoaBairros(pais: string, estado: string, cidade: string) {
        const url = `${this.contagemPessoas}/${pais}/${estado}/${cidade}`;
        return this.http.get(url);
    } 
    contagemPessoaCidades(pais: string, estado: string) {
        const url = `${this.contagemPessoas}/${pais}/${estado}`;
        return this.http.get(url);
    }
    contagemPessoaUFs(pais: string) {
        const url = `${this.contagemPessoas}/${pais}`;
        console.log(url);
        var a = this.http.get(url);
        return  a;
    }

    marcaContagemBairros(pais: string, estado: string, cidade: string) {
        const url = `${this.marcaContagem}/${pais}/${estado}/${cidade}`;
        return this.http.get(url);
    }
    marcaContagemCidades(pais: string, estado: string) {
        const url = `${this.marcaContagem}/${pais}/${estado}`;
        return this.http.get(url);
    }
    marcaContagemUFs(pais: string) {
        const url = `${this.marcaContagem}/${pais}`;
        return this.http.get(url);
    }

    gastoContagemBairros(pais: string, estado: string, cidade: string) {
        const url = `${this.gastoContagem}/${pais}/${estado}/${cidade}`;
        return this.http.get(url);
    }
    gastoContagemCidades(pais: string, estado: string) {
        const url = `${this.gastoContagem}/${pais}/${estado}`;
        return this.http.get(url);
    }
    gastoContagemUFs(pais: string) {
        const url = `${this.gastoContagem}/${pais}`;
        return this.http.get(url);
    }

}