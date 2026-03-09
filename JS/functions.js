function ChangeMainColor(colorName){
    let HTML = document.querySelector("html"),
        NewColor = getComputedStyle(HTML).getPropertyValue(`--${colorName}`);


    TitleImage.forEach(function(CommonName){
        ChangeMainImg(colorName.split("-")[0] ,CommonName, 'correct' );
    })
    ChangeMainImg(colorName.split("-")[0] , Logo , 'logo');

   
    HTML.style.setProperty("--main-color",NewColor);
 
}
// ///////////////////////////////////////////
function ChangeMainImg(imgName , ImgEle , CommonName){
    let CurrentImgSource = ImgEle.src ;
    ImgEle.src =  ChangeSourse(CurrentImgSource , `${imgName}-${CommonName}.png` );
    LogoIcon.href =  ChangeSourse(CurrentImgSource , `${imgName}-${CommonName}.png` )
}

// ///////////////////////////////////////////
function OpenPopup(popupName){
    let PopupEle = document.querySelector(`.pop-up[data-popup-name=${popupName}]`);

    PopupEle.classList.add("active")
    GloabalCarouser.classList.add("blur-header");
     Offer.classList.add("blur-header");
    LatestBlur.classList.add("blur-header");
    Featured.classList.add("blur-header");
    NavItem.classList.add("blur-header");

    setTimeout(function(){
    PopupEle.classList.add("show")
    },100)
}
// ///////////////////////////////////////////
function ClosePopup(){
    let CurrentPopup = document.querySelector(".pop-up.active");
        CurrentPopup.classList.remove("show");

    setTimeout(function(){
    CurrentPopup.classList.remove("active")
     GloabalCarouser.classList.remove("blur-header");
      Offer.classList.remove("blur-header");
    LatestBlur.classList.remove("blur-header");
    Featured.classList.remove("blur-header");
    NavItem.classList.remove("blur-header");
    },500)
}
// //////////////////////////////////////////
function ShowImages(listImages , FromPopup = false){
    let ImagesEle  = `` ;

    listImages.forEach(function(productImg , index){
        ImagesEle += `
         <li onclick="ChangeSelectImage(this , '${productImg}')" class="${(!FromPopup)? 'mainborder rounded-2' : ''}  p-1 ${(index != listImages.length -1 )?"mb-lg-2  me-2" : ""}">
         <img src="./images/products/${productImg}" alt="" class="img-fluid">
         </li>
        `;
    })

    return ImagesEle ;
}
// /////////////////////////////////
function showprice(price , discount){
   return `
   <span class="maincolor text-decoration-line-through ${(discount == 0) ? 'd-none' : ' '}">${price}<sup>$</sup></span>
    <span>${(price * (1-discount)).toFixed(2)}<sup>$</sup></span>
   `;
}

// /////////////////////////////////
function ShowSizes(listSizes , ProductIntoCart){
    let SizeEle  = `` ;

    listSizes.forEach(function(listSize , index){
        if(ProductIntoCart == undefined){
              SizeEle += `
           <li onclick="ChangeActive(this); UpdateSize(this ,'${listSize}')
           " class="${(index != listSizes.length -1 )?"me-2" : ""} ${(index == 0)?"active" : ""}  mainbutton ">
           ${listSize}</li>
        `;
        }
        else{
        SizeEle += `
           <li onclick="ChangeActive(this); UpdateSize(this ,'${listSize}')
           " class="${(index != listSizes.length -1 )?"me-2" : ""} ${(ProductIntoCart.size == listSize)?"active" : ""}  mainbutton ">
           ${listSize}</li>
        `;
        }
      
    })

    return SizeEle ;
}
// ///////////////////////////
function ShowImgIcon(listIcons){
    let IconEle  = `` ;

    listIcons.forEach(function(productImg , index){
        IconEle += `
             <li onclick="ChangeSelectImage(this, '${productImg}') ; ChangeActive(this)"
              class="${(index != listIcons.length -1 )?"me-2" : ""} mainbutton ${(index == 0)?"active" : ""} rounded-circle"></li>
        `;
    })

    return IconEle ;
}
// ///////////////////////////
function ChangeSourse(mainsrc , newimg){
    let MainArr = mainsrc.split('/');

    MainArr[MainArr.length -1 ] = newimg ;
    return MainArr.join('/')
        
}
// ///////////////////////////
function ChangeSelectImage(that , SelectedImg){
      let ProductEle = that.closest(".product"),
          SelectedImgEle = ProductEle.querySelector(".selsectedimg img");
        
    SelectedImgEle.src = ChangeSourse(SelectedImgEle.src , SelectedImg);
}
// //////////////////////////////////
function ChangeActive(that){
    that.parentElement.querySelector('.active').classList.remove('active');
    that.classList.add('active');
}
// //////////////////////////
function showDiscount(discount){
    let DiscountPersentage = ``;

    if(discount){
        DiscountPersentage = `<h6 class="discount">-${discount*100}%</h6>`
    }

    return DiscountPersentage ;
}

