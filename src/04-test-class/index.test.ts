// Uncomment the code below and write your tests
import lodash from 'lodash';

import { SynchronizationFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => {
      bankAccount.withdraw(2000);
    }).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const myBankAccount = getBankAccount(initialBalance);
    const otherBankAccount = getBankAccount(initialBalance);
    expect(() => {
      myBankAccount.transfer(2000, otherBankAccount);
    }).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => {
      bankAccount.transfer(1000, bankAccount);
    }).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(1999);
    expect(bankAccount.getBalance()).toBe(2999);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(999);
    expect(bankAccount.getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const myBankAccount = getBankAccount(initialBalance);
    const otherBankAccount = getBankAccount(initialBalance);
    myBankAccount.transfer(999, otherBankAccount);
    expect(myBankAccount.getBalance()).toBe(1);
    expect(otherBankAccount.getBalance()).toBe(1999);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    lodash.random = jest.fn(() => 10);
    await expect(bankAccount.fetchBalance()).resolves.toBe(10);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    lodash.random = jest.fn(() => 10);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    lodash.random = jest.fn(() => 0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
