import { Replace } from 'src/helpers/replace';
import { Notification, NotificationProps } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(
    notification: Notification,
  ): Promise<Replace<NotificationProps, { content: string }>>;
}
