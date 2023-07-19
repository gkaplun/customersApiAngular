import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerService } from './services/customer.service';
import { CustomerListComponent, CustomerNewComponent, CustomerEditComponent } from './components/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerEditCanActivateGuard } from './guards/customer-edit-can-activate.service';
import { CustomerEditCanDeActivateGuard } from './guards/customer-edit-can-deactivate.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerNewComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService, CustomerEditCanActivateGuard, CustomerEditCanDeActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
