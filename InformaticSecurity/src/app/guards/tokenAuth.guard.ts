import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenAuthService } from "../service/token-auth.service";
import Swal from 'sweetalert2';


@Injectable({
    providedIn: 'root'
})
export class tokenAuthGuard implements CanActivate {

    constructor(
        private data: TokenAuthService,
        private router: Router) {
    }

    canActivate() {

        if (this.data.validation()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}