import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tender',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './tender.component.html',
  styleUrl: './tender.component.css'
})
export class TenderComponent implements OnInit {
  tenderList: any;
  constructor(private tenderService:PostService){}
  ngOnInit(): void {
    this.getAllTenders();
   
  }


  public getAllTenders(){
    this.tenderService.getTenderPosts().subscribe(response => {
      console.log('API Response:', response); 
      if (response && response.data) {
        this.tenderList = response.data; 
        console.log('Updated tenderList:', this.tenderList); 
      }
    },
    error => {
      console.error('Error fetching projects:', error);
    }
  );
  }

}
