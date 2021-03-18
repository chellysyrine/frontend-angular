import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { ok } from 'assert';
import { BaseService } from 'src/app/_service/log/base/base.service';
import { Table } from '../../dbtable/dbtable/table';



@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  selectedItem: string = ''
  selectedvalue: string = ''
  o: number = 0;
  a: number = 0;
  k: number = 0;
  f: number = 0;
  public pieChartData: number[] = []
  public pieChartLabels: string[] = ['OK', 'KO', 'OKF', 'TNA'];
  public pieChartType: string = 'pie';

  messages = []

  base: Table[] = [];
  taches = [];
  steps = [];
  filteredtable = [];



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
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5'],
      borderWidth: 2,
    }
  ];
  ngOnInit(): void {

    this.getData()

  }


  cleanArray(array) {
    var i, j, len = array.length, out = [], obj = {};
    for (i = 0; i < len; i++) {
      obj[array[i]] = 0;
    }
    for (j in obj) {
      out.push(j);
    }
    return out;
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

    })
  }



  selectChangeHandler(event: any) {
    //update the ui
    this.selectedItem = event.target.value;
    //console.log(this.selectedItem);

    this.filteredtable = [];
    this.steps.forEach(element => {
      if (element.aidlot == this.selectedItem) {
        this.filteredtable.push(element);
      }

    })
    
  }



  filter(event: any) {
    this.selectedvalue = event.target.value;
    //console.log(this.selectedItem);

    this.o = 0;
    this.k = 0;
    this.f = 0;
    this.a = 0;
    this.pieChartData = [];

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
        console.log('ok', this.o, 'ko', this.k, 'okf', this.f, 'tna', this.a);

      }

    })
    this.pieChartData.push(this.o, this.k, this.f, this.a)
    console.log(this.pieChartData);
    console.log(this.o);
  }






}























