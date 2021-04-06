import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
 

  constructor(private authService: AuthService, private router: Router ) { }


  ngOnInit() {

   /* this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required,Validators.maxLength(10)],
    
    });*/
  }
  

  onSignupButtonClicked(username : string,email: string, password: string) {
    this.authService.signup(username,email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['/dashboard']);
    });
  }
  
}
