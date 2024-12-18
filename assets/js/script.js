const container = document.querySelector('.container');

function render(){
  container.innerHTML = `
    <div class="navigation">
      ${menuItems.map(item => `
         <div class="navigation-item ${'children' in item ? 'open-menu-btn' : ''}">
          <p class='${'children' in item ? '' : 'no-children'}'>${'children' in item ? '<i class="fa-solid fa-plus"></i>' : ''}${item.label}</p>
         </div>
         ${'children' in item ? `<div class="open-menu" data-label="${item.label}"></div>` : ''}
    `).join('')}
    </div>
  `;
  bindOpenMenuBtns(menuItems);
}

function bindOpenMenuBtns(items){
  const openMenuBtns = document.querySelectorAll('.open-menu-btn');
  for (const openMenuBtn of openMenuBtns) {
    openMenuBtn.addEventListener('click', (e) => toggleMenu(e, items));
  }
}

function toggleMenu(e, items){
  for (const item of items) {
    if(item.label == e.target.innerText){
      e.target.querySelector('i').classList.remove('fa-plus');
      e.target.querySelector('i').classList.add('fa-minus');
      if(document.querySelector(`[data-label="${item.label}"].open-menu`).innerText === ''){
        document.querySelector(`[data-label="${item.label}"].open-menu`).innerHTML = `
          ${item.children.map(x => `
              <p class="${'children' in x ? 'open-menu-btn' : 'no-children'}">${'children' in x ? '<i class="fa-solid fa-plus"></i>' : ''}${x.label}</p>
              ${'children' in x ? `<div class="open-menu" data-label="${x.label}"></div>` : ''}
            `).join('')}
        `;
        bindOpenMenuBtns(item.children);
      } else{
        document.querySelector(`[data-label="${item.label}"].open-menu`).innerHTML = '';
        e.target.querySelector('i').classList.add('fa-plus');
      e.target.querySelector('i').classList.remove('fa-minus');
      }
    }
  }
}

render();