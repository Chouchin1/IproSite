currentMin = 0
var selected = {type:"all",condition:"all"}
var rating = ['1-star','2-star','3-star','4-star','5-star']
var shown = new Array()
var hidden = []
var x = document.getElementsByClassName('result')
for (i = 0; i < x.length; i++){
  shown.push(x[i])
}

function filterSelection(category, name) {
  checkbox = document.getElementById(name)
  if (category == "min-rating"){
    var minRatings = ['1-star','2-star','3-star','4-star','5-star']
    selectBox = document.getElementById('min-rating')
    idx = selectBox.selectedIndex
    minRatings.splice(0,idx)
    rating = minRatings
    if (idx > currentMin) {
      removeOptions()
    }
    else {returnOptions()}
    currentMin = idx
    return

  }
  if (checkbox.checked) {
    if (selected[category] == "all"){
      selected[category] = [name]
    }
    else selected[category].push(name)
    removeOptions()
  }
  else {
    var idx = selected[category].indexOf(name)
    selected[category].splice(idx,1)
    if (selected[category].length == 0){
      selected[category] = "all"
    }
    returnOptions()
  }
}

function removeOptions(){
  i=0
  while(i < shown.length){
    classes = shown[i].className.split(" ")
    if (!(rating.includes(classes[2]))){
      shown[i].className = classes.join(" ") + " hidden"
      hidden.push((shown.splice(i,1))[0])
    }
    else{
      for (const property in selected){
        if (selected[property] != 'all'){
          for(j = 0; j < selected[property].length; j++){
            if (!(classes.includes(selected[property][j]))){
                shown[i].className = classes.join(" ") + " hidden"
                hidden.push((shown.splice(i,1))[0])
                i--
            }
          }
        }
      }
    }
    i++
  }
}

function returnOptions(){
  i = 0
  while (i < hidden.length){
    classes = hidden[i].className.split(" ")
    console.log(classes)
    bringBack = true
    if (!(rating.includes(classes[2]))){
      bringBack = false
    }
    else{
      for (const property in selected){
        if (selected[property] != 'all'){
          for (j = 0; j < selected[property].length; j++){
            if (!classes.includes(selected[property][j])){
              bringBack = false
              break
            }
          }
        }
      }
    }
    if (bringBack){
      console.log('*')
      classes.splice(classes.indexOf('hidden'),1)
      hidden[i].className = classes.join(" ")
      shown.push((hidden.splice(i,1))[0])
      i--
    }
    i++
  }
}

function searchFunction() {
  // Declare variables
  var input, filter, main, results, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  main = document.getElementById("main");
  results = main.getElementsByClassName('result');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < results.length; i++) {
    a = results[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      results[i].style.display = "";
    } else {
      results[i].style.display = "none";
    }
  }
}