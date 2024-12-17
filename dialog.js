class Dialog {
  constructor(target = 'body') {
    // Target elemen tempat dialog akan di-render
    this.targetElement = document.querySelector(target);

    if (!this.targetElement) {
      throw new Error('Target element not found!');
    }

    // Membuat elemen overlay sebagai latar belakang dialog
    this.overlayElement = document.createElement('div');
    this.overlayElement.className = 'custom-dialog-overlay';
    this.overlayElement.style.position = 'fixed';
    this.overlayElement.style.top = '0';
    this.overlayElement.style.left = '0';
    this.overlayElement.style.width = '100%';
    this.overlayElement.style.height = '100%';
    this.overlayElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5) '; // Warna background transparan
    this.overlayElement.style.zIndex = '9998';
    this.overlayElement.style.display = 'none'; // Awalnya disembunyikan
    this.overlayElement.style.justifyContent = 'center';
    this.overlayElement.style.alignItems = 'center';
    
    // Membuat elemen dialog utama
    this.dialogElement = document.createElement('div');
    this.dialogElement.className = 'custom-dialog';
    this.dialogElement.style.position = 'fixed';
    this.dialogElement.style.width = '65vw';
    this.dialogElement.style.zIndex = '9999';
    this.dialogElement.style.backgroundColor = '#202020';
    this.dialogElement.style.padding = '3vw 2vw 3vw 2vw';
    this.dialogElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    this.dialogElement.style.borderRadius = '4vw';

    // Membuat elemen judul dan subjudul
    this.titleElement = document.createElement('p');
    this.titleElement.className = 'custom-dialog-title';
    this.titleElement.style.fontSize = '5vw';
    this.titleElement.style.fontFamily = 'GFBoldDialog';
    this.titleElement.style.color = '#ff5503';
    this.titleElement.style.margin = '0 2vw 0 2vw';

    this.subtitleElement = document.createElement('p');
    this.subtitleElement.className = 'custom-dialog-subtitle';
    this.subtitleElement.style.fontSize = '3vw';
    this.subtitleElement.style.fontFamily = 'GFLightDialog';
    this.subtitleElement.style.color = '#606060';
    this.subtitleElement.style.margin = '1vw 2vw 0 2vw';

    // Membuat tombol
    this.buttonElement = document.createElement('button');
    this.buttonElement.className = 'custom-dialog-button';
    this.buttonElement.style.marginTop = '4vw';
    this.buttonElement.style.padding = '2.5vw 5vw';
    this.buttonElement.style.backgroundColor = '#ff5503';
    this.buttonElement.style.color = 'white';
    this.buttonElement.style.border = 'none';
    this.buttonElement.style.fontSize = '1em';
    this.buttonElement.style.fontFamily = 'GFBoldDialog';
    this.buttonElement.style.borderRadius = '180vw';
    this.buttonElement.style.display = 'none';
    this.buttonElement.style.cursor = 'pointer';
    this.buttonElement.textContent = 'OK'; // Default text
    this.buttonElement.style.width = '100%'; // Membuat tombol lebar 100%

    // Area konten dialog
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'custom-dialog-content';

    // Event untuk menutup dialog (hanya jika setCancelable diaktifkan)
    this.isCancelable = true; // Default setCancelable adalah true
    this.overlayElement.addEventListener('click', () => {
      if (this.isCancelable) {
        this.hide();
      }
    });

    // Memasukkan elemen ke DOM
    this.targetElement.appendChild(this.overlayElement);
    this.overlayElement.appendChild(this.dialogElement);
    this.dialogElement.appendChild(this.titleElement);
    this.dialogElement.appendChild(this.subtitleElement);
    this.dialogElement.appendChild(this.contentElement);
    this.dialogElement.appendChild(this.buttonElement);

    // Menambahkan animasi @keyframes ke <style>
    this.addKeyframes();
  }

  // Menampilkan dialog dengan konten tertentu
  show() {
    this.overlayElement.style.display = 'flex';
    this.overlayElement.style.animation = 'fadeIn 0.3s ease-in-out'; // Animasi muncul
  }

  // Menyembunyikan dialog dengan animasi fade-out
  hide() {
    this.overlayElement.style.animation = 'fadeOut 0.3s ease-in-out'; // Fade-out animasi

    // Menyembunyikan setelah animasi selesai
    this.overlayElement.addEventListener(
      'animationend',
      () => {
        this.overlayElement.style.display = 'none';
      },
      { once: true }
    );
  }

  // Menghapus dialog dari DOM
  destroy() {
    this.targetElement.removeChild(this.overlayElement);
  }

  // Menambahkan @keyframes langsung ke halaman
  addKeyframes() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = `
      @font-face {
        font-family: 'GFBoldDialog';
        src: url('https://fahrez.one/fonts/gfbold.woff2') format('woff2');
      } 
      @font-face {
        font-family: 'GFLightDialog';
        src: url('https://fahrez.one/fonts/gflight.woff2') format('woff2');
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  // Mengatur judul dialog
  setTitle(title) {
    this.titleElement.textContent = title;
  }

  // Mengatur subjudul dialog
  setSubtitle(subtitle) {
    this.subtitleElement.textContent = subtitle;
  }

  // Mengatur teks pada tombol
  setButtonText(text) {
    this.buttonElement.textContent = text;
  }

  // Mengatur visibilitas tombol
  setButtonVisibility(isVisible) {
    this.buttonElement.style.display = isVisible ? 'block' : 'none';
  }

  // Menambahkan listener untuk tombol
  setButtonClickListener(callback) {
    this.buttonElement.addEventListener('click', callback);
  }

  // Menentukan apakah dialog dapat ditutup dengan klik di overlay
  setCancelable(isCancelable) {
    this.isCancelable = isCancelable;
  }
}

export default Dialog;
