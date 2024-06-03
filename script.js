function getCategoryPositions(category){
    var filename = category + '.json';
    let request = new XMLHttpRequest();
	request.open("GET",filename);
	request.onreadystatechange = () =>
	{
		if (request.readyState === XMLHttpRequest.DONE)
		{
			let rtext = request.responseText;
			let rjson = JSON.parse(rtext);
			//console.log(rjson);
            setPositions(rjson,category);
		}
	}
	request.send();
}
getCategoryPositions("cakes");
function setPositions(categoryData,categoryName) 
{
    var positions = categoryData;
  //  console.log(positions);
    var container = document.getElementById("catalog-container");
    container.innerHTML='';
    positions.forEach((Element)=>{
        let div = document.createElement("div");
        let img = document.createElement("img");
        let h1 = document.createElement("h1");
        let text = document.createElement("p");
        let price = document.createElement("span");
        text.innerHTML = Element.description;
        h1.innerHTML = Element.name;
        price.innerHTML = "Price: "+Element.price;
        let url = "images/" + categoryName + "/" +Element.id + ".jpg";
//        console.log(url);
        img.setAttribute("src",url);
        div.appendChild(h1);
        div.appendChild(img);
        div.appendChild(text);
        div.appendChild(price);
        container.appendChild(div);
    }
    )
}

var prevRand;
function setButtonEvents(){
    document.getElementById("specials-link").addEventListener('click',function(event){
        event.preventDefault();
        var categories = Array();
        document.querySelectorAll(".category-link").forEach(link => {
            categories.push(link.getAttribute("id"));
        })
        var rand = Math.trunc(Math.random()*categories.length);
        while (rand==prevRand)
            rand = Math.trunc(Math.random()*categories.length);
        prevRand = rand;
        getCategoryPositions(categories[rand]);
    })
 document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var category = this.getAttribute('id');
        console.log("category = ", category);
        getCategoryPositions(category);
    });
});
}

function loadCategoryData(){
    let request = new XMLHttpRequest();
	request.open("GET","categories.json");
	request.onreadystatechange = () =>
	{
		if (request.readyState === XMLHttpRequest.DONE)
		{
			let rtext = request.responseText;
			let rjson = JSON.parse(rtext);
			console.log(rjson);
            setCategoryData(rjson);
            setButtonEvents();
		}
	}
	request.send();
}
function setCategoryData(dataSet){
    let container = document.getElementById("Categories");
    dataSet.forEach((Element)=>{
        let a = document.createElement("a");
        a.classList.add("category-link");
        a.innerText=Element.name;
        a.id=Element.name;
        let img = document.createElement("img");
        let src = "/images/"+ Element.name +"/category.jpg";
        img.setAttribute("src",src);
        a.appendChild(img);
        container.appendChild(a);
    })
}
loadCategoryData();