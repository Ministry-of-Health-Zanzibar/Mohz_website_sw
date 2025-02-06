import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';

@Component({
  selector: 'app-publication-links',
  standalone: true,
  imports: [],
  templateUrl: './publication-links.component.html',
  styleUrl: './publication-links.component.css'
})
export class PublicationLinksComponent implements OnInit{
publication: any;

constructor(private publicationService:PostService){}
ngOnInit(): void {
  this.getPublicationPosts();
    
}

public getPublicationPosts(): void {
  this.publicationService.getPublicationPosts().subscribe(data => {
    this.publication =  data;
    console.log('Publication List', data)
  }, error => console.log(error))
 
}

}
