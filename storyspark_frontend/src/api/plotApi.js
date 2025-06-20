//
// API utility for plot-related operations using real external endpoints (BoredAPI, JokeAPI).
//

/**
 * Gets a comic plot idea from BoredAPI.
 * Returns { result: string }
 */
async function getBoredApiPlot(prompt) {
  try {
    // BoredAPI ignores prompt, provides creative "activities".
    const res = await fetch("https://www.boredapi.com/api/activity/", { method: "GET" });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return { result: `💡 Comic Plot Idea (BoredAPI):\n\n${data.activity}` };
  } catch (e) {
    throw new Error(
      e.message
        ? `BoredAPI Error: ${e.message}`
        : "Failed to fetch from BoredAPI"
    );
  }
}

/**
 * Gets a comic plot idea from JokeAPI.
 * Returns { result: string }
 */
async function getJokeApiPlot(prompt) {
  try {
    // JokeAPI: returns either a single-part joke or a setup/delivery.
    const res = await fetch("https://v2.jokeapi.dev/joke/Any", { method: "GET" });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    let plot;
    if (data.type === "single") {
      plot = data.joke;
    } else {
      plot = `${data.setup}\n${data.delivery}`;
    }
    return { result: `😂 Comic Plot Idea (JokeAPI):\n\n${plot}` };
  } catch (e) {
    throw new Error(
      e.message
        ? `JokeAPI Error: ${e.message}`
        : "Failed to fetch from JokeAPI"
    );
  }
}

// PUBLIC_INTERFACE
/**
 * Generates a comic plot idea using a selected source.
 * @param {string} prompt - An optional prompt/theme from the user.
 * @param {Object} opts - { source: "boredapi"|"jokeapi"|"auto", autoSourceIndex: number }
 *    source: Which API to use ("boredapi", "jokeapi", or "auto")
 *    autoSourceIndex: Used for round-robin/rotation when source is "auto"
 * Returns { result: string }
 */
export async function generatePlot(prompt, opts = {}) {
  /**
   * Calls the selected plot idea source.
   * Returns { result: string } on success, throws error on failure.
   */
  const available = ["boredapi", "jokeapi"];
  // Default: auto (rotation)
  let source = opts && opts.source ? opts.source : "auto";
  let idx = opts && Number.isInteger(opts.autoSourceIndex) ? opts.autoSourceIndex : 0;

  if (source === "auto") {
    const chosen = available[idx % available.length];
    source = chosen;
  }

  try {
    if (source === "boredapi") {
      return await getBoredApiPlot(prompt);
    }
    if (source === "jokeapi") {
      return await getJokeApiPlot(prompt);
    }
    throw new Error("Invalid plot source specified.");
  } catch (error) {
    throw new Error(
      error.message
        ? `Plot Idea Error: ${error.message}`
        : 'Plot Idea Error'
    );
  }
}
