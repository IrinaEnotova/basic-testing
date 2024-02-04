// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const testCallback = () => {
      console.log('stuff by timeout');
    };

    doStuffByTimeout(testCallback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(testCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const testCallback = () => {
      console.log('stuff by timeout');
    };

    doStuffByInterval(testCallback, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(testCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const testCallback = jest.fn();
    doStuffByInterval(testCallback, 1000);
    expect(testCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5000);

    expect(testCallback).toHaveBeenCalled();
    expect(testCallback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    const pathToFile = 'some.txt';

    expect(path.join).toHaveBeenCalledTimes(0);

    readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledTimes(1);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'doesnt_exist.txt';

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe('111');
  });
});
