

document.querySelector("#edit")
.addEventListener("click",function(){
    gsap.to("#edit_form",{
       width:"40vw",
       opacity:1,
       ease:Expo.easeInout,
       duration:.5
    })
   //  document.querySelector("#main").style.pointerEvents = 'none';
})


document.querySelector("#edit1")
.addEventListener("click",function(){
    gsap.to("#edit_form",{
       width:"40vw",
       opacity:1,
       ease:Expo.easeInout,
       duration:.5
    })
   //  document.querySelector("#main").style.pointerEvents = 'none';
})

var flag = 0;
document.querySelector("#hoverimg")
.addEventListener("click",function(){
   if(flag === 0){
      gsap.to("#primg_user",{
         display:"flex",
         scale:1,
          ease:Expo.easeInout,
          duration:.5
       })
       flag = 1;
   }else{

      gsap.to("#primg_user",{
         display:"none",
         scale:1,
          ease:Expo.easeInout,
          duration:.5
       })
       flag = 0;
   }
   
   //  document.querySelector("#main").style.pointerEvents = 'none';
})


document.querySelector("#close")
.addEventListener("click",function(){
    gsap.to("#edit_form",{
       width:"0vw",
       opacity:0,
       ease:Expo.easeInout,
       duration:.5
    })
})