////////////////////////////////
function GetProduct(ProductId){
    return products.find(product => product.id == ProductId) ;
}
///////////////////////////////
function ShowListColors(listColors , ProductIntoCart){
    let ColorEle  = `` ;
  
    listColors.forEach(function(ProductColor , index){
        if(ProductIntoCart == undefined){
           ColorEle += `
           <li onclick="ChangeActive(this); UpdateColor(this, '${ProductColor}')" class="${(index != listColors.length -1 )?"me-2" : ""} ${(index == 0)?"active" : ""}  mainbutton "
           style="background-color: ${ProductColor}"> </li>
        `;
        }else{
            ColorEle += `
           <li onclick="ChangeActive(this); UpdateColor(this, '${ProductColor}')" class="${(index != listColors.length -1 )?"me-2" : ""} ${(ProductColor == ProductIntoCart.color)?"active" : ""}  mainbutton "
           style="background-color: ${ProductColor}"> </li>
        `;
        }
      
    })

    return ColorEle ;

}
// /////////////////////////////
function OpenProductPopup(ProductId){
     
    let product = GetProduct(ProductId),
        PopupBoxElement = document.querySelector(`.pop-up[data-popup-name="product"] .box`),
        ProductIntoCart = ProductCarts.find((item) => item.id == product.id);

    PopupBoxElement.innerHTML = `
      <div class="row product"
        data-product-id ="${product.id}"
        data-selected-color="${(ProductIntoCart == undefined) ? product.colors[0] : ProductIntoCart.color}"
        data-selected-size="${(ProductIntoCart == undefined) ? product.sizes[0] : ProductIntoCart.size}">
                  <div class="col-lg-6">
                    <div class="item part1">
                       <div class="selsectedimg">
                          <img src="./images/products/${product.images[0]}" alt="" class="img-fluid ">
                       </div>
                      <div class="imglist">
                        <ul class="list-unstyled d-flex">
                          ${ShowImages(product.images , true )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="item">
                       <h2 class="maincolor">${product.name}</h2>
                       ${showprice(product.price , product.discount)}
                       <hr>

                       <p>${product.description}</p>
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


                        <div class="d-flex fw-bold color">
                          <div class="label me-2 ">
                               <h5>Colors :</h5>
                          </div>
                          <div class="value">
                               <ul class="list-unstyled d-flex">
                                    ${ShowListColors(product.colors)}
                               </ul>
                          </div>
                        </div>
                      ${PrepareBtn(ProductIntoCart , product.id)}
                    </div>
                  </div>
            </div>
    `;
    
    OpenPopup("product");
}
///////////////////////////////////
function AddToCart(that , ProductId){
    let product = GetProduct(ProductId),
        ProductEle = document.querySelector(`.product[data-product-id ="${product.id}"]`),
        NewOrder = {
            id : product.id ,
            color : ProductEle.getAttribute('data-selected-color'),
            size : ProductEle.getAttribute('data-selected-size'),
        }
    ProductCarts.push(NewOrder);
    UpdateLocalStorage();
    ToggleCartBtn(that , 'remove');
    that.setAttribute('onclick', `RemoveFromCart(this , ${product.id})`);
    DisplayCart();
     CheckProducts();
}
///////////////////////////////////////
function RemoveFromCart(that , ProductId){
    ProductCarts = ProductCarts.filter((product) => product.id != ProductId);
   
    UpdateLocalStorage();
    ToggleCartBtn(that , 'add');

    that.setAttribute('onclick', `AddToCart(this , ${ProductId})`);
    DisplayCart();
    CheckProducts();
}
// ///////////////////////////////////
function ToggleCartBtn(btn , status){
    if(status == 'add'){
        btn.textContent = "Add To Cart ";
        btn.classList.remove('remove');
    }else if(status == 'remove'){
        btn.textContent = "Remove From Cart ";
        btn.classList.add('remove'); 
    }
}
// //////////////////////////////////
function UpdateSize(that , newsize){
     let productEle = that.closest(".product");

    productEle.setAttribute("data-selected-size",newsize)
}
// //////////////////////////////////
function UpdateColor(that , NewColor){
     let productEle = that.closest(".product");

    productEle.setAttribute("data-selected-color",NewColor)
}
// ////////////////////////////
function UpdateLocalStorage(){
    localStorage.setItem("ProductCarts" , JSON.stringify(ProductCarts));
}
// /////////////////////////
function PrepareBtn(ProductIntoCart , ProductId){
    if( ProductIntoCart == undefined){
        return  `   <button class="btn mainbutton" onclick="AddToCart(this ,${ProductId})"  >Add To Cart</button>` 
               
    }else{
        return   `<button class="btn mainbutton  " onclick="RemoveFromCart(this ,${ProductId})"  >Remove From Cart</button>`
    }
}
// ////////////////////////////////////
function RemoveFromPop(ProductId){
    ProductCarts = ProductCarts.filter((product) => product.id != ProductId);
   
    UpdateLocalStorage() ; 
    DisplayCart();
     CheckProducts();
}
// ////////////////////////////////////
function RemoveButton(ProductId){
   return   `<button class="btn mainbutton  w-100" onclick="RemoveFromPop(${ProductId})"  >Remove</button>`
}
// /////////////////////////////////
function CheckProducts(){
     let Notification = document.querySelector('.pop-up[data-popup-name="shop"] .notification'),
         Buy = document.querySelector('.pop-up[data-popup-name="shop"] .buy ');

    if(ProductCarts.length == 0){
        Notification.classList.remove("hidden")
        Buy.classList.add("hidden")
    }
    else{
        Notification.classList.add("hidden")
        Buy.classList.remove("hidden") 
    }
}