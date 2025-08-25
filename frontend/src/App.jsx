import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://shorturl-qz82.onrender.com/api/shorten", {
        originalUrl: longUrl,
      });
      setShortUrl(data.shortUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">🔗 URL Shortener</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="input"
          />
          <button type="submit" className="btn">Shorten</button>
        </form>

        {shortUrl && (
          <div className="result">
            <p>
              ✅ Short URL:{" "}
              <a href={shortUrl} target="_blank" rel="noreferrer" className="link">
                {shortUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
