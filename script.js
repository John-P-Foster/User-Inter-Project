document.addEventListener("DOMContentLoaded", function () {

    const ourForm = document.querySelector('#ourForm');
    const regSSN = /^\d\d\d-\d\d-\d\d\d\d$/;
    const regPhone = /^\d\d\d-\d\d\d-\d\d\d\d$/;
    const regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    

    let firstName = document.getElementById("firstName");
    var nameValidBool = false;
    let nameValid = document.getElementById("nameValid");
    firstName.addEventListener('input',function(e){ validateInput(e,"nameValidBool",nameValid)});

    let SSN = document.getElementById("SSN");
    var SSNValidBool = false;
    let SSNValid = document.getElementById("SSNValid");
    SSN.addEventListener('input',function(e){ validateReg(e,"SSNValidBool",SSNValid, regSSN)});

    let phoneNumber = document.getElementById("phoneNumber");
    var phoneValidBool = false;
    let phoneValid = document.getElementById("phoneValid");
    phoneNumber.addEventListener('input',function(e){ validateReg(e,"phoneValidBool",phoneValid, regPhone)});

    let altPhoneNumber = document.getElementById("altPhoneNumber");
    var altphoneValidBool = false;
    let altPhoneValid = document.getElementById("altPhoneValid");
    altPhoneNumber.addEventListener('input',function(e){ validateReg(e,"altphoneValidBool",altPhoneValid, regPhone)});

    let email = document.getElementById("email");
    var emailValidBool = false;
    let emailValid = document.getElementById("emailValid");
    email.addEventListener('input',function(e){ validateReg(e,"emailValidBool",emailValid, regEmail)});

    let streetAddress = document.getElementById("streetAddress");
    var streetAddressValidBool = false;
    let streetAddressValid = document.getElementById("streetAddressValid");
    streetAddress.addEventListener('input',function(e){ validateInput(e,"streetAddressValidBool",streetAddressValid)});


    let cityAddress = document.getElementById("cityAddress");
    var cityAddressValidBool = false;
    let cityAddressValid = document.getElementById("cityAddressValid");
    cityAddress.addEventListener('input',function(e){ validateInput(e,"cityAddressValidBool",cityAddressValid)});

    let stateAddress = document.getElementById("stateAddress");
    var stateAddressVaildBool = false;
    let stateAddressValid = document.getElementById("stateAddressValid");
    stateAddress.addEventListener('change',function(e){ validateState(e,"stateAddressVaildBool",stateAddressValid)});

    // Listens to changes and updates the progress bar at the top.
    ['keyup', 'change'].forEach((type) => {
      // add the listeners to the form
      ourForm.addEventListener(type, (event) => {
        //check if each section is good to go here. 
       console.log("change to form");
       checkGeneralInfo("nameValidBool","SSNValidBool","phoneValidBool","altphoneValidBool","emailValidBool",
       "streetAddressValidBool","cityAddressValidBool","stateAddressVaildBool");
      })
    })
    

    function validateInput(e,valueBool,inputVaild){
        console.log(window[valueBool]);
        if(e.target.value.length > 2){
            inputVaild.classList.add('was-validated');
            inputVaild.classList.remove('is-incorrect');

            window[valueBool] = true;
            console.log("its longer than 2");
        }
        else if(e.target.value.length == 1){
            inputVaild.classList.remove('was-validated');
            inputVaild.classList.add('is-incorrect');
            window[valueBool] = false;
        }
        console.log("Its trying too.");
    }

    function validateState(e,valueBool,inputVaild){
        console.log(window[valueBool]);
        if(e.target.value != "State"){
            inputVaild.classList.add('was-validated');
            inputVaild.classList.remove('is-incorrect');

            window[valueBool] = true;
            console.log("its longer than 2");
        }
        else{
            inputVaild.classList.remove('was-validated');
            inputVaild.classList.add('is-incorrect');
            window[valueBool] = false;
        }
        console.log("Its trying too.");
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

    function checkGeneralInfo(nameValidBool,SSNValidBool,phoneValidBool,altphoneValidBool,emailValidBool,streetAddressValidBool,
        cityAddressValidBool,stateAddressVaildBool){
        let general = document.getElementById("generalNav");
        let submitbttn = document.getElementById("submitFormBtn");

        if(window[nameValidBool] & window[SSNValidBool] & window[phoneValidBool] & window[altphoneValidBool]
            &window[emailValidBool] & window[streetAddressValidBool] & window[cityAddressValidBool] & window[stateAddressVaildBool]){
          
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