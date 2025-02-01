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
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AnnouncementService } from '../../../../services/announcements/announcement.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatError,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../../services/auth/authentication.service';

@Component({
  selector: 'app-announcement-form',
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
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.css',
})
export class AnnouncementFormComponent {
  private readonly onDestroy = new Subject<void>();
  public onAddAnnouncementEventEmitter = new EventEmitter();
  public onEditAnnouncementEventEmitter = new EventEmitter();
  public announcementForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.announcementForm = this.formBuilder.group({
      announcementTitle: ['', Validators.required],
      announcementContent: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAppointmentData();
  }

  private getAppointmentData(): void {
    this.announcementForm.patchValue({
      announcementTitle: this.dialogData.data.announcement_title,
      announcementContent: this.dialogData.data.announcement_content,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.announcementForm.patchValue({
        announcementTitle: this.dialogData.data.announcement_title,
        announcementContent: this.dialogData.data.announcement_content,
      });
    }
  }

  public handleAnnouncementSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.updateAnnouncement();
    } else {
      this.addAnnouncement();
    }
  }

  // Add
  public addAnnouncement(): void {
    var formData = this.announcementForm.value;
    var data = {
      announcement_title: formData.announcementTitle,
      announcement_content: formData.announcementContent,
    };

    this.announcementService.createAnnouncement(data).subscribe(
      (response: any) => {
        console.log(this.announcementForm.value);
        this.dialogRef.close();
        this.onAddAnnouncementEventEmitter.emit();
        if (response.statusCode === 201) {
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError('An error occured while processing');
          // this.toastService.toastError(response.message);
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
  public updateAnnouncement(): void {
    var formData = this.announcementForm.value;
    var data = {
      announcement_title: formData.announcementTitle,
      announcement_content: formData.announcementContent,
    };

    this.announcementService
      .updateAnnouncement(data, this.dialogData.data.id)
      .subscribe(
        (response: any) => {
          console.log(this.announcementForm.value);
          // console.log(response.statusCode);
          this.dialogRef.close();
          this.onEditAnnouncementEventEmitter.emit();
          if (response.statusCode == 201) {
            this.toastService.toastSuccess(response.message);
          } else {
            this.toastService.toastError(response.message);
            // this.toastService.toastError('An error occured while processing.');
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
