import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Replace } from '@helpers/replace';
import { PrismaService } from '../../prisma.service';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    notification: Notification,
  ): Promise<Replace<NotificationProps, { content: string }>> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    const notificationCreated = await this.prismaService.notification.create({
      data: raw,
    });

    return notificationCreated;
  }
}
