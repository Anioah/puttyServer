import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logi, User } from 'src/app/modals/user';
import { AuthService } from 'src/app/service/auth.service';
import { errorMessage, successDialog, timeMessage } from 'src/app/functions/alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  user: any;

  constructor(public router: Router, private fb:FormBuilder, private authService: AuthService) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.clearLocalStorage();
  }

  clearLocalStorage(){
    localStorage.clear();
  }

  login():void{
    if (this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control =>{
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.authService.login(this.user).subscribe((data:any) => {this.user = data;
        localStorage.setItem('token',this.user.token);
        timeMessage('Iniciando...', 1500).then(() =>{
          successDialog('Iniciado').then(() =>{
            this.router.navigate(['/home']);
          });
        });
      }, error => {
        errorMessage('Usuario o contraseña incorrecta.')
      }
      )}

  }
   createForm():void{
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
  }
   get emailValidate(){
    return(
      this.loginForm.get('email').invalid && this.loginForm.get('email').touched
    )
  }
  get passwordValidate(){
    return(
      this.loginForm.get('password').invalid && this.loginForm.get('password').touched
    )
  }

setUser():void{
    this.user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
  }
  /*async test(){
    await Swal.fire({
      title: "Bienvenido!!", 
      text: "Espero y le guste nuestro proyecto...",
      //showConfirmButton:false,
     // icon:"info",
     width: 600,
     padding: '3em',
     
     //background: 'linear-gradient(to bottom right, #FFB100, #f6f87c, rgb(248, 246, 113))',
     backdrop: `
      rgba(25,0,123,0.4)
      url("/assets/candado.gif")
      left top
      no-repeat`
      
    })
              this.router.navigateByUrl('/home')
  }*/

}
