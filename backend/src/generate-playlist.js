const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

var redirect_uri = 'http://localhost:3000/auth/callback'; // redirect uri

export const getRecommendations = async (minutes, req) => {
    const currentHour = new Date().getHours();
    
    let danceability = 0.2;
    if (currentHour >= 12 && currentHour < 24) {
        danceability = (currentHour - 12) / 12;
    }

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

    const valence = 0.7;

    const numSongs = Math.ceil(minutes / 3.5);

    const queryParams = new URLSearchParams({
        seed_danceability: danceability,
        seed_energy: energy,
        seed_valence: valence,
        limit: numSongs.toString()
    });

    const url = `https://api.spotify.com/v1/recommendations?${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.session.tokens.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        const recommendations = await response.json();
        return recommendations;
    } catch (error) {
        console.log(error);
        return null;
    }
};
