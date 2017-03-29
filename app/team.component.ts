import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service'
import { Team } from './team'

@Component({
  selector: 'team',
  template: `
  <ul class="teams">
    <li *ngFor="let team of teams"
      [class.selected]="team === selectedTeam"
      (click)="onSelect(team)">
      {{team.name}}
    </li>
  </ul>
    `,
    providers: [TeamService]
})

export class TeamComponent  {

  teams: Team[];
  selectedTeam: Team;

  constructor(private teamService: TeamService) { }

  getTeams(): void {
    this.teamService.getTeams().then(heroes => this.teams = heroes);
  }

  ngOnInit(): void {
    this.getTeams();
  }

  onSelect(team: Team): void {
    this.selectedTeam = team;
  }

}
