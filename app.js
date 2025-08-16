// ---------- Contact Form Validation ----------
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMsg = document.getElementById('formSuccess');

function setError(inputEl, msg){
  const box = document.querySelector(`.error[data-error-for="${inputEl.id}"]`);
  box.textContent = msg || '';
}

function isEmail(value){
  // simple, friendly email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let ok = true;
  // Name required
  if(!nameInput.value.trim()){
    setError(nameInput, 'Name is required.');
    ok = false;
  } else setError(nameInput, '');

  // Email required + format
  const email = emailInput.value.trim();
  if(!email){
    setError(emailInput, 'Email is required.');
    ok = false;
  } else if(!isEmail(email)){
    setError(emailInput, 'Please enter a valid email address.');
    ok = false;
  } else setError(emailInput, '');

  // Message optional; example rule: max 500 chars
  if(messageInput.value.length > 500){
    setError(messageInput, 'Message must be under 500 characters.');
    ok = false;
  } else setError(messageInput, '');

  if(ok){
    successMsg.hidden = false;
    form.reset();
    // Hide success after 3s
    setTimeout(() => successMsg.hidden = true, 3000);
  }
});

// ---------- To-Do List (DOM) ----------
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addTodo');
const list = document.getElementById('todoList');

function addTodo(text){
  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = text;

  const actions = document.createElement('div');

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'icon-btn';
  toggleBtn.textContent = 'Done/Undo';
  toggleBtn.addEventListener('click', () => {
    span.classList.toggle('done');
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'icon-btn';
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    li.remove();
  });

  actions.append(toggleBtn, delBtn);
  li.append(span, actions);
  list.appendChild(li);
}

addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if(!text) return;
  addTodo(text);
  todoInput.value = '';
});

todoInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    addBtn.click();
  }
});
