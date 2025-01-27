import { Component } from '@angular/core';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { AboutUsComponent } from "../../components/about-us/about-us.component";
import { OurServiceComponent } from "../../components/our-service/our-service.component";
import { AnnoucentComponent } from "../../components/annoucent/annoucent.component";
import { NewsComponent } from "../../components/news/news.component";
import { JoinUsComponent } from "../../components/join-us/join-us.component";
import { TeamLeaderComponent } from "../../components/TeamLeader/team-leader/team-leader.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, AboutUsComponent, OurServiceComponent, AnnoucentComponent, NewsComponent, JoinUsComponent, TeamLeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
