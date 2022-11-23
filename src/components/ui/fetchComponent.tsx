class FetchStatus {
    public static readonly INITIAL = 'initial';
    public static readonly LOADING = 'loading';
    public static readonly ERROR = 'error';
    public static readonly SUCCESS = 'success';
}

interface Props extends React.PropsWithChildren {
    status: {
        error?: boolean;
        isLoading?: boolean;
    };
    onError: React.ReactNode;
    onLoading: React.ReactNode;
}

const FetchComponent = (props: Props) => {
    const { status, onError, onLoading, children } = props;

    console.log('FetchComponent status:', status);

    return (
        <>
            {
                status.isLoading
                ? (<>{onLoading}</>)
                : status.error
                    ? (<>{onError}</>) 
                    : (<>{children}</>)
            }
        </>
    );
}

export { FetchComponent, FetchStatus };