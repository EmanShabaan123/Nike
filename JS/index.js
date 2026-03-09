let GloabalCarouser = document.querySelector("#EM-carousel"),
    NextButton = GloabalCarouser.querySelector("button.next"),
    PrevButton = GloabalCarouser.querySelector("button.prev"),
    CarouselSliders = GloabalCarouser.querySelectorAll(".EM-item"),
    NavToggler = document.querySelector(".navbar-toggler"),
    NavMenu = document.querySelector("#navbarSupportedContent"),
    NavItem = document.querySelector("nav"),
    NavHeight = NavItem.clientHeight ,
    TitleImage = document.querySelectorAll("section .title img"),
    LatestBlur = document.querySelector("#Latest"),
    Featured = document.querySelector("#Featured"),
    Offer = document.querySelector("#Offer"),
    NavLinks = document.querySelectorAll(".nav-link"),
    LoadingPage = document.querySelector("#LoadingPage"),
    PopupBoxes = document.querySelectorAll(".pop-up .box"),
    LatestContent = document.querySelector("#Latest .content"),
    FeaturedContent = document.querySelector("#Featured .content .row"),
    ProductCarts = [];

// ////////////////////////////////////
if (localStorage.getItem("ProductCarts") == null){
    UpdateLocalStorage();
}else{
    ProductCarts = JSON.parse(localStorage.getItem("ProductCarts"))
    UpdateLocalStorage();
    DisplayCart();
}
// ///////////////////////////////////////
NextButton.addEventListener("click",function(){
    let CurrentSlide = GloabalCarouser.querySelector(".EM-item.active"),
        NextSlide = CurrentSlide.nextElementSibling ?? GloabalCarouser.querySelector(".EM-item:first-child");
        CurrentColorName = NextSlide.dataset.colorName ;

    ChangeMainColor(CurrentColorName);
    CurrentSlide.classList.remove("active");
    NextSlide.classList.add("active");
})
// ////////////////////////////////////////////////////////
PrevButton.addEventListener("click",function(){
    let CurrentSlide = GloabalCarouser.querySelector(".EM-item.active"),
        prevSlide = CurrentSlide.previousElementSibling ?? GloabalCarouser.querySelector(".EM-item:last-child");
        CurrentColorName = prevSlide.dataset.colorName ;

    ChangeMainColor(CurrentColorName);
    CurrentSlide.classList.remove("active");
    prevSlide.classList.add("active");
})
// //////////////////////////////////////////////
window.addEventListener("DOMContentLoaded",function(){
    CarouselSliders[0].classList.add("active")
    CheckProducts();
})
// /////////////////////////////

