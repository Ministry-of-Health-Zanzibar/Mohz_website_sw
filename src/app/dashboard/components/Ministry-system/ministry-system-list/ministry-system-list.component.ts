import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MinistrySystemService } from '../../../../services/ministry-system/ministry-system.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MinistrySystemFormComponent } from '../ministry-system-form/ministry-system-form.component';

@Component({
  selector: 'app-ministry-system-list',
  standalone: true,
  imports: [ 
    CommonModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
      ],
  templateUrl: './ministry-system-list.component.html',
  styleUrls: ['./ministry-system-list.component.css']
})
export class MinistrySystemListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'system_title', 'system_link', 'system_logo'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ministrySystemService: MinistrySystemService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchMinistrySystems();
  }

  fetchMinistrySystems(): void {
    this.ministrySystemService.getAllMinistrySystem().subscribe(
      (response) => {
        if (response && response.data) {
          this.dataSource.data = response.data; // Hakikisha unachukua `response.data`
          console.log("Received data:", response.data);
        } else {
          console.warn("Invalid response format:", response);
        }
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      (error) => {
        console.error('Error fetching ministry systems:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddSystemDialog(): void {
    const dialogRef = this.dialog.open(MinistrySystemFormComponent, {
      width: '700px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      // Handle logic after dialog is closed
    });
  }

}
