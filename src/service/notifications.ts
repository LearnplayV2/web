import { useQuery } from "@tanstack/react-query";
import { service } from ".";
import { Session } from "../authentication";

interface NotificationsData {
    id: number,
    description?: string,
    read: boolean;
    createdAt: string;
    updatedAt: string;
    title:  string;
    userId: string;
}

class Notifications {

    static initialPath = '/user/notifications';
    static path = (id: string) => '/user/notification/'.concat(id);

    static get() {
        const token = Session.token();
        return useQuery({
            queryKey: ['notifications'],
            queryFn: async () => {
                const {data} = await service.get(
                    this.initialPath,
                    {
                        headers: {
                            Authorization: 'Bearer '.concat(token)
                        }
                    }
                );

                return data as NotificationsData[];
            }
        });
    }
    
}

export {Notifications};