import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, HostListener, OnInit } from '@angular/core';
import { IndexsService } from 'src/app/_service/indexes/indexs.service';

import { Table } from '../../chart/piechart/table';

@Component({
  selector: 'app-dbtable',
  templateUrl: './dbtable.component.html',
  styleUrls: ['./dbtable.component.css']
})
export class DbtableComponent implements OnInit {
  
  
  constructor(private service :IndexsService ) {
    
   }


  ngOnInit(): void {
    
     this.getData()
  }
  
  
  public getData(){

  this.service.getAllindexs().subscribe(res=>{
  
     console.log(res);
    
 });
      

 
 



  }

}
