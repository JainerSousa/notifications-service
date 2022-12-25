import { Notification, NotificationProps } from './../../entities/notification';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { Replace } from 'src/helpers/replace';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(
    notification: Notification,
  ): Promise<Replace<NotificationProps, { content: string }>> {
    this.notifications.push(notification);

    return {
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      createdAt: new Date(),
    };
  }
}
