import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeModel} from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  demoForm: FormGroup  = new FormGroup({});

  constructor( private fb:FormBuilder) {
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;

    }

}


  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      emailId: new FormControl(this.employeeObj.emailId),
      contactNo: new FormControl(this.employeeObj.contactNo),
      address: new FormControl(this.employeeObj.address),
      pinCode: new FormControl(this.employeeObj.pinCode)
    });
  }
  onSave(){
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length +1);
      this.employeeList.unshift( this.employeeForm.value);
    } else{
      this.employeeList.unshift( this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
  }
  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate() {
  const record = this.employeeList.find( m => m.empId == this.employeeForm.controls['empId'].value );
  if(record != undefined) {
    record.name= this.employeeForm.controls['name'].value;
    record.contactNo = this.employeeForm.controls['contactNo'].value;
    record.address = this.employeeForm.controls['address'].value;

  }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }
  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      const index = this.employeeList.findIndex(m => m.empId == id)  ;
      this.employeeList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }

}
