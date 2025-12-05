import axios from "axios";

const translateText = async (text, sourceLang, targetLang) => {
  try {
    const res = await axios.get(
      "https://translate.googleapis.com/translate_a/single",
      {
        params: {
          client: "gtx",
          sl: sourceLang,
          tl: targetLang,
          dt: "t",
          q: text
        }
      }
    );

    // Google returns nested arrays → extract translated text
    // For paragraphs/multi-sentence responses the API returns multiple segments
    // at res.data[0], so join them all rather than returning only the first.
    if (res && res.data && Array.isArray(res.data[0])) {
      const segments = res.data[0];
      // The API can return segments in slightly different shapes; preserve any
      // string segments (emojis or standalone tokens) and array segments.
      const translated = segments
        .map((seg) => {
          if (typeof seg === "string") return seg;
          if (Array.isArray(seg) && seg.length > 0) return seg[0] || "";
          return "";
        })
        .join("");
      return translated;
    }

    // Fallback to previous single-segment extraction
    return (res && res.data && res.data[0] && res.data[0][0]) || "";
  } catch (error) {
    console.error("Translation Error:", error);
    return "Translation failed.";
  }
};

export default translateText;