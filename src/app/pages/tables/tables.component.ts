import { Component, OnInit } from '@angular/core';


import { IndexsService } from 'src/app/_service/indexes/indexs.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  constructor(private service :IndexsService) { }

  ngOnInit() {

    this.getData()
  }

  public getData(){

    this.service.index_automate_wfl1_210518().subscribe(res=>{
    
       console.log(res);
      
   });

}
}
