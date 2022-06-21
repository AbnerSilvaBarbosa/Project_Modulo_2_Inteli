let softSkillsTags = [];
let softSkillsContainer = document.querySelector('.softSkillsContainer');
let softSkillsInput = softSkillsContainer.querySelector('input');

softSkillsInput.addEventListener('keyup', addSoftSkillsTags);

function addSoftSkillsTags(event) { // função que após escrever as soft skills e usuário aperta enter para computá-las
    const keyPressedIsEnter = event.key == 'Enter';

    if (keyPressedIsEnter) {
        softSkillsInput.value.split(',').forEach(tag => {
            if (tag) {
                softSkillsTags.push(tag.trim());
            }
        });

        updateSoftSkillsTags();
        softSkillsInput.value = "";
    }
}

function updateSoftSkillsTags() { // função que atualiza as fost skills
    clearSoftSkillsTags();

    softSkillsTags.slice().reverse().forEach(tag => {
        softSkillsContainer.append(createSoftSkillsTags(tag));
    });
}

function createSoftSkillsTags(tag) { // função de criação de soft skills que cria uma div e dentro dela adiciona uma classe com soft skills tag
    const softSkillDiv = document.createElement('div');
    softSkillDiv.classList.add('softSkillTag');

    const softSkillSpan = document.createElement('span');
    softSkillSpan.innerHTML = tag
    softSkillSpan.setAttribute("id", "softskills")

    softSkillDiv.append(softSkillSpan);

    const softSkillElementI = document.createElement('i');
    softSkillElementI.classList.add('closeSoftSkill');
    softSkillElementI.setAttribute('data-id', tag);
    softSkillElementI.onclick = removeSoftSkillTag;
    softSkillSpan.append(softSkillElementI)

    return softSkillDiv;
}
// on event click, remover a tag atribuída pelo id
function removeSoftSkillTag(event) {
    const softSkillDeleteBtn = event.currentTarget;
    const dataItemId = softSkillDeleteBtn.dataset.id;

    const index = softSkillsTags.indexOf(dataItemId);

    softSkillsTags.splice(index, 1);


    updateSoftSkillsTags();
}


function clearSoftSkillsTags() { // função que limpa/remove as soft skills
    softSkillsContainer.querySelectorAll('.softSkillTag').forEach(tagElement => tagElement.remove());
} 