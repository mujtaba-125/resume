declare const html2pdf:any;

/*Initializing the values and save in the variable after collection*/
const main_form = document.getElementById("main_form") as HTMLFormElement;
const resume_page= document.getElementById("resume_page") as HTMLElement;

// get the image from the choosen file
const resumephoto=document.getElementById("resumephoto") as HTMLImageElement;

// get the user input from the from 
const ResumeUserName=document.getElementById("ResumeUserName") as HTMLHeadingElement;
const ResumeEmail=document.getElementById("ResumeEmail") as HTMLParagraphElement;   
const ResumePhone=document.getElementById("ResumePhone") as HTMLParagraphElement;

// get the academic information from the form 
const resumeEducation=document.getElementById("resumeEducation") as HTMLParagraphElement;
const resumeschool=document.getElementById("resumeschool") as HTMLParagraphElement;
const resumecollege=document.getElementById("resumecollege") as HTMLParagraphElement;
const resumeuniversity=document.getElementById("resumeuniversity") as HTMLParagraphElement;

/*get the previous experience if they working or projects */
const ResumeWorkExperience=document.getElementById("ResumeWorkExperience") as HTMLParagraphElement;
const ResumeCompany=document.getElementById("ResumeCompany") as HTMLParagraphElement;
const ResumePosition=document.getElementById("ResumePosition") as HTMLParagraphElement;
const ResumeProjects=document.getElementById("ResumeProjects") as HTMLParagraphElement;

/*get the skills portion of the resume */
const ResumeSkills=document.getElementById("ResumeSkills") as HTMLParagraphElement;

//check boxes
// const Frontend=document.getElementById("Frontend") as HTMLInputElement;
// const Backend=document.getElementById("Backend") as HTMLInputElement;
// const Dataanalyst=document.getElementById("Dataanalyst") as HTMLInputElement;
// const Pyton=document.getElementById("Pyton") as HTMLInputElement;
// const DataScientist=document.getElementById("DataScientist") as HTMLInputElement;

/*Get the button element */
const editButton=document.getElementById("editButton") as HTMLButtonElement;
const backbutton=document.getElementById("backbutton") as HTMLButtonElement;
const sharelinkbutton=document.getElementById("sharelinkbutton") as HTMLButtonElement;
const downloadbutton=document.getElementById("downloadbutton") as HTMLButtonElement;


main_form.addEventListener("submit",async(event:Event)=>{
    event.preventDefault();//if anything wrong with the form this event will not submit the form

/*After collecting the data now we store the data in a variable */
const user_name = (document.getElementById("username") as HTMLInputElement).value;
const email=(document.getElementById("email") as HTMLInputElement).value;
const phone=(document.getElementById("phone") as HTMLInputElement).value;
const photo_f = document.getElementById("upload_photo") as HTMLInputElement;
const education = (document.getElementById("education") as HTMLTextAreaElement).value;
const school=(document.getElementById("school") as HTMLInputElement).value;
const college=(document.getElementById("college") as HTMLInputElement).value;
const university=(document.getElementById("university") as HTMLInputElement).value;
const workexperience=(document.getElementById("experience") as HTMLInputElement).value;
const company=(document.getElementById("company") as HTMLInputElement).value;
const position=(document.getElementById("position") as HTMLInputElement).value;
const projects = (document.getElementById("fresher") as HTMLTextAreaElement).value;
const skills=(document.getElementById("skills") as HTMLInputElement).value;
// const FD=Frontend.checked;
// const BD=Backend.checked;
// const DA=Dataanalyst.checked;
// const PY=Pyton.checked;
// const DS=DataScientist.checked;

//photo input collected here and to be safe used a ternary operator
const profile_photo=photo_f.files? photo_f.files[0]:null;

let photobase64='';

if (profile_photo){
    photobase64=await FiletoBase64(profile_photo);
    localStorage.setItem("upload_photo",photobase64);
    resumephoto.src=photobase64;
}
    document.querySelector("#main2_bg")?.classList.add("hidden");

    resume_page.classList.remove("hidden");

    ResumeUserName.textContent = user_name;
    ResumeEmail.textContent = `Email: ${email}`;
    ResumePhone.textContent = `Phone number: ${phone}`;
    resumeEducation.textContent = `Education detailed or other ceritfication: ${education}`;
    resumeschool.textContent = `Studied at  School: ${school}`;
    resumecollege.textContent = `Studied at College: ${college}`;
    resumeuniversity.textContent = `Studied at University: ${university}`;  
    ResumeWorkExperience.textContent = `Work Experience: ${workexperience}`; 
    ResumeCompany.textContent = `Company: ${company}`;  
    ResumePosition.textContent = `Position: ${position}`;
    ResumeProjects.textContent = `Projects: ${projects}`;
    ResumeSkills.textContent = `Skills: ${skills}`;
    ResumeProjects.textContent = `Projects: ${skills}`;
    // Frontend.checked = FD;
    // Backend.checked = BD;       
    // Dataanalyst.checked = DA;
    // Pyton.checked = PY;
    // DataScientist.checked = DS;

    // queryParams to store the data in the url 
    const queryParams=new URLSearchParams({
        username:ResumeUserName.textContent,
        email:ResumeEmail.textContent,
        phone:ResumePhone.textContent,
        education:resumeEducation.textContent,
        school:resumeschool.textContent,
        college:resumecollege.textContent,
        university:resumeuniversity.textContent,
        experience:ResumeWorkExperience.textContent,
        company:ResumeCompany.textContent,
        position:ResumePosition.textContent,
        projects:ResumeProjects.textContent,
        skills:ResumeSkills.textContent,
        // Frontend:Frontend.checked,
        // Backend:Backend.checked,
        // Dataanalyst:Dataanalyst.checked,
        // Pyton:Pyton.checked,
        // DataScientist:DataScientist.checked,
    })

    const uniqueUrl=`${window.location.origin}?${queryParams.toString()}`;//create a unique url for the user
    sharelinkbutton.addEventListener("click",()=>{
        navigator.clipboard.writeText(uniqueUrl);//copy the link to the clipboard and paste it to the browser
        alert("Link copied to clipboard");
    })
    window.history.replaceState(null,"",`${queryParams.toString()}`);//replace the url with the unique url
    
});



