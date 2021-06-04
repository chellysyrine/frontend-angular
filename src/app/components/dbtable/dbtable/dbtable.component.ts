import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IndexsService } from 'src/app/_service/indexes/indexs.service';
import { index } from '.';

import { Table } from '../../chart/piechart/table';

@Component({
  selector: 'app-dbtable',
  templateUrl: './dbtable.component.html',
  styleUrls: ['./dbtable.component.css']
})
export class DbtableComponent implements OnInit {
  messages =[]
 
  arrayOfObjects = [];
  displayedColumns: string[] = ['etat', 'statut', 'nom_index', 'primaries','replicas','doc_count','storagesize','datastream']
  dataSource= new MatTableDataSource<index>();
  
  constructor(private service :IndexsService ) {
    
   }


  ngOnInit(): void {
   
    this.getData();
    
    this.getIndex_automate_wfl1_210518();
    this.getIndex_automate_wfl1_210517();
    this.getIndex_automate_wfl1_210514();
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
            primaries:item[3],
            replicas:item[4],
            doc_count:item[5],
            storagesize:item[6],
            datastream:item[7]
          }  
         
        }
        
        this.arrayOfObjects.push(newObj)
       
        });
       
        //console.log(this.arrayOfObjects);
        this.dataSource.data=this.arrayOfObjects as  index [];
        console.log(this.dataSource)
    },
    err => console.log(err)
    
  
    );
    
  }


  public getIndex_automate_wfl1_210518(){

    this.service.index_automate_wfl1_210518().subscribe(res=>{
      this.messages =res['hits'].hits
       //console.log(this.messages);
      
   });

}

public getIndex_automate_wfl1_210517(){

  this.service.index_automate_wfl1_210517().subscribe(res=>{
  
     //console.log(res);
    
 });

}
public getIndex_automate_wfl1_210514(){

  this.service.index_automate_wfl1_210514().subscribe(res=>{
  
     //console.log(res);
    
 });

}

}
