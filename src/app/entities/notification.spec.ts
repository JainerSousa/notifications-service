import { ObjectId } from 'bson';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      category: 'social',
      content: new Content('You received a new message!'),
      recipientId: new ObjectId().toString(),
    });

    expect(notification).toBeTruthy();
  });
});
