import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../services/banners/banner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  public banners!: any;


  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.getAllBanners();
  }

  public getAllBanners(): void {
    this.bannerService.getAllBanners().subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          // console.log(response.data);
          this.banners = response.data;
        } else {
          console.log('No data found.');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error.message);
      }
    );
  }
}
