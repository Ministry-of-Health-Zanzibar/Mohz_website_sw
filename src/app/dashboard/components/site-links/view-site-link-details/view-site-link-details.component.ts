import { Component, OnInit } from '@angular/core';
import { SiteLinkService } from '../../../../services/site-links/site-link.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-site-link-details',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './view-site-link-details.component.html',
  styleUrl: './view-site-link-details.component.css',
})
export class ViewSiteLinkDetailsComponent implements OnInit {
  public sitelink: any;

  constructor(
    private sitelinkService: SiteLinkService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getSitelinkData();
  }

  public getSitelinkData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.sitelinkService.findSitelinkById(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        console.log(response.data);
        this.sitelink = response.data;
      } else {
        this.toastService.toastError('An error occured while processing');
        // this.toastService.toastError(response.message);
      }
    });
  }
}
