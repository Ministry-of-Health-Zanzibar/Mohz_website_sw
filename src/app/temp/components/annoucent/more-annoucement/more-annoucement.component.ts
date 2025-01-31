import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AnnouncementService } from '../../../../services/announcements/announcement.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-more-annoucement',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './more-annoucement.component.html',
  styleUrl: './more-annoucement.component.css'
})
export class MoreAnnoucementComponent  implements OnInit{
  announcements : any;
  constructor(private annoucementService:AnnouncementService){}
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
