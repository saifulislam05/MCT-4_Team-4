
const colorPickerHeader=document.getElementById("colorPickerHeader");
const nameInput=document.getElementById("name");
const headerRight=document.getElementById("headerRight");
const colorPickerHeaderText=document.getElementById("colorPickerHeaderText");

colorPickerHeader.addEventListener("input",()=>{

    const selectedColor = colorPickerHeader.value;
    headerRight.style.backgroundColor=selectedColor;
});

colorPickerHeaderText.addEventListener("input",()=>{
    const userNameElement = document.querySelector(".userName");
    if (userNameElement) {
      userNameElement.style.color = colorPickerHeaderText.value;
    }
  });


const nameRightMinimalist=document.getElementById("nameRightMinimalist");

nameInput.addEventListener("input", function() {
    const userName = nameInput.value;
    const nameElement = document.createElement("h1");
    nameElement.classList.add("userName");
    nameElement.textContent = userName;
    headerRight.innerHTML = ''; 
    headerRight.appendChild(nameElement);

    nameElement.style.color = colorPickerHeaderText.value;

    const nameMinimalist=nameInput.value;
    const nameMinimalistElement=document.createElement("h1");
    nameMinimalistElement.classList.add("userName");
    nameMinimalistElement.innerText=nameMinimalist;

    nameRightMinimalist.innerHTML='';
    nameRightMinimalist.appendChild(nameMinimalistElement);

  });

  const phoneDiv= document.getElementById("phoneDiv");
  const emailDiv=document.getElementById("emailDiv");
  const locationDiv=document.getElementById("locationDiv");

  const emailInput =document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const locationInput = document.getElementById("city");

  const emailDivMinimalist=document.getElementById("emailDivMinimalist");

  emailInput.addEventListener("input",()=>{
   const emailId = emailInput.value;
   emailDiv.innerText=emailId;
   emailDiv.classList.add("email-container");
   emailDiv.classList.add("span")
   emailDivMinimalist.innerText=emailId;
  });
  
  const phoneMinimalist = document.getElementById('phoneMinimalist');

  phoneInput.addEventListener('input', () => {
    const phoneNumber = phoneInput.value;
    phoneDiv.innerText = phoneNumber; 
    phoneDiv.classList.add("span");
    phoneMinimalist.innerText = phoneNumber;
  });
  
const locationDivMinimalist=document.getElementById("locationDivMinimalist");
  locationInput.addEventListener("input",()=>{
    const locationText = locationInput.value;
    locationDiv.innerText=locationText;
    locationDiv.classList.add("span");

    locationDivMinimalist.innerText=locationText;
  })
 
  const pMinimalist=document.getElementById("pMinimalist");
  const jobTitleInput=document.getElementById("jobTitleInput");
  jobTitleInput.addEventListener("input",function(){
  
    const textInput=jobTitleInput.value;
    const textInputElement=document.createElement("p");
    textInputElement.classList.add("pheader");
    textInputElement.innerText=textInput;
    
    pMinimalist.innerHTML='';
    pMinimalist.appendChild(textInputElement);

  });


  const summaryDiv=document.getElementById("summaryDiv");
  const textarea=document.getElementById("textarea");
  const summaryDivMinimalist=document.getElementById("summaryDivMinimalist");

  textarea.addEventListener("input",()=>{
    const summaryValue =textarea.value;
    const summaryText =document.createElement("p");
    summaryText.classList.add("summary");
    summaryText.innerText=summaryValue;

    summaryDiv.innerHTML="";
    summaryDiv.appendChild(summaryText);

  summaryDivMinimalist.innerHTML = "";
  summaryDivMinimalist.appendChild(summaryText.cloneNode(true));


  });

  const skillsInput = document.getElementById("skills");
  const skillsDiv=document.getElementById("skillsDiv");

  skillsInput.addEventListener("input",()=>{
  const skills = skillsInput.value.split(",").map(skill=>skill.trim());
  displaySkills(skills);
  });

  function displaySkills(skills){
    skillsDiv.innerHTML="";
    skills.forEach(skill=>{
    if(skill){
        const skillText =document.createElement("p");
        skillText.classList.add("skillText");
        skillText.innerText=skill;
        skillsDiv.appendChild(skillText);
    }
    });
  }


