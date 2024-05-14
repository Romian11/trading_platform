
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7F1gX1IMQFGdwyAMgvYQdYkzvM-23iqM",
  authDomain: "stockdb-e21ae.firebaseapp.com",
  databaseURL: "https://stockdb-e21ae-default-rtdb.firebaseio.com",
  projectId: "stockdb-e21ae",
  storageBucket: "stockdb-e21ae.appspot.com",
  messagingSenderId: "192738892506",
  appId: "1:192738892506:web:f7d2490dcf2c4a851863e3",
  measurementId: "G-44FR8QNQQP"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

window.onload = function() {
    var user = localStorage.getItem("login_info");
   
    if (user == null) {
      alert("Please login first");
    } 
    else {

        const user = JSON.parse(localStorage.getItem("login_info"));
        const email = user.email;
        const sanitizedEmail = email.replace(".", "_");
        const referencePath = "users/" + sanitizedEmail;
        const userRef = ref(db, referencePath);
        
        const name = document.getElementById('name');
        const age = document.getElementById('age');
        const balance = document.getElementById('balance');
        const p_no = document.getElementById('P_no');
        const mail = document.getElementById('E_mail');

         


        get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const currBalance = userData.curr_balance;
            const starting_bal = parseFloat(userData.starting_bal).toFixed(2);
            const user_age = parseFloat(userData.age)
            const user_name =(userData.name)
            const  Phonenumber=(userData.pno)
            const  userEmail=(userData.email)
            
            balance.innerText = currBalance.toFixed(2)
            age.innerText = user_age
            name.innerText = user_name
            p_no.innerText = Phonenumber;
            mail.innerText = userEmail
        }
    })

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const holdings = userData.holding;
    
        const portfolioContainer = document.getElementById("portfolioContainer");
    
        for (const holding in holdings) {
          const asset = holding;
          console.log(asset);
          const quantity = holdings[holding].qty.toFixed(3);
          const averagePrice = holdings[holding].avg_price.toFixed(3);
    
          // Create a new div element for the portfolio card
          const portfolioCard = document.createElement("div");
          portfolioCard.classList.add("portfolio");
    
          const tradingViewContainer = document.createElement("div");
          tradingViewContainer.classList.add("icon");
    
          const tradingViewWidgetContainer = document.createElement("div");
          tradingViewWidgetContainer.classList.add("tradingview-widget-container");
    
          const tradingViewWidget = document.createElement("div");
          tradingViewWidget.classList.add("tradingview-widget-container__widget");
    
          const tradingViewScript = document.createElement("script");
          tradingViewScript.type = "text/javascript";
          tradingViewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
          tradingViewScript.async = true;
          tradingViewScript.innerHTML = JSON.stringify({
            symbol: `${holding}`,
            width: "100%",
            colorTheme: "dark",
            isTransparent: true,
            locale: "in",
            largeChartUrl: "http://./"
          });
    
          tradingViewWidgetContainer.appendChild(tradingViewWidget);
          tradingViewContainer.appendChild(tradingViewWidgetContainer);
          tradingViewContainer.appendChild(tradingViewScript);
          portfolioCard.appendChild(tradingViewContainer);
    
          const quantityElement = document.createElement("div");
          quantityElement.classList.add("quantity");
          quantityElement.innerText = quantity;
          portfolioCard.appendChild(quantityElement);
    
          const buyingPriceElement = document.createElement("div");
          buyingPriceElement.classList.add("buying_price");
          buyingPriceElement.innerText = averagePrice;
          portfolioCard.appendChild(buyingPriceElement);
    
          portfolioContainer.appendChild(portfolioCard);
        }
      }
    });
    }
  };
  
  const dash = document.getElementById('dashboard');
  dash.style.color='white';




const ele = document.getElementById("dashboard");
ele.style.setProperty("color", "red", "important");

