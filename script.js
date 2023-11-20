document.addEventListener("DOMContentLoaded", function () {

    const ourForm = document.querySelector('#ourForm');
    const regSSN = /^\d\d\d-\d\d-\d\d\d\d$/;
    const regZIP = /^\d\d\d\d\d$/;
    const regPhone = /^\d\d\d-\d\d\d-\d\d\d\d$/;
    const regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    

    var nameValidBool = false;
    checkInput("firstName","nameValid","nameValidBool");

    var SSNValidBool = false;
    checkRegXInput("SSN","SSNValid","SSNValidBool","input",regSSN);

    var phoneValidBool = false;
    checkRegXInput("phoneNumber","phoneValid","phoneValidBool","input",regPhone);

    var altphoneValidBool = false;
    checkRegXInput("altPhoneNumber","altPhoneValid","altphoneValidBool","input",regPhone);

    var emailValidBool = false;
    checkRegXInput("email","emailValid","emailValidBool","input",regEmail);

    var streetAddressValidBool = false;
    checkInput("streetAddress","streetAddressValid", "streetAddressValidBool");

    var cityAddressValidBool = false;
    checkInput("cityAddress","cityAddressValid", "cityAddressValidBool");

    var stateAddressVaildBool = false;
    checkSelection("stateAddress","stateAddressValid","stateAddressVaildBool","change");

    var zipValidBool = false;
   checkRegXInput("zipAddress","zipAddressValid","zipValidBool","input",regZIP);

   var over18ValidBool = false;
   checkSelection("over18","over18Valid","over18VaildBool","change");





    
    function checkInput(inputId,controlFormId,BooleanName){
        var input = document.getElementById(inputId);
        var controlForm = document.getElementById(controlFormId);
        input.addEventListener('input',function(e){ validateInput(e,BooleanName,controlForm)});
    }

    function checkRegXInput(inputId,controlFormId,BooleanName,kind,regX){
        var input = document.getElementById(inputId);
        var controlForm = document.getElementById(controlFormId);
        input.addEventListener(kind,function(e){validateReg(e,BooleanName,controlForm,regX)})
    }

    function checkSelection(inputId,controlFormId,BooleanName,kind,regX){
        var input = document.getElementById(inputId);
        var controlForm = document.getElementById(controlFormId);
        input.addEventListener(kind,function(e){validateSelection(e,BooleanName,controlForm)})
    }

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

    function validateSelection(e,valueBool,inputVaild){
        console.log(window[valueBool]);
        if(e.target.value != ""){
            inputVaild.classList.add('was-validated');
            inputVaild.classList.remove('is-incorrect');
            window[valueBool] = true;
        }
        else{
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

        // Listens to changes and updates the progress bar at the top.
        ['keyup', 'change'].forEach((type) => {
            // add the listeners to the form
            ourForm.addEventListener(type, (event) => {
              //check if each section is good to go here. 
                let submitbttn = document.getElementById("submitFormBtn");
                let generalInfoComplete = false;
                generalInfoComplete = checkGeneralInfo();
                console.log(generalInfoComplete);

             if(generalInfoComplete){
                submitbttn.removeAttribute("disabled");
                submitbttn.classList.remove('btn-secondary');
                submitbttn.classList.add('btn-success');
            }
            else{
                submitbttn.setAttribute("disabled","");
                submitbttn.classList.remove('btn-success');
                submitbttn.classList.add('btn-secondary');
            }
            })
          })

    function checkGeneralInfo(){
        let general = document.getElementById("generalNav");

        if(
            window["nameValidBool"] & window["SSNValidBool"] 
            & window["phoneValidBool"] & window["altphoneValidBool"]
            &window["emailValidBool"] & window["streetAddressValidBool"] 
            & window["cityAddressValidBool"] & window["stateAddressVaildBool"]){
          
           general.classList.remove('incomplete');
           general.classList.add('complete');
           return true;
        }
        else{
            general.classList.add('incomplete');
            general.classList.remove('complete');
            return false;
        }
    }


});