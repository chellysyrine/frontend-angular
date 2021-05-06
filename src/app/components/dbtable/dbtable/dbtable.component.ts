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
        title:"CLE AFLC",
        width: "50%"
      
      },


      aidlot : {
        title:"NOM LOT",
        width: "50%"

      },
      adtflc : {
        title:"DATE FLAGAGE",
        width: "50%"

      },
      anuwfc : {
        title:"NUM WORKFLOW ",
        width: "50%"

      },

      acetywf : {
        title:"TYPE WORKFLOW ",
        width: "50%"

      },
      aidtrtp : {
        title:"TRAITEMENT",
        width: "50%"

      },
      aidflap : {
        title:"CODE FLAGAGE",
        width: "50%"

      },

      
      aceflag : {
        title:"CODE STATUT FLAGAGE ",
        width: "50%"

      },
      aceflaf : {
        title:"CODE STATUT FLAGAGE FORCE",
        width: "20%"

      },
     
     
  
    
     
     
     
    },
    attr: {
      class: 'table table-bordered'
    },
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
