import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  
  constructor(private authService: AuthService, private router: Router ) { }
  form = new FormGroup({
    
    username: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      this.validateEmail
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
    
   });

  ngOnInit() {

   
  }
  
  validateEmail(c: FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
  
    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  onSignupButtonClicked(username : string,email: string, password: string) {
    this.authService.signup(username,email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['/dashboard']);
    });
  }
  
}
