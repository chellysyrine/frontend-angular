import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';


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
  
  
  
  
  constructor(private service :LogService) { }

  ngOnInit(): void {


    this.getData();
    
    
    
    
    }

    
    public chartType: string = 'line';

  
    public chartDatasets: Array<any> = [
      { data: this.temps_table, label: 'My First dataset' },
     
    ];
    
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  

    
    
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
    this.selectedItem = event.target.value;
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
    
  
 }
}


//  chartExample3 =  {
//     options: {
//       scales: {
//         yAxes: [{
//           gridLines: {
//             color: colors.gray[900],
//             zeroLineColor: colors.gray[900]
//           },
//           ticks: {
//             callback: function(value) {
//               if (!(value % 10)) {
//                 return '$' + value + 'k';
//               }
//             }
//           }
//         }]
//       }
//     },
//     data: {
//       labels:this.taches_table,
//       datasets: [{
//         label: 'Performance',
//         data: this.tmp_table
//       }]
//     }
//   }
  
//   }



 
  