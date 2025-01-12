import './index.css';
import { useState } from 'react';
function App() {

  const [city, setCity] = useState(''); // Şehir bilgisi
  const handleInputChange = (e) => {
    setCity(e.target.value); //Input alanındaki değeri şehir bilgisi olarak set ediyoruz
  };

  const handleSearch = () => {
    console.log("Aranan şehir: ", city); // Şehir bilgisi konsola yazdırılıyor
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="input-container">
        <input type="text" placeholder="Şehir adını giriniz" value={city} onChange={handleInputChange} />
        <button onClick={handleSearch}>Arama</button>
      </div>
      <div className="weather-result">

      </div>
    </div>
  );
}

export default App;
