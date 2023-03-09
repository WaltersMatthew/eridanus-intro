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