const skillsDivMinimalist = document.getElementById("skillsDivMinimalist");

skillsInput.addEventListener("input", () => {
  const skills = skillsInput.value.split(",").map(skill => skill.trim());
  updateSkillsInMinimalist(skills);
});

function updateSkillsInMinimalist(skills) {
  skillsDivMinimalist.innerHTML = "";

  skills.forEach(skill => {
    if (skill) {
      const skillText = document.createElement("p");
      skillText.classList.add("skillText");
      skillText.innerText = skill;
      skillsDivMinimalist.appendChild(skillText);
    }
  });
}




const employementButton = document.getElementById("employementButton");
const employementDetails = document.getElementById("employementDetails");
const professionalDiv = document.getElementById("professionalDiv");
const professionalDivMinimalist=document.getElementById("professionalDivMinimalist");

const employmentEntries = [];

employementButton.addEventListener("click", function() {
  event.preventDefault();
  createForm();
});

function createForm() {
  const form = document.createElement("form");
  form.innerHTML = `
    <p>Start Date</p>
    <input type="date" class="text-input startDate"><br>
    <p>End Date</p>
    <input type="date" class="text-input endDate"><br><br>
    <input type="text" class="text-input jobText" placeholder="JobTitle"><br><br>
    <input type="text" class="text-input employer" placeholder="Employer"><br><br>
    <textarea class="description" placeholder="Description" rows="5" cols="60"></textarea><br>
  `;

  form.addEventListener("input", function() {
    updateDetails();
    updateSecondTemplateDetails();
  });

  employementDetails.appendChild(form);
}

function updateDetails() {
  const forms = employementDetails.querySelectorAll('form');
  employmentEntries.length = 0; 

  forms.forEach(form => {
    const startDate = form.querySelector('.startDate').value;
    const endDate = form.querySelector('.endDate').value;
    const jobTextContent = form.querySelector('.jobText').value;
    const employer = form.querySelector('.employer').value;
    const description = form.querySelector('.description').value;

    const employmentEntry = {
      startDate,
      endDate,
      jobTextContent,
      employer,
      description
    };

    employmentEntries.push(employmentEntry);
  });

  displayEmploymentEntries();
}

function displayEmploymentEntries() {
  professionalDiv.innerHTML = ""; 

  employmentEntries.forEach(entry => {
    const details = `
      <div class="employmentEntry">
       <div class="flexDetailsColor">
        <p class="colorContent">${entry.jobTextContent}</p>
        <p class="colorJob">${entry.startDate} - ${entry.endDate}</p>
        </div>
        <p class="color">${entry.employer}</p>
        <p class="color">${entry.description}</p>
      </div>
    `;

    const entryDiv = document.createElement("div");
    entryDiv.classList.add("employmentEntry");
    entryDiv.innerHTML = details;
    professionalDiv.appendChild(entryDiv);
  });
}


function updateSecondTemplateDetails() {
  const forms = employementDetails.querySelectorAll('form');
  employmentEntries.length = 0;

  forms.forEach(form => {
    const startDate = form.querySelector('.startDate').value;
    const endDate = form.querySelector('.endDate').value;
    const jobTextContent = form.querySelector('.jobText').value;
    const employer = form.querySelector('.employer').value;
    const description = form.querySelector('.description').value;

    const employmentEntry = {
      startDate,
      endDate,
      jobTextContent,
      employer,
      description
    };

    employmentEntries.push(employmentEntry);
  });

  displayEmploymentEntriesMinimalist();
}

function displayEmploymentEntriesMinimalist() {
  professionalDivMinimalist.innerHTML = "";

  employmentEntries.forEach(entry => {
    const details = `
      <div class="employmentEntry">
      <div class="flexDetailsColor">
        <p class="colorContent">${entry.jobTextContent}</p>
        <p class="colorJob">${entry.startDate} - ${entry.endDate}</p>
        </div>
        <p class="color">${entry.employer}</p>
        <p class="color">${entry.description}</p>
      </div>
    `;

    const entryDiv = document.createElement("div");
    entryDiv.classList.add("employmentEntry");
    entryDiv.innerHTML = details;

    professionalDivMinimalist.appendChild(entryDiv);
  });
}



