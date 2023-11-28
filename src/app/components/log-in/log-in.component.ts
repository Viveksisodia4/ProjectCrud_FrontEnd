// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(private fb: FormBuilder, private router: Router,private _snackBar: MatSnackBar) { }
  supabase = createClient('https://intnuyuahrfftbjpvyoc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludG51eXVhaHJmZnRianB2eW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NjQ3MjAsImV4cCI6MjAxNDI0MDcyMH0.-B83_peP8pTfLgij27kO92wNEynAp6EVbLglUXWSq0s')
 
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Access the login form data here
      console.log('Form data:', this.loginForm.value);
     
    }
  }

  onSignupClick() {
    this.router.navigate(['/sign-up']);
  }
  
  async onLoginButtonclick() {
    let { data, error } = await this.supabase.auth.signInWithPassword({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });

    if (error) {
      alert(error.message);
    }
    
    else {

      //Region for snackbar
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.horizontalPosition = 'right';
   
 const snackbarRef=this._snackBar.open('Log In successful!', 'Close', {
        ...config,
      });
      setTimeout(() => {
        snackbarRef.dismiss();
      }, 3000);

      //End region for snackbar
      
      localStorage.setItem('isUserLoggeedIn', this.loginForm.value.email)
      this.router.navigate(['/dashboard']);
    }
  }
}

