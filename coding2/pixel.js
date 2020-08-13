
 let img = []
 let page =1
 let prev = document.getElementById("prev")
 let next = document.getElementById("next")
 let input = document.querySelector("input")
 let container = document.getElementById("pixelContainer")
 
 

// debouncing 
const debounce = (func, delay)=>{
    let timer
    return function(){
        clearTimeout(timer)
        timer = setTimeout(()=>func.apply(this),delay)
    }
}
// to get images data
const getImagesData = async ()=>{
    let image = input.value
    var data = await fetch(`https://api.pexels.com/v1/search?page=${page}&query=${image}`,{
        headers:{
            Authorization:"563492ad6f91700001000001a0d8ef3e2f1d4ac88f0531e76503849d"
        }
    })
    var data2 =await data.json()
    if(data2.total_results === 0){
        prev.style.display = "none"
        next.style.display = "none"
        alert("not found images")
    }
    console.log(data2)
     renderData(data2.photos,data2.total_results)
     img = data2.photos
 }
 
 
 // render data
 function renderData(data,length){
     container.innerHTML = ""

     if(length>15){

         prev.style.display = "inline-block"
         next.style.display = "inline-block"
     }
     let count = 0
     data.map(ele=>{
         if(count<10){

             
             let div = document.createElement("div")
             div.innerHTML = `
             <img width="200" height="200" src="${ele.src.medium}"/>
             `
             container.append(div)
             count++
         }
     })
     
 }
 
 // event on input
 input.addEventListener("keyup",debounce(getImagesData,1000))
 prev.addEventListener("click",function(){

     console.log(page)
     if(page == 1){
         return
     }
     page--
     getImagesData()
 })
 next.addEventListener("click",function(){
     console.log(page)
     page++
     getImagesData()
     })
 