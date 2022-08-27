import styles from '../../../styles/loading.module.css';

export function LoadingSpinner({size, darkMode = false}: {size: number, darkMode?: boolean}) {
    return(
        <div 
            className={styles.spinner} 
            style={{
                width: `${size}px`, height: `${size}px`,
                borderRightColor: darkMode ? '#0000006a' : 'rgba(255, 255, 255, 0.404)',
                borderLeftColor: darkMode ? '#0000006a' : 'rgba(255, 255, 255, 0.404)',
                borderBottomColor: darkMode ? '#0000006a' : 'rgba(255, 255, 255, 0.404)',
                borderTopColor: darkMode ? '#000' : '#fff',
            }}
        ></div>
    );
}

export function LoadingPulse({size, darkMode = false} : {size: number, darkMode?: boolean}) {
    return(
        <>
            <div 
                className={styles.pulse} 
                style={{
                    width: `${size}px`, height: `${size}px`,
                    background: darkMode ? 'rgba(0, 0, 0, 0.712)' : 'rgba(255, 255, 255, 0.712)'
                }}
            ></div>
        </>
    );
}