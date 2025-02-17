import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // isCollapsed = false;

  // toggleSidebar() {
  //   this.isCollapsed = !this.isCollapsed;
  // }

  isExpanded = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isExpanded$.subscribe(state => {
      this.isExpanded = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
