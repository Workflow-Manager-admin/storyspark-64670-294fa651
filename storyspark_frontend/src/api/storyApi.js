//
// API utility for story-related operations: fetches summary from Wikipedia and creates a creative version.
//
 
/**
 * Fetches the plain summary for a given topic from Wikipedia.
 * @param {string} topic - Wikipedia topic/title (can be a phrase or single word)
 * @returns {Promise<{ summary: string, title: string }>}
 */
async function fetchWikipediaSummary(topic) {
  // Wikipedia REST API; spaces are replaced with underscores.
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    topic.trim().replace(/\s+/g, "_")
  )}`;
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) throw new Error("Wikipedia API error");
    const data = await res.json();
    if (data && data.extract) {
      return { summary: data.extract, title: data.title || topic };
    } else {
      throw new Error("No summary found for this topic.");
    }
  } catch (err) {
    throw new Error(
      err.message ? `Wikipedia Error: ${err.message}` : "Wikipedia fetch error"
    );
  }
}

/**
 * Simple creative transformation—imitate Kavia AI creativity.
 * @param {string} summary
 * @returns {string}
 */
function createCreativeStory(summary) {
  if (!summary || summary.length < 40) {
    // If the summary is very short, don't try to rewrite much
    return `🌈 Creative Glimpse: Once upon a time... ${summary}`;
  }
  // Example transformation: turn facts into a whimsical/fictional story.
  // This can be replaced with proper AI logic.
  return (
    "🌈 Creative Rewrite:\n\n" +
    summary
      .replace(
        /([^.?!]{10,}[\.\?!])/g,
        (sentence) =>
          // Add a playful prefix to each sentence
          "✨ " +
          sentence
            .replace(/was/g, "became")
            .replace(/is/g, "magically transforms into")
            .replace(/are/g, "suddenly appear as")
      )
      .replace(/\([\s\S]*?\)/g, "") + // Remove parentheses content for magic effect
    "\n\n(Told in the spirit of wondrous tales!)"
  );
}

// PUBLIC_INTERFACE
/**
 * Generates a story using Wikipedia summary and a playful rewrite.
 * @param {string} prompt - Topic or phrase
 * @returns {Promise<{ summary: string, creativeStory: string, title: string }>}
 */
export async function generateStory(prompt) {
  try {
    const { summary, title } = await fetchWikipediaSummary(prompt);
    const creativeStory = createCreativeStory(summary);
    return { summary, creativeStory, title };
  } catch (error) {
    throw new Error(
      error.message
        ? `Story API Error: ${error.message}`
        : "Story API Error"
    );
  }
}
