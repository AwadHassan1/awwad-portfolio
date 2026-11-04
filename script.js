const root = document.documentElement;
const themeToggle = document.querySelector('#themeToggle');
const langToggle = document.querySelector('#langToggle');
const nav = document.querySelector('#nav');
const menuToggle = document.querySelector('#menuToggle');

document.querySelector('#year').textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') root.classList.add('light');
themeToggle.textContent = root.classList.contains('light') ? '☾' : '☼';
themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  const light = root.classList.contains('light');
  localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
  themeToggle.textContent = light ? '☾' : '☼';
});

langToggle.addEventListener('click', () => {
  const arabic = root.lang !== 'ar';
  root.lang = arabic ? 'ar' : 'en';
  root.dir = arabic ? 'rtl' : 'ltr';
  langToggle.textContent = arabic ? 'EN' : 'عربي';
  document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
    element.innerHTML = element.dataset[arabic ? 'ar' : 'en'];
  });
  document.title = arabic ? 'عوض حسن عوض — مطور .NET' : 'Awwad Hassan Awwad — Junior Backend Developer';
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const gallery = document.querySelector('#certificateGallery');
const modal = document.querySelector('#documentModal');
const modalContent = document.querySelector('#modalContent');
const modalTitle = document.querySelector('#modalTitle');
const modalMeta = document.querySelector('#modalMeta');
const modalDownload = document.querySelector('#modalDownload');
const isImage = (path) => /\.(png|jpe?g|webp)$/i.test(path);
const certificateCards = [...gallery.querySelectorAll('.certificate-card')];
const certificateEntries = certificateCards.map((card) => ({
  program: card.dataset.program,
  organization: card.dataset.organization,
  date: card.dataset.date,
  file: card.dataset.file
}));
let certificateIndex = 0;
let lastCertificateTrigger = null;
let imageZoom = 1;

function showCertificate(index) {
  if (!certificateEntries.length) return;
  certificateIndex = (index + certificateEntries.length) % certificateEntries.length;
  const item = certificateEntries[certificateIndex];
  modalTitle.textContent = item.program;
  modalMeta.textContent = `${item.organization} · ${item.date} · ${String(certificateIndex + 1).padStart(2, '0')} / ${String(certificateEntries.length).padStart(2, '0')}`;
  modalDownload.href = item.file;
  modalDownload.download = item.file.split('/').pop();
  modalContent.replaceChildren();
  imageZoom = 1;
  const zoomButtons = document.querySelectorAll('.certificate-zoom-button');
  if (/\.pdf$/i.test(item.file)) {
    const frame = document.createElement('iframe');
    frame.src = `${item.file}#view=FitH`;
    frame.title = `${item.program} PDF certificate`;
    modalContent.append(frame);
    zoomButtons.forEach((button) => { button.hidden = true; });
  } else if (isImage(item.file)) {
    const image = document.createElement('img');
    image.src = item.file;
    image.alt = `${item.program} certificate issued by ${item.organization}`;
    modalContent.append(image);
    zoomButtons.forEach((button) => { button.hidden = false; });
  }
}

function openCertificate(index, trigger) {
  lastCertificateTrigger = trigger;
  showCertificate(index);
  modal.showModal();
  document.querySelector('#modalClose').focus();
}

certificateCards.forEach((card, index) => {
  card.querySelector('.certificate-thumb').addEventListener('click', (event) => openCertificate(index, event.currentTarget));
  card.querySelector('.certificate-view').addEventListener('click', (event) => openCertificate(index, event.currentTarget));
});

document.querySelector('#modalClose').addEventListener('click', () => modal.close());
document.querySelector('#modalPrev').addEventListener('click', () => showCertificate(certificateIndex - 1));
document.querySelector('#modalNext').addEventListener('click', () => showCertificate(certificateIndex + 1));
document.querySelector('#modalZoomIn').addEventListener('click', () => {
  const image = modalContent.querySelector('img');
  if (!image) return;
  imageZoom = Math.min(3, imageZoom + 0.25);
  image.style.transform = `scale(${imageZoom})`;
});
document.querySelector('#modalZoomOut').addEventListener('click', () => {
  const image = modalContent.querySelector('img');
  if (!image) return;
  imageZoom = Math.max(1, imageZoom - 0.25);
  image.style.transform = `scale(${imageZoom})`;
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
modal.addEventListener('close', () => lastCertificateTrigger?.focus());
document.addEventListener('keydown', (event) => {
  if (!modal.open) return;
  if (event.key === 'ArrowLeft') showCertificate(certificateIndex - 1);
  if (event.key === 'ArrowRight') showCertificate(certificateIndex + 1);
});

document.querySelector('#contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(data.get('subject'));
  const body = encodeURIComponent(`From: ${data.get('name')} (${data.get('email')})\n\n${data.get('message')}`);
  document.querySelector('#formNote').textContent = 'Your email app is opening with the message prepared. The site does not send or store it.';
  window.location.href = `mailto:awadhassan638@yahoo.com?subject=${subject}&body=${body}`;
});

