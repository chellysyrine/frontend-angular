import { Component, OnInit } from '@angular/core';


import { IndexsService } from 'src/app/_service/indexes/indexs.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  messages =[]

  constructor(private service :IndexsService) { }

  ngOnInit() {

    this.getIndex_automate_wfl1_210518();
    this.getIndex_automate_wfl1_210517();
    this.getIndex_automate_wfl1_210514();
  }

  public getIndex_automate_wfl1_210518(){

    this.service.index_automate_wfl1_210518().subscribe(res=>{
      this.messages =res['hits'].hits
       console.log(this.messages);
      
   });

}

public getIndex_automate_wfl1_210517(){

  this.service.index_automate_wfl1_210517().subscribe(res=>{
  
     console.log(res);
    
 });

}
public getIndex_automate_wfl1_210514(){

  this.service.index_automate_wfl1_210514().subscribe(res=>{
  
     console.log(res);
    
 });

}





}
