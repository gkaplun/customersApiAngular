import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerEditComponent } from '../components/index';


export interface DeactivationGuard {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})

export class CustomerEditCanDeActivateGuard implements CanDeactivate<CustomerEditComponent> {

  canDeactivate(component: CustomerEditComponent): Observable<boolean> | Promise<boolean> | boolean {

    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
