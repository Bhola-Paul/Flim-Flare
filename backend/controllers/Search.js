import main from "../services/aiService.js";

export const search = async (req, res) => {
    try {
        const { movies, prompt } = req.body;
        // console.log(prompt);
        const content = await main(
            `Recommand some movies based on user prompt ${prompt}. Just names published year in bracket separated by commas. Nothing else is required.`
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