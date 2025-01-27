import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ToastService } from '../services/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService,
  ) { }


  ngOnInit(): void {
      
  }


  public logOut(): void {
    this.authService.logOut();
    this.toastService.toastSuccess('You have been successfully log out.')
    this.router.navigateByUrl('/temp/blog');
  }

  // ROLES
  // private getUserRole(): string {
  //   return this.authService.getUserFromLocalStorage().role;
  // }

  // public get isAdmin(): boolean {
  //   return this.getUserRole() === Role.ROLE_ADMIN;
  // }

  // public get isStaff(): boolean {
  //   return this.getUserRole() === Role.ROLE_STAFF;
  // }

}
