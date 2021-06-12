import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { LogtableComponent } from 'src/app/components/logtable/logtable.component';

import { DbtableComponent } from 'src/app/components/dbtable/dbtable/dbtable.component';
import { PiechartComponent } from 'src/app/components/chart/piechart/piechart.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',       component:  DbtableComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'log',           component: LogtableComponent },    
    
    { path: 'piechart',       component:  PiechartComponent},
    

];
