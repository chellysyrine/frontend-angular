import { Component, Inject, OnInit } from '@angular/core';
import { LogtableComponent } from '../logtable/logtable.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.css']
})
export class LogDetailsComponent implements OnInit {
recievedRow ;

  constructor( public  dialogRef : MatDialogRef <LogtableComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) { 
      this.recievedRow =data; 
      console.log("recieved row " ,this.recievedRow);
   
  }
  

  ngOnInit(): void {
  }

}
