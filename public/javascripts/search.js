

document.querySelector("#search_icon")
.addEventListener("click",function(){
    var tl = gsap.timeline();
    tl
     .to('.search_page',{
          display:"flex",
          opacity:1,
          ease:Expo.easeInout,
         duration:.5,
          
        
     })
     .to('.search_page .sform',{
        delay:-.5,
        width:"45vw",
        opacity:1,
        ease:Expo.easeInout,
        duration:.5,
     })
     .to('.search_page .sform .search',{
        delay:-.3,
        opacity:1,
        ease:Expo.easeInout,
        duration:1,
     })
})

document.querySelector("#closesearch")
.addEventListener("click",function(){
    var tl = gsap.timeline();
    tl
     
    
     .to('.search_page .sform .search',{
        opacity:0,
        ease:Expo.easeInout,
        duration:.5,
     })
     .to('.search_page .sform',{
        delay:-.5,
        width:"0vw",
        opacity:1,
        ease:Expo.easeInout,
        duration:.5,
     })
     .to('.search_page',{
        display:"none",
        opacity:1,
        ease:Expo.easeInout,
       duration:.5, 
    })
})





 
 
function searchVehice(){

      
  var cent =  document.querySelector("#cent");
  var src =  document.querySelector(".search_page .sform .search");
  var sform =  document.querySelector(".search_page .sform ");
  var inp =  document.querySelector(".search_page .sform input");
  var btn =  document.querySelector(".search_page .sform button");
  var line = document.querySelector(".search_page .sform .line .l")
  // var se = document.querySelector("#se");
  document.querySelector("#se").addEventListener("input",function(){
       
      if(this.value.trim().length === 0){
         cent.style.display = "none"
         src.style.backgroundColor = "transparent"
         inp.style.color = "#fff"
      }else{
          cent.style.display = "flex"
         src.style.backgroundColor = "#f0eef6"
         sform.style.borderTopRightRadius = "20px"
         sform.style.borderTopLeftRadius = "20px"
         inp.style.color = "#000"
      }
      // document.querySelector("#searchform").addEventListener("input",function(){
      if(this.value.trim().length %1 === 0 ){
        var t = this.value;
        axios.get(`http://localhost:3000/search/${this.value}`).then(function(resp){
          if (resp.data.avail.length > 0) {
            console.log(document.querySelector("#se").value.length)
          console.log("hello");
          console.log(resp.data.avail)
          var clutter = "";
          resp.data.avail.forEach(function(elem){
            clutter += `
            <a href="/single/${elem._id}">
              <div id="user">
                <div class="ucir">
                    <img src="../images/uploads/productimages/${elem.pic[0]}" alt="">
                </div> 
            <div class="u2">
                <h1>${elem.productName}</h1>
                <h4> Rs. ${elem.Price} .00</h4>
            </div>
             </div> 
          </a>
            
      
          `
          })
          document.querySelector("#cent").innerHTML = clutter
  
        } else {
          console.log("no user");
          document.querySelector("#cent").innerHTML = "No Hospitals available for this Search"
  
        }
        
      })
      .catch(function(err) {
        document.querySelector("#cent").innerHTML = "Search here"
  
  })
      }
    })
    console.log(document.querySelector("#se").value.length)
  }
  
  searchVehice();



//  document.querySelector(".rnav")
//  .addEventListener("click",function(){
//     // gsap.to("#searchResult",{
//     //      display:"none",
//     //      opacity:0,
//     //      ease:Expo.easeInout,
//     //    duration:1
//     // })
//     console.log("chutiya");
//  })