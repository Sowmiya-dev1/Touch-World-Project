import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { EmployeeListingComponent } from '../pages/employee-listing/employee-listing.component';
import { AddEmployeeComponent } from '../pages/add-employee/add-employee.component';
import { ApiIntegrationComponent } from '../pages/api-integration/api-integration.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employee-listing', component: EmployeeListingComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'api-integration', component: ApiIntegrationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
