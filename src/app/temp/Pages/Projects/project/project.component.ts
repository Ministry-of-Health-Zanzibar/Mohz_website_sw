import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projectList: any;
 constructor(private projectService:PostService){}
ngOnInit(): void {
  this.getAllPojects();
    
}

public getAllPojects(){
  this.projectService.getProjectPosts().subscribe(response => {
    console.log('API Response:', response); 
    if (response && response.data) {
      this.projectList = response.data; 
      console.log('Updated projectList:', this.projectList); 
    }
  },
  error => {
    console.error('Error fetching projects:', error);
  }
);
}


}
