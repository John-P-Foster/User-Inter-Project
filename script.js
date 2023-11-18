document.addEventListener("DOMContentLoaded", function () {
    let firstName = document.getElementById("firstName");
    let nameValid = document.getElementById("nameValid");
 

    firstName.addEventListener('input', validateInput);


    function validateInput(e){
        if(e.target.value.length > 0){
            nameValid.classList.add('was-validated');
        }
        console.log("Testing");
    }
});