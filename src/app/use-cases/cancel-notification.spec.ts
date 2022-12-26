import { ObjectId } from 'bson';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { InMemoryNotificationsRepository } from '../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { SendNotification } from './send-notification';

describe('Cancel Notification', () => {
  it('should cancel the notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const sendNotification = new SendNotification(notificationsRepository);
    const cancelNotification = new CancelNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'A new notification',
      category: 'social',
      recipientId: new ObjectId().toString(),
    });

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: new ObjectId().toString(),
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
