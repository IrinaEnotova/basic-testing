// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 'text', true]);

    expect(linkedList).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: true,
        },
        value: 'text',
      },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([[], {}, null]);
    const snapshot = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: null,
        },
        value: {},
      },
      value: [],
    };

    expect(linkedList).toMatchSnapshot(snapshot);
  });
});
