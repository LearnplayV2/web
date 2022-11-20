function isEmpty(text?: string) {
    return typeof text == 'undefined' || text === '' || text == null || text.length === 0;
}

export { isEmpty };