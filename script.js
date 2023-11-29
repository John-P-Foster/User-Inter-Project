document.addEventListener("DOMContentLoaded", function () {

    const ourForm = document.querySelector('#ourForm');
    const regSSN = /^\d\d\d-\d\d-\d\d\d\d$/;
    const regZIP = /^\d\d\d\d\d$/;
    const regPhone = /^.{14}$/;
    const regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    
    //checking sections for compleations

    var generalInfoFields = 14;
    var educationFields = 3;
    var workExperienceFields = 13;
    var referencesFields = 5;
    var transportaionFields = 4;
   
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

        let referenceNav = document.getElementById("referenceNav");
        referenceNav.classList.add('incomplete');
        referenceNav.classList.remove('complete');

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
        educationFields += 3;
        checkInput();
        
    });
    
    //start work EX sections

    document.getElementById("addWorkExperience").addEventListener("click", function () {
        var newEntry = document.querySelector(".work-experience-entry").cloneNode(true);

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
        var workExperienceContainer = document.getElementById("workExperienceContainer");
        workExperienceContainer.appendChild(newEntry);

        // Append a separator (hr) to the container
        var separator = document.createElement("hr");
        workExperienceContainer.appendChild(separator);
        workExperienceFields += 13;
        checkDateMonth();checkDate();checkSelection(); checkAllRegXInputs(); checkInput();
        
    });

        // Listens to changes and updates the progress bar at the top.
    ['keyup', 'change','click'].forEach((type) => {
        
        ourForm.addEventListener(type, (event) => {
            
            let submitbttn = document.getElementById("submitFormBtn");

            let generalInfoComplete = checkSection(generalInfoFields,"generalNav","generalInfoSection");

            let JobSpecificationsComplete = checkSection(8,"jobspecificationsNav","jobSpecificationsSection");

            let referenceSectionComplete = checkSection(referencesFields,"referenceNav","referenceContainer");

            let eductionSectionComplete = checkSection(educationFields,"educationNav","schoolContainer");

            let WorkExSectinComplete = checkSection(workExperienceFields,"workExNav","workExperienceContainer");

            let transportationSectinComplete = checkSection(transportaionFields,"transportationNav","TransportationSection");

            let wavierSectinComplete = checkSection(1,"wavierNav","wavierSection");

            
            // If all sections are complete reable submit button.
            if(generalInfoComplete & JobSpecificationsComplete & eductionSectionComplete & WorkExSectinComplete 
                & referenceSectionComplete & transportationSectinComplete & wavierSectinComplete){
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

    
    var refCount = 0;

    document.getElementById("addReference").addEventListener('click', function () {
        if (refCount <= 3) {  
            var referenceContainer = document.getElementById('referenceContainer');
    
            var newReferenceEntry = document.createElement('div');
            newReferenceEntry.classList.add('reference-entry', 'row');
    
            newReferenceEntry.innerHTML = `
                <div class="col-md-4">
                    <div class="form-floating mb-3 inputNeedsValidation">
                        <input type="text" class="form-control" name="name" placeholder="Name">
                        <label for="name">Name</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3 inputNeedsValidation">
                        <input type="text" class="form-control" name="title" placeholder="Title">
                        <label for="title">Title</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3 inputNeedsValidation">
                        <input type="text" class="form-control" name="company" placeholder="Company">
                        <label for="company">Company</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3 phoneNeedsValidation">
                        <input type="text" class="form-control" name="phone" placeholder="Phone" oninput="maskPhoneNumber(this)">
                        <label for="phone">Phone</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3 emailNeedsValidation">
                        <input type="email" class="form-control" name="email" placeholder="Email">
                        <label for="email">Email</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3">
                        <textarea class="form-control" name="description" placeholder="Description" style="resize:none"></textarea>
                        <label for="description">Description</label>
                    </div>
                </div>
            `;
            
            refCount++;
    
            referenceContainer.appendChild(newReferenceEntry);
            referenceContainer.appendChild(document.createElement('hr')); // Add separator
            referencesFields += 5;
            checkAllRegXInputs(); checkInput();
        }
    
        // Check if refCount is 3, then update the button style
        if (refCount === 3) {
            var addButton = document.getElementById('addReference');
            addButton.style.backgroundColor = 'grey';
            addButton.style.color = 'white';
            addButton.disabled = true;  // Disable the button
        }
    });

    document.getElementById("validLicense").addEventListener('change', function () {
        let validLicense = document.getElementById("validLicense");
        if (validLicense.value == "Yes") {  
            let container = document.getElementById('licenseInfo');
            let newEntry = document.createElement('div');
            newEntry.innerHTML =`
            <div class="row" id="insertedLicenseInfo">
                <div class=" col-md-6">
                    <div class="row form-control" style="display: inline-flex;">
                        <div class="col-md" style="text-align: left; margin-left: 5px;">
                            <label for="exp" style="display: inline-block;">
                                <span>
                                    Expirationd Date
                                </span>
                            </label>
                        </div>
                        <div class="col-md" style="padding-right: 5px;">
                            <div class="form-floating dateNeedsValidation">
                                <input type="date" class="form-control" style="padding-top: 15px; padding-bottom: 15px; display: inline-block;" id="exp" name="exp" value="2023-11-01">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating mb-3 inputNeedsValidation" >
                        <input type="text" class="form-control" id="dlnum" placeholder="Full name" style="height: 72px;" required>
                        <label for="dlnum">Driver's License#:</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating mb-3 selectionNeedsValidation" >
                        <select class="form-select" id="dlstate" name="soi" style="height: 72px;">
                            <option selected value="" disabled>State</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        <label for="soi">State of issuance</label>
                    </div>
                </div>
            </div>
            `;
            container.appendChild(newEntry);
            transportaionFields += 3;
            checkAllRegXInputs(); checkInput();checkDate(); checkSelection();
        }
        else{
            let remove = document.getElementById("insertedLicenseInfo");
            remove.remove();
            transportaionFields -= 3;
        }
        // Check if refCount is 3, then update the button style
    });

});

//moving script 
// Add reference entry dynamically


//Masking Functions

function maskNumeric(input) {
    // Remove non-numeric characters using regex
    input.value = input.value.replace(/[^0-9]/g, '');
}
function maskSSN(input) {
    // Remove non-numeric characters using regex
    var cleanedInput = input.value.replace(/\D/g, '');

    // Apply SSN format (XXX-XX-XXXX)
    if (cleanedInput.length > 5) {
        cleanedInput = cleanedInput.substring(0, 3) + '-' + cleanedInput.substring(3, 5) + '-' + cleanedInput.substring(5, 9);
    } else if (cleanedInput.length > 3) {
        cleanedInput = cleanedInput.substring(0, 3) + '-' + cleanedInput.substring(3, 5);
    }

    // Update the input value
    input.value = cleanedInput;

}
function maskPhoneNumber(input) {
    // Remove non-numeric characters using regex
    var cleanedInput = input.value.replace(/\D/g, '');

    // Apply phone number format (XXX) XXX-XXXX
    if (cleanedInput.length >= 10) {
        cleanedInput = '(' + cleanedInput.substring(0, 3) + ') ' + cleanedInput.substring(3, 6) + '-' + cleanedInput.substring(6, 10);
    }

    // Update the input value
    input.value = cleanedInput;
}
function maskZip(input) {
    // Remove non-numeric characters using regex
    var cleanedInput = input.value.replace(/\D/g, '');

    // Enforce 5-digit limit
    cleanedInput = cleanedInput.substring(0, 5);

    // Update the input value
    input.value = cleanedInput;
}