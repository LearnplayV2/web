class Media {
  static toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  static getBase64MimeType(data: string) {
    const mimeType = data.substring(data.indexOf(":")+1, data.indexOf(";"));
    
    return mimeType;
  }

}

export default Media;