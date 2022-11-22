interface Props extends React.PropsWithChildren {
    condition: boolean;
    elseIf?: React.ReactNode;
}

const Case = (props: Props) => {
    const { condition, children, elseIf: elseChildren } = props;

    return (
        <>
            {condition 
                ? typeof elseChildren != 'undefined' ? <>{elseChildren}</> : <>{children}</> 
                : null
            }
        </>
    );
}

export { Case };