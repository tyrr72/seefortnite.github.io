const apiKey = ' 985c6af9-d4f0-44de-969a-e890d72700d3'; // Replace with your Fortnite API key
const apiUrl = 'https://api.fortniteapi.io/v1/stats?username=';

async function getPlayerStats() {
    const username = document.getElementById('epic-username').value;

    if (!username) {
        alert('Please enter a username');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const data = await response.json();

        if (data.error) {
            document.getElementById('player-stats').innerHTML = 'Player not found or invalid username';
            return;
        }

        displayStats(data);
    } catch (error) {
        console.error(error);
        document.getElementById('player-stats').innerHTML = 'An error occurred while fetching data';
    }
}

function displayStats(data) {
    const stats = data.stats;
    const statsHTML = `
        <h2>${data.username}'s Stats</h2>
        <p>Wins: ${stats.wins}</p>
        <p>Kills: ${stats.kills}</p>
        <p>Matches Played: ${stats.matches}</p>
        <p>K/D Ratio: ${stats.kd}</p>
    `;
    document.getElementById('player-stats').innerHTML = statsHTML;
}
