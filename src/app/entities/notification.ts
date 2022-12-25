import { ObjectId } from 'bson';
import { Replace } from './../../helpers/replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = new ObjectId().toString();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  set recipientId(value: string) {
    this.recipientId = value;
  }

  get recipientId(): string {
    return this.props.recipientId;
  }

  set content(value: Content) {
    this.content = value;
  }

  get content(): Content {
    return this.props.content;
  }

  set category(value: string) {
    this.category = value;
  }

  get category(): string {
    return this.props.category;
  }

  set readAt(value: Date | null | undefined) {
    this.readAt = value;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }
}
