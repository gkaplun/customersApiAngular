import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Observable, Subscription, filter, map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers$ = new Observable<ICustomer[]>();
  customers: ICustomer[] = <ICustomer[]>[];
  subscription: Subscription = new Subscription();

  constructor (private service: CustomerService, private router: Router) { }

  ngOnInit(): void {

    this.subscription = this.service.getAllCustomers().subscribe((data: ICustomer[]) => {
      this.customers = data;

      // I couldn't use the Sql Server for this project so I duplicated with the mock call.
      if (!this.customers?.length) {

        // for a mock customer list
        this.customers$ = this.service.getAllCustomersMock();
      }
    })
  }

  ngOnDestroy() {
    {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }

  editCustomer(customer: ICustomer): void {

    // clear the stroage for the last selected customer
    const lastCustSelected = sessionStorage.getItem('lastCustSelected');

    if (lastCustSelected) {
      sessionStorage.removeItem('lastCustSelected')
    }

    sessionStorage.setItem('lastCustSelected', JSON.stringify(customer));

    // navigate to the customer edit page
    this.router.navigate(['customers/edit', customer.id]);
  }

  deleteCustomer(customer: ICustomer) {

    sessionStorage.clear();

    // for the mock data
    this.customers$.pipe(
      map(cust => cust.filter(x => x.id !== customer.id)
      ))

    this.subscription = this.service.deleteCustomer(customer?.id).subscribe((customer: ICustomer) => {
    })
  }


  consoleIt(data: any) {
    console.log(data);
  }

}
