import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs/Observable';

@Injectable()
export class MapamarcasService {

    constructor(private http: HttpClient) { }

    public nameClicked: any;

    public dateClicked: any;


    getShape(nameClicked) {
        var dataUrl = 'assets/geojson/' + nameClicked + '.json';
        return this.http.get(dataUrl);
    }

    getValues(dateClicked) {
        return this.http.get(dateClicked);
    }

    /*contagemPessoaBairros(pais: string, estado: string, cidade: string) {
        const url = `${this.contagemPessoas}/${pais}/${estado}/${cidade}`;
        return this.http.get(url);
    }
    contagemPessoaCidades(pais: string, estado: string) {
        const url = `${this.contagemPessoas}/${pais}/${estado}`;
        return this.http.get(url);
    }
    contagemPessoaUFs(pais: string) {
        const url = `${this.contagemPessoas}/${pais}`;
        return this.http.get(url);
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
    }*/

}