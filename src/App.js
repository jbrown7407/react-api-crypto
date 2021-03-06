
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';// 
// import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <h1> CryptoSats Tracker </h1>
      <br></br>
      <div className='coin-search'>
        <h2 className='coin-text'>Search a currency</h2>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>


      <div className='coin-row'>
        <div className='coin'>
       
          <h1>Name</h1>
          <p className='coin-symbol'>Symbol</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>Price</p>
          <p className='coin-ath'>ATH</p>
          <p className='coin-volume'>Volume</p>

            <p className='coin-percent green'>24 Hr%</p>
         
  
          <p className='coin-marketcap'>
            Market Cap
          </p>
        </div>
      </div>

      
      {filteredCoins.map(coin => {
        return (
          <div>
         
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            ath={coin.ath}
          />
          </div>
        );
      })}
    </div>
  );
}

export default App;