const projectButton=document.getElementById("projectButton");
const projectDetails=document.getElementById("projectDetails");
const projectsDiv=document.getElementById("projectsDiv");
const projectsDivMinimalist=document.getElementById("projectsDivMinimalist");

const projectEntries=[];

projectButton.addEventListener("click",(event)=>{
event.preventDefault();
createProjectForm();
});

function createProjectForm(){
  const form = document.createElement("form");
  form.innerHTML = `
    <p>Start Date</p>
    <input type="date" class="text-input startDate"><br>
    <p>End Date</p>
    <input type="date" class="text-input endDate"><br><br>
    <input type="text" class="text-input projectTitle" placeholder="projectTitle"><br><br>
    <textarea class="projectDescription"  placeholder="Description" rows="5" cols="60"></textarea><br>
  `;

  form.addEventListener("input", function() {
    updateProjectDetails();
    updateProjectDetailsMinimalist();
  });

  projectDetails.appendChild(form);

}
function updateProjectDetails(){
  const forms = projectDetails.querySelectorAll('form');
  projectEntries.length = 0; 

  forms.forEach(form => {
    const startDate = form.querySelector('.startDate').value;
    const endDate = form.querySelector('.endDate').value;
    const projectTextContent = form.querySelector('.projectTitle').value;
    const description = form.querySelector('.projectDescription').value;

    const projectEntry = {
      startDate,
      endDate,
      projectTextContent,
      description
    };

    projectEntries.push(projectEntry);
  });

  displayProjectEntries();
}

function displayProjectEntries(){
  projectsDiv.innerHTML = ""; 

  projectEntries.forEach(entry => {
    const details = `
    <div class="flexDetailsColor">
    <p class="colorContent">${entry.projectTextContent}</p>
    <p class="colorJob">${entry.startDate} - ${entry.endDate}</p>
    </div>
    <p class="color">${entry.description}</p>
      </div>
    `;

    const entryDiv = document.createElement("div");
    entryDiv.classList.add("projectEntry");
    entryDiv.innerHTML = details;
    projectsDiv.appendChild(entryDiv);
  });
}



function updateProjectDetailsMinimalist(){
  const forms = projectDetails.querySelectorAll('form');
  projectEntries.length = 0; 

  forms.forEach(form => {
    const startDate = form.querySelector('.startDate').value;
    const endDate = form.querySelector('.endDate').value;
    const projectTextContent = form.querySelector('.projectTitle').value;
    const description = form.querySelector('.projectDescription').value;

    const projectEntry = {
      startDate,
      endDate,
      projectTextContent,
      description
    };

    projectEntries.push(projectEntry);
  });

  displayProjectEntriesMinimalist();
}

function displayProjectEntriesMinimalist(){
  projectsDivMinimalist.innerHTML = ""; 

  projectEntries.forEach(entry => {
    const details = `
      <div class="flexDetailsColor">
      <p class="colorContent">${entry.projectTextContent}</p>
      <p class="colorJob">${entry.startDate} - ${entry.endDate}</p>
      </div>
        <p class="color">${entry.description}</p>
      </div>
    `;

    const entryDiv = document.createElement("div");
    entryDiv.classList.add("projectEntry");
    entryDiv.innerHTML = details;
    projectsDivMinimalist.appendChild(entryDiv);
  });
}


const educationDiv = document.getElementById("educationDiv");
const educationButton = document.getElementById("educationButton");
const educationDetails = document.getElementById("educationDetails");
const educationDivMinimalist=document.getElementById("educationDivMinimalist");

const educationEntries = [];

educationButton.addEventListener("click", (event) => {
  event.preventDefault();
  createEducationForm();
});

function createEducationForm() {
  const form = document.createElement("div");
  form.innerHTML = `
    <p>Start Date</p>
    <input type="date" class="text-input startDate"><br>
    <p>End Date</p>
    <input type="date" class="text-input endDate"><br><br>
    <input type="text" class="text-input qualification" placeholder="Qualification"><br><br>
    <input type="text" class="text-input schoolDetails" placeholder="school/college"><br><br>
    <textarea class="educationDescription" placeholder="Description" rows="5" cols="60"></textarea><br>
  `;

  form.addEventListener("input", function () {
    updateEducationDetails();
    updateEducationDetailsMinimalist();
  });

  educationDetails.appendChild(form);
}

