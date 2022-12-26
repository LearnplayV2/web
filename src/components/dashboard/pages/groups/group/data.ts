import { FetchStatus } from '@/class/fetchStatus';
import { Groups } from '@/service/groups/groups';
import { Dispatch } from 'redux';
import group from './store';
import postsStore from './components/posts/store';
import GroupPosts from '@/service/groups/groupPosts';

class Data {
    static get(groupId: string) {
        return async (dispatch: Dispatch) => {
            dispatch(group.actions.setStatus(FetchStatus.LOADING));
            try {
                const response = await Groups.fetchOne(groupId);
                dispatch(group.actions.setGroup({ data: response.data, status: FetchStatus.SUCCESS }));
            } catch (err: any) {
                dispatch(group.actions.setGroup({ data: err?.response?.data?.message ?? null, status: FetchStatus.ERROR }));
            }
        };
    }

    static getPosts(groupId: string) {
        return async (dispatch: Dispatch) => {
            try {
                const res = await GroupPosts.index(groupId);
                dispatch(postsStore.actions.setPosts(res.data));
            } catch (err: any) {
                console.log(err);
                dispatch(postsStore.actions.setMessage(err?.response?.data?.message ?? "Erro ao carregar posts."));
            }
        };
    }
}

export default Data;
