import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [InputTextModule, ButtonModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  formGroup: FormGroup | undefined;

  constructor(private service: AuthService) {
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
        name: new FormControl<string | null>(null),
        user: new FormControl<string | null>(null),
        email: new FormControl<string | null>(null),
        password: new FormControl<string | null>(null)
    });
  }

  signin() {
    const name = this.formGroup?.get('name')?.value;
    const nickname = this.formGroup?.get('user')?.value;
    const email = this.formGroup?.get('email')?.value;
    const password = this.formGroup?.get('password')?.value;

    this.service.signin(name, nickname, email, password).subscribe((data) => {
      console.log(data);
    });
  }
}
