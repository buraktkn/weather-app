import './index.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function App() {


  const weatherDescription = {
    "clear sky": "Açık bir gökyüzü",
    "few clouds": "Az bulutlu",
    "scattered clouds": "Dağınık bulutlu",
    "broken clouds": "Parçalı bulutlu",
    "shower rain": "Sağanak yağış",
    "rain": "Yağmurlu",
    "thunderstorm": "Fırtına",
    "snow": "Karlı",
    "mist": "Sisli"
  }
  const [theme, setTheme] = useState('light');//Varsayılan Tema 'Light'
  const [city, setCity] = useState(''); // Şehir bilgisi
  const [weather, setWeather] = useState(null); // API'den gelen Hava durumu bilgisi
  const [error, setError] = useState(null); // Hata bilgisi
  const [loading, setLoading] = useState(false); // Yükleniyor bilgisi

  const API_KEY = '6b6a52a22d0c882171356d8706b1abd6'; // OpenWeather API key

  const fetchWeather = async () => {
    if (!city) {
      setError('Lütfen Bir Şehir Adı Giriniz');
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const response = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Şehir bulunamadı');
      }
      const data = await response.json();
      setWeather(data);
    }
    catch (error) {
      setWeather(null);
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  }
  const handleInputChange = (e) => {
    setCity(e.target.value); //Input alanındaki değeri şehir bilgisi olarak set ediyoruz
  };

  const handleSearch = () => {
    fetchWeather(); // Hava durumu bilgisi API'den çekiliyor
  };
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);//Yeni tema localStorage'de saklanıyor
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className=theme; //Tema değiştiğinde body'ye uygulanıyor
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <div className="theme-toggle" onClick={toggleTheme} style={{cursor: 'pointer', fontSize: '24px'}}>
        {theme === 'light' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
      </div>
      <h1>Weather App</h1>
      <div className="input-container">
        <input type="text" placeholder="Şehir adını giriniz" value={city} onChange={handleInputChange} />
        <button onClick={handleSearch}>Arama</button>
      </div>
      <div className="weather-result">
        {loading && <p>Yükleniyor...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {weather && (
          <div>
            <h3>{weather.name}</h3>
            <p>Sıcaklık: {Math.round(weather.main.temp)}°C</p>
            <p>Hava Durumu: {weatherDescription[weather.weather[0].description]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
