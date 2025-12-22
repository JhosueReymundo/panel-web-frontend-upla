import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authservice } from '../../../modules/auth/services/authservice';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {

  showDash = false;
  userName: string | null = null;

 constructor(public authService: Authservice) {} 

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

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isDirector(): boolean {
    return this.authService.hasRole('Director de escuela');
  }
}
