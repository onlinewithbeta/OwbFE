build a standard API documentation (html site) for owb.

show codes to copy java, php, curl, JavaScript, nodejs, etc .

1. url/auth.
    i.) "/signin" POST body {password, useGmail:true, useUsername:false,identifier:"the Gmail"}

  Response:
    200 { gmail, balance, username, key, message:"Welcome back, username}
    
    500 {message}

2.) urk/nuy
    i.) "/data" POST header.apikey:Bearer OWB_dckjadsbdchsdalsdhasd body{ network:"mtn||airtel|| glo, planId, phone:"10 digit like 9117624342}
    
      reponse : 
            401     message : Please create an acoocnt or login
            401     message : Insufficient Balance you need #500 more nairia to pruchae.
            201     message : Purchaes successful , balance : 5380
            500     message : So,thing went wrong
            
    
    
    
    
    ii.) "/airtime" POST header.apikey:Bearer OWB_dckjadsbdchsdalsdhasd body{ network:"mtn||airtel|| glo, amonut:50, phone:"10 digit like 9117624342}
    
      reponse : 
            401     message : Please create an acoocnt or login
            401     message : Insufficient Balance you need #500 more nairia to pruchae.
            201     message : Purchaes successful , balance : 5380
            500     message : So,thing went wrong
            
    
    
3.) "/plans" GET  


  reponse:

              200 {
                    mtn: [{
                      networkId : 1,
                      network:"mtn",
                      data:"3GB",
                      days:6,
                      id:2,
                      type:"sme|| CG ||gifting",
                      extra:"1.5 GB night"//not always there
                    }...{}],
                    
                    airtel: [{
                      networkId : 2,
                      network:"airtel",
                      data:"3GB",
                      days:6,
                      id:2,
                      type:"sme|| CG ||gifting",
                      extra:"1.5 GB night"//not always there
                    }...{}],
                    
                    glo: [{
                      networkId : 3,
                      network:"glo",
                      data:"3GB",
                      days:6,
                      id:2,
                      type:"sme|| CG ||gifting",
                      extra:"1.5 GB night"//not always there
                    }...{}]
                  }
            

  4.) "/fund" GET header.apikey:Bearer OWB_dckjadsbdchsdalsdhasd 
    
      reponse : 
            200     12000
  