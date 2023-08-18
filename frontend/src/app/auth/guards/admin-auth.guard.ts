import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service'; // Importa el servicio de autenticación o el servicio que almacena la información del usuario

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private userservice: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userservice.currentUser && this.userservice.currentUser.isAdmin) {
      return true;
    } else {
      // Redirige a otra página si el usuario no es un administrador
      this.router.navigate(['/']);
      return false;
    }
  }
}