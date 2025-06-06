// This is a server-side route in Next.js that handles the start game request
// It fetches data from an external API based on the game mode and returns the response to the client.

export async function GET(request, { params }) {
  const mode = (await params).mode;  

  // UNCOMMENT WHEN TESTING
  const BASE_URL = process.env.NEXT_PUBLIC_GAME_API_BASE;      

  // list of game modes
  const categoryMap = {
    picture: 'classic-pictures',
  };

  // setting game details 
  const category = categoryMap[mode];
  const numberOfImages = 5;

  // return status 400 if game mode does not exist
  if (!category) {
    return new Response(JSON.stringify({ error: 'Invalid mode' }), { status: 400 });
  }

  // fetching game data from the external API
  try {
    const res = await fetch(
        `${BASE_URL}?category=${category}&numberOfImages=${numberOfImages}`, { 
            method: 'GET' 
        }
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'AWS fetch failed' }), {
        status: res.status,
      });
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
  