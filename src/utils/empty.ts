function empty(data: any) {
  data = data.trim();
  return typeof data == 'undefined' || data == null || data == '';
}

export {empty};