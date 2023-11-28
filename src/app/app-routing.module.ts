import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProjectDialogComponent } from './components/create-project-dialog/create-project-dialog.component';
import { UpdateButtonComponent } from './components/update-button/update-button.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { authGuard } from './authgaurd/auth.guard';


const routes: Routes = [{ path: 'sign-up', component: SignUpComponent },
{ path: 'log-in', component: LogInComponent }
  , { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent, canActivate:[authGuard]},
{ path: 'update', component: UpdateButtonComponent }
  , { path: 'create-project-dialog', component: CreateProjectDialogComponent },
{ path: 'confirmation-dialog', component: ConfirmationDialogComponent }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
