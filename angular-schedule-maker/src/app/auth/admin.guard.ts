import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
   
  constructor(private authService: AuthService,
    private _router: Router) { }

canActivate(): boolean{
if(this.authService.isAdmin()){
return true
}else{
this._router.navigate(['login'])
return false
}
}

}
