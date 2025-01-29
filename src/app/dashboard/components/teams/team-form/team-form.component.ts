import { HttpErrorResponse } from '@angular/common/http';
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
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { BannerService } from '../../../../services/banners/banner.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TeamService } from '../../../../services/teams/team.service';

@Component({
  selector: 'app-team-form',
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
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css',
})
export class TeamFormComponent {
  private readonly onDestroy = new Subject<void>();
  onAddTeamEventEmitter = new EventEmitter();
  onEditTeamEventEmitter = new EventEmitter();
  public teamForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.teamForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      professional: ['', Validators.required],
      profileImage: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTeamData();
  }

  private getTeamData(): void {
    this.teamForm.patchValue({
      firstName: this.dialogData.data.first_name,
      middleName: this.dialogData.data.middle_name,
      lastName: this.dialogData.data.last_name,
      professional: this.dialogData.data.professional,
      profileImage: this.dialogData.data.team_photo,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.teamForm.patchValue({
        firstName: this.dialogData.data.first_name,
        middleName: this.dialogData.data.middle_name,
        lastName: this.dialogData.data.last_name,
        professional: this.dialogData.data.professional,
        profileImage: this.dialogData.data.team_photo,
      });
    }
  }

  public handleTeamSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateTeam();
    } else {
      this.onAddTeam();
    }
  }

  // Add
  public onAddTeam(): void {
    if (this.teamForm.valid) {
      const formData = new FormData();
      formData.append('first_name', this.teamForm.get('firstName')?.value);
      formData.append('middle_name', this.teamForm.get('middleName')?.value);
      formData.append('last_name', this.teamForm.get('lastName')?.value);
      formData.append('professional', this.teamForm.get('professional')?.value);
      formData.append('team_photo', this.teamForm.get('profileImage')?.value);

      this.teamService.registerTeamMember(formData).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onAddTeamEventEmitter.emit();
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
  }

  // Update
  public onUpdateTeam(): void {
    if (this.teamForm.valid) {
      const formData = new FormData();
      formData.append('first_name', this.teamForm.get('firstName')?.value);
      formData.append('middle_name', this.teamForm.get('middleName')?.value);
      formData.append('last_name', this.teamForm.get('lastName')?.value);
      formData.append('professional', this.teamForm.get('professional')?.value);
      formData.append('team_photo', this.teamForm.get('profileImage')?.value);

      this.teamService.updateTeamMember(formData, 1).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onEditTeamEventEmitter.emit();
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
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.fileError = 'Please select a valid image file.';
        return;
      }

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        // 5 MB size limit
        this.fileError = 'Image size should not exceed 5MB.';
        return;
      }

      // Clear error and set file in form
      this.fileError = null;
      this.teamForm.get('profileImage')?.setValue(file);

      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
