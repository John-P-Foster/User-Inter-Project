document.addEventListener("DOMContentLoaded", function () {

    let firstName = document.getElementById("firstName");
    let nameValid = document.getElementById("nameValid");
    let nameValidBool = false;
    firstName.addEventListener('input', validateInput);

    let SSN = document.getElementById("SSN");
    let SSNValid = document.getElementById("SSNVaild");
    SSN.addEventListener('input', validateRegX("\d\d\d-\d\d-\d\d\d\d", SSNValid));
    

  

    function validateInput(e){
        if(e.target.value.length > 5){
            nameValid.classList.add('was-validated');
            nameValid.classList.remove('is-incorrect');

            nameValidBool = true;
        }
        else if(e.target.value.length < 5 && nameValidBool == true){
            nameValid.classList.remove('was-validated');
            nameValid.classList.add('is-incorrect');
            
          
            
            nameValidBool = false;
            console.log("less than 5");
        }
    }

    function validateRegX(e, String, HTMLElement){
        regX = String;
        console.log(regX);
    }
});