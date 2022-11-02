interface Props extends React.PropsWithChildren {
    condition: boolean;
}

const Case = (props: Props) => {
    const { condition, children } = props;
    
    if(condition) return <>{children}</>;

    return <></>;
}

export { Case };