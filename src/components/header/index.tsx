import styles from './header.module.scss';
import { Session } from '../session';
import { UserService } from '../../service/user';
import { asyncComponent } from '../../utils/asyncComponent';
import Link from 'next/link';

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
        <>  
            <div className="profile-menu">
                <Link href='/dashboard'>
                    Página Inicial
                </Link>
                <Link href='/dashboard/groups'>
                    Grupos
                </Link>
                <Link href='/dashboard/class'>
                    Aulas
                </Link>
                <Link href='/dashboard/subject'>
                    Temática
                </Link>
            </div>
            <div className='profile-links'>
                <div className="profile-picture" title="Meu perfil">
                    <Link href='/dashboard/profile'>
                        <img src={items?.photo ?? '/assets/default-avatar.jpg'} alt="profile-picture" />
                    </Link>
                </div>
            </div>
        </>
    );
})

export default Component;
