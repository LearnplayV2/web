export interface NotificationProps {
    id?: number;
    userId?: string;
    title?: string;
    description?: NotificationDescription;
    read?: boolean;
}

export interface NotificationDescription {
    body?: string;
    type?: NotitificationTypeEnum;
    data?: Array<String>;
}

export enum NotitificationTypeEnum {
    user_profile_visit = 'user.profile.visit',
    content = 'content'
}

export function NotificationDescription(notification: NotificationProps | any) : NotificationDescription {
    const notificationDescriptionParsed = JSON.parse(notification.description!.toString());

    return {
        body: notificationDescriptionParsed.body,
        data: notificationDescriptionParsed.data,
        type: notificationDescriptionParsed.type,
    };
}