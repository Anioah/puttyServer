import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {

  constructor(private router: Router, private http: HttpClientService) { }

  validation() {
    this.http.makeRequest('get', environment.apiURL + '/authVerification', {
      body: {}
    }).subscribe(data => { this.tokenValidation(data) }, error => {
      Swal.fire({
        title: 'Permiso Denegado',
        text: 'No tienes Autorización',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      })
      this.router.navigate(['/login']);
    });
    return this.tokenValidation
  }

  // Metodo para seguir con el hilo, sin este metodo el guardia se retrasa. NO BORRAR.
  tokenValidation(validation: boolean): boolean {
    var validation: boolean = validation;
    //console.log(validation);
    return validation;
  }

}
