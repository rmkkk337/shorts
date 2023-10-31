// validate string as email, return true or false

export function isEmail(email: string): boolean 
{
  if (email.length == 0) 
  {
    return false;
  }
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}
