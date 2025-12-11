import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {

  showDash = false;
  userName: string | null = null;

 /*  constructor(public authService: AuthService) {} */

   ngOnInit(): void {
    /* this.userName = this.authService.getUserName();  */
  } 

  toggleDash() {
    this.showDash = !this.showDash;
  }

  

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dash')) {
      this.showDash = false;
    }
  }
}
