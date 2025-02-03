import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../services/teams/team.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-team-leader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-leader.component.html',
  styleUrl: './team-leader.component.css',
})
export class TeamLeaderComponent implements OnInit {
  teams: any;
  public isLoading!: boolean;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.getAllTeam();
  }

  public getAllTeam(): void {
    this.isLoading = true;
    this.teamService.getAllTeams().subscribe(
      (response: any) => {
        this.teams = response.data;
        // console.log('TEAM: ', response.data);
        this.isLoading = false;
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error.message);
        this.isLoading = false;
      }
    );
  }
}
