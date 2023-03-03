const today = new Date();
const thisYear = today.getFullYear();
console.log("this is the year!", thisYear);
const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = `Matt Walters &copy${thisYear} &#9835`;
footer.appendChild(copyright);

const skills = [
    "HTML",
    "CSS",
    "Node.JS",
    "Customer service",
    "Business Analytics",
];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}
