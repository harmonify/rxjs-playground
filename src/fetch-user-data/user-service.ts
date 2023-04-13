import { Observable, interval } from 'rxjs';
import { delay, map, filter, take } from 'rxjs/operators';
import { sendEmail } from './notification-service';

export class UserDTO {
  id!: number;
  name: string;
  age: number;
  email: string;
  blockReason: string | null;
}

// mock user data in a database
const users: UserDTO[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 25,
    email: 'johndoe@example.com',
    blockReason: null,
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 30,
    email: 'janesmith@example.com',
    blockReason: null,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    age: 35,
    email: 'bobjohnson@example.com',
    blockReason: null,
  },
  {
    id: 4,
    name: 'Alice Brown',
    age: 28,
    email: 'alicebrown@example.com',
    blockReason: 'A bot.',
  },
  {
    id: 5,
    name: 'Michael Lee',
    age: 42,
    email: 'michaellee@example.com',
    blockReason: null,
  },
  {
    id: 6,
    name: 'Samantha Davis',
    age: 27,
    email: 'samanthadavis@example.com',
    blockReason: null,
  },
  {
    id: 7,
    name: 'David Kim',
    age: 32,
    email: 'davidkim@example.com',
    blockReason: null,
  },
  {
    id: 8,
    name: 'Emily Johnson',
    age: 29,
    email: 'emilyjohnson@example.com',
    blockReason: null,
  },
  {
    id: 9,
    name: 'Brian Lee',
    age: 31,
    email: 'brianlee@example.com',
    blockReason: null,
  },
  {
    id: 10,
    name: 'Linda Miller',
    age: 37,
    email: 'lindamiller@example.com',
    blockReason: 'Named Linda.',
  },
];

// create an Observable from the user data
export function getUserData(userIds: number[] = []): Observable<UserDTO> {
  const USERS_TO_TAKE = 5;
  const USERS_TO_RETURN = users.filter((user) => user.blockReason == null);

  console.info(`[UserService]: GET /users?page=1&limit=${USERS_TO_TAKE} 200`);

  return interval(300).pipe(
    take(USERS_TO_RETURN.length),
    map((i) => {
      const user = USERS_TO_RETURN[i];

      // sendEmail(user.email, {
      //   subject: `${user.name}, someone logged in to your account`,
      //   body: `Is it you? If not, <a href="https://client.com/confirm-session?userId=${user.id}">click here</a>`,
      // });

      console.info(`[UserService]: Stream user data with id ${user.id}...`);

      return user;
    }),
  );
}
