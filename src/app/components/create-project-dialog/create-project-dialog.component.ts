// create-project-dialog.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { projects } from '../../model/dataType';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css'],
})
export class CreateProjectDialogComponent implements OnInit {
  projectForm: FormGroup | any;
  countries: string[] = ['India', 'Australia', 'America', 'England', 'Russia', 'China','Canada','Dubai','Quator'];
  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private fb: FormBuilder, private serve: ProjectService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {

    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      country: ['', Validators.required],
      budget: ['', Validators.required],
      status: [true],
    });
  }

  Id: number = 0;
  onSaveClick(data: any) {
    data.status = 'Active';
    data.id = this.Id;

    this.serve.addProject(data).subscribe((result) => {
      this.dialogRef.close(result);

    });
  }
  onCancelClick() {
    // Close the dialog without saving
    this.dialogRef.close();
  }

}
