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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DbtableComponent } from 'src/app/components/dbtable/dbtable/dbtable.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PiechartComponent } from 'src/app/components/chart/piechart/piechart.component';

import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';

import {MatSelectModule} from '@angular/material/select';
import * as echarts from 'echarts';
import {MatIconModule} from '@angular/material/icon';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
    MatIconModule,
    MatSelectModule,
    NgxEchartsModule.forRoot({echarts}),
    MatButtonToggleModule,
    MatSlideToggleModule
  
   
  
    
   ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
  
    LogtableComponent,
    DbtableComponent,
    PiechartComponent,
    
    
    
  ]
})

export class AdminLayoutModule {}
