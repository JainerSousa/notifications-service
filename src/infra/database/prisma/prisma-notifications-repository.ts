import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { Replace } from 'src/helpers/replace';
import { PrismaService } from '../prisma.service';
import {
  Notification,
  NotificationProps,
} from './../../../app/entities/notification';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    notification: Notification,
  ): Promise<Replace<NotificationProps, { content: string }>> {
    const notificationCreated = await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
      },
    });

    return notificationCreated;
  }
}
