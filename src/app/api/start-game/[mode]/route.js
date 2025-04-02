
export async function GET(request, { params }) {
    const mode = (await params).mode;  

    // UNCOMMENT WHEN TESTING
    // const BASE_URL = process.env.NEXT_PUBLIC_GAME_API_BASE;      

    const categoryMap = {
      picture: 'classic-pictures',
    };
  
    const category = categoryMap[mode];
    const numberOfImages = 5;
  
    if (!category) {
      return new Response(JSON.stringify({ error: 'Invalid mode' }), { status: 400 });
    }
  
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
  