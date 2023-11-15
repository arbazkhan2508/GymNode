

document.querySelector("#shop")
.addEventListener("mouseenter",function(){
     var tl= gsap.timeline();
     tl.
     to("#shop_page",{
        display:"flex",
        ease:Expo.easeInout,
     })
})

document.querySelector("#shop")
.addEventListener("mouseleave",function(){
     var tl= gsap.timeline();
     tl.
     to("#shop_page",{
        display:"none",
        ease:Expo.easeInout,
     })
})


document.querySelector("#shop_page")
.addEventListener("mousemove",function(){
     var tl= gsap.timeline();
     tl.
     to("#shop_page",{
        display:"flex",
        ease:Expo.easeInout,
     })
})


document.querySelector("#shop_page")
.addEventListener("mouseleave",function(){
     var tl= gsap.timeline();
     tl.
     to("#shop_page",{
        display:"none",
        ease:Expo.easeInout,
     })
})

