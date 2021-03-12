import { Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from 'src/app/_service/log/log/logs.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { LogDetailsComponent } from '../log-details/log-details.component';
import { Log } from './log';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';


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
    console.log("selected row" ,this.selectedRow);
  }
 /*openDetailsDialog(){
    const dialogRef = this.matDialog.open(LogDetailsComponent,{
      width:'500px',
      data : {
        
        nom_lot:this.selectedRow.nom_lot,
        
        tache:this.selectedRow.nom_tache,
       tmp:this.selectedRow.temps_execution
           
      }
     
      
    });

    
  } */




  

}
