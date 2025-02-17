import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { SidebarService } from '../../layout/sidebar/sidebar.service';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { Router } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

interface Employee {
    name: string;
    contact: string;
    email: string;
    address: string;
}

@Component({
    selector: 'app-employee-listing',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatInputModule, SidebarComponent],
    templateUrl: './employee-listing.component.html',
    styleUrls: ['./employee-listing.component.css'],
})
export class EmployeeListingComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    isSidebarExpanded = false;

    constructor(private sidebarService: SidebarService, private router: Router, private cdr: ChangeDetectorRef) {
        this.sidebarService.isExpanded$.subscribe(state => {
            this.isSidebarExpanded = state;
        });
    }

    displayedColumns: string[] = ['name', 'contact', 'email', 'address', 'delete'];

    staticEmployees: Employee[] = [
        { name: 'John Doe', contact: '9876543210', email: 'john@example.com', address: 'New York' },
        { name: 'Jane Smith', contact: '8765432109', email: 'jane@example.com', address: 'California' },
        { name: 'Sam Wilson', contact: '7654321098', email: 'sam@example.com', address: 'Texas' },
        { name: 'Peter Parker', contact: '6543210987', email: 'peter@example.com', address: 'Chicago' },
        { name: 'Bruce Wayne', contact: '5432109876', email: 'bruce@example.com', address: 'Gotham' },
        { name: 'Clark Kent', contact: '4321098765', email: 'clark@example.com', address: 'Metropolis' },
        { name: 'Diana Prince', contact: '3210987654', email: 'diana@example.com', address: 'Themyscira' },
        { name: 'Tony Stark', contact: '2109876543', email: 'tony@example.com', address: 'Malibu' },
        { name: 'Steve Rogers', contact: '1098765432', email: 'steve@example.com', address: 'Brooklyn' },
        { name: 'Natasha Romanoff', contact: '0987654321', email: 'natasha@example.com', address: 'Russia' },
        { name: 'Wanda Maximoff', contact: '9876543201', email: 'wanda@example.com', address: 'Sokovia' },
        { name: 'Stephen Strange', contact: '8765432101', email: 'stephen@example.com', address: 'New York' },
        { name: 'Nick Fury', contact: '7654321001', email: 'nick@example.com', address: 'SHIELD' },
        { name: 'Loki Odinson', contact: '6543210001', email: 'loki@example.com', address: 'Asgard' },
        { name: 'Thor Odinson', contact: '5432100001', email: 'thor@example.com', address: 'Asgard' },
        { name: 'John Doe', contact: '9876543210', email: 'john@example.com', address: 'New York' },
        { name: 'Jane Smith', contact: '8765432109', email: 'jane@example.com', address: 'California' },
        { name: 'Sam Wilson', contact: '7654321098', email: 'sam@example.com', address: 'Texas' },
        { name: 'Peter Parker', contact: '6543210987', email: 'peter@example.com', address: 'Chicago' },
        { name: 'Bruce Wayne', contact: '5432109876', email: 'bruce@example.com', address: 'Gotham' },
        { name: 'Clark Kent', contact: '4321098765', email: 'clark@example.com', address: 'Metropolis' },
        { name: 'Diana Prince', contact: '3210987654', email: 'diana@example.com', address: 'Themyscira' },
        { name: 'Tony Stark', contact: '2109876543', email: 'tony@example.com', address: 'Malibu' },
        { name: 'Steve Rogers', contact: '1098765432', email: 'steve@example.com', address: 'Brooklyn' },
        { name: 'Natasha Romanoff', contact: '0987654321', email: 'natasha@example.com', address: 'Russia' },
        { name: 'Wanda Maximoff', contact: '9876543201', email: 'wanda@example.com', address: 'Sokovia' },
        { name: 'Stephen Strange', contact: '8765432101', email: 'stephen@example.com', address: 'New York' },
        { name: 'Nick Fury', contact: '7654321001', email: 'nick@example.com', address: 'SHIELD' },
        { name: 'Loki Odinson', contact: '6543210001', email: 'loki@example.com', address: 'Asgard' },
        { name: 'Thor Odinson', contact: '5432100001', email: 'thor@example.com', address: 'Asgard' }
    ];

    employees: Employee[] = [];

    dataSource = new MatTableDataSource<Employee>(this.employees.slice(0, 15));

    ngAfterViewInit() {
        const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        this.employees = [...this.staticEmployees, ...storedEmployees];

        this.dataSource.data = this.employees;


        this.dataSource.paginator = this.paginator;
        this.paginator.pageSize = 10;

        this.cdr.detectChanges();
    }

    applyFilter(event: Event, column: keyof Employee) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

      this.dataSource.filterPredicate = (data, filter) => {
          const dataStr = data[column].toString().toLowerCase();
          return dataStr.includes(filter);
      };

      this.dataSource.filter = filterValue;
  }

    deleteEmployee(index: number) {
        this.employees.splice(index, 1);
        this.dataSource.data = [...this.employees];
    }

    deleteRow(row: any) {
        this.dataSource.data = this.dataSource.data.filter(item => item !== row);
        this.dataSource._updateChangeSubscription();  
    }

    navigateToAddEmp() {
        this.router.navigate(['/add-employee']);
    }
}
