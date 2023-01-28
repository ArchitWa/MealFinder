const divList = document.querySelector('.listHolder');

const addInput = document.querySelector('#addIngredient');
const addBtn = document.querySelector('#addIngBtn');
const rawIngInput = document.querySelector('#rawIngID')

if (addInput) {
    rawIngInput.value = rawIngInput.value.replaceAll("null,", "")
    rawIngInput.value = rawIngInput.value.replaceAll("undefined,", "")

    function genOldlist() {

        const ingredients = rawIngInput.value.endsWith(",") ? rawIngInput.value.substring(0, rawIngInput.value.length - 1).split(",") : rawIngInput.value.split(",")

        for (var i = 0; i < ingredients.length; i++) {
            if (ingredients[i] == '' || ingredients[i] === 'null' || ingredients[i] === 'undefined') continue
            const ul = divList.querySelector('ul');
            const li = document.createElement('li');
            li.innerHTML = ingredients[i].trim();
            ul.append(li)
        }
    }

    genOldlist()

    function addLists() {
        if (addInput.value !== '') {
            const ul = divList.querySelector('ul');
            const li = document.createElement('li');
            li.innerHTML = addInput.value.trim();
            rawIngInput.value += `${addInput.value.trim()},`
            addInput.value = '';
            ul.appendChild(li);
            createBtn(li);
        }
    }

    addBtn.addEventListener('click', () => {
        addLists();
    });

    const listUl = document.querySelector('.list');
    const lis = listUl.children;

    function createBtn(li) {
        const remove = document.createElement('button');
        remove.type = "button"
        remove.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        li.appendChild(remove);
        return li;
    }

    // loop to add buttons in each li
    for (var i = 0; i < lis.length; i++) {
        createBtn(lis[i]);
    }

    divList.addEventListener('click', (event) => {
        const rawIngInput = document.querySelector('#rawIngID')
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'I') {
            const button = event.target.tagName === 'BUTTON' ? event.target : event.target.parentNode
            const li = button.parentNode
            const ul = li.parentNode
            rawIngInput.value = rawIngInput.value.replace(li.innerText + ",", "")


            ul.removeChild(li)
        }
    });
}
