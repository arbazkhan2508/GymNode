

var flag = 0;
document.querySelectorAll(".row")
.forEach(function(elem){
     elem.addEventListener("click",function(){
        var h3 = elem.children[1];
        if(flag === 0){
            gsap.to(h3,{
                display:"initial",
                ease:Expo.easeInout,
            })
            flag = 1;
        }else{
            gsap.to(h3,{
                display:"none",
                ease:Expo.easeInout,
            })
            flag = 0;
        }
        
     })
})





document.querySelector("#mycart")
.addEventListener("click",function(){
   var tl = gsap.timeline();
   tl.
   to(".cart_wrappers",{
    display:"flex",
    ease:Expo.easeInout,
    duration:1
   })
   .to("#carts",{
    delay:-1,
       width:"40vw",
       ease:Expo.easeInout,
       duration:.5,
   })
   .to("#carts #cart_top",{
    opacity:1,
    ease:Expo.easeInout,
    delay:-.5,
   })
   .to(".carttt",{
    opacity:1,
    ease:Expo.easeInout,
    delay:-.5,
   })
   .to(".pric_e",{
    opacity:1,
    ease:Expo.easeInout,
    delay:-.5,
   })
})


document.querySelector("#closecart")
.addEventListener("click",function(){
   var tl = gsap.timeline();
   tl
  
   .to("#carts #cart_top",{
    opacity:0,
    ease:Expo.easeInout,
    delay:-.5,
   })
   .to(".carttt",{
    opacity:0,
    ease:Expo.easeInout,
    delay:-.5,
   })
   .to(".pric_e",{
    opacity:0,
    ease:Expo.easeInout,
    delay:-.5,
   })
   .to("#carts",{
       width:"0vw",
       ease:Expo.easeInout,
       duration:.5,
   })
   .to(".cart_wrappers",{
    display:"none",
    ease:Expo.easeInout,
    duration:1
   })
})