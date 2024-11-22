var bookmarkNameInput = document.getElementById('bookmarkName')
var bookmarkUrlInput = document.getElementById('bookmarkUrl')
var allBookmarks = []
allBookmarks = JSON.parse(localStorage.getItem('allMarks')) || []
displayBookmarks()
function submitBookmark(){
    if(validateOnSubmit()){
        var bookmark = {
        bookmarkName: bookmarkNameInput.value,
        bookmarkUrl: bookmarkUrlInput.value,
        }
        if(checkName(bookmark.bookmarkName.toLowerCase())==true){
            exist.innerHTML = "already exist"
            bookmarkNameInput.classList.add("is-invalid")
        }else{
            bookmarkNameInput.classList.remove("is-valid")
            bookmarkUrlInput.classList.remove("is-valid")
            exist.innerHTML = ""
            allBookmarks.push(bookmark)
            displayBookmarks()
            clearInputs()
            localStorage.setItem('allMarks', JSON.stringify(allBookmarks))
    }
    }else{
        Swal.fire({
            icon: "error",
            title: "Please fill inputs correctly",
            html: "<b>Name:</b> from 3 to 20 characters<br><b>Url:</b> should start with (https://)",
          });
    }
    
}
function displayBookmarks(){
    var cartoona = ""
    for(var i = 0; i < allBookmarks.length; i++){
        cartoona += `<tr>
                <td>${i+1}</td>
                <td>${allBookmarks[i].bookmarkName}</td>
                <td><a href="${allBookmarks[i].bookmarkUrl}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>`
    }
    display.innerHTML = cartoona
}
function clearInputs(){
    bookmarkNameInput.value = ""
    bookmarkUrlInput.value = ""
}
function deleteBookmark(index){
    allBookmarks.splice(index, 1)
    localStorage.setItem('allMarks', JSON.stringify(allBookmarks))
    displayBookmarks()
}
function checkName(bookName){
    for(var i = 0; i<allBookmarks.length; i++){
        if(allBookmarks[i].bookmarkName.toLowerCase() == bookName){
            return true
        }
    }
    return false
}
function validateInputs(regex,inputValue,input){
    if(regex.test(inputValue) == true){
            input.classList.replace("is-invalid", "is-valid")
            return true;
            }else{
                input.classList.add("is-invalid")
                return false;
            }
}
function validateOnSubmit(){
    if(
        validateInputs(/^[\w\s]{3,20}$/, bookmarkNameInput.value, bookmarkNameInput) &&
        validateInputs(/^https:\/\//, bookmarkUrlInput.value, bookmarkUrlInput)
    ){
        return true;
    }else{
        return false;
    }
}