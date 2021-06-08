import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IndexsService } from 'src/app/_service/indexes/indexs.service';
import { index } from '.';
// core components
import {
  
  chartOptions,
  parseOptions,
  
} from '../../../variables/charts';
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
import Chart from 'chart.js';


import { Table } from '../../chart/piechart/table';


@Component({
  selector: 'app-dbtable',
  templateUrl: './dbtable.component.html',
  styleUrls: ['./dbtable.component.css']
})




export class DbtableComponent implements OnInit {
  
  messages =[]
 
  arrayOfObjects = [];
  displayedColumns: string[] = ['nom_index','etat', 'statut','new','primaries','replicas','doc_count','storagesize','datastream']
  dataSource= new MatTableDataSource<index>();
   nb_index
   max_doc
   table_doc =[]
   table_storage =[]
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  min_doc: number;
  max_storage: number;
  min_storage: number;
  storage_mb: any;
  somme_status=0;
  moy_status: any;
  somme_etat: any;
  moy_etat: any;
  datasets: any;
  data: any;
  salesChart;
  chartSales;
  table_lot=[];
  table_storage_2=[];
  
  constructor(private service :IndexsService , private _http: HttpClient ) {
    
   }


  ngOnInit(): void {
   
    this.getData();  
   
  }
  
  
  public getData(){
    var newObj = {};
  this.service.getAllindexs().subscribe(
   
    r => {
     this.arrayOfObjects=[]
      var arr = r.split(/\n/)
      arr.forEach(element => {
       
        var item =element.split(/\s+/)
       
        
         for (var i = 0; i < item.length; ++i){
          newObj = {}

          newObj={
            etat : item[0],
            statut:item[1],
            nom_index:item[2],
            new:item[3],
            primaries:item[4],
            replicas:item[5],
            doc_count:item[6],
            datastream:item[7],
            storagesize:item[8],

          }  
         
        }
        
        this.arrayOfObjects.push(newObj)
       
        });
       console.log(this.arrayOfObjects);
        this.somme_status=0;
        this.somme_etat=0;
        this.arrayOfObjects.forEach(element=>{

          if(!element.nom_index.includes("automate"))  
          { const index= this.arrayOfObjects.indexOf(element);
            this.arrayOfObjects.splice(index)
            
           
          }

          if(element.etat == 'yellow'){
            this.somme_etat ++ ;

          }
          if(element.statut == 'open'){
            this.somme_status ++ ;

          }
          this.table_lot.push(element.nom_index.slice(14));
           this.table_doc.push(Number(element.doc_count));
           if(element.storagesize.includes("kb")){
            const index_kb=element.storagesize.indexOf("kb");
            element.storagesize = (parseFloat(element.storagesize.slice(0,index_kb))*0.001).toFixed(3)
           }
           else if(element.storagesize.includes("mb")){
            const index_mb=element.storagesize.indexOf("mb");
            element.storagesize=parseFloat(element.storagesize.slice(0,index_mb))
           }
           this.table_storage.push(element.storagesize);
           this.table_storage_2.push(element.storagesize*10)
          })
         
          console.log(this.table_lot);
          this.dataSource.data=this.arrayOfObjects as  index [];
          this.max_doc=Math.max(...this.table_doc);
          this.min_doc=Math.min(...this.table_doc);
          this.max_storage=Math.max(...this.table_storage);
          this.min_storage=Math.min(...this.table_storage);
          this.nb_index=this.arrayOfObjects.length;
          this.moy_status = (this.somme_status - 1)*100/this.nb_index;
          this.moy_etat = (this.somme_etat - 1 )*100/this.nb_index;


          var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: {
        
          labels: this.table_lot,
          datasets: [
            {
              label: "size storage",
              data: this.table_storage_2,
            }
          ]
        }
      
    });
          var  chartSales = document.getElementById('chart-sales');
          parseOptions(Chart, chartOptions());

  this.salesChart = new Chart(chartSales, {
    type: 'line',
    options: chartExample1.options,
    data  :{
      labels:this.table_lot,
      datasets: [
        {
          label: "doc count",
          data:this.table_doc
        }
      ]
    }
  
  });
         
    },
    err => console.log(err)
    
  
    );
    
  }

  
 
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
   
    
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  
}



const chartExample1 = {
 
  
  options: {
    scales: {
      yAxes: [{
        gridLines: {
          color:'#212529',
          zeroLineColor: '#212529'
        },
       
      }]
    }
  }
  
}



const chartExample2 = {
  options: {
    
    tooltips: {
      callbacks: {
        label: function(item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";
          if (data.datasets.length > 1) {
            content += label;
          }
          content += yLabel;
          return content;
        }
      }
    }
  },


}


 