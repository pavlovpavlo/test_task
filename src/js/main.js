let users = ["James Smith","James Smith-Allen","James Smith","James Smither","Alena Mens","Alena Mens","Alena Dark","Pavel Durov","Lionel Messi","CR7","Frankie DeJong","Zlatan Ibrahimovich","Andres Iniesta","Sandro Lopez","David Backham"];
document.addEventListener("DOMContentLoaded",initDocument);

function autocomplete(inp, arr) {
  let currentFocus;
  let repeatedElements=[];
  inp.addEventListener("input", function(e) {
      let a, b, i, len=0, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() && len<5 && repeatedElements.filter(val => val === arr[i]).length<1) {
          len++;
          let countVal = arr.filter(val => val === arr[i]).length;
          b = document.createElement("DIV");
          b.innerHTML = `<img src="img/user_ico.png" alt="user post icon" class="main__post-user_icon ">
						<div class="main__post-user_text">
							<p class="menu__user-title">${"<strong>" + 
          						arr[i].substr(0, val.length) + "</strong>"+arr[i].substr(val.length)} 
          						<img src="img/vip.svg" class="menu__user-icon" alt="vip logo"></p>
							<p class="main__post-user_subtitle">${countVal} accounts</p>
						</div>`;
          
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
          repeatedElements.push(arr[i]);
        }
      }
      let div = document.createElement("DIV");
      div.setAttribute("class","autocomplete__other");

      if(len>0){

      	  div.innerHTML = "<a href='#' class='menu__user-link'>more results for "+inp.value+"...</>";
	      
      }else{
      	div.innerHTML = "<span class='menu__user-text'>Oops, seems like we don't have any \""+inp.value+"\"</span>";
      }
      a.appendChild(div);
      
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
  	  repeatedElements=[];
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

}

function activeAutocomplete(){
	
	let input = document.querySelector(".autocomplete_input"),
		logo_block = document.querySelector(".menu__logo-block"),
		auto_icon = document.querySelector("#autocomplete_icon"),
		blackTheme = document.querySelector(".main__black");
	input.classList.toggle('autocomplete-actives');
	
	if(input.classList.contains('autocomplete-actives')){
		input.style.width="350px";
		if(window.screen.width<515){
			logo_block.style.visibility="hidden";
		}
		auto_icon.setAttribute("src","img/exit.svg");
		blackTheme.style.display = "block";
	}else{
		input.style.width="0px";
		input.value = "";
		logo_block.style.visibility="visible";
		auto_icon.setAttribute("src","img/search.svg");
		blackTheme.style.display = "none";
	}
}

function animateWidth(width, value,input){
	let start = Date.now();
	let timer = setInterval(function(){
		let timePassed = Date.now() - start;
		input.style.width=width+"px";
		width+=value;
		if(timePassed >50) 
			clearInterval(timer);
	},20);
};
function androidShare(){
	if (/Android/i.test(navigator.userAgent)) {
    	navigator.share({
    		title: document.title,
    		text: "test",
    		url: window.location.href
    	})
  	}
}

function initDocument(){
	autocomplete(document.getElementById("myInput"), users);
	document.getElementById("autocomplete_icon").addEventListener('click',activeAutocomplete);
	document.querySelector(".autocomplete_input").style.width="0px";
	document.querySelector(".main__post-user_location").addEventListener("click", androidShare);
}