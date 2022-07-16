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
}
