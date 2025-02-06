import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../../services/announcements/announcement.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-announcement-details',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './view-announcement-details.component.html',
  styleUrl: './view-announcement-details.component.css',
})
export class ViewAnnouncementDetailsComponent implements OnInit {
  public announcement: any;

  constructor(
    private announcementService: AnnouncementService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAnnouncementData();
  }

  public getAnnouncementData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.announcementService
      .findAnnouncementById(id)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response.data);
          this.announcement = response.data;
        } else {
          this.toastService.toastError('An error occured while processing');
          // this.toastService.toastError(response.message);
        }
      });
  }
}
