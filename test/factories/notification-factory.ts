import { ObjectId } from 'bson';
import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('New friend request'),
    category: 'social',
    recipientId: new ObjectId().toString(),
    ...override,
  });
}
