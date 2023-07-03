currentMin = 0
var selected = {type:"all",condition:"all"}
var rating = "all"

function filterSelection(category, name) {
  x = document.getElementsByClassName('result')
  checkbox = document.getElementById(name)
  if (category == "min-rating"){
    var minRatings = ['1-star','2-star','3-star','4-star','5-star']
    selectBox = document.getElementById('min-rating')
    console.log(selectBox.selectedIndex)
    idx = selectBox.selectedIndex
    minRatings.splice(0,idx)
    rating = minRatings
    console.log(rating)
    if (idx > currentMin) {
      console.log("test")
      removeOptions(x)
    }
    else returnOptions(x)
    return

  }
  if (checkbox.checked) {
    if (selected[category] == "all"){
      selected[category] = [name]
    }
    else selected[category].push(name)
    removeOptions(x)
  }
  else {
    var idx = selected[category].indexOf(name)
    selected[category].splice(idx,1)
    if (selected[category].length == 0){
      selected[category] = "all"
    }
    returnOptions(x)
  }
}

function removeOptions(x){
  for (i = 0; i < x.length; i++){
    classes = x[i].className.split(" ")
    if (!(rating.includes(classes[2]))){
      classes.push("hidden")
      classes = classes.join(" ")
      x[i].className = classes
    }
    else{
      for (const property in selected){
        if (selected[property] != 'all'){
          console.log(rating.contains(classes[2]))
          for(j = 0; j < selected[property].length; j++){
            if (!(classes.includes(selected[property][j]))){
              if (!classes.includes('hidden')){
                classes.push("hidden")
                classes = classes.join(" ")
                x[i].className = classes
              }
              break
            }
          }
        }
      }
    }
  }
}

function returnOptions(){
  bringBack = true
  for (i = 0; i < x.length; i++){
    classes = x[i].className.split(" ")
    for (const property in selected){
      if (selected[property] != 'all'){
        for (j = 0; j < selected[property].length; j++){
          if (!classes.includes(selected[property][j])){
            bringBack = false
          }
        }
      }
    }
    if (bringBack && classes.includes('hidden')){
      idx = classes.indexOf('hidden')
      classes.splice(idx,1)
      console.log(classes)
      classes = classes.join(" ")
      x[i].className = classes
    }
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
      
      console.log('test')
    } else {
      results[i].style.display = "none";
    }
  }
}