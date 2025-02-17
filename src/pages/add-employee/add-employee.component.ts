import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      const storedEmployees = JSON.parse(
        localStorage.getItem('employees') || '[]'
      );
      storedEmployees.push(employee);
      localStorage.setItem('employees', JSON.stringify(storedEmployees));
      console.log('added employee', storedEmployees);
      this.router.navigate(['/employee-listing']);
    }
  }
}
