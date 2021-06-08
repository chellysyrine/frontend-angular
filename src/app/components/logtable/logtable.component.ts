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
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
  selector: 'app-logtable',
  templateUrl: './logtable.component.html',
  styleUrls: ['./logtable.component.css']
})






export class LogtableComponent implements OnInit {

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

  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedRow: any;
  nom_index: any;
  nom_lot: any;
  
  num_workflow: any;
  type_workflow: any;
  selected: any;
  selectedoption: string;
  default_option: string;


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
        console.log(this.default_option);
      });
      setInterval(() => {
        this.default_service(this.default_option).subscribe(res =>{
          this.messages =res['hits'].hits
          this.taches=[];
           
          this.messages.forEach(element => {
      
          this.taches.push(element._source);
              
        
        })
        this.taches.sort(function (a,b) {
          return <any> new Date (a["@timestamp"]) - <any> new Date(b["@timestamp"]);
        })
      
       this.dataSource.data=this.taches as Log [];
       
      
       console.log(this.dataSource.data);
      
        });
    
      }, 5000);
      

   
}

public default_service(vv): Observable<any> {
 console.log(vv)
  return this._http.get('http://localhost:9200/'+this.default_option+'/_search?size=5000',httpOptions);
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

 this.dataSource.data=this.taches as Log [];
 

 console.log(this.dataSource.data);

  });



 }


 
 initchanger(){
  this.selectedoption = this.selectedOption;
  this.tmp_table=[];
  this.taches_table=[];
   
   this.taches.forEach(element => {
     
     if (element.num_cycle == this.selectedoption) {
    
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
