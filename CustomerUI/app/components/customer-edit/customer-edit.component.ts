import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm!: FormGroup;
  customerModel: ICustomer = <ICustomer>{};
  subscription: Subscription | undefined;
  customerDetails: ICustomer = <ICustomer>{};
  formSaved = false;


  constructor (private fb: FormBuilder, private service: CustomerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      id: '',
      firstName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      lastName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      emailAddress: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
      createdDataTime: '',
      updatedDataTime: '',
    });

    // Watches changes on the entire form
    this.subscription = this.customerForm.valueChanges.subscribe(data => {

      this.customerModel = data;
    });

    this.subscription = this.activatedRoute.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {
        this.subscription = this.service.getCustomerById(id).subscribe((customer: ICustomer) => {

          // Since I can't use the database I'm adding a detatils from the JSON.
          if (customer?.id) {
            this.customerDetails = customer;

            if (Object.keys(this.customerDetails)?.length) {
              this.patchForm(this.customerDetails);
            }
          } else {

            this.service.getAllCustomersMock().subscribe((data: ICustomer[]) => {

              if (data?.length > 0) {
                this.customerDetails = data.find(x => x.id === id)!;

                if (Object.keys(this.customerDetails)?.length) {
                  this.patchForm(this.customerDetails);
                }
              }
            });
          }

        });
      }
    })
  }

  patchForm(customer: ICustomer) {

    this.customerForm.patchValue(
      {
        firstName: customer.firstName,
        lastName: customer.lastName,
        emailAddress: customer.emailAddress,
        updatedDataTime: customer.updatedDateTime,
        createdDataTime: customer.createdDateTime
      }
    );

  }

  get frm() { return this.customerForm.controls; }


  updateCustomer() {

    this.formSaved = false;

    this.customerForm.patchValue(
      {
        updatedDataTime: Date.now()
      }
    );

    this.subscription = this.service.updateCustomer(this.customerDetails?.id, this.customerModel).subscribe((customer: ICustomer) => {

      this.formSaved = true;
      this.router.navigate(['customers/', customer]);
    })
  }


  cancel() {
    this.router.navigate(['customers/']);
  }

  canDeactivate() {

    if (this.customerForm.touched && !this.formSaved) {
      return confirm(`Are you sure you want to navigate away and discard your changes?`);
    }

    return true;
  }

  ngOnDestroy() {
    {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }
}

