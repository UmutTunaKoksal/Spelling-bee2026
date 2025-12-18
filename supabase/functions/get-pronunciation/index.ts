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

    const audioUrl = `https://api.dictionaryapi.dev/media/pronunciations/en/${word}.mp3`;

    const checkResponse = await fetch(audioUrl, { method: "HEAD" });

    if (checkResponse.ok) {
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

    const fallbackUrl = `https://www.merriam-webster.com/media/audio/prons/en/us/mp3/${word[0]}/${word}.mp3`;
    return new Response(
      JSON.stringify({ audioUrl: fallbackUrl }),
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