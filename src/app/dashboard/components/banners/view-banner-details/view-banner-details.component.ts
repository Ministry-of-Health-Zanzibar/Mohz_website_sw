import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BannerService } from '../../../../services/banners/banner.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-view-banner-details',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './view-banner-details.component.html',
  styleUrl: './view-banner-details.component.css',
})
export class ViewBannerDetailsComponent implements OnInit {
   public banner: any;
  
    constructor(
      private bannerService: BannerService,
      private activateRoute: ActivatedRoute,
      private toastService: ToastService,
    ) {}
  
    ngOnInit(): void {
        this.getBannerData();
    }
  
    public getBannerData(): void {
      const id = this.activateRoute.snapshot.params['id'];
      this.bannerService.findBannerById(id).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            // console.log(response.data);
            this.banner = response.data;
          } else {
            this.toastService.toastError('An error occured while processing');
            // this.toastService.toastError(response.message);
          }
        }
      );
    }
}
