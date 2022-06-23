let hardSkillsTags = [];
let hardSkillsContainer = document.querySelector('.hardSkillsContainer');
let hardSkillsInput = hardSkillsContainer.querySelector('input');

hardSkillsInput.addEventListener('keyup', addHardSkillsTag);

function addHardSkillsTag(event) { // função que após escrever as hard skills e usuário aperta enter para computá-las
    const keyPressedIsEnter = event.key == 'Enter';

    if (keyPressedIsEnter) {
        hardSkillsInput.value.split(',').forEach(tag => {
            if (tag) {
                hardSkillsTags.push(tag.trim());
            }
        });

        updateHardSkillsTags();
        hardSkillsInput.value = "";
    }
}

function updateHardSkillsTags() { // função que atualiza as hard skills
    clearHardSkillsTag();

    hardSkillsTags.slice().reverse().forEach(tag => {
        hardSkillsContainer.append(createHardSkillsTag(tag));
    });
}

function createHardSkillsTag(tag) { // função de criação de hard skills que cria uma div e dentro dela adiciona uma classe com hard skills tag
    const hardSkillDiv = document.createElement('div');
    hardSkillDiv.classList.add('hardSkillTag');

    const hardSkillSpan = document.createElement('span');
    hardSkillSpan.innerHTML = tag
    hardSkillSpan.setAttribute("id", "hardskills")

    hardSkillDiv.append(hardSkillSpan);

    const hardSkillsElementI = document.createElement('i');
    hardSkillsElementI.classList.add('closeHardSkill');
    hardSkillsElementI.setAttribute('data-id', tag);
    hardSkillsElementI.onclick = removeHardSkillTag;
    hardSkillSpan.append(hardSkillsElementI)

    return hardSkillDiv;
}

// on event click, remover a tag atribuída pelo id

function removeHardSkillTag(event) {
    const hardSkillDeleteBtn = event.currentTarget;
    const dataItemId = hardSkillDeleteBtn.dataset.id;

    const index = hardSkillsTags.indexOf(dataItemId);

    hardSkillsTags.splice(index, 1);


    updateHardSkillsTags();
}


function clearHardSkillsTag() { // função que limpa/remove as hard skills
    hardSkillsContainer.querySelectorAll('.hardSkillTag').forEach(tagElement => tagElement.remove());
} 