import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  baseServerUrl=" https://localhost:7085/api/"

  registerUser(){
    // this.http.post
  }
  getData(){
    return this.http.get("https://localhost:7085/GetAllProjectDetails")
  }
 
  addProject(data:any){
    return this.http.post('https://localhost:7085/Create',data);
  }

  updateProjectDetail(data: any){
    console.log(data);
    return this.http.put('https://localhost:7085/Update',data);
  }
  
  getbyid(id: number){
     return this.http.get(`https://localhost:7085/GetProjectById?Id=${id}`);
  }
}