import crypto from 'crypto';
import { URLSearchParams } from 'url';

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

var redirect_uri = 'http://localhost:3000/auth/callback'; // redirect uri


const generateRandomString = (length) => {
    return crypto
        .randomBytes(60)
        .toString('hex')
        .slice(0, length);
}


var stateKey = 'spotify_auth_state';


export const login = async (req, res) => {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            show_dialog: true,
            state: state
        }).toString());
};

export const authCallback = async (req, res) => {

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        try {
            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
                },
                body: new URLSearchParams({
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                })
            });

            if (tokenResponse.ok) {
                req.session.tokens = await tokenResponse.json();
                await req.session.save();
                console.log("get token", req.session);
                console.log(req.session.id);
                res.redirect('http://localhost:3001/')
            } else {
                res.redirect('/#' +
                    new URLSearchParams({
                        error: 'invalid_token'
                    }).toString());
            }
        } catch (error) {
            console.log(error);
            res.redirect('/#' +
                new URLSearchParams({
                    error: 'invalid_token'
                }).toString());
        }
    }
};

// export const refreshToken = async (req, res) => {

//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//     },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token,
//         refresh_token = body.refresh_token;
//       res.send({
//         'access_token': access_token,
//         'refresh_token': refresh_token
//       });
//     }
//   });
// };

export const getUserInfo = async (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user);
    } else if (req.session.tokens?.access_token) {
        try {
            let userResponse = await fetch('https://api.spotify.com/v1/me', {
                headers: { 'Authorization': `${req.session.tokens.token_type} ${req.session.tokens.access_token}` }
            });
            if (userResponse.ok) {
                req.session.user = await userResponse.json();
                await req.session.save();
                return res.json(req.session.user);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
};

export const searchSpotify = async (req, res) => {
    if (req.session.tokens?.access_token) {
        try {
            const url = new URL('https://api.spotify.com/v1/search');
            url.search = new URLSearchParams({
                q: req.query.q,
                type: 'playlist',
                limit: 5
            }).toString();
            let searchResponse = await fetch(url, {
                headers: { 'Authorization': `${req.session.tokens.token_type} ${req.session.tokens.access_token}` }
            });
            if (searchResponse.ok) {
                return await searchResponse.json()
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}