import axios from 'axios';
import { HOST_DNS } from '../lib/conf';
import { Account } from '@/types/Account';

export const followUser = (id: string): Promise<boolean> => 
{
  return new Promise((resolve, reject) => 
  {
    axios
      .get(`${HOST_DNS}:3001/user/${id}/follow`, {
        withCredentials: true,
      })
      .then(() => 
      {
        setTimeout(async () => 
        {
          resolve(true);
        }, 200);
      })
      .catch((err) => 
      {
        reject(err);
      });
  });
};

export const login = (email: string, password: string): Promise<Account> => 
{
  return new Promise((resolve, reject) => 
  {
    axios
      .post(
        `${HOST_DNS}:3001/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => 
      {
        if (response.data.status === 200) 
        {
          axios.get(`${HOST_DNS}:3001/user/`, { withCredentials: true }).then((response) => 
          {
            resolve(response.data.data);
          });
        }
      })
      .catch((error) => 
      {
        if (error.response.data.data.error === 'Incorrect password') 
        {
          reject('Incorrect password');
        }
        else if (error.response.data.data.error === 'User doesn`t exist') 
        {
          reject("User doesn't exist");
        }
      });
  });
};

/**
 * @param {string} email - Takes email, unique
 * @param {string} username - Takes username, unique
 * @param {string} password - Takes password
 */

export const register = (email: string, username: string, password: string): Promise<string> => 
{
  return new Promise((resolve, reject) => 
  {
    axios
      .post(
        `${HOST_DNS}:3001/auth/registration`,
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(() => 
      {
        axios.post(
          `${HOST_DNS}:3001/auth/login`,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        resolve('Success');
      })
      .catch((error) => 
      {
        reject(error.response.data.data.error);
      });
  });
};

/**
 *
 * @param id Requested page userID
 * @param accountID Current account userID
 * @param accountUsername Current account username
 * @returns True if requested page is not current account page, false otherwise
 */

export const isNotOwnPage = (id: string, accountID: string | undefined, accountUsername: string | undefined): boolean => 
{
  if (accountID === undefined || accountUsername === undefined) 
  {
    return true;
  }
  if (id.charAt(0) === '%' || id.charAt(0) === '@') 
  {
    return accountUsername !== decodeURI(id.split('%40')[1]);
  }
  return accountID !== id;
};

/**
 *
 * @param id Requested userID
 * @returns Account object
 */

export const getUser = (id?: string): Promise<Account> => 
{
  return new Promise((resolve, reject) => 
  {
    axios
      .get(`${HOST_DNS}:3001/user/${id ? id : null}`, {
        withCredentials: true,
      })
      .then((response) => 
      {
        resolve(response.data.data);
      })
      .catch((error) => reject(error));
  });
};
