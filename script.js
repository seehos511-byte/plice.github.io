// Image Upload + Dynamic Background
const imgInput = document.getElementById('img-input');
imgInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            // Update Portrait
            document.getElementById('char-img').src = imageData;
            // Update Full Screen Background
            document.body.style.backgroundImage = `url(${imageData})`;
        };
        reader.readAsDataURL(this.files[0]);
    }
});

// ADD SKILL
document.getElementById('add-skill-btn').addEventListener('click', () => {
    const val = prompt("Enter Skill, Language, or Proficiency:");
    if (val) {
        const container = document.getElementById('skills-list');
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = val;
        container.appendChild(span);
    }
});

// ADD ABILITY
document.getElementById('add-ability-btn').addEventListener('click', () => {
    const val = prompt("Enter Ability Name:");
    if (val) {
        const container = document.getElementById('ability-list');
        const div = document.createElement('div');
        div.className = 'list-item';
        div.textContent = val;
        container.appendChild(div);
    }
});

// ADD GEAR / PASSIVE (Complex with Modal)
function setupComplexAdd(btnId, listId, typeName) {
    document.getElementById(btnId).addEventListener('click', () => {
        const name = prompt(`${typeName} Name:`);
        const desc = prompt(`${typeName} Description:`);
        if (name) {
            const container = document.getElementById(listId);
            const div = document.createElement('div');
            div.className = 'list-item';
            div.textContent = name;
            div.dataset.info = desc || "No details provided.";
            div.addEventListener('click', () => {
                document.getElementById('modal-title').textContent = name;
                document.getElementById('modal-desc').textContent = div.dataset.info;
                document.getElementById('modal').style.display = 'flex';
            });
            container.appendChild(div);
        }
    });
}

setupComplexAdd('add-gear-btn', 'gear-list', 'Item');
setupComplexAdd('add-passive-btn', 'passive-list', 'Passive');

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = (event) => {
    if (event.target == document.getElementById('modal')) closeModal();
}
