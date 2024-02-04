// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 150, b: 50, action: Action.Subtract, expected: 100 },
  { a: 1000, b: 800, action: Action.Subtract, expected: 200 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },

  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 15, b: 2, action: Action.Multiply, expected: 30 },
  { a: 1000, b: 50, action: Action.Multiply, expected: 50000 },

  { a: 500, b: 2, action: Action.Divide, expected: 250 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 400, b: 200, action: Action.Divide, expected: 2 },

  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 10, b: 4, action: Action.Exponentiate, expected: 10000 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },

  { a: true, b: 2, action: Action.Add, expected: null },
  { a: 'a', b: '1', action: Action.Divide, expected: null },
  { a: { a: 1 }, b: 2, action: Action.Exponentiate, expected: null },

  { a: 3, b: 2, action: 'add', expected: null },
  { a: 3, b: 2, action: '&', expected: null },
  { a: 3, b: 2, action: '?', expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should check the operations of the calculator',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
