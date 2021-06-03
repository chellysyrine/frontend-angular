import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { ok } from 'assert';
import { EChartOption } from 'echarts';
import { BaseService } from 'src/app/_service/log/base/base.service';
import { Table } from './table';



@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  selectedItem: string = ''
  selectedvalue: string = ''
  selectedOption : string;
  selectedstep:string;
  o: number = 0;
  a: number = 0;
  k: number = 0;
  f: number = 0;
  map = [];
  public pieChartData: number[] = []
  public pieChartLabels: string[] = ['OK : contrôle sans écats ',
  'KO : contrôle avec écarts ',
  'OKF : contrôle forcé à OK',
  'TNA: tâche  non active'];
  public pieChartType: string = 'pie';
  _chartOption: EChartOption;
  messages = []
  dateTable=[];

  base: Table[] = [];
  taches = [];
  steps = [];
  filteredtable = [];
  

  result: any =[];
  table: any =[];
  settings={
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
   
    columns : {
     
      aidflc : {
        title:"CLE AFLC",
        width: "20%"
      
      },


      aidlot : {
        title:"NOM LOT",
        width: "20%"

      },
      adtflc : {
        title:"DATE FLAGAGE",
        width: "20%"

      },
      anuwfc : {
        title:"NUM WORKFLOW ",
        width: "20%"

      },

      acetywf : {
        title:"TYPE WORKFLOW ",
        width: "20%"

      },
      aidtrtp : {
        title:"TRAITEMENT",
        width: "20%"

      },
      aidflap : {
        title:"CODE FLAGAGE",
        width: "20%"

      },

      
      aceflag : {
        title:"CODE STATUT FLAGAGE ",
        width: "20%"

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


  constructor(private service: BaseService) { }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#E74C3C','#CB4335', '#943126','#78281F' ],
      hoverBackgroundColor: ['#E74C3C','#CB4335', '#943126','#78281F'],
      borderWidth: 2,
    }
  ];
  ngOnInit(): void {
    
    
    this.getData();

  }


  

  public getData() {

    this.service.Afficher().subscribe(res => {
      this.messages = res['hits'].hits
      this.messages.forEach(element => {

        this.taches.push(element._source);
      });
      this.taches.forEach(element => {
        this.steps.push(element)
      });

      this.base=this.steps;
      this.steps.forEach(item =>{
        if(this.table.indexOf(item.aidlot) < 0) {
            this.table.push(item.aidlot);
        }
   });
    
    })


    
  }



  selectChangeHandler(event: any) {
    //update the ui
    this.selectedItem = event.value;
    //console.log(this.selectedItem);

    this.filteredtable = [];
    this.steps.forEach(element => {
      if (element.aidlot == this.selectedItem) {
      
        this.filteredtable.push(element);
      }

    })
    
    this.filteredtable.forEach(item =>{
      if(this.result.indexOf(item.aidtrtp) < 0) {
          this.result.push(item.aidtrtp);
      }
 });
 console.log(this.filteredtable);
  
  } 

  filter(event: any) {
    this.selectedvalue = event.value;
   
    this.o = 0;
    this.k = 0;
    this.f = 0;
    this.a = 0;
    this.pieChartData = [];
    this.map= [];
    this.dateTable=[];

    this.filteredtable.forEach(element => {
      if (element.aidtrtp == this.selectedvalue) {
        switch (element.aceflag) {
          case 'OK   ': {
            //statements; 
            this.o++;
            ;
            break;
          }
          case 'KO   ': {
            //statements; 
            this.k++;

            break;
          }
          case 'OKF  ': {
            //statements; 
            this.f++;

            break;
          }
          case "TNA  ": {
            //statements; 
            this.a++;

            break;
          }


        }
        this.dateTable.push(element.adtflc);
        

        //console.log('ok', this.o, 'ko', this.k, 'okf', this.f, 'tna', this.a);

      }

    })
    console.log(this.dateTable);
    this.pieChartData.push(this.o, this.k, this.f, this.a)
    //console.log(this.pieChartData);
   
  
    
  }
 



}























