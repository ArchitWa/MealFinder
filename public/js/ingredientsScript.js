const divList = document.querySelector('.listHolder');

const addInput = document.querySelector('#addIngredient');
const addBtn = document.querySelector('#addIngBtn');
const rawIngInput = document.querySelector('#rawIngID')


if (addInput) {
    rawIngInput.value = rawIngInput.value.replaceAll("null,", "").replaceAll("undefined,", "").replaceAll(" ,", "")

    const listUl = document.querySelector('.list');
    const lis = listUl.children;

    function genOldlist() {

        const ingredients = rawIngInput.value.endsWith(",") ? rawIngInput.value.substring(0, rawIngInput.value.length - 1).split(",") : rawIngInput.value.split(",")

        for (var i = 0; i < ingredients.length; i++) {
            if (ingredients[i] == '' || ingredients[i] === 'null' || ingredients[i] === 'undefined') continue
            const ul = divList.querySelector('ul');
            const li = document.createElement('li');
            const m = document.createElement('p')

            m.innerHTML = ingredients[i].trim()
            console.log(ingredients[i])
            m.classList = "py-2 px-[0.5px] pl-2 text-sm"
            li.classList = "w-full px-4 py-[0.5px] border-primary-700 flex justify-center align-middle"

            li.append(m)
            ul.append(li)
        }
    }

    genOldlist()
    if (lis.length > 0) {
        listUl.classList = "list text-sm font-medium border rounded-lg bg-primary-700 border-white text-white"
    }

    function addLists() {
        if (addInput.value !== '') {
            const ul = divList.querySelector('ul');
            if (ul.children.length === 0) {
                listUl.classList = "list text-sm font-medium border rounded-lg bg-primary-700 border-white text-white"
            } else {
                ul.children[ul.children.length - 1].classList += " border-b"
            }
            const li = document.createElement('li');
            const m = document.createElement('p')

            m.innerHTML = addInput.value.trim();
            m.classList = "py-2 px-[0.5px] pl-2 text-sm"
            li.classList = "w-full px-4 py-[0.5px] border-primary-700 flex justify-center align-middle"

            rawIngInput.value += `${addInput.value.trim()},`
            addInput.value = '';

            li.append(m)
            ul.appendChild(li)

            createBtn(li);
        }
    }

    addBtn.addEventListener('click', () => {
        addLists();
    });


    function createBtn(li) {
        const remove = document.createElement('button');
        remove.type = "button"
        remove.innerHTML = '<i class="fa fa-trash-o fa-lg w-8 h-8 py-4" aria-hidden="true"></i>';
        remove.classList = "text-rose-500 h-8 w-8 hover:text-white font-medium rounded-lg text-sm flex justify-block"
        li.appendChild(remove);
        return li;
    }

    // loop to add buttons in each li
    for (var i = 0; i < lis.length; i++) {
        if (i < lis.length - 1) {
            lis[i].classList += " border-b"
        }
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
            if (ul.children.length === 0) {
                ul.classList = ""
            } else {
                ul.children[ul.children.length - 1].classList.remove("border-b")
            }
        }
    });
}
