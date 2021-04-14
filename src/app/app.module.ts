import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { BaseLineEchartsComponent } from './components/chart/linechart/base-line-echarts/base-line-echarts.component';
import { BaseAreaEchartsComponent } from './components/chart/linechart/base-area-echarts/base-area-echarts.component';
import { SmoothedLineEchartsComponent } from './components/chart/linechart/smoothed-line-echarts/smoothed-line-echarts.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule ,
    MatCheckboxModule,
    NgxEchartsModule.forRoot({echarts}),
    MatSelectModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ForgetPasswordComponent,
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
