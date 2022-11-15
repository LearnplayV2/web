import { useQuery } from "@tanstack/react-query";
import { service } from ".";
import { Session } from "../authentication";

class Groups {

    static path = (page: string) => '/group/page/'.concat(page);

    static fetch(page?: string) {
        interface Data {
            groups: any[];
        }
        
        const token = Session.token();
        return useQuery({
            queryKey: ['groups'],
            queryFn: async () => {
                const {data} = await service.get(
                    this.path(page ?? '1'),
                    {
                        headers: {
                            Authorization: 'Bearer '.concat(token)
                        }
                    }
                );

                return data as Data[];
            }
        });
    }    

}

export {Groups};