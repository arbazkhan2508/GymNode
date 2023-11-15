// var tl = gsap.timeline({
//     scrollTrigger:{
//       trigger:".page",
//       pin:true,
//       scrub:1,
//     //   markers:true,
//       start:"top 8%",
//       snap:true
//     }
//   })
//   tl
//   .to("#i2",{
//     clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
//     ease:Expo.easeInOut,
//     duration: 10
//   })
// //   .to("#t1",{
// //     delay:-5,
// //      y:-1000,
// //      ease:Expo.easeInOut,
// //      duration:20
// //   })
//   .to("#i3",{
//     clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
//     ease:Expo.easeInOut,
//     duration: 10
//   })
//   .to("#i4",{
//     clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
//     ease:Expo.easeInOut,
//     duration: 10
//   })
//   .to("#i5",{
//     clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
//     ease:Expo.easeInOut,
//     duration: 10
//   })
//   .to("#i6",{
//     clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
//     ease:Expo.easeInOut,
//     duration: 10
//   })


  var tl = gsap.timeline({
    scrollTrigger:{
      trigger:".page",
      pin:true,
      scrub:1,
      start:"top top",
      // snap:".img"
    }
  })
  tl
  .to("#i2",{
    clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
    ease:Expo.easeInOut,
    duration: 5
  },"a")
  .to(".t",{
    y:"-100%",
    duration: 5

  },"a")
  .to("#i3",{
    clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
    ease:Expo.easeInOut,
    duration: 5
  },"b")
  .to(".t",{
    y:"-200%",
    duration: 5

  },"b")
  .to("#i4",{
    clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
    ease:Expo.easeInOut,
    duration: 5
  },"b")
  .to(".t",{
    y:"-200%",
    duration: 5

  },"b")
  .to("#i5",{
    clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
    ease:Expo.easeInOut,
    duration: 5
  },"b")
  .to(".t",{
    y:"-200%",
    duration: 5

  },"b")



  var tl1 = gsap.timeline({ repeat: -1});
  tl1
  .to("#mainimg1",{
      opacity:1,
      ease:Expo.easeInout,
      duration:1
  })
  .to("#mainimg2",{
    delay:1,
     opacity:1,
     ease:Expo.easeInout,
      duration:1
  })