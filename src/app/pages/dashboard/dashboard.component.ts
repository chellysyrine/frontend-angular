import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IndexsService } from 'src/app/_service/indexes/indexs.service';
import * as echarts from 'echarts';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
export interface erreur_serveur {
message:string;
}

export interface erreur_interne {
  message:string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  arrayOfObjects = [];
 
  messages =[];
  selectedItem="";
  selectedoption="";
  taches =[];
  table_serveur=[];
  table_interne=[];
  displayedColumns: string[] = ['Contenu de message']
  dataSource= new MatTableDataSource<erreur_serveur>();
  dataSource1= new MatTableDataSource<erreur_interne>();
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatPaginator) paginator_tab : MatPaginator;
  nb_err_serveurs: any;
  nb_err_internes: any;
  chartDom: any;
  myChart: any;
  option :any;
  chartDom1: any;
  myChart1: any;
  option1 :any;
  
  
  constructor(private service :IndexsService , private _http: HttpClient) { }

  ngOnInit() {

  this.getData();
  }

  getData (){
    var newObj={};

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

        this.arrayOfObjects.forEach(element=>{

          if(!element.nom_index.includes("automate"))  
          { const index= this.arrayOfObjects.indexOf(element);
            this.arrayOfObjects.splice(index)   
          }
        
        });

      })


      }


      public index_service(): Observable<any> {
        return this._http.get('http://localhost:9200/'+this.selectedItem+'/_search?size=5000',httpOptions);
      }
      
       selectChangeHandler(event: any) {
        var obj_cycle={}
        
        //update the ui
        this.selectedItem = event.value;
        console.log(this.selectedItem);
        
        
        this.index_service().subscribe(res =>{
          this.messages =res['hits'].hits
          this.taches=[];
           
          this.messages.forEach(element => {
      
          this.taches.push(element._source);
              
        
        })
      console.log(this.taches);
        this.taches.sort(function (a,b) {
          return <any> new Date (a["@timestamp"]) - <any> new Date(b["@timestamp"]);
        })
      });

    

      }


     
      initchanger(event : any ){
        this.selectedoption = event.value;
        console.log(this.selectedoption);
        this.table_serveur=[];
        this.table_interne=[];
        this.nb_err_serveurs=0;
        this.nb_err_internes=0;
         this.taches.forEach(element => {
           
           if (element.num_cycle == this.selectedoption) {
             this.nb_err_serveurs=element.erreur_serveur.length;
             this.nb_err_internes=element.erreur_interne.length;
          
             this.table_serveur=element.erreur_serveur;
             this.table_interne=element.erreur_interne;
           }
         })
         this.dataSource.data=this.table_serveur as  erreur_serveur [];
         this.dataSource1.data=this.table_interne as  erreur_interne [];

         this.chartDom = document.getElementById('main');
         this.myChart = echarts.init(this.chartDom);
         
         
         this.option = {
             series: [{
                 type: 'gauge',
                 progress: {
                     show: true,
                     width: 18
                 },
                 axisLine: {
                     lineStyle: {
                         width: 18
                     }
                 },
                 axisTick: {
                     show: false
                 },
                 splitLine: {
                     length: 15,
                     lineStyle: {
                         width: 2,
                         color: '#999'
                     }
                 },
                 axisLabel: {
                     distance: 25,
                     color: '#999',
                     fontSize: 20
                 },
                 anchor: {
                     show: true,
                     showAbove: true,
                     size: 25,
                     itemStyle: {
                         borderWidth: 10
                     }
                 },
                 title: {
                     show: false
                 },
                 detail: {
                     valueAnimation: true,
                     fontSize: 80,
                     offsetCenter: [0, '70%']
                 },
                 data: [{
                     value: this.nb_err_serveurs
                 }]
             }]
         };
         
         this.option && this.myChart.setOption(this.option);
         
         this.chartDom1 = document.getElementById('nb');
         this.myChart1 = echarts.init(this.chartDom1);
         
         
         this.option1 = {
             series: [{
                 type: 'gauge',
                 progress: {
                     show: true,
                     width: 18
                 },
                 axisLine: {
                     lineStyle: {
                         width: 18
                     }
                 },
                 axisTick: {
                     show: false
                 },
                 splitLine: {
                     length: 15,
                     lineStyle: {
                         width: 2,
                         color: '#999'
                     }
                 },
                 axisLabel: {
                     distance: 25,
                     color: '#999',
                     fontSize: 20
                 },
                 anchor: {
                     show: true,
                     showAbove: true,
                     size: 25,
                     itemStyle: {
                         borderWidth: 10
                     }
                 },
                 title: {
                     show: false
                 },
                 detail: {
                     valueAnimation: true,
                     fontSize: 80,
                     offsetCenter: [0, '70%']
                 },
                 data: [{
                     value: this.nb_err_internes
                 }]
             }]
         };
         
         this.option1 && this.myChart1.setOption(this.option1);
        
      
         
         
        }
        
        ngAfterViewInit(): void {
          
          this.dataSource.paginator = this.paginator;
          this.dataSource1.paginator = this.paginator_tab;
         
        }
       
       
}
