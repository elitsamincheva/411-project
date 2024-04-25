// Retrieve client ID and client secret from environment variables
const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

// Define the redirect URI for authentication callback
var redirect_uri = 'http://localhost:3000/auth/callback'; // redirect uri

const getTopArtist = async (req) => {
    try {

        // Fetch recommendations from the Spotify API
        const response = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=1", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.session.tokens.access_token}`, // Include the user's access token for authorization
                'Content-Type': 'application/json'
            }
        });
        console.log("RESPONSE", response);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch top tracks');
        }
        
        // Parse the response as JSON and return the recommendations
        const top_artist = await response.json();
        return top_artist.items[0].id;
    } catch (error) {
        // Log any errors that occur during the fetch request and return null
        console.log(error);
        return null;
    }
}

const createNewPlaylist = async (tracks, recipeName, req) => {
    try {
        // Fetch recommendations from the Spotify API
        const response = await fetch(`https://api.spotify.com/v1/users/${req.session.user.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${req.session.tokens.access_token}`, // Include the user's access token for authorization
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: recipeName, description: `tunes for making ${recipeName}`, public: false })
        });
        

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to create playlist');
        }
        
        // Parse the response as JSON and return the recommendations
        const playlist = await response.json();
        const uris = tracks.map((song) => song.uri );
        console.log("URIS!!!!!!!", uris);
        
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${req.session.tokens.access_token}`, // Include the user's access token for authorization
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris })
        });

        console.log("HERE!!!!!!!!!" , addTracksResponse);
        if (!addTracksResponse.ok) {
            throw new Error('Failed to add tracks');
        } 

        return playlist;


    } catch (error) {
        // Log any errors that occur during the fetch request and return null
        console.log(error);
        return null;
    }
}

// Function to fetch music recommendations based on user preferences
export const getRecommendations = async (minutes, recipeName, req) => {
    // Get the current hour of the day
    const currentHour = new Date().getHours();
    
    // Determine danceability based on the time of day
    let danceability = 0.2;
    if (currentHour >= 12 && currentHour < 24) {
        danceability = (currentHour - 12) / 12;
    }

    // Determine energy based on the time of day
    let energy = 0.5;
    if (currentHour >= 0 && currentHour < 11) {
        energy = 0.3;
    } else if (currentHour >= 11 && currentHour < 15) {
        energy = 0.7;
    } else if (currentHour >= 15 && currentHour < 18) {
        energy = 0.5;
    } else if (currentHour >= 18 && currentHour < 19) {
        energy = 0.6;
    } else if (currentHour >= 19 && currentHour < 24) {
        energy = 0.8;
    }

    // Set valence (mood) for the recommendations
    const valence = 0.7;

    // Calculate the number of songs based on the provided duration
    const numSongs = Math.ceil(minutes / 3.5);
    const top_artist = await getTopArtist(req);

    // Construct query parameters for the Spotify API request
    const queryParams = new URLSearchParams({
        seed_artists: top_artist,
        target_danceability: danceability,
        target_energy: energy,
        target_valence: valence,
        limit: numSongs.toString()
    
    });

    // Construct the URL for the Spotify recommendations API
    const url = `https://api.spotify.com/v1/recommendations?${queryParams.toString()}`;
    console.log("REC URL IS NOW: ", url);

    try {
        // Fetch recommendations from the Spotify API
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.session.tokens.access_token}`, // Include the user's access token for authorization
                'Content-Type': 'application/json'
            }
        });
        

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        // Parse the response as JSON and return the recommendations
        const recommendations = await response.json();
        const created_playlist = await createNewPlaylist(recommendations.tracks, recipeName, req);
        return created_playlist;

    } catch (error) {
        // Log any errors that occur during the fetch request and return null
        console.log(error);
        return null;
    }
};