function FiletoBase64(file:File):Promise<string>{

    return new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.onload=()=>resolve(reader.result as string);
        reader.onerror=reject;
        reader.readAsDataURL(file);

    });
}
editButton.addEventListener("click",()=>{
    updateFormFromResume();
    document.querySelector("#main2_bg")?.classList.remove("hidden");
    resume_page.classList.add("hidden");
})

function updateFormFromResume(){
    (document.getElementById("username") as HTMLInputElement).value=ResumeUserName.textContent||"";
    (document.getElementById("email") as HTMLInputElement).value=ResumeEmail.textContent?.replace("Email: ","")||"";
    (document.getElementById("phone") as HTMLInputElement).value=ResumePhone.textContent?.replace("Phone number: ","")||"";
    (document.getElementById("education") as HTMLInputElement).value=resumeEducation.textContent?.replace("Education detailed or other ceritfication: ","")||"";
    (document.getElementById("school") as HTMLInputElement).value=resumeschool.textContent?.replace("Studied at  School: ","")||"";
    (document.getElementById("college") as HTMLInputElement).value=resumecollege.textContent?.replace("Studied at College: ","")||"";
    (document.getElementById("university") as HTMLInputElement).value=resumeuniversity.textContent?.replace("Studied at University: ","")||"";
    (document.getElementById("experience") as HTMLInputElement).value=ResumeWorkExperience.textContent?.replace("Work Experience: ","")||"";
    (document.getElementById("company") as HTMLInputElement).value=ResumeCompany.textContent?.replace("Company: ","")||"";
    (document.getElementById("position") as HTMLInputElement).value=ResumePosition.textContent?.replace("Position: ","")||"";
    (document.getElementById("fresher") as HTMLInputElement).value=ResumeProjects.textContent?.replace("Projects: ","")||"";
    (document.getElementById("skills") as HTMLInputElement).value=ResumeSkills.textContent?.replace("Skills: ","")||"";

}

downloadbutton.addEventListener("click",()=>{
    if(typeof html2pdf === 'undefined'){
        alert("Error: html2pdf is not loaded");
        return;
//      html2pdf().from(resume_page).save();
};

const resumeoptions={
    margin:0,
    filename:'resume.pdf',
    image:{type:'jpeg',quality:0.98},
    html2canvas:{scale:2},
    jsPDF:{unit:'in',format:'letter',orientation:'portrait'}
}

const resume_content = document.getElementById("resume_page") as HTMLElement;

html2pdf()
.from(resume_content)
.set(resumeoptions)
.save()
.catch((error:Error)=>{
    console.error("pdf error",error);
    alert("An error occurred while generating the resume");
});

})
window.addEventListener("DOMContentLoaded",()=>{
    const params=new URLSearchParams(window.location.search);
    const name=params.get("username")||'';
    const email=params.get("email")||'';
    const phone=params.get("phone")||'';
    const education=params.get("education")||'';
    const school=params.get("school")||'';
    const college=params.get("college")||'';
    const university=params.get("university")||'';
    const experience=params.get("experience")||'';
    const company=params.get("company")||'';
    const position=params.get("position")||'';
    const projects=params.get("projects")||'';
    const skills=params.get("skills")||'';

    if(name||email||phone||education||school||college||university||experience||company||position||projects||skills){
        // resume_page.classList.remove("hidden");
        ResumeUserName.textContent=name;
        ResumeEmail.textContent=`Email: ${email}`;
        ResumePhone.textContent=`Phone number: ${phone}`;
        resumeEducation.textContent=`Education detailed or other ceritfication: ${education}`;
        resumeschool.textContent=`Studied at  School: ${school}`;
        resumecollege.textContent=`Studied at College: ${college}`;
        resumeuniversity.textContent=`Studied at University: ${university}`;
        ResumeWorkExperience.textContent=`Work Experience: ${experience}`;
        ResumeCompany.textContent=`Company: ${company}`;
        ResumePosition.textContent=`Position: ${position}`;
        ResumeProjects.textContent=`Projects: ${projects}`;
        ResumeSkills.textContent=`Skills: ${skills}`;

        const savephoto=localStorage.getItem("upload_photo");
        if(savephoto){
            resumephoto.src=savephoto
    }
}
});

//css for ensuring image is sytled properly
resumephoto.style.width="150px";
resumephoto.style.height="150px";
resumephoto.style.borderRadius="50%";
resumephoto.style.margin="0 auto";
resumephoto.style.objectFit="cover";    
resumephoto.style.display="block";