import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogtableComponent } from './logtable/logtable.component';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { LinechartComponent } from './chart/linechart/linechart.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { NgxEchartsModule } from 'ngx-echarts';

import { ChartsModule } from 'ng2-charts';
import * as echarts from 'echarts';

import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatPaginatorModule,
    MatTableModule,
    MatChipsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,  
    ChartsModule,
     NgxEchartsModule.forRoot({echarts}),
     MatButtonToggleModule
    

    
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    
    
       ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    
    
  ]
})
export class ComponentsModule { }
