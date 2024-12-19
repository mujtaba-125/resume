"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*Initializing the values and save in the variable after collection*/
const main_form = document.getElementById("main_form");
const resume_page = document.getElementById("resume_page");
// get the image from the choosen file
const resumephoto = document.getElementById("resumephoto");
// get the user input from the from 
const ResumeUserName = document.getElementById("ResumeUserName");
const ResumeEmail = document.getElementById("ResumeEmail");
const ResumePhone = document.getElementById("ResumePhone");
// get the academic information from the form 
const resumeEducation = document.getElementById("resumeEducation");
const resumeschool = document.getElementById("resumeschool");
const resumecollege = document.getElementById("resumecollege");
const resumeuniversity = document.getElementById("resumeuniversity");
/*get the previous experience if they working or projects */
const ResumeWorkExperience = document.getElementById("ResumeWorkExperience");
const ResumeCompany = document.getElementById("ResumeCompany");
const ResumePosition = document.getElementById("ResumePosition");
const ResumeProjects = document.getElementById("ResumeProjects");
/*get the skills portion of the resume */
const ResumeSkills = document.getElementById("ResumeSkills");
//check boxes
// const Frontend=document.getElementById("Frontend") as HTMLInputElement;
// const Backend=document.getElementById("Backend") as HTMLInputElement;
// const Dataanalyst=document.getElementById("Dataanalyst") as HTMLInputElement;
// const Pyton=document.getElementById("Pyton") as HTMLInputElement;
// const DataScientist=document.getElementById("DataScientist") as HTMLInputElement;
/*Get the button element */
const editButton = document.getElementById("editButton");
const backbutton = document.getElementById("backbutton");
const sharelinkbutton = document.getElementById("sharelinkbutton");
const downloadbutton = document.getElementById("downloadbutton");
main_form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault(); //if anything wrong with the form this event will not submit the form
    /*After collecting the data now we store the data in a variable */
    const user_name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const photo_f = document.getElementById("upload_photo");
    const education = document.getElementById("education").value;
    const school = document.getElementById("school").value;
    const college = document.getElementById("college").value;
    const university = document.getElementById("university").value;
    const workexperience = document.getElementById("experience").value;
    const company = document.getElementById("company").value;
    const position = document.getElementById("position").value;
    const projects = document.getElementById("fresher").value;
    const skills = document.getElementById("skills").value;
    // const FD=Frontend.checked;
    // const BD=Backend.checked;
    // const DA=Dataanalyst.checked;
    // const PY=Pyton.checked;
    // const DS=DataScientist.checked;
    //photo input collected here and to be safe used a ternary operator
    const profile_photo = photo_f.files ? photo_f.files[0] : null;
    let photobase64 = '';
    if (profile_photo) {
        photobase64 = yield FiletoBase64(profile_photo);
        localStorage.setItem("upload_photo", photobase64);
        resumephoto.src = photobase64;
    }
    (_a = document.querySelector("#main2_bg")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
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
    const queryParams = new URLSearchParams({
        username: ResumeUserName.textContent,
        email: ResumeEmail.textContent,
        phone: ResumePhone.textContent,
        education: resumeEducation.textContent,
        school: resumeschool.textContent,
        college: resumecollege.textContent,
        university: resumeuniversity.textContent,
        experience: ResumeWorkExperience.textContent,
        company: ResumeCompany.textContent,
        position: ResumePosition.textContent,
        projects: ResumeProjects.textContent,
        skills: ResumeSkills.textContent,
        // Frontend:Frontend.checked,
        // Backend:Backend.checked,
        // Dataanalyst:Dataanalyst.checked,
        // Pyton:Pyton.checked,
        // DataScientist:DataScientist.checked,
    });
    const uniqueUrl = `${window.location.origin}?${queryParams.toString()}`; //create a unique url for the user
    sharelinkbutton.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqueUrl); //copy the link to the clipboard and paste it to the browser
        alert("Link copied to clipboard");
    });
    window.history.replaceState(null, "", `${queryParams.toString()}`); //replace the url with the unique url
}));
function FiletoBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
editButton.addEventListener("click", () => {
    var _a;
    updateFormFromResume();
    (_a = document.querySelector("#main2_bg")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resume_page.classList.add("hidden");
});
function updateFormFromResume() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    document.getElementById("username").value = ResumeUserName.textContent || "";
    document.getElementById("email").value = ((_a = ResumeEmail.textContent) === null || _a === void 0 ? void 0 : _a.replace("Email: ", "")) || "";
    document.getElementById("phone").value = ((_b = ResumePhone.textContent) === null || _b === void 0 ? void 0 : _b.replace("Phone number: ", "")) || "";
    document.getElementById("education").value = ((_c = resumeEducation.textContent) === null || _c === void 0 ? void 0 : _c.replace("Education detailed or other ceritfication: ", "")) || "";
    document.getElementById("school").value = ((_d = resumeschool.textContent) === null || _d === void 0 ? void 0 : _d.replace("Studied at  School: ", "")) || "";
    document.getElementById("college").value = ((_e = resumecollege.textContent) === null || _e === void 0 ? void 0 : _e.replace("Studied at College: ", "")) || "";
    document.getElementById("university").value = ((_f = resumeuniversity.textContent) === null || _f === void 0 ? void 0 : _f.replace("Studied at University: ", "")) || "";
    document.getElementById("experience").value = ((_g = ResumeWorkExperience.textContent) === null || _g === void 0 ? void 0 : _g.replace("Work Experience: ", "")) || "";
    document.getElementById("company").value = ((_h = ResumeCompany.textContent) === null || _h === void 0 ? void 0 : _h.replace("Company: ", "")) || "";
    document.getElementById("position").value = ((_j = ResumePosition.textContent) === null || _j === void 0 ? void 0 : _j.replace("Position: ", "")) || "";
    document.getElementById("fresher").value = ((_k = ResumeProjects.textContent) === null || _k === void 0 ? void 0 : _k.replace("Projects: ", "")) || "";
    document.getElementById("skills").value = ((_l = ResumeSkills.textContent) === null || _l === void 0 ? void 0 : _l.replace("Skills: ", "")) || "";
}
downloadbutton.addEventListener("click", () => {
    if (typeof html2pdf === 'undefined') {
        alert("Error: html2pdf is not loaded");
        return;
        //      html2pdf().from(resume_page).save();
    }
    ;
    const resumeoptions = {
        margin: 0,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const resume_content = document.getElementById("resume_page");
    html2pdf()
        .from(resume_content)
        .set(resumeoptions)
        .save()
        .catch((error) => {
        console.error("pdf error", error);
        alert("An error occurred while generating the resume");
    });
});
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("username") || '';
    const email = params.get("email") || '';
    const phone = params.get("phone") || '';
    const education = params.get("education") || '';
    const school = params.get("school") || '';
    const college = params.get("college") || '';
    const university = params.get("university") || '';
    const experience = params.get("experience") || '';
    const company = params.get("company") || '';
    const position = params.get("position") || '';
    const projects = params.get("projects") || '';
    const skills = params.get("skills") || '';
    if (name || email || phone || education || school || college || university || experience || company || position || projects || skills) {
        // resume_page.classList.remove("hidden");
        ResumeUserName.textContent = name;
        ResumeEmail.textContent = `Email: ${email}`;
        ResumePhone.textContent = `Phone number: ${phone}`;
        resumeEducation.textContent = `Education detailed or other ceritfication: ${education}`;
        resumeschool.textContent = `Studied at  School: ${school}`;
        resumecollege.textContent = `Studied at College: ${college}`;
        resumeuniversity.textContent = `Studied at University: ${university}`;
        ResumeWorkExperience.textContent = `Work Experience: ${experience}`;
        ResumeCompany.textContent = `Company: ${company}`;
        ResumePosition.textContent = `Position: ${position}`;
        ResumeProjects.textContent = `Projects: ${projects}`;
        ResumeSkills.textContent = `Skills: ${skills}`;
        const savephoto = localStorage.getItem("upload_photo");
        if (savephoto) {
            resumephoto.src = savephoto;
        }
    }
});
//css for ensuring image is sytled properly
resumephoto.style.width = "150px";
resumephoto.style.height = "150px";
resumephoto.style.borderRadius = "50%";
resumephoto.style.margin = "0 auto";
resumephoto.style.objectFit = "cover";
resumephoto.style.display = "block";