window.addEventListener("load",()=>{
    setTimeout(()=>{
        LoadingPage.classList.add("hide");
        document.body.classList.add("show")
    } , 3000)
})
// /////////////////////////////////////////
NavToggler.addEventListener("click",function(){
    setTimeout(()=>{
           if(NavMenu.classList.contains("show")){
             GloabalCarouser.classList.add("blur-header");
           }
           else{
             GloabalCarouser.classList.remove("blur-header");
           }
    } , 380)
})
// /////////////////////////////////
NavToggler.addEventListener("click",function(){
    setTimeout(()=>{
           if(NavMenu.classList.contains("show")){
             Offer.classList.add("blur-header");
           }
           else{
             Offer.classList.remove("blur-header");
           }
    } , 380)
})
// //////////////////////////////////////////
NavToggler.addEventListener("click",function(){
    setTimeout(()=>{
           if(NavMenu.classList.contains("show")){
             LatestBlur.classList.add("blur-header");
           }
           else{
             LatestBlur.classList.remove("blur-header");
           }
    } , 380)
})
// ///////////////////////////////////////
NavToggler.addEventListener("click",function(){
    setTimeout(()=>{
           if(NavMenu.classList.contains("show")){
             Featured.classList.add("blur-header");
           }
           else{
             Featured.classList.remove("blur-header");
           }
    } , 380)
})
// ////////////////////////////////////////
window.addEventListener("scroll",function(e){
    if(window.scrollY > NavHeight){
        NavItem.classList.add("scrolled");
    }
    else{
        NavItem.classList.remove("scrolled");
    }
})
// /////////////////////////////////
NavLinks.forEach(function(NavLink){
    NavLink.addEventListener("click",function(e){
        e.preventDefault();
    let LastLink = NavItem.querySelector(".nav-link.active"),
        sectionId = NavLink.getAttribute("href"),
        CurrentSection = document.querySelector(`${sectionId}`),
        TopOfSection = CurrentSection.offsetTop ;

    LastLink.classList.remove("active");
    NavLink.classList.add("active");

    window.scrollTo({
        top : TopOfSection - NavHeight ,
        left : 0 ,
    })
    })
})
////////////////////////////////////
window.addEventListener("scroll",function(){
    let Sections = document.querySelectorAll("section");
        Sections.forEach(section =>{
            let top = window.scrollY ,
                offset = section.offsetTop - NavHeight ,
                Height = section.offsetHeight ,
                ID = section.getAttribute("id");
            if(top >= offset && top <= offset+Height){
                NavLinks.forEach(Link => {
                    Link.classList.remove("active");
    
    let Active = document.querySelector('.nav-link[href*='+ ID + ']');
    if(Active){
       Active.classList.add("active")
    }
                    
                })
            }
        })
        
})
//////////////////////////////////
// ///////////////////////////////////
PopupBoxes.forEach(function(PopupBox){
    PopupBox.addEventListener("click",function(e){
        e.stopPropagation();
    })
})
// /////////////////////////////////
latest.forEach(function(product){

    let ProductIntoCart = ProductCarts.find((item) => item.id == product.id);
    console.log(ProductIntoCart);


    LatestContent.innerHTML +=`
     <div class="product px-4 pt-4 pb-3 rounded-3 mainborder mb-4"
        data-product-id="${product.id}"
        data-selected-color="${(ProductIntoCart == undefined) ? product.colors[0] : ProductIntoCart.color}"
        data-selected-size="${(ProductIntoCart == undefined) ? product.sizes[0] : ProductIntoCart.size}">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="item content">
                        <div class="row">
                          <div class="col-lg-2 part1">
                             <div class="item">
                                <ul class="list-unstyled box1 d-flex justify-content-center d-lg-block">
                                  ${ShowImages(product.images)}
                                </ul>
                             </div>
                          </div>
                          <div class="col-lg-10 part2 box2">
                            <div class="item .image">
                                <div class="selsectedimg">
                                  <img src="./images/products/${product.images[0]}" alt="" class="img-fluid">
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="item">
                        <h2 class="maincolor">${product.name}</h2>
                        <p>${product.description}</p>
                        <div class="d-flex fw-bold">
                          <div class="label me-2 ">
                               <h5>Price :</h5>
                          </div>
                          <div class="value">
                            ${showprice(product.price , product.discount)}
                          </div>
                        </div>

                          <div class="d-flex fw-bold">
                          <div class="label me-2 ">
                               <h5>Size :</h5>
                          </div>
                          <div class="value">
                               <ul class="list-unstyled d-flex">
                                    ${ShowSizes(product.sizes , ProductIntoCart)}
                               </ul>
                          </div>
                        </div>
                        ${PrepareBtn(ProductIntoCart , product.id)}
                     
                      </div>
                    </div>
                  </div>
                </div>
    `;
})
// /////////////////////////////////
features.forEach(function(product){
    FeaturedContent.innerHTML += `
       <div class="col-sm-6 col-md-4 col-lg-3 product text-center">
                         <div class="item mb-3 rounded-3 py-3">
                          <h6 class="discount">${showDiscount(product.discount)}</h6>
                          <div class="selsectedimg">
                            <img src="./images/products/${product.images[0]}" alt="" class="img-fluid mb-5">
                          </div>
                          <i class="fa-solid fa-magnifying-glass mt-5" onclick="OpenProductPopup(${product.id})"></i>
                          <ul class="list-unstyled d-flex justify-content-center">
                          ${ShowImgIcon(product.images)}
                           
                          </ul>
                          <h5>${product.name}</h5>
                          <div class="value fw-bold">
                               ${showprice(product.price , product.discount)}
                          </div>
                         </div>
                  </div>
    `;
})
// /////////////////////////////////////

function DisplayCart(){

let PopUpRow = document.querySelector('.pop-up[data-popup-name="shop"] .row');

PopUpRow.innerHTML = "";

ProductCarts.forEach(function(ProductCart){

let productData = GetProduct(ProductCart.id);

PopUpRow.innerHTML +=  
` <div class="col-sm-6   col-lg-4">
                       <div class="item mb-4 py-3 px-3 rounded-3 ">
                        <img src="./images/products/${productData.images[0]}" alt=""class="mb-2 mx-auto" >
                        <h5>${productData.name.slice(0,15)}...</h5>

                         <div class="d-flex fw-bold">
                           <div class="label me-2 ">
                                <h6>Price :</h6>
                          </div>
                          <div class="value">
                               ${showprice(productData.price , productData.discount)}
                           </div>
                         </div>

                         <div class="d-flex fw-bold">
                           <div class="label me-2 ">
                                <h6>Size :</h6>
                           </div>
                           <div class="value">
                                <ul class="list-unstyled d-flex">
                                     ${ShowSizes([ProductCart.size])}
                                </ul>
                           </div>
                         </div>


                        <div class="d-flex fw-bold color">
                           <div class="label me-2 ">
                                <h6>Colors :</h6>
                           </div>
                          <div class="value">
                               <ul class="list-unstyled d-flex">
                                    ${ShowListColors([ProductCart.color])}
                               </ul>
                          </div>
                         </div>
                        
                        ${RemoveButton(productData.id)}
                      
                        </div>
                    </div>
    `;

});

}
//////////////////////////////////////