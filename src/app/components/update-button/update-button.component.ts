// update-button.component.ts

import { Component, OnInit,Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.css']
})
export class UpdateButtonComponent implements OnInit {
  updateForm: FormGroup | any;
  
  countries: string[] = ['India', 'Australia', 'America','England','Russia','China','Canada','Dubai','Quator'];

  constructor(public dialogRef: MatDialogRef<UpdateButtonComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, 
  private fb: FormBuilder, private serve:ProjectService) {
    
  }
    ngOnInit() {
      this.initializeForm();
      this.populateForm();
    }

  initializeForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      country: ['',Validators.required],
      budget: ['',Validators.required],
      status: [false],
    });
  }
  populateForm() {

    this.serve.getbyid(this.data.data.id).subscribe((result) => {

      this.updateForm.patchValue({
        name:(result as any).name,
        client: (result as any).client,
        startDate: (result as any).startDate,
        endDate: (result as any).endDate,
        country:(result as any).country,
        budget:(result as any).budget,
        status: (result as any).status,
      });
      })
  
  }

  onSaveClick(data1:any) {
   
    data1.status = this.updateForm.get('status').value ? 'Active' : 'Not Active';

    data1.id=this.data.data.id;
    
    this.serve.updateProjectDetail(data1).subscribe((result)=>{
      this.dialogRef.close(result);
    });

    }

  onCancelClick() {
    this.dialogRef.close();
  }
}
