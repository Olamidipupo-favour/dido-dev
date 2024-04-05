document.addEventListener("DOMContentLoaded", function () {
  $(function () {
    $(".menu-bar").on("click", function () {
      // Toggle the right position based on its current value
      $(".side-info").css("right", "0%");
    });

    // Event listener for the button with class 'side-info-close'
    $(".side-info-close").on("click", function () {
      // Remove the right position style
      $(".side-info").css("right", "");
    });
  });
});

document.addEventListener('DOMContentLoaded', async function() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  let address = accounts[0];
  console.log('Connected to MetaMask with address:', address);
  sessionStorage.setItem('account', accounts[0]);
  if(address){
    document.getElementById('wallet_').innerHTML = ' <i class="fab fa-ethereum px-2"></i>' + address.slice(0, 6) + '...' + address.slice(38, 42);
    document.getElementById('mwallet_').innerHTML = ' <i class="fab fa-ethereum px-2"></i>' + address.slice(0, 6) + '...' + address.slice(38, 42);
  } else {
    alert('Connect to metamask');
  }
});

async function connectWallet() {
  console.log('checkk2')
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is not installed');
    return;
  }

  try {
  
    // Request access to the user's MetaMask account
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    let address = accounts[0];
    console.log('Connected to MetaMask with address:', address);
sessionStorage.setItem('account', accounts[0]);
    document.getElementById('wallet_').innerHTML = ' <i class="fab fa-ethereum px-2"></i>' + address.slice(0, 6) + '...' + address.slice(38, 42);
    document.getElementById('mwallet_').innerHTML = ' <i class="fab fa-ethereum px-2"></i>' + address.slice(0, 6) + '...' + address.slice(38, 42);


    
    // Add Op sepolia test network
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: 11155420,
          chainName: 'Optimism Sepolia',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ['https://sepolia.optimism.io'],
          blockExplorerUrls: ['https://optimism-sepolia.blockscout.com'],
        },
      ],
    });

    

    console.log('Op sepolia Test Network added to MetaMask');
  } catch (error) {
    console.error('Error connecting to MetaMask or adding test network:', error);
  }
}

function getAddress() {
  var data = sessionStorage.getItem('account');
console.log(data); // 
}
