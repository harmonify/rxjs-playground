import { Observable, interval } from 'rxjs';
import { map, take, toArray } from 'rxjs/operators';

export class UserRankDTO {
  userId: number;
  rank: number;
}

const leaderboard: UserRankDTO[] = [
  {
    userId: 1,
    rank: 9,
  },
  {
    userId: 2,
    rank: 10,
  },
  {
    userId: 3,
    rank: 8,
  },
  {
    userId: 4,
    rank: 6,
  },
  {
    userId: 5,
    rank: 3,
  },
  {
    userId: 6,
    rank: 5,
  },
  {
    userId: 7,
    rank: 1,
  },
  {
    userId: 8,
    rank: 2,
  },
  {
    userId: 9,
    rank: 4,
  },
  {
    userId: 10,
    rank: 7,
  },
];

export interface IReward {
  [rank: number]: number;
}

const rewards: IReward = {
  1: 10,
  2: 7,
  3: 5,
  4: 3,
  5: 3,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
  10: 1,
};

export class GameLeaderboardDTO {
  reward: number;
  userId: number;
  rank: number;
}

export function getGameLeaderboard(): Observable<GameLeaderboardDTO[]> {
  return interval(100).pipe(
    take(leaderboard.length),
    map((i) => {
      const lb = leaderboard[i];

      console.info(
        `[GameService]: Stream leaderboard data for user id ${lb.userId}...`,
      );

      return {
        ...lb,
        reward: rewards[lb.rank],
      };
    }),
    toArray(),
  );
}
