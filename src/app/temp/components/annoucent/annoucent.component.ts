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
  public isLoading!: boolean;

  constructor(
    private annoucementService: AnnouncementService,
  ) {}


  ngOnInit(): void {
      this.getAllAnnouncements();
  }

  public getAllAnnouncements(): void {
    this.isLoading = true;
    this.annoucementService.getAllAnnouncements().subscribe((response: any) => {
        this.announcements = response.data;
        this.isLoading = false;
        // console.log(response.data);
      },
      (errorResponse: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(errorResponse.error.message);
      },
    );
  }

   // Kupunguza ukubwa wa text
   public truncateDescription(description: string, words: number): string {
    if (!description) return '';
    const wordArray = description.split(' ');
    if (wordArray.length <= words) return description;
    return wordArray.slice(0, words).join(' ') + '...';
  }

}
