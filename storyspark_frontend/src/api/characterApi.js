//
// API utility for character-related operations using placeholder endpoints.
//
 
/**
 * Calls the character generation API endpoint with the given prompt.
 * Returns { characters: [{ name, description, avatarUrl }] } on success, throws error on failure.
 */
export async function generateCharacters(prompt) {
  // Note: In a real integration, swap the character generation logic and data as needed.
  try {
    // Placeholder for calling an API - for now, mimic 3 characters
    // Below could be replaced in the future with a real API call and parsing
    const fakeCharacters = [
      { name: "Alexia the Time-Traveler", description: "A quirky inventor with a futuristic backpack that lets her visit any era." },
      { name: "Bolt the Cyberfox", description: "A robotic fox with a lightning bolt tail; a quick-witted sidekick." },
      { name: "Luna, Guardian of Dreams", description: "A mystical hero who saves dreamers from their nightmares each night." }
    ];

    // Attach Dicebear bottts avatar SVG URLs to each character, using URI encoding
    const withAvatars = fakeCharacters.map((c) => ({
      ...c,
      avatarUrl: `https://avatars.dicebear.com/api/bottts/${encodeURIComponent(c.name)}.svg`
    }));

    // Simulate a network delay (remove for production)
    await new Promise((res) => setTimeout(res, 550));
    return { characters: withAvatars };
  } catch (error) {
    throw new Error(
      error.message
        ? `Character API Error: ${error.message}`
        : 'Character API Error'
    );
  }
}
