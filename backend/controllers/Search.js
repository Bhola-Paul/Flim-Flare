import main from "../services/aiService.js";

export const search = async (req, res) => {
    try {
        const { movies, prompt } = req.body;
        // console.log(prompt);
        const content = await main(
            `Given a JSON array of movie objects, where each object has 'id' (string), 'castNames' (array of strings), 'genres' (array of strings), and 'title' (string) properties, filter this array based on the following criteria and return an array of matching movie 'id's.

Criteria:
- **Genres**: If the prompt includes genre keywords (e.g., 'action', 'comedy', 'thriller'), filter for movies that include ALL specified genres.
- **Actor Names**: If the prompt includes actor names (e.g., 'Idris Elba', 'John Cena'), filter for movies where ANY of the specified actors are in 'castNames'.
- **Title**: If the prompt includes title keywords (e.g., 'Heads of State', 'Lilo & Stitch'), filter for movies where the 'title' contains ALL specified keywords (case-insensitive).

Combine these filters with an AND logic. Only movies that satisfy all present criteria should be included in the final output. If no specific criteria are provided, return all movie IDs.

Example JSON movie array:
[
  {
    \"id\": \"749170\",
    \"castNames\": [\"Idris Elba\", \"John Cena\", \"Priyanka Chopra Jonas\"],
    \"genres\": [\"Action\", \"Thriller\", \"Comedy\"],
    \"title\": \"Heads of State\"
  },
  {
    \"id\": \"552524\",
    \"castNames\": [\"Maia Kealoha\", \"Sydney Agudong\"],
    \"genres\": [\"Family\", \"Science Fiction\", \"Comedy\", \"Adventure\"],
    \"title\": \"Lilo & Stitch\"
  },
  {
    \"id\": \"1100988\",
    \"castNames\": [\"Alfie Williams\", \"Jodie Comer\", \"Aaron Taylor-Johnson\"],
    \"genres\": [\"Horror\", \"Thriller\", \"Science Fiction\"],
    \"title\": \"28 Years Later\"
  }
]
  Example prompt:
  "Action movie"

  Example output:["749170"]

  movielist : ${movies},
  user prompt: ${prompt}
  `
        );
        return res.json({
            success: true,
            content,
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}