function updateEducationDetails() {
  const forms = educationDetails.querySelectorAll('div > div'); 
  educationEntries.length = 0;

  forms.forEach((form, index) => {
    const startDate = form.querySelector('.startDate').value;
    const endDate = form.querySelector('.endDate').value;
    const qualificationText = form.querySelector('.qualification').value;
    const educationTextContent = form.querySelector('.schoolDetails').value;
    const description = form.querySelector('.educationDescription').value;

    const educationEntry = {
      startDate,
      endDate,
      qualificationText,
      educationTextContent,
      description,
    };

    educationEntries[index] = educationEntry;
  });

  displayEducationEntries();
}

function displayEducationEntries() {
  educationDiv.innerHTML = "";

  educationEntries.forEach((entry) => {
    const details = `
    <div class="flexDetailsColor">
     <p class="colorContent">${entry.qualificationText}</p>
      <p class="colorJob">${entry.startDate} - ${entry.endDate}</p>
      </div>
      <p class="color">${entry.educationTextContent}</p>
      <p class="color">${entry.description}</p>
    `;

    const entryDiv = document.createElement("div");
    entryDiv.classList.add("educationEntry");
    entryDiv.innerHTML = details;
    educationDiv.appendChild(entryDiv);
  });
}


function updateEducationDetailsMinimalist() {
  const forms = educationDetails.querySelectorAll('div > div'); 
  educationEntries.length = 0;

  forms.forEach((form, index) => {
    const startDate = form.querySelector('.startDate').value;
    const endDate = form.querySelector('.endDate').value;
    const qualificationText = form.querySelector('.qualification').value;
    const educationTextContent = form.querySelector('.schoolDetails').value;
    const description = form.querySelector('.educationDescription').value;

    const educationEntry = {
      startDate,
      endDate,
      qualificationText,
      educationTextContent,
      description,
    };

    educationEntries[index] = educationEntry;
  });

  displayEducationEntriesMinimalist();
}

function displayEducationEntriesMinimalist() {
  educationDivMinimalist.innerHTML = "";

  educationEntries.forEach((entry) => {
    const details = `
    <div class="flexDetailsColor">
    <p class="colorContent">${entry.qualificationText}</p>
      <p class="colorJob">${entry.startDate} - ${entry.endDate}</p>
      </div>
      <p class="color">${entry.educationTextContent}</p>
      <p class="color">${entry.description}</p>
    `;

    const entryDiv = document.createElement("div");
    entryDiv.classList.add("educationEntry");
    entryDiv.innerHTML = details;
    educationDivMinimalist.appendChild(entryDiv);
  });
}

const templateSelector = document.getElementById('templateType');
const minimalistTemplate = document.getElementById('minimalistTemplate');
const twoColumnTemplate = document.getElementById('twoColumnTemplate');

templateSelector.addEventListener('change', function() {
  const selectedTemplate = templateSelector.value;

  if (selectedTemplate === 'minimalist') {
    minimalistTemplate.style.display = 'block';
    twoColumnTemplate.style.display = 'none';
  } else if (selectedTemplate === 'twoColumn') {
    minimalistTemplate.style.display = 'none';
    twoColumnTemplate.style.display = 'block';
  }
});


const downloadButton = document.getElementById('downloadButton');
const minimalistTemplateResume = document.getElementById('minimalistTemplate');
const twoColumnTemplateResume = document.getElementById('twoColumnTemplate');
const templateSelectorResume = document.getElementById('templateType');

downloadButton.addEventListener('click', function() {
  const selectedTemplate = templateSelectorResume.value;
  let content = '';

  if (selectedTemplate === 'minimalist') {
    content = minimalistTemplateResume.innerHTML;
  } else if (selectedTemplate === 'twoColumn') {
    content = twoColumnTemplateResume.innerHTML;
  }

  if (content) {
    html2pdf().from(content).save('resume_template.pdf');
  }
});
