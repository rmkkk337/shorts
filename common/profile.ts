/**
 *
 * @param subscriptions List of accessed profile subscriptions
 * @param subscribers  List of accessed profile subscribers
 * @param currentId Curret account user ID
 * @returns String or null if its not needed to render badge
 */

export const followingState = (subscriptions: string[], subscribers: string[], currentId: string): string | null => 
{
  if (subscriptions.includes(currentId) && subscribers.includes(currentId)) 
  {
    return 'friends';
  }
  if (subscriptions.includes(currentId)) 
  {
    return 'following_you';
  }
  return null;
};
