import { TimeToJsDatePipe } from './time-to-js-date.pipe';

describe('TimeToJsDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TimeToJsDatePipe();
    expect(pipe).toBeTruthy();
  });
});
