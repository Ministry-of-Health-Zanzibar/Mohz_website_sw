import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { MenusComponent } from '../menus/menus.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TitleComponent,
    TopbarComponent,
    MenusComponent,
    CarouselComponent,
    RouterModule,
    FooterComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(private wowService: NgwWowService) {}

  ngOnInit(): void {
    this.wowService.init();
  }
}
