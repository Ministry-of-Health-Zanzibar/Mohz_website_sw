import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news/news.service';
import { ToastService } from '../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news: any;
events: any;

  constructor(private newsService:NewsService, private toastService: ToastService){}

  ngOnInit(): void {
    this.getAllNeews();
      
  }

   public getAllNeews(): void {
          this.newsService.getAllNews().subscribe((response: any) => {
              this.news = response.data;
              console.log(response.data);
            },
            (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse.error.message);
            },
          );
        }

}
