import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';



import { LogService } from 'src/app/_service/log/log/logs.service';
import { Log } from '../../logtable/log';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "src/app/variables/charts";

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
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

  isDarkMode: boolean = false;

   selectedEchartsType: string;
  echartsTypeList= ['Select','Basic Line Echart','Basic Area Echart','Smoothed Line Echart'];
    
    
   
  eventSelection(event){
    this.selectedEchartsType = event.value;
    console.log( this.selectedEchartsType);
   }
    

  
  
  constructor(private service :LogService) { }

  ngOnInit(): void {

    
    }

    
    

 
}






 
  