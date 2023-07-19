import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {

  customerForm!: FormGroup;
  customerModel: ICustomer = <ICustomer>{};
  subscription: Subscription | undefined;


  constructor (private fb: FormBuilder, private service: CustomerService, private router: Router) { }

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      id: '',
      firstName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      lastName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      emailAddress: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
      createdDataTime: Date.now(),
      updatedDataTime: Date.now(),
    });

    // Watches changes on the entire form
    this.subscription = this.customerForm.valueChanges.subscribe(data => {

      this.customerModel = data;
    });
  }



  get frm() { return this.customerForm.controls; }


  saveCustomer() {
    this.customerForm.patchValue(
      {
        id: '00000000-0000-0000-0000-000000000000',
        updatedDataTime: Date.now(),
        createdDataTime: Date.now()
      }
    );

    this.subscription = this.service.addCustomer(this.customerModel).subscribe((customer: ICustomer) => {
      this.router.navigate(['customers/', customer]);
    })

  }

  cancel() {
    this.router.navigate(['customers/']);
  }

  ngOnDestroy() {
    {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }
}
