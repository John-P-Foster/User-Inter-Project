document.addEventListener("DOMContentLoaded", function () {

    const ourForm = document.querySelector('#ourForm');
    const regSSN = /\d\d\d-\d\d-\d\d\d\d/;

    let firstName = document.getElementById("firstName");
    var nameValidBool = false;
    let nameValid = document.getElementById("nameValid");
    firstName.addEventListener('input',function(e){ validateInput(e,"nameValidBool",nameValid)});

    let SSN = document.getElementById("SSN");
    var SSNValidBool = false;
    let SSNValid = document.getElementById("SSNValid");
    SSN.addEventListener('input',function(e){ validateReg(e,"SSNValidBool",SSNValid, regSSN)});

  
    // listen for keyup and change events
    ['keyup', 'change'].forEach((type) => {
      // add the listeners to the form
      ourForm.addEventListener(type, (event) => {
        //check if each section is good to go here. 
       console.log("change to form");
       checkGeneralInfo("nameValidBool","SSNValidBool");
       console.log(window["nameValidBool"]);

      })
    })
    

    function validateInput(e,valueBool,inputVaild){
        console.log(window[valueBool]);
        if(e.target.value.length > 2){
            inputVaild.classList.add('was-validated');
            inputVaild.classList.remove('is-incorrect');

            window[valueBool] = true;
        }
        else if(e.target.value.length == 1){
            inputVaild.classList.remove('was-validated');
            inputVaild.classList.add('is-incorrect');
            window[valueBool] = false;
        }
    }

    function validateReg(e,valueBool,inputVaild, regX){
        let reg = regX

        if( reg.test(e.target.value)){
            inputVaild.classList.add('was-validated');
            inputVaild.classList.remove('is-incorrect');

            window[valueBool] = true;
        }
        else if(e.target.value.length > 1){
            inputVaild.classList.remove('was-validated');
            inputVaild.classList.add('is-incorrect');
            window[valueBool] = false;
        }
    }

    function checkGeneralInfo(nameValidBool,SSNValidBool){
        let general = document.getElementById("generalNav");
        let submitbttn = document.getElementById("submitFormBtn");

        if(window[nameValidBool] & window[SSNValidBool]){
          
           general.classList.remove('incomplete');
           general.classList.add('complete');

           submitbttn.removeAttribute("disabled");
           submitbttn.classList.remove('btn-secondary');
           submitbttn.classList.add('btn-success');
        }
        else{
            general.classList.add('incomplete');
            general.classList.remove('complete');
 
            submitbttn.setAttribute("disabled","");
            submitbttn.classList.remove('btn-success');
            submitbttn.classList.add('btn-secondary');
            
        }

    }


});