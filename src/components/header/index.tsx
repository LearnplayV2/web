import styles from './header.module.scss';
import { Session } from '../session';
import { UserService } from '../../service/user';
import { asyncComponent } from '../../utils/asyncComponent';

async function getUserItems() {
    const response = await UserService.items(Session().token!);
    return response.data;
}

const Component = () => {
    return (
        <div className={styles.header}>
            <span className="title">
                LearnPlay
                <span className={`${styles.fadeAnim} traced`}>_</span>
            </span>
            {Session().isAuthenticated && <Profile />}
        </div>
    );
};

const Profile = asyncComponent(async () => {
    const items = await getUserItems();
    
    return(
        <div className="profile-picture"                                                            >
            <img src={items?.photo ?? '/assets/default-avatar.jpg'} alt="profile-picture" />
        </div>
    );
})

export default Component;
