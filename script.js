document.addEventListener("DOMContentLoaded", function () {

    const ourForm = document.querySelector('#ourForm');
    const regSSN = /^\d\d\d-\d\d-\d\d\d\d$/;
    const regZIP = /^\d\d\d\d\d$/;
    const regPhone = /^\d\d\d-\d\d\d-\d\d\d\d$/;
    const regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    
    //checking sections for compleations

    var generalInfoFields = 14;
    var educationFields = 3;
    var workExperienceFields = 13;
   
    function checkSection(numOfFields, navSectionId, sectionId){
        let navSection = document.getElementById(navSectionId);
        let section = document.getElementById(sectionId)
        let correctFields = section.querySelectorAll(".was-validated");

        
        if(numOfFields == correctFields.length)
        {
            navSection.classList.remove('incomplete');
            navSection.classList.add('complete');
            return true;
        }
     else{
            navSection.classList.add('incomplete');
            navSection.classList.remove('complete');
            return false;
        } 
    }

    checkSelectionWithSubsection("firedFromJob","firedFromJobValid","firedFromJobDescription","firedFromJobDescriptionValid","change");
    checkSelectionWithSubsection("felonyConviction","felonyConvictionValid","FelonyDiscritption","FelonyDiscritptionValid","change");

    //start validation methods based on classnames
    function checkInput(){
        let inputs = document.querySelectorAll(".inputNeedsValidation")
        
        Array.from(inputs).forEach(input => {
            input.addEventListener('input', event => {
                
                if (event.target.value.length <= 1) {
                    input.classList.remove('was-validated')
                    input.classList.add('is-incorrect')
                }
                else{
                    input.classList.add('was-validated')
                    input.classList.remove('is-incorrect')
                }
            })
        })
    }
    checkInput();

    function checkRegXInput(regXitem, regX){
        let inputs = document.querySelectorAll(regXitem)
        
        Array.from(inputs).forEach(input => {
            input.addEventListener('input', e => {
                
                if( regX.test(e.target.value)){
                    input.classList.add('was-validated');
                    input.classList.remove('is-incorrect');
                }
                else if(e.target.value.length > 1){
                    input.classList.remove('was-validated');
                    input.classList.add('is-incorrect');
                }
            })
        })
    }

    function checkAllRegXInputs(){
        checkRegXInput(".ssnNeedsValidation", regSSN);
        checkRegXInput(".zipNeedsValidation", regZIP);
        checkRegXInput(".phoneNeedsValidation", regPhone);
        checkRegXInput(".emailNeedsValidation", regEmail);
    }
    checkAllRegXInputs();


    function checkSelection(){
        let inputs = document.querySelectorAll(".selectionNeedsValidation")
        console.log("check selection");
        Array.from(inputs).forEach(input => {
            input.addEventListener('change', event => {
                
                if(event.target.value != ""){
                    input.classList.add('was-validated');
                    input.classList.remove('is-incorrect');
                    
                }
                else{
                    input.classList.remove('was-validated');
                    input.classList.add('is-incorrect');
                    
                }
            })
        })
    }
    checkSelection();

    function checkDate(){
        let inputs = document.querySelectorAll(".dateNeedsValidation")

        Array.from(inputs).forEach(input => {
            input.addEventListener('change', e => {
                
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                let yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
        
                if(e.target.value > today ){
                    input.classList.add('was-validated');
                    input.classList.remove('is-incorrect');
                }
                else{
                    input.classList.remove('was-validated');
                    input.classList.add('is-incorrect');
                }
            })
        })
    }
    checkDate();


    function checkDateMonth(){
        let inputs = document.querySelectorAll(".monthNeedsValidation")
        
        Array.from(inputs).forEach(input => {
            input.addEventListener('change', e => {
                
                let today = new Date();
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                let yyyy = today.getFullYear();
                today = yyyy + '-' + mm;
        
                if(e.target.value < today ){
                    input.classList.add('was-validated');
                    input.classList.remove('is-incorrect');
                }
                else{
                    input.classList.remove('was-validated');
                    input.classList.add('is-incorrect');
                }
            })
        })
    }
    checkDateMonth();

    function checkSelectionWithSubsection(inputId,controlFormId,subInputID,subControlID,kind){
        var input = document.getElementById(inputId);
        var controlForm = document.getElementById(controlFormId);
        input.addEventListener(kind,function(e){validateSelectionWithSubsection(e,controlForm,subInputID,subControlID)})
    }


    function validateSelectionWithSubsection(e,inputVaild, subInputID,subControlID){
        let input = document.getElementById(subInputID);
        let formControl = document.getElementById(subControlID)
        if(e.target.value != ""){
            inputVaild.classList.add('was-validated');
            inputVaild.classList.remove('is-incorrect');
           
        }
        else{
            inputVaild.classList.remove('was-validated');
            inputVaild.classList.add('is-incorrect');
            window[valueBool] = false;
        }
        if(e.target.value === "Yes"){
            
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
            formControl.classList.add("inputNeedsValidation")
            generalInfoFields ++;
            console.log(generalInfoFields);
            checkInput();   
        }
        else{
            input.setAttribute("disabled","");
            input.value = "";
            let label = document.getElementById("label"+subInputID);
            let textArea =document.getElementById(subInputID);
            label.remove();
            textArea.remove();
            generalInfoFields --;
        }
    }
   //end validation methods based on classnames

    //reset button action
    document.getElementById("resetButton").addEventListener("click", function (){

        let submitbttn = document.getElementById("submitFormBtn");
        submitbttn.setAttribute("disabled","");
        submitbttn.classList.remove('btn-success');
        submitbttn.classList.add('btn-secondary');

        let general = document.getElementById("generalNav");
        general.classList.add('incomplete');
        general.classList.remove('complete');

        let jobspecNav = document.getElementById("jobspecificationsNav");
        jobspecNav.classList.add('incomplete');
        jobspecNav.classList.remove('complete');

        let educationNav = document.getElementById("educationNav");
        educationNav.classList.add('incomplete');
        educationNav.classList.remove('complete');

        let workExNav = document.getElementById("workExNav");
        workExNav.classList.add('incomplete');
        workExNav.classList.remove('complete');

        let validations = document.querySelectorAll(".was-validated");

        Array.from(validations).forEach(validation => {
            validation.classList.remove('was-validated');
               
        });

        let incorrects = document.querySelectorAll('.is-incorrect');
        Array.from(incorrects).forEach(incorrect => {
            incorrect.classList.remove('is-incorrect');
        });
    });


    //start Degree input secript
 
    document.getElementById("addSchool").addEventListener("click", function () {
        var newEntry = document.querySelector(".school-entry").cloneNode(true);

        // Clear the input values in the cloned entry
        var inputFields = newEntry.querySelectorAll("input");
        inputFields.forEach(function (input) {
            input.value = "";
        });
        var editFields = newEntry.querySelectorAll(".was-validated");
        editFields.forEach(function (input) {
            input.classList.remove("was-validated");
            input.classList.add("is-incorrect");
        });

        // Append the new entry to the container
        var schoolContainer = document.getElementById("schoolContainer");
        schoolContainer.appendChild(newEntry);

        // Append a separator (hr) to the container
        var separator = document.createElement("hr");
        schoolContainer.appendChild(separator);
        degreeForms += 3;
        
    });
    
    var degreeForms = 3;
    var completedEducation = 0;
    function checkEducationSection(){
        let educationNav = document.getElementById("educationNav");
        if(degreeForms == completedEducation)
        {
            educationNav.classList.remove('incomplete');
            educationNav.classList.add('complete');
            return true;
        }
     else{
            educationNav.classList.add('incomplete');
            educationNav.classList.remove('complete');
            return false;
        }
       
    }


    //start work EX sections

    document.getElementById("addWorkExperience").addEventListener("click", function () {
        var newEntry = document.querySelector(".work-experience-entry").cloneNode(true);

        // Clear the input values in the cloned entry
        var inputFields = newEntry.querySelectorAll("input");
        inputFields.forEach(function (input) {
            input.value = "";
        });

        // Append the new entry to the container
        var workExperienceContainer = document.getElementById("workExperienceContainer");
        workExperienceContainer.appendChild(newEntry);

        // Append a separator (hr) to the container
        var separator = document.createElement("hr");
        workExperienceContainer.appendChild(separator);
    });


        // Listens to changes and updates the progress bar at the top.
        ['keyup', 'change'].forEach((type) => {
            
            ourForm.addEventListener(type, (event) => {
              
                let submitbttn = document.getElementById("submitFormBtn");

                let generalInfoComplete = checkSection(generalInfoFields,"generalNav","generalInfoSection");

                let JobSpecificationsComplete = checkSection(8,"jobspecificationsNav","jobSpecificationsSection");

                let eductionSectionComplete = checkSection(educationFields,"educationNav","schoolContainer")

                let WorkExSectinComplete = checkSection(workExperienceFields,"workExNav","workExperienceContainer");

                
                
            // If all sections are complete reable submit button.
            if(generalInfoComplete & JobSpecificationsComplete & eductionSectionComplete & WorkExSectinComplete ){
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

    //Sets navbar collapse on screen adjust
    var thresholdWidth = 1200;
    var previousWidth = window.innerWidth;
    window.onresize = function() {
    
        let navbar = document.getElementById("ourNavList");
        var movedUpThroughThreshold = previousWidth < thresholdWidth &&
        window.innerWidth >= thresholdWidth;
        var movedDownThroughThreshold = previousWidth >= thresholdWidth &&
        window.innerWidth <= thresholdWidth;
    
      if (movedUpThroughThreshold ) {
        navbar.classList.remove("ourNavList")
        console.log("Screen got biger", previousWidth, "->", window.innerWidth)
      }
      if (movedDownThroughThreshold) {
        console.log("screen got smaller", previousWidth, "->", window.innerWidth)
        navbar.classList.add("ourNavList")
      }
    
      previousWidth = window.innerWidth;
    }


});