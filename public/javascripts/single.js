



var tl = gsap.timeline({
    scrollTrigger:{
      trigger:"#pg1",
      pin:true,
      scrub:1,
      start:"top 20%",
      // snap:".img"
    }
  })
  tl

  .to("#pg1text",{
    y:"-60%",
    duration: 10

  },"a")
//   .to("#pg1img",{
//     marginTop:"2vh",
//     duration: 5

//   },"a")

var r1 = 0;
document.querySelector("#roww1")
.addEventListener("click",function(){
    if(r1 === 0){
        var tl = gsap.timeline()
        tl.
        to("#roww1 .p",{
            display:"flex",
            ease:Expo.easeInout,
            duration:1,
       })
      
       r1=1;
    }else{
        gsap.to("#roww1 .p",{
            display:"none",
            ease:Expo.easeInout
       })
       r1=0;
    }
   
})


var r2 = 0;
document.querySelector("#roww2")
.addEventListener("click",function(){
    if(r2 === 0){
        gsap.to("#roww2 p",{
            display:"flex",
            ease:Expo.easeInout
       })
       gsap.to("#pg1",{
        height:"130vh",
        ease:Expo.easeInout
        })
       r2=1;
    }else{
        gsap.to("#roww2 p",{
            display:"none",
            ease:Expo.easeInout
       })
       r2=0;
    }
   
})