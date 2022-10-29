import styles from './header.module.scss';

const Component = () => {
    return (
        <div className={styles.header}>
            <span className="title">
                LearnPlay
                <span className={`${styles.fadeAnim} traced`}>_</span>
            </span>
        </div>
    );
};

export default Component;
