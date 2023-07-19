import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomerEditCanActivateGuard implements CanActivate {

  private permitted = false;
  private youReallyWantToEdit = true;

  constructor (private router: Router, ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.permitted = this.youReallyWantToEdit;

    if (!this.permitted) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
