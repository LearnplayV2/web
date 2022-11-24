import { GroupQuery } from "@/components/dashboard/pages/groups/data";
import { service } from ".";
import { Session } from "../authentication";

export interface FetchGroups {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    totalItems: number;
    groups: Group[];
}

interface Group {
    uuid: string;
    title: string;
    description?: string;
    visibility: string;
    createdAt: string;
    updatedAt: string;
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
    static path = (page?: string) => '/group'.concat(page ?? '');
    
    static fetch(query: GroupQuery | null = null) {
        return service.get(
            this.path(),
            {
                params: query,
                headers: {
                    Authorization: 'Bearer '.concat(Session.token())
                }
            }
            );
            
        }    
        
        static add(props: ICreateGroup) {
            return service.post(this.path('/new'), props, {
                headers: {
                    Authorization: 'Bearer '.concat(Session.token())
                }
            });
        }
        
    }
    
    export {Groups};