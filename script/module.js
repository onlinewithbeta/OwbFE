//Create an class that will create different Network objects
//the class will that two parameters the name of Network and the price of one Gig.
/*
  the properties:
       network.
        price.
*/
export default class Network {
 constructor(networkName, price) {
  // The name of the network
  this.network = networkName;
  //Price of one Gig
  this.price = price;
  //stores the actual order later on
  //the bundle for the network
  this.bundleToview = document.getElementById(`${this.network}Bundles`);
  //an array that will content the different data plans for our network object
  this.Bundles = [];
 }
 
 //method to view the bundle prices
 bundlesVisibility(visibility) {
  this.bundleToview.style = `display:${visibility}`;
 }
 
 //method to Create bundles.
 /*this method adds different bundles to our Bundles array*/
 createBundle() {
  let bundles = this.Bundles;
  let bundleToview = this.bundleToview;
  //select our view button
  let viewButton = document.getElementById(`${this.network}showBundle`);
  
  //A loop that creates a place in the page store our data plans
  for (let i = 0; i < 11; i++) {
   let bundle = document.createElement('p');
   bundle.classList.add(`${this.network}bundles`);
   this.bundleToview.appendChild(bundle);
   bundles.push(bundle);
   //Sets our different bundles values
   if(this.network!=='MTN' ) bundles[0].innerHTML = `<a id="${this.network}0" href="#">${this.network} 500mb Data - #${this.price/2}/month</a>`;
   //  bundles[0].innerHTML = `${this.network} 500mb Data - #${this.price/2}/month`;
   if (i === 1 || i === 2 || i === 3 || i === 5 || i === 10) {
    if (this.network==='MTN' && i === 10) {
     
    }else{
     bundles[i].innerHTML = `<a id="${this.network}${i}" href="#">${this.network} ${i}GB Data - #${this.price * i}/month</a>`;
    }
    
   }
   //Tell the customer their order.
   bundles[i].addEventListener("click", () => {
    console.log(`${this.network}${i}`);
    console.log({
     //the order
     network: this.network,
     id: i,
    /* phone,
     //user
     token,*/
    })
    this.order = document.getElementById(`${this.network}${i}`).innerHTML;
    
    alert(`Buying ${this.order}`);
   });
  }
 };
 
 tapView() {
  this.createBundle();
  let viewButton = document.getElementById(`${this.network}showBundle`);
  
  //when outside the bundles section is clicked the bundles disappears
  document.addEventListener('click', (event) => {
   let isClickInsideBundle = this.bundleToview.contains(event.target);
   let isClickInsideViewButton = viewButton.contains(event.target);
   
   // Check if the click was outside of the nav and the toggle button
   if (isClickInsideBundle || isClickInsideViewButton) {
    setTimeout(() => {
     this.bundlesVisibility('block');
    }, 100);
    
   } else {
    this.bundlesVisibility('none');
   }
  });
 }
}