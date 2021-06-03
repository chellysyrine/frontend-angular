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
  displayedColumns: string[]=['nom lot','taches','temps'];
  dataSource= new MatTableDataSource<Log>();
  
  
  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedRow: any;


  constructor(private service :LogService , private matDialog : MatDialog ) { }

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
  this.dataSource.data=this.steps as  Log [];
  this.selectedOption = this.steps[0].nom_lot; 
  this.initchanger();
  this._initBasicLineEchart();
  console.log(this.steps);   
  })
  
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
    //console.log("selected row" ,this.selectedRow);
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
   this.temps_table.push(Number(item.substring(3)));
  })
  //console.log(this.temps_table);    
}
 initchanger(){
  this.selectedItem = this.selectedOption;
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
