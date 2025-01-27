import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AnnouncementService } from '../../../../services/announcements/announcement.service';
import { AnnouncementFormComponent } from '../announcement-form/announcement-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastService } from '../../../../services/toast/toast.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css',
})
export class AnnouncementListComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;

  constructor(
    private announcementService: AnnouncementService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public displayedColumns: string[] = [
    'id',
    'announcementTitle',
    'announcementContent',
    'action',
  ];

  // public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    // console.log('PAGINATOR: ', this.paginator);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    console.log('LOADING...')
    this.getAllAnnouncements();
  }

  onRefresh() {
    this.getAllAnnouncements();
  }

  public getAllAnnouncements(): void {
    this.refreshing = true;
    this.announcementService
      .getAllAnnouncements()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            // console.log(response);
            this.dataSource = new MatTableDataSource(response.data);
            // this.dataSource.data = response;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.refreshing = false;
          } else {
            this.refreshing = false;
            console.log('No data found.');
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.refreshing  = false;
          this.toastService.toastError(errorResponse.error.message);
        }
      );
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Open Add Dialog
  public handleOpenAddDialogForm(): void {
    const config = new MatDialogConfig();
    config.data = {
      action: 'CREATE NEW',
    };
    config.width = '600px';

    const dialogRef = this.dialog.open(AnnouncementFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onAddAnnouncementEventEmitter.subscribe(
        () => {
          this.getAllAnnouncements();
        }
      );
  }

  // Open Edit Dialog
  public handleOpenEditDialogForm(data: any): void {
    console.log(data);
    const config = new MatDialogConfig();
    config.data = {
      action: 'EDIT',
      data: data,
    };
    config.width = '600px';

    const dialogRef = this.dialog.open(AnnouncementFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onEditAnnouncementEventEmitter.subscribe(
        () => {
          this.getAllAnnouncements();
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
