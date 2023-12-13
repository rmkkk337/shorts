/**
  @name CheckEmail if email is valid
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

/**
  @name Mention user
  @param {string} description - Takes description
  @returns {string} - Description with mention
*/

export function mention(description: string): string 
{
  const regex = /@(\w+)/g;
  return description.replace(regex, '<Link to="/profile/@$1>@$1</Link>');
}
