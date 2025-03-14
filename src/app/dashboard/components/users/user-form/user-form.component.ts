import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationService } from '../../../../services/auth/authentication.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
     MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

 signupForm!: FormGroup;
 
   constructor(
     private fb: FormBuilder,
     private authService: AuthenticationService
   ) {}

  ngOnInit(): void {

     this.signupForm = this.fb.group({
          first_name: ['', [Validators.required, Validators.minLength(2)]],
          middle_name: [''],
          last_name: ['', [Validators.required]],
          address: ['',[Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          phone_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          gender: ['', [Validators.required]],
          date_of_birth: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]]
        });
      
  }
  

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
  
    console.log(this.signupForm.value); 
  
    this.authService.signup(this.signupForm.value).subscribe(
      (response) => {
        console.log(response);
        this.signupForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
