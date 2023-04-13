import { from, interval } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

// create an Observable from an array
const numbers$ = from([1, 2, 3, 4, 5]);

// apply operators to transform the data
const squared$ = numbers$.pipe(
  filter((num) => num % 2 === 0),
  map((num) => num ** 2),
  take(2),
);

// subscribe to the Observable to get the data
squared$.subscribe({
  next: (num) => console.log(num),
  error: (err) => console.error(err),
  complete: () => console.info('complete'),
});

// create an Observable that emits a value every second
const timer$ = interval(1000);

// subscribe to the Observable and log the values
const subscription = timer$.subscribe((val) => console.log(val));

// cancel the subscription after 5 seconds
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
