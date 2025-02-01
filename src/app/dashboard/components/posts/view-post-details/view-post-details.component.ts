import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../../../../services/posts/post.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-post-details',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './view-post-details.component.html',
  styleUrl: './view-post-details.component.css'
})
export class ViewPostDetailsComponent implements OnInit {
public post: any;
  
    constructor(
      private postService: PostService,
      private activateRoute: ActivatedRoute,
      private toastService: ToastService,
    ) {}
  
    ngOnInit(): void {
        this.getBannerData();
    }
  
    public getBannerData(): void {
      const id = this.activateRoute.snapshot.params['id'];
      this.postService.findPostById(id).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            // console.log(response.data);
            this.post = response.data;
          } else {
            this.toastService.toastError('An error occured while processing');
            // this.toastService.toastError(response.message);
          }
        }
      );
    }


public  isImage(filePath: string): boolean {
    return filePath?.match(/\.(jpeg|jpg|png|gif)$/i) !== null;
  }

  public isPdf(filePath: string): boolean {
    return filePath?.endsWith('.pdf');
  }
}
