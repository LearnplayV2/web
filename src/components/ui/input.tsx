import { Case } from "./conditional";

interface Props extends React.HTMLProps<HTMLInputElement> {
    icon?: React.ReactNode;
}

const TextInput = (props: Props) => {
    const { type, name, autoFocus, icon } = props;

    return(
        <div className={`input ${name}`}>
            <Case condition={icon != undefined}>
                <label htmlFor={name}>{icon}</label>
            </Case>
            <input type={type} name={name} id={name} autoFocus={autoFocus} {...props} />
        </div>
    );
};

export {TextInput};