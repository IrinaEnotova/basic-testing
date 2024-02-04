// Uncomment the code below and write your tests

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const relativePath = 'todos';
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve('response'));
  });

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    expect(axiosSpy).not.toBeCalled();

    await throttledGetDataFromApi(relativePath);

    expect(axiosSpy).toBeCalledTimes(1);
    expect(axiosSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.spyOn(axios.create(), 'get');
    expect(getSpy).not.toBeCalled();

    await throttledGetDataFromApi(relativePath);

    expect(getSpy).toBeCalledTimes(1);
    expect(getSpy).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const getMock = jest.fn(async () => ({ data: 'response' }));
    mockedAxios.create.mockReturnValue({ get: getMock } as never);

    const response = await throttledGetDataFromApi(relativePath);

    expect(response).toBe('response');
  });
});
