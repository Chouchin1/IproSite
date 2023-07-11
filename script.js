var currentMin = 0
var selected = {type:"all",condition:"all"}
var rating = ['1-star','2-star','3-star','4-star','5-star']
var shown = new Array()
var hidden = []
var x = document.getElementsByClassName('result')
for (i = 0; i < x.length; i++){
  shown.push(x[i])
}
var signedIn = false
var userName = ""
var userEmail = ""
var userPosts = ""
var users = {}
var newUploads = [] 
var currentColor = ''
 
function populate() {  
    newUploads =    JSON.parse(localStorage.getItem('newUploads'))
    signedIn =      JSON.parse(localStorage.getItem('signedIn'))
    userName =      JSON.parse(localStorage.getItem('userName'))
    userEmail =     JSON.parse(localStorage.getItem('userEmail'))
    userPosts =     JSON.parse(localStorage.getItem('userPosts'))
    users =         JSON.parse(localStorage.getItem('users'))
    currentColor =  JSON.parse(localStorage.getItem('currentColor'))
    if (currentColor){changePallet(['green', 'dark', 'neutral', 'modern'].indexOf(currentColor))}
    if (!newUploads)[newUploads = []]
    if (!users){users = {}}
    if (signedIn){
        var dropDown = document.getElementById('dropdown').children
        dropDown[1].children[0].setAttribute('hidden', "")
        dropDown[1].children[1].removeAttribute('hidden')
        dropDown[0].children[0].setAttribute('href','./account.html')
        dropDown[0].children[0].textContent = "Account"
    }
    //localStorage.clear()
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
  console.log('test')
  while(i < shown.length){
    classes = shown[i].className.split(" ")
    if (!(rating.includes(classes[1]))){
      shown[i].className = classes.join(" ") + " hidden"
      hidden.push((shown.splice(i,1))[0])
      i--
    }
    else{
      for (const property in selected){
        if (selected[property] != 'all'){
          for(j = 0; j < selected[property].length; j++){
            if (!(classes.includes(selected[property][j]))){
                shown[i].className = classes.join(" ") + " hidden"
                console.log(shown[i].className)
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
    bringBack = true
    if (!(rating.includes(classes[1]))){
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
    p = results[i].getElementsByTagName("p")[0]
    txtValue = a.textContent || a.innerText;
    bodyValue = p.innerText || p.textContent
    if ((txtValue.toUpperCase().indexOf(filter) > -1) || (bodyValue.toUpperCase().indexOf(filter) > -1)) {
      results[i].style.display = "";
    } else {
      results[i].style.display = "none";
    }
  }
}

function signUp(){
    var firstName = document.getElementById('sign-up-first-name').value
    var lastName = document.getElementById('sign-up-last-name').value
    var email = document.getElementById('sign-up-email').value
    var password = document.getElementById('sign-up-password').value
    var passwordConfirm = document.getElementById('sign-up-password-confirm').value
    error = document.getElementById('sign-up-error-message')
    if (!document.getElementById('terms-box').checked){
        error.textContent = "You must agree to the terms and conditions"
        return
    }
    else if (password != passwordConfirm){
        error.textContent = "Passwords must match"
        return
    }
    else if (email in users){
        error.textContent = "Email already in use"
        return
    }
    else{
        users[email] = [firstName, lastName, password, []]
        localStorage.setItem("users", JSON.stringify(users))
        error.textContent = ""
        login(email, password, true)
    }
}

function login(email, password, signUp){
    error = document.getElementById('log-in-error-message')
    if (email in users){
        if (users[email].includes(password)){
            userEmail = email
            userName = users[email][0] + " " + users[email][1]
            userPosts = users[email][3]
            if (!signUp) {error.textContent = ""}
            signedIn = true
            localStorage.setItem("userPosts", JSON.stringify(userPosts))
            localStorage.setItem("userEmail", JSON.stringify(userEmail))
            localStorage.setItem("userName", JSON.stringify(userName))
            localStorage.setItem("signedIn", JSON.stringify(signedIn))
            window.location = './index.html'
            return
        }
    }else{
        if (!signUp) {error.textContent = 'Invalid Email or Password'}
        return
    }
}

function highlightButton(category, index){
    var element =eval(category).children[index]
    if (element.className == "highlightButton"){
        element.className = ""
    }
    else{
        element.className = "highlightButton"
    }
}

function highlightOne(self, other){
  if (!(self.className =='highlightButton')){
    self.className = 'highlightButton'
    if (other.className == 'highlightButton'){
      other.className = ''
    }
  }

}


function playUpload(name, link, description){
    className = 'result 1-star'
    x = document.getElementById('tags').getElementsByClassName('highlightButton')
    for (i = 0; i < x.length; i++){
        className += " " + x[i].value
    }
    newUploads.push([name, link, description, className])
    localStorage.setItem("newUploads", JSON.stringify(newUploads))
}

function uploadAll(){
    for (i = 0; i < newUploads.length; i++){
        upload(newUploads[i][0], newUploads[i][1], newUploads[i][2], newUploads[i][3])
    }
}

function upload(name, link, description, className) {
    const newResult = document.createElement("section")
    newResult.className =  className
    const resultName = document.createElement("a")
    resultName.href = link
    resultName.className = "result-title"
    const resultNameBold = document.createElement('b')
    resultNameBold.textContent = name
    resultName.appendChild(resultNameBold)
    newResult.appendChild(resultName)
    const resultDescription = document.createElement("p")
    resultDescription.className = "result-description"
    resultDescription.textContent = description
    newResult.appendChild(resultDescription)
    document.getElementById('main').appendChild(newResult)
    shown.push(newResult)
}
function signOut(){
        var dropDown = document.getElementById('dropdown').children
        signedIn = false
        var dropDown = document.getElementById('dropdown').children
        dropDown[1].children[0].removeAttribute('hidden')
        dropDown[1].children[1].setAttribute('hidden', "")
        dropDown[0].children[0].setAttribute('href','./signin.html')
        dropDown[0].children[0].textContent = "Log In"
        localStorage.setItem('signedIn', JSON.stringify(false))

}

function changePallet(idx){
  body = document.getElementsByTagName('body')[0]
  currentColor = ['green', 'dark', 'neutral', 'modern'][idx]
  body.className = currentColor
  localStorage.setItem('currentColor', JSON.stringify(currentColor))
}