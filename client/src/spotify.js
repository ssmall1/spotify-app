const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');

  return accessToken;
};


// if (refreshToken) {
//   fetch(`/refresh_token?refresh_token=${refreshToken}`)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.error(err))
// }

export const accessToken = getAccessToken();