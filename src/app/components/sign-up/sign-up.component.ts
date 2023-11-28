// import necessary modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { createClient } from '@supabase/supabase-js';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup | any;

  constructor(private fb: FormBuilder, private router: Router,private _snackBar: MatSnackBar) { }
  //supabase signup.
  supabase = createClient('https://intnuyuahrfftbjpvyoc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludG51eXVhaHJmZnRianB2eW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NjQ3MjAsImV4cCI6MjAxNDI0MDcyMH0.-B83_peP8pTfLgij27kO92wNEynAp6EVbLglUXWSq0s')

  ngOnInit() {
    this.initForm();
  }
// Add a method to check if a specific field is invalid and touched
isFieldInvalid(fieldName: string): boolean {
  const control = this.signupForm.get(fieldName);
  return control
    ? control.invalid && (control.dirty || control.touched)
    : false;
}

  initForm() {
    this.signupForm = this.fb.group({
      firstname:new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(35)
      ,  Validators.pattern(/^[^0-9!@#$%^&*()_+={}[\]:;<>,.?~\\/`|-]+$/)]),

      lastname:new FormControl('',[ Validators.required,Validators.minLength(2),Validators.maxLength(35)
      ,Validators.pattern(/^[^0-9!@#$%^&*()_+={}[\]:;<>,.?~\\/`|-]+$/)]),
      email: new FormControl('', [Validators.required,
        Validators.pattern(/^[a-zA-Z][a-zA-Z\d.-]*@[a-zA-Z\d.-]+\.[a-zA-Z]{3,}$/)]),
         
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/),
        Validators.pattern(/^\S*$/),
      ]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    
    });
  }

  async onSubmit() {
    try {

      // Check if the user already exists in the usertable
      const existingUser = await this.supabase
        .from('projectTable')
        .select('*')
        .eq('email', this.signupForm.value.email)
        .single();

      if (existingUser.data) {
        // User already exists
        alert('User with this email already exists');
        return;
      }

      // If the user doesn't exist, proceed with signup
      const signUpResult = await this.supabase.auth.signUp({
        email: this.signupForm.get('email').value, // Use get method to access form control
        password: this.signupForm.get('password').value as string,
      });

      if (!signUpResult.error) {
        // Successful signup
        
        const { firstname, lastname, email, password, phone } = this.signupForm.value;
        const insertResult = await this.supabase
          .from('projectTable')
          .insert([{ firstname, lastname, email, password, phone }]);

        if (insertResult.error) {
          // Handle error during insert if needed
          alert(`Error inserting user: ${insertResult.error.message}`);
        } else {
       
          //for snackbar
          const config = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          config.horizontalPosition = 'right';
       
     const snackbarRef=this._snackBar.open('Signup In successful!', 'Close', {
            ...config,
          });
          setTimeout(() => {
            snackbarRef.dismiss();
          }, 3000);

          //end of snackbar

          this.router.navigate(['/log-in']);
        }
      } else {
        // Handle signup error
        alert(`Error during signup: ${signUpResult.error.message}`);
      }
    } catch (error) {
      // Handle unexpected errors
      alert(`Unexpected error: ${error}`);
    }
  }

  onLoginClick() {
    this.router.navigate(['/log-in']);
  }
}