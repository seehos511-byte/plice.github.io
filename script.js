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

let currentTargetList = "";

// Image Upload + Dynamic Background
const imgInput = document.getElementById('img-input');
imgInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('char-img').src = e.target.result;
            document.body.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(this.files[0]);
    }
});

// Open the Input Popup
function openInputModal(targetId, typeLabel) {
    currentTargetList = targetId;
    document.getElementById('input-modal-title').textContent = "Add " + typeLabel;
    document.getElementById('input-modal').style.display = 'flex';
    
    // Clear previous inputs
    document.getElementById('entry-name').value = "";
    document.getElementById('entry-cost').value = "";
    document.getElementById('entry-desc').value = "";
}

function closeInputModal() {
    document.getElementById('input-modal').style.display = 'none';
}

// Logic for the "SAVE" button in the popup
document.getElementById('confirm-add').addEventListener('click', () => {
    const name = document.getElementById('entry-name').value;
    const cost = document.getElementById('entry-cost').value;
    const desc = document.getElementById('entry-desc').value;

    if (!name) return alert("Please enter a title.");

    const container = document.getElementById(currentTargetList);
    const div = document.createElement('div');
    div.className = 'list-item';
    
    // Format: Title on left, Cost on right
    div.innerHTML = `<span>${name}</span> <small style="float:right; color:var(--void-accent)">${cost}</small>`;
    
    // Store data for the viewer modal
    div.dataset.title = name;
    div.dataset.cost = cost;
    div.dataset.info = desc || "No description provided.";

    // Click to view details
    div.addEventListener('click', () => {
        document.getElementById('modal-title').innerHTML = `${div.dataset.title} <span style="font-size:1rem; opacity:0.6">(${div.dataset.cost})</span>`;
        document.getElementById('modal-desc').textContent = div.dataset.info;
        document.getElementById('modal').style.display = 'flex';
    });

    container.appendChild(div);
    closeInputModal();
});

// Update button listeners to use the new modal
document.getElementById('add-skill-btn').addEventListener('click', () => {
    const val = prompt("Skill/Lang:"); // Keeping prompt for simple tags, or you can modalize this too
    if (val) {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = val;
        document.getElementById('skills-list').appendChild(span);
    }
});

document.getElementById('add-gear-btn').addEventListener('click', () => openInputModal('gear-list', 'Gear'));
document.getElementById('add-passive-btn').addEventListener('click', () => openInputModal('passive-list', 'Passive'));
document.getElementById('add-ability-btn').addEventListener('click', () => openInputModal('ability-list', 'Ability'));

// Close Viewer Modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = (event) => {
    if (event.target.className === 'modal') {
        closeInputModal();
        closeModal();
    }
}
