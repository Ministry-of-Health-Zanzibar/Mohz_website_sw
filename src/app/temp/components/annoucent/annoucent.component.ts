import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcements/announcement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-annoucent',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './annoucent.component.html',
  styleUrl: './annoucent.component.css'
})
export class AnnoucentComponent implements OnInit {
 public announcements: any;

  constructor(
    private annoucementService: AnnouncementService,
    private toastService: ToastService,
  ) {}


  ngOnInit(): void {
      this.getAllAnnouncements();
  }

  public getAllAnnouncements(): void {
    this.annoucementService.getAllAnnouncements().subscribe((response: any) => {
        this.announcements = response.data;
        console.log(response.data);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error.message);
      },
    );
  }

}
