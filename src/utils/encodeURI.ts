export default function EncodeURI(name: string) {
  let encode = name.toLowerCase();                                                         
  encode = encode.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
  encode = encode.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
  encode = encode.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
  encode = encode.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
  encode = encode.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
  encode = encode.replace(new RegExp('[Ç]','gi'), 'c');
  encode = encodeURIComponent(encode.replaceAll(' ', '_'));
  
  return encode;
}