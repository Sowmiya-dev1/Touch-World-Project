import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../layout/sidebar/sidebar.service';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-api-integration',
  templateUrl: './api-integration.component.html',
  styleUrls: ['./api-integration.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatInputModule, SidebarComponent, HttpClientModule, MatPaginatorModule, MatIconModule ],
})
export class ApiIntegrationComponent implements OnInit, AfterViewInit {
  private http = inject(HttpClient);
  filterVisibility: Record<string, boolean> = {};

  isSidebarExpanded = false;
  constructor(private sidebarService: SidebarService) {
          this.sidebarService.isExpanded$.subscribe(state => {
              this.isSidebarExpanded = state;
          });
      }

  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource = new MatTableDataSource<any>([]);
  totalRecords = 200000; 
  pageSize = 10; 
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.totalRecords= 200000;
    this.fetchData(this.currentPage, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData(page: number, size: number) {
    const apiUrl = `https://testapp.touchworldtechnology.com/interview/test/v1/product/users?count=${size}&page=${page}`;
  
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.dataSource.data = data; 
        this.currentPage = page;
        if (this.paginator) {
          this.paginator.length = this.totalRecords; 
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }
  

  applyFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onPageChange(event: PageEvent) {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  toggleFilter(column: string) {
    this.filterVisibility[column] = !this.filterVisibility[column]; 
  }
}
