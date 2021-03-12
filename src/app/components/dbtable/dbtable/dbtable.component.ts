import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_service/log/base/base.service';
import { Table } from './table';

@Component({
  selector: 'app-dbtable',
  templateUrl: './dbtable.component.html',
  styleUrls: ['./dbtable.component.css']
})
export class DbtableComponent implements OnInit {
  messages =[]

  base : Table []= [];
  taches =[];
  steps =[];
  settings={
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
   
    columns : {
     
      aidflc : {
        title:"aidflc",
        width: "50%"
      
      },


      aidlot : {
        title:"nom lot",
        width: "50%"

      },
      adtflc : {
        title:"date flag cloture",
        width: "50%"

      },
      anuwfc : {
        title:"numero workflow",
        width: "50%"

      },

      acetywf : {
        title:"type workflow",
        width: "25%"

      },
      aidtrtp : {
        title:"les taches",
        width: "25%"

      },
      aidflap : {
        title:"aidflap",
        width: "25%"

      },

      
      aceflag : {
        title:"etat flag",
        width: "25%"

      },
      aceflaf : {
        title:"aceflaf",
        width: "25%"

      },
     
     
  
    
     
     
     
    }
  }

  constructor(private service :BaseService ) { }

  ngOnInit(): void {
    this.getData()
  }



  public getData(){

    this.service.Afficher().subscribe(res=>{
      this.messages =res['hits'].hits
    this.messages.forEach(element => {

    this.taches.push(element._source);
        
     
    
});
      

  this.taches.forEach(element =>{
        
         
        this.steps.push(element)  

  });
  this.base=this.steps;
  console.log(this.steps);
 

})


  }

}
