import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';



import { LogService } from 'src/app/_service/log/log/logs.service';

@Component({
  selector: 'app-base-area-echarts',
  templateUrl: './base-area-echarts.component.html',
  styleUrls: ['./base-area-echarts.component.css']
})
export class BaseAreaEchartsComponent implements OnInit {

 data:any;
  messages =[]
  taches =[];
  steps =[];
  public salesChart;
  tmp_table : string []=[];
  taches_table:  string []=[];
  selectedItem: string = '';
  chartExample1: any;
  temps_table = [];
  _chartOption: EChartOption;
  _theme: string;
  _isDarkMode: boolean = false;
  
  
  constructor(private service :LogService) { }

  ngOnInit(): void {
    this.getData();
}

      
  public getData(){
    this.service.Afficher().subscribe(res=>{
    
      this.messages =res['hits'].hits
      this.messages.forEach(element => {
  
      this.taches.push(element._source);
          
        //console.log(element._source["@timestamp"]);
      this.taches.sort(function (a,b) {
        return <any> new Date (a["@timestamp"]) - <any> new Date(b["@timestamp"]);
      })
  });

    this.taches.forEach(element =>{
          
          //console.log(element);
          this.steps.push(element)  

  
    });
    console.log(this.steps);
 })  
}

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedItem = event.value;
   console.log(this.selectedItem);
   this.tmp_table=[];
   this.taches_table=[];
    
    this.steps.forEach(element => {
      
      if (element.nom_lot == this.selectedItem) {
        
      
        this.taches_table=element.nom_tache;
        this.tmp_table=element.temps_execution;
       
      }

    })

    this.temps_table=[];
    //console.log( this.taches_table);
    this.tmp_table.forEach(item =>{
     this.temps_table.push(Number(item.substring(3)))

    })
    //console.log(this.temps_table);
    
   this._initBasicAreaEcharts();
 }

private _initBasicAreaEcharts() {

    this._theme = this._isDarkMode ? 'dark' : '';
    

    this._chartOption = {
      tooltip: {
        show: true
      },
      xAxis: {
        type: 'category',
        data: this.taches_table
        
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data:this.temps_table,
       
        type: 'line',
        areaStyle: {}
      }]
    }
  }
}
