const taxRate =.18;
const shipping = 15;
const shippingFree=300;

 window.addEventListener("load",()=>{

      // DATAS INTO LOCAL
      localStorage.setItem("vergi",taxRate); //VERGI ISMIYLE LOCAL'E KAYDETTIM
      localStorage.setItem("kargo", shipping);//KARGO ISMIYLE LOCAL'E KAYDETTIM
      localStorage.setItem("kargoBedava",shippingFree);

//       sessionStorage.setItem("vergi",taxRate);
//       sessionStorage.setItem("kargo",shipping);
//       sessionStorage.setItem("kargoBedava",shippingFree);
})

//CAPTURING ILE TOPLU EVENT TANIMLAMA
const productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click",(item)=>{
      // console.log(item.target);

      if(item.target.classList.contains("fa-plus")){//CLASSLIST.CONTAINS'DE TEK KELIME YAZILABILIR
            console.log("plus btn is clicked!");
            item.target.previousElementSibling.innerText++;
            fiyatHesapla(item.target);
      }
      else if(item.target.className=="fa-solid fa-minus"){//CLASSNAME'DE TUM ISIM YAZILMALI
            console.log("minus btn is clicked!");

            if(item.target.parentElement.querySelector(".quantity").innerText>1){
                  item.target.parentElement.querySelector(".quantity").innerText--;
                  fiyatHesapla(item.target);

            } else if(confirm("PRODUCT WILL BE REMOVED ?")){
                  item.target.parentElement.parentElement.parentElement.remove();
                  fiyatHesapla(item.target);
                  //URUNU SEPETTEN SILMEK
            }
      }
      else if(item.target.classList.contains("remove-product")){
            console.log("remove btn is clicked!");
            // item.target.parentElement.previousElementSibling.querySelector(".quantity").innerText=0;
            if(confirm("PRODUCT WILL BE REMOVED ?")){
                  item.target.parentElement.parentElement.parentElement.remove();
                  fiyatHesapla(item.target);
                  //URUNU SEPETTEN SILMEK
            }
      }
      else {
            console.log("Another item is clicked.")
      }

})

// const prItem = document.querySelectorAll(".product");
const fiyatHesapla =(item)=>{
      const infoDiv = item.parentElement.parentElement;
      const fiyat = infoDiv.querySelector(".product-price strong").innerText;
      const adet = infoDiv.querySelector(".quantity-controller .quantity").innerText;
      const sonuc = (fiyat*adet).toFixed(2);
      infoDiv.querySelector(".product-line-price").innerText = sonuc;

      let sum=0;
      const divs =document.querySelectorAll(".product-line-price");
      divs.forEach( (x) => sum += parseFloat(x.innerText) ); //PARSE.FLOAT()==NUMBER()
      
      let taxTotal = sum * localStorage.getItem("vergi");
      let shipping = (sum>0 && sum<300)? 15:0;
      
      let TOTAL = sum+taxTotal+shipping;

      document.querySelector(".sub-total").innerText =sum.toFixed(2);
      document.querySelector("#cart-tax p:nth-child(2)").innerText =taxTotal.toFixed(2);
      document.querySelector("#cart-shipping").children[1].innerText =shipping.toFixed(2);
      document.querySelector(".total").innerText =TOTAL.toFixed(2);

     
      // FOR.EACH ILE TOPLAMAK ICIN ARRAY VEYA NODE.LIST'E SAHIP OLMAK GEREKIR.
      // const subTotalArray=[...document.getElementsByClassName(".product-line-price").innerText];

      // console.log(infoDiv);
}