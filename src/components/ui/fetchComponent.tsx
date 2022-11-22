class FetchStatus {
    public static readonly INITIAL = 'initial';
    public static readonly LOADING = 'loading';
    public static readonly ERROR = 'error';
    public static readonly SUCCESS = 'success';
}

interface Props extends React.PropsWithChildren {
    status: FetchStatus;
    onError: React.ReactNode;
    onLoading: React.ReactNode;
}

const FetchComponent = (props: Props) => {
    const { status, onError, onLoading, children } = props;

    return (
        <>
            {
                status == FetchStatus.LOADING
                ? (<>{onLoading}</>)
                : status == FetchStatus.ERROR 
                    ? (<>{onError}</>) 
                    : (<>{children}</>)
            }
        </>
    );
}

export { FetchComponent, FetchStatus };