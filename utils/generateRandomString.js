export default generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random()* possible.length));
  }
  return text;
};
