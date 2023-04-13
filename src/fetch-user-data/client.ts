import { Observable, EMPTY } from 'rxjs';
import { catchError, map, mergeMap, timeout } from 'rxjs/operators';
import { UserDTO, getUserData } from './user-service';
import { UserRankDTO, getGameLeaderboard } from './game-service';

export default () => {
  // subscribe to the Observable to get the user and their rank data
  // it will automatically unsubscribe when it throw an error or complete
  fetchUserDataAndRank().subscribe({
    next: showUserRank,
    error: (err) => {
      console.error('[Client]: Error while fetching user rank:', err);
    },
    complete: () => console.log('[Client]: Fetch user data completed'),
  });
};

/**
 * Fetch user data and their rank in leaderboard
 */
function fetchUserDataAndRank(): Observable<
  UserDTO & Pick<UserRankDTO, 'rank'>
> {
  const leaderboardData$ = getGameLeaderboard();
  const userData$ = getUserData();

  return leaderboardData$.pipe(
    catchError((err) => {
      console.error('[Client]: Error while fetching data:', err);
      return EMPTY;
    }),
    timeout(5000),
    mergeMap((leaderboardData) =>
      userData$.pipe(
        map((userData) => {
          const userRank = leaderboardData.find(
            (entry) => entry.userId === userData.id,
          ).rank;

          return {
            ...userData,
            rank: userRank,
          };
        }),
      ),
    ),
  );
}

function showUserRank(userData: UserDTO & Pick<UserRankDTO, 'rank'>) {
  console.info(
    `[Client]: Hi, ${userData.name}. You are ranked ${getOrdinal(
      userData.rank,
    )}!`,
  );
}

function getOrdinal(num: number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = num % 10;
  const suffix = [11, 12, 13].includes(num)
    ? suffixes[0]
    : suffixes[lastDigit] || suffixes[0];
  return `${num}${suffix}`;
}
