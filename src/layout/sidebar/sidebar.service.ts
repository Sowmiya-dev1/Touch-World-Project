import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  private isExpanded = new BehaviorSubject<boolean>(false);
  isExpanded$ = this.isExpanded.asObservable();

  toggleSidebar() {
    this.isExpanded.next(!this.isExpanded.value);
  }
}
