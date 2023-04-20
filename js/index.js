const today = new Date();
const thisYear = today.getFullYear();
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
    "Flexbox",
    "CSS Grid",
    "Sweet design",
    "ugly colors",
];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

const messageForm = document.forms.leave_message;

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    let usersMessage = event.target.usersMessage.value;

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    let newMessage = document.createElement("li");

    newMessage.innerHTML = `
    <a href = "mailto:${usersEmail}">${usersName}</a>
    <span>says: ${usersMessage}</span>
    `;

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", (event) => {
        const entry = event.target.parentNode;
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.style.display = "none";
        }
    });

    messageSection.style.display = "block";
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.type = "button";
    editButton.className = "edit-button";

    const editForm = document.createElement("form");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = usersMessage;
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.type = "submit";
    editForm.append(editInput, saveButton);

    editButton.addEventListener("click", () => {
        newMessage.replaceWith(editForm);
    });

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        usersMessage = editInput.value;
        newMessage.innerHTML = `
        <a href = "mailto:${usersEmail}">${usersName}</a>
        <span>says: ${usersMessage}</span>
        `;
        newMessage.appendChild(removeButton);
        newMessage.appendChild(editButton);
        messageList.appendChild(newMessage);
        editForm.remove();
    });

    newMessage.appendChild(editButton);

    messageForm.reset();
});

//utility function for getting date from github data
const dateFixer = (date) => {
    return date.slice(0, 10);
};

// Method for getting info from github
fetch("https://api.github.com/users/WaltersMatthew/repos")
    .then((response) => response.json())
    .then((repositories) => {
        // console.log(repositories);
        // selecting ul in projects section
        const projectSection = document.getElementById("projects");
        const projectList = projectSection.querySelector("ul");
        // iterating over repositories array to display repo data
        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement("li");

            const projectLink = document.createElement("a");
            projectLink.innerText = repositories[i].name;
            projectLink.href = repositories[i].html_url;
            projectLink.target = "_blank";

            const projectDescription = document.createElement("p");
            projectDescription.innerText = repositories[i].description;

            const projectDate = document.createElement("p");
            projectDate.innerText = `last pushed : ${dateFixer(
                repositories[i].pushed_at
            )}`;

            const language = document.createElement("p");
            language.innerText = repositories[i].language;

            project.appendChild(projectLink);
            project.appendChild(projectDate);
            project.appendChild(projectDescription);
            project.appendChild(language);
            projectList.appendChild(project);

            //styling
            project.style.listStyleType = "none";
            project.style.borderBottom = "1px solid black";
            project.style.margin = "1rem 0";
        }
    })
    .catch((error) => {
        console.error(error);
        const projectSection = document.getElementById("projects");
        if (!projectSection) {
            console.error(
                `Cannot display error message: project section with id "projects" not found.`
            );
        } else {
            const errorMessage = document.createElement("h1");
            errorMessage.innerText = `There was an error! Github error message: ${error.message}`;
            projectSection.appendChild(errorMessage);
        }
    });
