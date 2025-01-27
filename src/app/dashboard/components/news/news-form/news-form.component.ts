import { Component, EventEmitter, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NewsService } from '../../../../services/news/news.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { ToastService } from '../../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.css',
})
export class NewsFormComponent {
  private readonly onDestroy = new Subject<void>();
  onAddNewsEventEmitter = new EventEmitter();
  onEditNewsEventEmitter = new EventEmitter();
  public newsForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private toastService: ToastService,
  ) {
    this.newsForm = this.formBuilder.group({
      newsTitle: ['', Validators.required],
      newsDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getNewsData();
  }

  private getNewsData(): void {
    this.newsForm.patchValue({
      newsTitle: this.dialogData.data.news_title,
      newsDescription: this.dialogData.data.news_descriptions,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.newsForm.patchValue({
        newsTitle: this.dialogData.data.news_title,
        newsDescription: this.dialogData.data.news_descriptions,
      });
    }
  }

  public handleNewsSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateNews();
    } else {
      this.onAddNews();
    }
  }

  // Add
  public onAddNews(): void {
    var formData = this.newsForm.value;
    var data = {
      news_title: formData.newsTitle,
      news_descriptions: formData.newsDescription,
    };

    this.newsService.createNews(data).subscribe(
      (response: any) => {
        // console.log(this.newsForm.value);
        // console.log(response.statusCode);
        this.dialogRef.close();
        this.onAddNewsEventEmitter.emit();
        if (response.statusCode === 201) {
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError(response.message);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse) {
          this.toastService.toastError(errorResponse.error.message);
        }
      }
    );
  }

  // Update
  public onUpdateNews(): void {
    var formData = this.newsForm.value;
    var data = {
      id: this.dialogData.data.id,
      news_title: formData.newsTitle,
      news_descriptions: formData.newsDescription,
    };

    this.newsService.updateNews(data).subscribe(
      (response: any) => {
        // console.log(this.newsForm.value);
        // console.log(response.statusCode);
        this.dialogRef.close();
        this.onEditNewsEventEmitter.emit();
        if (response.statusCode === 201) {
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError(response.message);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse) {
          this.toastService.toastError(errorResponse.error.message);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
