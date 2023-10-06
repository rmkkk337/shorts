'use server';

import { LOG, LOG_LEVEL } from 'another-colored-logger';

export type UserCredentials = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export const RegisterUser = (props: UserCredentials) => {
  LOG(LOG_LEVEL.INFO, `Registering user, passwords: ${props.password} ${props.confirm_password}`);
  if (props.password !== props.confirm_password) {
    LOG(LOG_LEVEL.ERROR, 'Passwords do not match');
    return;
  }
};
