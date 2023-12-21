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
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
  @name - Mention user
  @param {string} description - Takes description
  @returns {string} - Description with mention
*/

export function mention(description: string): string 
{
  const regex = /@(\w+)/g;
  return description.replace(regex, '<Link to="/profile/@$1>@$1</Link>');
}

/**
 *
 * @param input Takes username input
 * @returns Whether username is valid or not
 */

export function isValidString(input: string): boolean 
{
  if (input == '') return true;
  let pattern = /^[a-zA-Z0-9]+$/;
  return pattern.test(input);
}

export function replaceUid(chat: string, uid: string): string 
{
  return chat.replace(uid, '').replace(':', '');
}
