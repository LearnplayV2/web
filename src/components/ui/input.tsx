'use client'

import styles from './input.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
    icon?: React.ReactNode;
    id: string;
}

const Input = (props: Props) => {
    const { icon, id } = props;

    return (
        <div className={styles.form_input}>
            <div className="icon-base">
                {icon && <label htmlFor={id}>{icon}</label>}
            </div>
            <input {...props} />
        </div>
    );
};

export { Input };
