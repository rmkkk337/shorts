/*
  @name Check if email is valid
  @param {string} email - User email
  @returns {boolean} - True if email is valid, false otherwise
*/

export function isEmail(email: string): boolean 
{
  if (email.length == 0) 
  {
    return false;
  }
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}
