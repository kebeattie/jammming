const clientId = 'eb8ca22582be4f4b902ced6061756e1a';
const redirectUri = 'https://jammming-8c27.onrender.com';
let accessToken;

export default function getAccessToken() {

    if (accessToken) {
        return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
        return accessToken;
    } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public,user-read-email,&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
    }

};










