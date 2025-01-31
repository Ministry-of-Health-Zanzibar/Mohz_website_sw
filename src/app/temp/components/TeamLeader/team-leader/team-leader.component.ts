import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../services/teams/team.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-team-leader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-leader.component.html',
  styleUrl: './team-leader.component.css'
})
export class TeamLeaderComponent  implements OnInit{
  team: any;
  constructor(private teamService:TeamService){}

  ngOnInit(): void {
    this. getAllTeam();
      
  }


  public getAllTeam(): void {
             this.teamService.getAllTeams().subscribe((response: any) => {
                this.team = response.data;
                console.log(response.data);
              },
              (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse.error.message);
              },
            );
          }

}
