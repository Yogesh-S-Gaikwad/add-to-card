let count_element = document.getElementById("count");
let add_to_cart = document.getElementById("add_to_cart");
console.log(count_element.textContent);

let count = count_element.textContent;

function increasecount(){
    count++;
    
    count_element.textContent=count;
}