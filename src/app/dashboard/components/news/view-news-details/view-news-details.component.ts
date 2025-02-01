import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { NewsService } from '../../../../services/news/news.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-news-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './view-news-details.component.html',
  styleUrl: './view-news-details.component.css'
})
export class ViewNewsDetailsComponent implements OnInit {
 public news: any;
  
    constructor(
      private newsService: NewsService,
      private activateRoute: ActivatedRoute,
      private toastService: ToastService,
    ) {}
  
    ngOnInit(): void {
        this.getNewsData();
    }
  
    public getNewsData(): void {
      const id = this.activateRoute.snapshot.params['id'];
      this.newsService.findNewsById(id).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            // console.log(response.data);
            this.news = response.data;
          } else {
            this.toastService.toastError('An error occured while processing');
            // this.toastService.toastError(response.message);
          }
        }
      );
    }
}
