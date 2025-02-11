import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../../../about-us/about-us.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit{
  aboutUsData: any[] = [];

  constructor(private aboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.getAllAboutUsData();
  }

  public getAllAboutUsData() {
    this.aboutUsService.getAllAboutUsData().subscribe(
      (response) => {
        this.aboutUsData = response.data; 
      },
      (error) => {
        console.error('Error fetching About Us data:', error);
      }
    );
  }
}
