document.addEventListener("DOMContentLoaded", function () {

    let firstName = document.getElementById("firstName");
    let nameValid = document.getElementById("nameValid");
    let nameValidBool = false;

    firstName.addEventListener('input', validateInput);

    function validateInput(e){
        if(e.target.value.length > 5){
            nameValid.classList.add('was-validated');
            nameValid.classList.remove('is-incorrect');

            nameValidBool = true;
        }
        else if(e.target.value.length < 1 && nameValidBool == true){
            nameValid.classList.remove('was-validated');
            nameValid.classList.add('is-incorrect');
            
          
            
            nameValidBool = false;
            console.log("less than 5");
        }
    }

});