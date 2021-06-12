import { Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from 'src/app/_service/log/log/logs.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Log } from './log';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { EChartOption } from 'echarts';
import { IndexsService } from 'src/app/_service/indexes/indexs.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as echarts from 'echarts';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  data:any;
  messages =[]
  taches =[];
  steps =[];
  cycle_table =[];
  tmp_table : string []=[];
  taches_table:  string []=[];
  selectedItem: string = '';
  temps_table = [];
  _chartOption: EChartOption;
  
  selectedOption : string;
  theme: string = "dark";
  echartsInstance: any;
  colorPalette = ['#dc143c'];
  ELEMENT_DATA : Log [] = this.steps  ; 
  displayedColumns: string[]=['Nom lot','Numéro Workflow','Numéro Cycle','Nom Utilisateur','taches','temps', 'heure'];
  dataSource= new MatTableDataSource<Log>();
  
  arrayOfObjects = [];
  table_nom_indexs =[];
  table_nb_taches=[];
  cycle_data_table=[];

  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedRow: any;
  nom_index: any;
  nom_lot: any;
  
  num_workflow: any;
  type_workflow: any;
  selected: any;
  default_option: string;
  default_cycle: any;
  table_nbcycle = [];
  resultat: Observable<Object>;
  nb_cycle: any;
  length: number;
  pie_data_table=[];
  table_num_cycle =[];
  chartdom : any
  mychart : any
  option : any 
  chartDom1: any;
  myChart1:any;
  option1 : any;
  nb_index: number;
  chartDom2: any;
  myChart2: any;
  option2 :any

  constructor(private service :IndexsService , private matDialog : MatDialog , private _http: HttpClient) { }

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

        this.arrayOfObjects.forEach(element=>{

          if(!element.nom_index.includes("automate"))  
          { const index= this.arrayOfObjects.indexOf(element);
            this.arrayOfObjects.splice(index)   
          }
        
        });
       
        this.default_option= this.arrayOfObjects[0].nom_index;
        this._http.get('http://localhost:9200/'+this.default_option+'/_search?size=5000',httpOptions).subscribe( res =>{
          this.messages =res['hits'].hits
          this.taches=[];
           
          this.messages.forEach(element => {
      
          this.taches.push(element._source);
              
        
        })
        this.taches.sort(function (a,b) {
          return <any> new Date (a["@timestamp"]) - <any> new Date(b["@timestamp"]);
        })
      
       this.dataSource.data=this.taches as Log [];
       this.default_cycle=this.taches[0].num_cycle;

      console.log(this.default_cycle);
      
       //console.log(this.dataSource.data);
      
     });
      
      });
      
     
      // this.initchanger(event);
      // this._initBasicLineEchart();
}



public doFilter = (value: string) => {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}
 
  
ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}

  typeOf(value) {
    return typeof value;
  }
onRowClicked(row){
    this.selectedRow=row;
    console.log("selected row" ,this.selectedRow);
  }
 
   showDiv() {
    var y= document.getElementById('div2');
    var x = document.getElementById('welcomeDiv');
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display="none";
    }else {
      y.style.display = "block";
      x.style.display="none";
    }
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

  this.taches.sort(function (a,b) {
    return <any> new Date (a["@timestamp"]) - <any> new Date(b["@timestamp"]);
  })
  this.table_num_cycle=[];
  this.table_nb_taches=[];

  this.taches.forEach(element => {
    this.table_num_cycle.push("Num cycle".concat(element.num_cycle));
    this.table_nb_taches.push(element.nom_tache.length)
  })
  console.log(this.table_num_cycle);
  console.log( this.table_nb_taches);
 

 this.dataSource.data=this.taches as Log [];
 

  });
  setTimeout(() => {
     
this.chartDom1 = document.getElementById('main1');
this.myChart1 = echarts.init(this.chartDom1);

this.option1 = {

  title: {
    text: 'Nombre de taches par cycle',
    color:'#fff',
    
},
tooltip: {
    trigger: 'axis'
},

dataZoom: [
  {
      type: 'inside'
  }
],
toolbox: {
    show: true,
    feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: true},
        saveAsImage: {show: true}
    }
},
calculable: true,
xAxis: [
    {
        type: 'category',
        data: this.table_num_cycle
    }
],
yAxis: [
    {
        type: 'value'
    }
],
series: [
    {
        name: '蒸发量',
        type: 'bar',
        data: this.table_nb_taches,
        
        markPoint: {
            data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
            ]
        },
        markLine: {
            data: [
                {type: 'average', name: '平均值'}
            ]
        }
    },
    
]


}



this.option1 && this.myChart1.setOption(this.option1);
  
    
  }, 1000);
  

 }




 initchanger(event : any ){
  this.selectedOption = event.value;
  console.log(this.selectedOption);
  this.tmp_table=[];
  this.taches_table=[];
   
   this.taches.forEach(element => {
     
     if (element.num_cycle == this.selectedOption) {
    
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

 _initBasicAreaEcharts() {
  
  this._chartOption = {
    

    tooltip: {
      show: true,
      
    },
    title: {
      text: 'Basic Area chart',
     
     
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
    }],
    color: this.colorPalette,
    toolbox: {
      show: true,
      feature: {
          
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
      }
  },
  
  }
}

 _initBasicLineEchart() { 
  
  
  this._chartOption = {
    
    tooltip: {
      show: true
    },
    title: {
      text: 'Basic Line chart',
      
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
      
    }],
    color: this.colorPalette,
   
    toolbox: {
      show: true,
      feature: {
          
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
      }
  },
  
  }
 
}


 _initSmoothedEchart() {


  this._chartOption = {
    tooltip: {
      show: true,
      
    },
    title: {
      text: 'Smoothed line chart',
      
     
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
      smooth: true
      
    }],
    color: this.colorPalette,
    toolbox: {
      show: true,
      feature: {
          
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
      }
  },
  }
}

_initBarEchart(){
  this._chartOption = {

    xAxis: {
      type: 'category',
      data:this.taches_table
  },

  title: {
    text: 'Bar chart',
    
   
},
  yAxis: {
      type: 'value'
  },
  series: [
    
    {
      data: this.temps_table,
      type: 'bar',
      
      
  }],
  color: this.colorPalette,
  toolbox: {
    show: true,
    feature: {
        
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        restore: {},
        saveAsImage: {}
    }
},

  }

}




onChartInit(e: any) {
  this.echartsInstance = e;
  console.log('on chart init:', e);
}





  




}
