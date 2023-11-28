import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import{FormsModule} from '@angular/forms';
import { LogInComponent } from './components/log-in/log-in.component'
import { RouterModule,Routes, RoutesRecognized } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProjectDialogComponent } from './components/create-project-dialog/create-project-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import{MatInputModule} from "@angular/material/input";
import {MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core'; 
import{MatCheckboxModule} from '@angular/material/checkbox'
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateButtonComponent } from './components/update-button/update-button.component';
import{MatSelectModule} from '@angular/material/select';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    DashboardComponent,
    CreateProjectDialogComponent,
    UpdateButtonComponent,
    ConfirmationDialogComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,RouterModule, BrowserAnimationsModule,
    MatButtonModule,MatIconModule,MatInputModule,MatDialogModule,MatInputModule,MatDatepickerModule
  ,MatNativeDateModule,MatCheckboxModule,DatePipe,HttpClientModule,ReactiveFormsModule
  ,MatSelectModule ,MatSnackBarModule,MatMomentDateModule 

  ],
  providers: [DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, /* optional */
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },],
  bootstrap: [AppComponent]
})
export class AppModule { }
