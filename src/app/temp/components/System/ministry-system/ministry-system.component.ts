import { Component, OnInit } from '@angular/core';
import { MinistrySystemService } from '../../../../services/ministry-system/ministry-system.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ministry-system',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule 
  ],
  templateUrl: './ministry-system.component.html',
  styleUrl: './ministry-system.component.css'
})
export class MinistrySystemComponent implements OnInit {
 
  ministrySystems: any;


  constructor(private ministrySystemService:MinistrySystemService){}

  ngOnInit(): void {
    this.getAllMinistrySystem();
      
  }

  // Fetch all ministry systems
  getAllMinistrySystem(): void {
    this.ministrySystemService.getAllMinistrySystem().subscribe(
      (response) => {
        this.ministrySystems = response?.data;
        console.log('Received data:', this.ministrySystems);
      },
      (error) => console.error('Error fetching ministry systems:', error)
    );
  }
  
  
  

}
