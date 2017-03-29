import { Injectable } from '@angular/core';

import { Team } from './team';
import { TEAMS } from './mock-teams';

@Injectable()
export class TeamService {
  getTeams(): Promise<Team[]> {
    return Promise.resolve(TEAMS);
  }
}
