import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorioindex',
  templateUrl: './relatorioindex.component.html',
  styleUrls: ['./relatorioindex.component.css']
})
export class RelatorioindexComponent implements OnInit {


  public jsonRelatorioNome: any;
  public jsonRelatorioValor: any;
  constructor() { 
    this.jsonRelatorioNome = new Array();
    this.jsonRelatorioValor = new Array();
  }
  openNav() {
    document.getElementById("myMenu").style.width = "50%";
    document.getElementById("myMenu").style.marginTop = "21px";
  }

  closeNav() {
    document.getElementById("myMenu").style.width = "0";
  }

  ngOnInit() {
  }

  exibir(relatorio: any){
    console.log(" a " + relatorio);
    this.jsonRelatorioNome=relatorio;
    // for(var i=0;i<relatorio.lenght;i++){
    //   this.jsonRelatorioNome.push(relatorio[i].nome);
    //   this.jsonRelatorioValor.push(relatorio[i].valor);
    // }
    

  }
}
