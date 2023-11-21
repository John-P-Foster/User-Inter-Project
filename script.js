document.addEventListener("DOMContentLoaded", function () {

    const ourForm = document.querySelector('#ourForm');
    const regSSN = /^\d\d\d-\d\d-\d\d\d\d$/;
    const regZIP = /^\d\d\d\d\d$/;
    const regPhone = /^\d\d\d-\d\d\d-\d\d\d\d$/;
    const regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    

    //start checks for General info section
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

    var moveInDateValidBool =false;
    checkDateMonth("moveInDate","moveInDateValid","moveInDateValidBool","change");

    var over18ValidBool = false;
    checkSelection("over18","over18Valid","over18VaildBool","change");

    var militaryServiceValidBool = false;
    checkSelection("militaryService","militaryServiceValid","militaryServiceValidBool","change");

    var firedFromJobValidBool = false;
    var firedFromJobDescriptionValidBool = true;
    checkSelectionWithSubsection("firedFromJob","firedFromJobValid","firedFromJobValidBool","firedFromJobDescription","firedFromJobDescriptionValid","firedFromJobDescriptionValidBool","change");

    var felonyConvictionValidBool = false;
    var FelonyDiscritptionValidBool = true;
    checkSelectionWithSubsection("felonyConviction","felonyConvictionValid","felonyConvictionValidBool","FelonyDiscritption","FelonyDiscritptionValid","FelonyDiscritptionValidBool","change");
    //end checks for General info section

    //start checks for Job Specifications
    var positionApplyingValidBool = false;
    checkInput("positionApplying","positionApplyingValid", "positionApplyingValidBool");

    var salaryDesiredValidBool = false;
    checkSelection("salaryDesired","salaryDesiredValid","salaryDesiredVaildBool","change");

    var employmentTypeVaildBool = false;
    checkSelection("employmentType","employmentTypeValid","employmentTypeVaildBool","change");

    var requirementsExplainedVaildBool = false;
    checkSelection("requirementsExplained","requirementsExplainedValid","requirementsExplainedVaildBool","change");

    var meetRequirementsVaildBool = false;
    checkSelection("meetRequirements","meetRequirementsValid","meetRequirementsVaildBool","change");

    var hoursPerWeekVaildBool = false;
    checkSelection("hoursPerWeek","hoursPerWeekValid","hoursPerWeekVaildBool","change");

    var workNightsVaildBool = false;
    checkSelection("workNights","workNightsValid","workNightsVaildBool","change");

    var startDateValidBool =false;
    checkDate("startDate","startDateValid","startDateValidBool","change");




    
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

    function checkSelection(inputId,controlFormId,BooleanName,kind){
        var input = document.getElementById(inputId);
        var controlForm = document.getElementById(controlFormId);
        input.addEventListener(kind,function(e){validateSelection(e,BooleanName,controlForm)})
    }

    function checkDate(inputId,controlFormId,BooleanName,kind){
        var input = document.getElementById(inputId);
        var controlForm = document.getElementById(controlFormId);
        input.addEventListener(kind,function(e){validateDate(e,BooleanName,controlForm)})
    }

    function checkDateMonth(inputId,controlFormId,BooleanName,kind){
        var input = document.getElementById(inputId);
        var controlForm = document.getElementById(controlFormId);
        input.addEventListener(kind,function(e){validateDateMonth(e,BooleanName,controlForm)})
    }

    function checkSelectionWithSubsection(inputId,controlFormId,BooleanName,subInputID,subControlID,subBoolean,kind){
        var input = document.getElementById(inputId);
        var controlForm = document.getElementById(controlFormId);
        input.addEventListener(kind,function(e){validateSelectionWithSubsection(e,BooleanName,controlForm,subInputID,subControlID,subBoolean)})
    }

    function validateInput(e,valueBool,inputVaild){
        if(e.target.value.length > 1){
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

    function validateSelectionWithSubsection(e,valueBool,inputVaild, subInputID,subControlID,subBoolean){
        let input = document.getElementById(subInputID);
        let formControl = document.getElementById(subControlID)
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
        if(e.target.value === "Yes"){
            window[subBoolean] = false;
            //input.removeAttribute("disabled");


            newTextArea = document.createElement("textarea");
            newTextArea.setAttribute("placeholder","Description");
            newTextArea.setAttribute("id",subInputID);
            newTextArea.setAttribute("class","form-control");
            formControl.appendChild(newTextArea);

            newLabel = document.createElement("label");
            newLabel.setAttribute("for",subInputID);
            newLabel.setAttribute("style","margin-left: 80px;");
            newLabel.setAttribute("id","label"+subInputID);
            text = document.createTextNode(" Please describe all situations here. (include dates)");
            newLabel.appendChild(text);
            formControl.appendChild(newLabel);
            
            checkInput(subInputID,subControlID,subBoolean);
            
        }
        else{
            window[subBoolean] = true;
            input.setAttribute("disabled","");
            input.value = "";
            let label = document.getElementById("label"+subInputID);
            let textArea =document.getElementById(subInputID);
            label.remove();
            textArea.remove();
        }
    }

    function validateDate(e,valueBool,inputVaild){
    
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        console.log(today);
        console.log(e.target.value)
        if(e.target.value > today ){
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

    function validateDateMonth(e,valueBool,inputVaild){
        let today = new Date();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm;


        console.log(today);
        console.log(e.target.value)
        if(e.target.value < today ){
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
 
        if( regX.test(e.target.value)){
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
            
            ourForm.addEventListener(type, (event) => {
              
                let submitbttn = document.getElementById("submitFormBtn");

                //check each sections function
                let generalInfoComplete = false;
                generalInfoComplete = checkGeneralInfo();

                let JobSpecificationsComplete = false;
                JobSpecificationsComplete = checkJobSpecifications();
                
     

            // If all sections are complete reable submit button.
            if(generalInfoComplete & JobSpecificationsComplete){
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
            & window["cityAddressValidBool"] & window["stateAddressVaildBool"]
            & window["zipValidBool"] & window["moveInDateValidBool"]
            & window["over18VaildBool"] & window["militaryServiceValidBool"]
            & window["firedFromJobValidBool"] & window["felonyConvictionValidBool"]
            &window["FelonyDiscritptionValidBool"] & window["firedFromJobDescriptionValidBool"]){
          
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

    function checkJobSpecifications(){
        let jobspecNav = document.getElementById("jobspecificationsNav");

        if(
            window["positionApplyingValidBool"] & window["salaryDesiredVaildBool"]
            & window["employmentTypeVaildBool"] & window["requirementsExplainedVaildBool"]
            & window["meetRequirementsVaildBool"] & window["hoursPerWeekVaildBool"]
            & window["workNightsVaildBool"] & window["startDateValidBool"]){
          
                jobspecNav.classList.remove('incomplete');
                jobspecNav.classList.add('complete');
                return true;
        }
        else{
            jobspecNav.classList.add('incomplete');
            jobspecNav.classList.remove('complete');
            return false;
        }
    }


});