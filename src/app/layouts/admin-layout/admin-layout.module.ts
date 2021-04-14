import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { LogtableComponent } from 'src/app/components/logtable/logtable.component';
import { LogDetailsComponent } from 'src/app/components/log-details/log-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DbtableComponent } from 'src/app/components/dbtable/dbtable/dbtable.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PiechartComponent } from 'src/app/components/chart/piechart/piechart.component';

import { ChartsModule } from 'ng2-charts';
import { LinechartComponent } from 'src/app/components/chart/linechart/linechart.component';
import { NgxEchartsModule } from 'ngx-echarts';

import {MatSelectModule} from '@angular/material/select';
import * as echarts from 'echarts';
import { BaseLineEchartsComponent } from 'src/app/components/chart/linechart/base-line-echarts/base-line-echarts.component';
import { BaseAreaEchartsComponent } from 'src/app/components/chart/linechart/base-area-echarts/base-area-echarts.component';
import { SmoothedLineEchartsComponent } from 'src/app/components/chart/linechart/smoothed-line-echarts/smoothed-line-echarts.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ClipboardModule,
    MatPaginatorModule,
    MatTableModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule ,
    MatCheckboxModule,
    MatDialogModule,
    Ng2SmartTableModule,
    ChartsModule,
    MatSelectModule,
    NgxEchartsModule.forRoot({echarts})
  
   
  
    
   ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    LogDetailsComponent,
    LogtableComponent,
    DbtableComponent,
    PiechartComponent,
    LinechartComponent,
    BaseLineEchartsComponent,
    BaseAreaEchartsComponent,
    SmoothedLineEchartsComponent,
  ]
})

export class AdminLayoutModule {}
