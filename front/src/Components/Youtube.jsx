import React, { useState } from 'react';
import './Youtube.css';
import Navigation from './Navigation';

const YouTube = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      setLoading(true);

      // Simulacija učitavanja podataka sa YouTube API
      setTimeout(() => {
        const simulatedVideos = [
          {
            id: { videoId: '1' },
            snippet: {
              title: 'Simulirani video 1',
              description: 'Ovo je opis simuliranog videa.',
              thumbnails: { medium: { url: 'https://via.placeholder.com/480x360' } },
            },
          },
          {
            id: { videoId: '2' },
            snippet: {
              title: 'Simulirani video 2',
              description: 'Ovo je opis simuliranog videa.',
              thumbnails: { medium: { url: 'https://via.placeholder.com/480x360' } },
            },
          },
          {
            id: { videoId: '3' },
            snippet: {
              title: 'Simulirani video 3',
              description: 'Ovo je opis simuliranog videa.',
              thumbnails: { medium: { url: 'https://via.placeholder.com/480x360' } },
            },
          },
        ];
        setVideos(simulatedVideos);
        setLoading(false);
      }, 2000); // Simulacija kašnjenja od 2 sekunde
    }
  };

  return (
    <>
        <Navigation/>
        <div className="youtube-page">
        <h1>YouTube Pretraga</h1>

        {/* SearchBar */}
        <form onSubmit={handleSearch} className="searchbar-container">
            <input
            type="text"
            placeholder="Pretraži YouTube..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="searchbar-input"
            />
            <button type="submit" className="searchbar-button">Pretraži</button>
        </form>

        {/* Video Results */}
        <div className="video-results">
            {loading ? (
            // Placeholder kartice dok se čekaju rezultati
            [1, 2, 3].map((_, index) => (
                <div key={index} className="placeholder-card">
                <div className="placeholder-thumbnail"></div>
                <div className="placeholder-title"></div>
                <div className="placeholder-description"></div>
                </div>
            ))
            ) : (
            videos.map((video) => (
                <div key={video.id.videoId} className="video-card">
                <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                    <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="video-thumbnail"
                    />
                    <h3 className="video-title">{video.snippet.title}</h3>
                    <p className="video-description">{video.snippet.description}</p>
                </a>
                </div>
            ))
            )}
        </div>
        </div>
    </>
    
  );
};

export default YouTube;
