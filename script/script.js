import Network from './module.js';

//create the network objects
const MTN = new Network("MTN", 650);
const AIRTEL = new Network("AIRTEL", 810);
const GLO = new Network("GLO", 450);
//const MOBILE = new Network("MOBILE", 250);
const myNetworkObjs = [MTN, AIRTEL, GLO /* MOBILE*/ ];

myNetworkObjs.forEach((networks) => {
 networks.tapView();
});



