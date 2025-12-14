import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { word } = await req.json();

    const wiktionaryUrl = `https://en.wiktionary.org/api/rest_v1/page/html/${encodeURIComponent(word)}`;
    const wiktionaryResponse = await fetch(wiktionaryUrl);

    if (wiktionaryResponse.ok) {
      const html = await wiktionaryResponse.text();
      const audioMatch = html.match(/href="(\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^"]*\.(?:mp3|ogg|opus))"/);  
      if (audioMatch && audioMatch[1]) {
        const audioUrl = "https:" + audioMatch[1];
        return new Response(
          JSON.stringify({ audioUrl }),
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    const dictionaryUrl = `https://api.dictionaryapi.dev/media/pronunciations/en/${word}.mp3`;
    const checkDictResponse = await fetch(dictionaryUrl, { method: "HEAD" });

    if (checkDictResponse.ok) {
      return new Response(
        JSON.stringify({ audioUrl: dictionaryUrl }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const merriam = `https://www.merriam-webster.com/media/audio/prons/en/us/mp3/${word[0]}/${word}.mp3`;
    return new Response(
      JSON.stringify({ audioUrl: merriam }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});