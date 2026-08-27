const pets = [
  {
    id: 1,
    name: 'Luna',
    type: 'gato',
    species: 'Gata',
    age: '2 anos',
    city: 'São Paulo',
    profile: 'Calma',
    badge: 'Apartamento',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
    summary: 'Carinhosa, tranquila e acostumada com ambientes internos.',
    details: 'Luna já está castrada, vacinada e se adapta bem a rotinas mais silenciosas.'
  },
  {
    id: 2,
    name: 'Theo',
    type: 'cao',
    species: 'Cão',
    age: '1 ano',
    city: 'Osasco',
    profile: 'Brincalhão',
    badge: 'Ativo',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80',
    summary: 'Cheio de energia, ideal para tutores que gostam de caminhadas.',
    details: 'Theo aprende comandos com facilidade e precisa de espaço para gastar energia diariamente.'
  },
  {
    id: 3,
    name: 'Mel',
    type: 'cao',
    species: 'Cão',
    age: '4 anos',
    city: 'São Bernardo',
    profile: 'Dócil',
    badge: 'Família',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80',
    summary: 'Companheira, paciente e ótima para famílias com crianças.',
    details: 'Mel é vacinada, sociável e prefere lares onde possa ficar perto das pessoas.'
  },
  {
    id: 4,
    name: 'Nina',
    type: 'gato',
    species: 'Gata',
    age: '8 meses',
    city: 'Santo André',
    profile: 'Curiosa',
    badge: 'Filhote',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
    summary: 'Exploradora e divertida, gosta de brinquedos e arranhadores.',
    details: 'Nina precisa de telas de proteção e acompanhamento para concluir o calendário de vacinas.'
  },
  {
    id: 5,
    name: 'Bento',
    type: 'especial',
    species: 'Cão',
    age: '6 anos',
    city: 'São Paulo',
    profile: 'Sereno',
    badge: 'Especial',
    special: true,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
    summary: 'Tem baixa visão, mas é independente e muito afetuoso.',
    details: 'Bento precisa de um lar com rotina estável, poucos obstáculos e acompanhamento veterinário periódico.'
  },
  {
    id: 6,
    name: 'Amora',
    type: 'gato',
    species: 'Gata',
    age: '3 anos',
    city: 'Guarulhos',
    profile: 'Sociável',
    badge: 'Vacinada',
    image: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=900&q=80',
    summary: 'Gosta de companhia, colo e se adapta bem com outros gatos.',
    details: 'Amora é castrada, usa caixa de areia e procura uma família tranquila.'
  }
];

const petGrid = document.querySelector('#petGrid');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
const filterButtons = document.querySelectorAll('.filter');
const totalPets = document.querySelector('#totalPets');
const petInterest = document.querySelector('#petInterest');
const contactForm = document.querySelector('.contact-form');
const formFeedback = document.querySelector('#formFeedback');

let activeFilter = 'todos';

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getVisiblePets() {
  const query = normalizeText(searchInput.value.trim());

  return pets.filter((pet) => {
    const matchesFilter =
      activeFilter === 'todos' ||
      pet.type === activeFilter ||
      (activeFilter === 'especial' && pet.special);
    const searchable = normalizeText(`${pet.name} ${pet.species} ${pet.city} ${pet.profile} ${pet.badge}`);
    return matchesFilter && searchable.includes(query);
  });
}

function createPetCard(pet) {
  return `
    <article class="pet-card" data-id="${pet.id}">
      <img src="${pet.image}" alt="${pet.species} ${pet.name} disponível para adoção" loading="lazy">
      <div class="pet-content">
        <div class="pet-title">
          <div>
            <h3>${pet.name}</h3>
            <p>${pet.species} - ${pet.age}</p>
          </div>
          <span>${pet.badge}</span>
        </div>

        <ul class="pet-meta" aria-label="Características de ${pet.name}">
          <li>${pet.city}</li>
          <li>${pet.profile}</li>
          <li>${pet.age}</li>
        </ul>

        <p>${pet.summary}</p>
        <p class="details">${pet.details}</p>

        <div class="pet-actions">
          <button class="details-button" type="button" data-action="details" aria-expanded="false">
            Detalhes
          </button>
          <button class="interest-button" type="button" data-action="interest">
            Tenho interesse
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderPets() {
  const visiblePets = getVisiblePets();
  petGrid.innerHTML = visiblePets.map(createPetCard).join('');
  emptyState.hidden = visiblePets.length > 0;
  totalPets.textContent = pets.length;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderPets();
  });
});

searchInput.addEventListener('input', renderPets);

petGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button');

  if (!button) {
    return;
  }

  const card = button.closest('.pet-card');
  const pet = pets.find((item) => item.id === Number(card.dataset.id));

  if (button.dataset.action === 'details') {
    const isOpen = card.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.textContent = isOpen ? 'Ocultar' : 'Detalhes';
  }

  if (button.dataset.action === 'interest') {
    petInterest.value = `${pet.name} - ${pet.species}`;
    formFeedback.textContent = '';
    document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' });
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedPet = petInterest.value.trim();
  const name = document.querySelector('#guardianName').value.trim();

  if (!selectedPet || !name) {
    formFeedback.textContent = 'Preencha seu nome e o animal de interesse para preparar a mensagem.';
    return;
  }

  formFeedback.textContent = `Mensagem preparada para ${selectedPet}. Na versão publicada, esse fluxo pode enviar para a equipe de adoção.`;
});

renderPets();
