const toggle = document.getElementById('toggle-script');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');
const positionLeft = document.getElementById('position-left');
const positionRight = document.getElementById('position-right');

// Durum göstergesini güncelle
function updateStatusIndicator(enabled) {
  statusIndicator.classList.remove('status-active', 'status-inactive');

  if (enabled) {
    statusIndicator.classList.add('status-active');
    statusText.textContent = '✅ Script Aktif';
    // Shimmer effect
    statusIndicator.classList.add('active');
    setTimeout(() => statusIndicator.classList.remove('active'), 500);
  } else {
    statusIndicator.classList.add('status-inactive');
    statusText.textContent = '❌ Script Pasif';
  }
}

// Position seçimini güncelle
function updatePositionSelection(position) {
  if (position === 'right') {
    positionRight.checked = true;
  } else {
    positionLeft.checked = true;
  }

  // Seçili kartın animasyonu
  const selectedCard = document.querySelector('input[name="position"]:checked + .position-card');
  if (selectedCard) {
    selectedCard.style.transform = 'scale(1.1)';
    setTimeout(() => {
      selectedCard.style.transform = 'scale(1.05)';
    }, 200);
  }
}

// Başlangıç durumunu yükle
chrome.storage.sync.get(['enabled', 'position'], (data) => {
  const enabled = data.enabled ?? true;
  const position = data.position ?? 'left';

  toggle.checked = enabled;
  updateStatusIndicator(enabled);
  updatePositionSelection(position);
});

// Toggle değişikliğini dinle
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });
  updateStatusIndicator(enabled);

  // Hafif titreşim efekti (mevcut ise)
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
});

// Position değişikliğini dinle
[positionLeft, positionRight].forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      const position = radio.value;
      chrome.storage.sync.set({ position });
      updatePositionSelection(position);

      // Hafif titreşim efekti (mevcut ise)
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }

      // Content script'e mesaj gönder
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'updatePosition',
          position: position
        });
      });
    }
  });
});

// Slider'a tıklama efekti
toggle.addEventListener('click', () => {
  const slider = toggle.nextElementSibling;
  slider.style.transform = 'scale(0.95)';
  setTimeout(() => {
    slider.style.transform = 'scale(1)';
  }, 100);
});

// Klavye desteği
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    const focusedElement = document.activeElement;
    if (focusedElement.tagName === 'INPUT') {
      return; // Input elementlerinde normal davranış
    }
    e.preventDefault();
    toggle.click();
  }

  // Arrow keys ile position seçimi
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    positionLeft.click();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    positionRight.click();
  }
});

// Popup açıldığında animasyon
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transform = 'scale(0.9)';

  setTimeout(() => {
    document.body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.opacity = '1';
    document.body.style.transform = 'scale(1)';
  }, 50);
});
