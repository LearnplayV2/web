class Attachments {

  static paths = {
    groupPosts: '/group/posts/'
  };

  static fileType = {
    image: 'image',
    audio: 'audio',
    document: 'document'
  };

  static url(file: string, from: string) {
    return `${import.meta.env.VITE_SERVER}/api/public/attachments`.concat(from).concat(file);
  }
  
}

export default Attachments;