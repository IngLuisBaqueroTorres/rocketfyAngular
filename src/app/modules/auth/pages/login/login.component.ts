import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private service: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      user: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null)
    });
  }

  login() {
    const user = this.loginForm?.get('user')?.value;
    const password = this.loginForm?.get('password')?.value;

    console.log(this.loginForm);
    this.service.login(user, password).subscribe((data) => {
      if(data.message == true){
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
