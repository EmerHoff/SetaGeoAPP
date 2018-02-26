import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MapService } from '../map.service';

@Component({
  selector: 'app-snackbarmessage',
  templateUrl: './snackbarmessage.component.html',
  styleUrls: ['./snackbarmessage.component.css']
})
export class SnackbarmessageComponent implements OnInit {
  @Input() nome: string; //nome que vem como SETA.BR.PR.CASCAVEL
  public values: any;
  public arrayNome:any;
  public arrayValor:any;
  public array:any;
  constructor(public snackBar: MatSnackBar, public mapservice: MapService) {}

  ngOnInit() {
    var _self=this;
    this.arrayNome= new Array();
    this.array = [];
    this.array = [
      {
        "nome": "Parana",
        "valor" : 19000
      },
      {
        "nome": "Sao Paulo",
        "valor" : 200
      },
      {
        "nome": "Santa Catarina",
        "valor" : 10
      }
    ];
    this.mapservice.requisicaoContagem('SETA.BR').subscribe((res1) => {
      _self.values = JSON.parse(res1.toString());
      console.log(_self.values);
      var contador = 0;
      while(contador<3){
        //console.log(data);
        _self.arrayNome.push(_self.values[contador].properties['hc-key']);
        _self.arrayValor.push(_self.values[_self.values[contador].properties['hc-key']]);
        //console.log(i.drilldown);
        //console.log(i.value);
    }
    console.log(this.arrayNome);
    console.log(this.arrayValor);

    });
    //'SETA.BR.PR.CASCAVEL'
  }
  dismiss(){
    this.snackBar.dismiss();
  }
}
