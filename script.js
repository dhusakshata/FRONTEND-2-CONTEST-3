

const gridTab = document.getElementById('gridTab');
const listTab = document.getElementById('listTab');
const gridViewContainer = document.getElementById('gridView');
const listViewContainer = document.getElementById('listView');

// Fetch data from the API
const fetchData = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// Display data in grid view
const displayGridData = (data) => {
    gridViewContainer.innerHTML = '';
    data.forEach(coin => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
       
        <div class="card-header">
       
        <div><img class="card-img" src="${coin.image}" alt="logo">
       
        </div>
        
        <div style="color:white;">${coin.symbol}
        <p class="Name">${coin.name}</p>
        </div>
        </div>
        
       <div></div>

        <p class="percentage-change" style="border-radius: 9px; padding:10px 8px;width: 80px;
        margin-top: 9px">${coin.price_change_percentage_24h.toFixed(2)}%</p>
            
           
            <p class="Total-Volume">Total Volume: ${coin.total_volume.toLocaleString()}</p>
            
            <p class="Market-Cap">Market Cap: $${coin.market_cap.toLocaleString()}</p>
           
        `;
        gridViewContainer.appendChild(card);
    });
};


// Display data in list view
const displayListData = (data) => {
    listViewContainer.innerHTML = `
        <table>
        <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            ${data.map(coin => `
                <tr>
                <td><img src="${coin.image}" alt="logo" width="50" height="50"></td>
                  
                <div> 
                <td>${coin.symbol}</td>
              
               </div>
                    <td>
                    <div class="percentage-change-container">
                        <span class="percentage-value">${coin.price_change_percentage_24h.toFixed(2)}%</span>
                    </div>
                
                </td>
                    <td>$${coin.current_price.toFixed(3)}</td>
                  
                    <td>$${coin.market_cap.toLocaleString()}</td>
                    
                </tr>
            `).join('')}
        </table>
    `;
};

// Event listeners for tab functionality
gridTab.addEventListener('click', async () => {
    gridTab.classList.add('active');
    listTab.classList.remove('active');
    const data = await fetchData();
    displayGridData(data);
    gridViewContainer.style.display = 'grid';
    listViewContainer.style.display = 'none';
});

listTab.addEventListener('click', async () => {
    listTab.classList.add('active');
    gridTab.classList.remove('active');
    const data = await fetchData();
    displayListData(data);
    gridViewContainer.style.display = 'none';
    listViewContainer.style.display = 'block';
});

// Initial loading
(async () => {
    const data = await fetchData();
    displayGridData(data);
})();