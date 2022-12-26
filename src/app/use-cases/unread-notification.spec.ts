import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';
import { SendNotification } from './send-notification';
import { ReadNotification } from './read-notification';

describe('Unread Notification', () => {
  it('should unread the notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const sendNotification = new SendNotification(notificationsRepository);
    const readNotification = new ReadNotification(notificationsRepository);
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'A new notification',
      category: 'social',
      recipientId: 'recipient-id',
    });

    await readNotification.execute({ notificationId: notification.id });

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
