class CustomError {

    static message(err: string) {
        return err ?? 'Ocorreu um erro inesperado, tente novamente.';
    }

}

export {CustomError};