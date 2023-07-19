import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditComponent, CustomerListComponent, CustomerNewComponent } from './components/index';
import { CustomerEditCanActivateGuard } from './guards/customer-edit-can-activate.service';
import { CustomerEditCanDeActivateGuard } from './guards/customer-edit-can-deactivate.service';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    pathMatch: 'full'
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    pathMatch: 'full'
  },
  {
    path: 'customers/add',
    component: CustomerNewComponent,
    pathMatch: 'full'
  },
  {
    path: 'customers/edit/:id',
    component: CustomerEditComponent,
    canActivate: [CustomerEditCanActivateGuard],
    canDeactivate: [CustomerEditCanDeActivateGuard],
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
