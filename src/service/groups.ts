import { useQuery } from "@tanstack/react-query";
import { service } from ".";
import { Session } from "../authentication";

export interface FetchGroups {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    totalItems: number;
    groups: any[]
}

export interface ICreateGroup {
    title: string;
    description: string;
    visibility: GroupVisibility;
}

export class GroupVisibility {
    static private = 'PRIVATE';
    static public = 'PUBLIC';
}

class Groups {
    static path = (page: string) => '/group/'.concat(page);

    static fetch(page?: string) {
        return useQuery({
            queryKey: ['groups'],
            queryFn: async () => {
                const {data} = await service.get(
                    this.path('page/' + (page ?? '1')),
                    {
                        headers: {
                            Authorization: 'Bearer '.concat(Session.token())
                        }
                    }
                );

                return data as FetchGroups;
            }
        });
    }    

    static add(props: ICreateGroup) {
        return service.post(this.path('new'), props, {
            headers: {
                Authorization: 'Bearer '.concat(Session.token())
            }
        });
    }

}

export {Groups};