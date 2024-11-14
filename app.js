//#region DEĞİŞKENLER ATAMA
export let scene, camera, renderer, controls;
let controlFly
let formVisible = true;

// Global değişkenler
export let A, B, H, K;  // En, Boy, Yükseklik değişkenleri
window.YATAYHOLGENİŞLİĞİ; 
window.YATAYHOLSAYISI;
window.YATAYAKSSAYISI; 


//#endregion

//#region IMPORT'lar
// conteiner.js ve buton fonkden al
import { applyTranslations } from './translations.js'; // Çevirileri uygula fonksiyonunu içe aktar

import { vinçcheckbox, İlkkutu, İLKFORM, hideButton, maliyetgösterfonk, efcicon} from './container.js'; 
import { üçdbutonabas, CepheKaplamaCons, SolÇatıKaplamacons,vinçkirişicons, vinçkirişkaldir, üçgenOpaklıkAyarlama, 
  triangleWrapper, çimekleçıkar
    } from './butonfonk.js';  // 

// Nesneler
import { YATAYKOLONGRUBU, SOLDİYAGONELGRUBU, SAĞDİYAGONELGRUBU, MakasGrupÇoğalt, YanKiriş_1, MakasİçiAltTamBracing, 
  Bracing_MakasİçiTam, ÇaprazYanKomple, ÇatıÇapraz1MakasGrup, ÇatıÇaprazTam, Totem1,CepheKaplamaSağSol, SolÇatıKaplama,
  MK_UZUNLUK, VinçKirişi, VincKancasi, loadedFont} from './nesneler.js';  // 

// Hesaplar
import { DİKMEHESAPLA, hesaplaDüşeyAks, hesaplaYatayKolon, ÇATIEĞİMHETKİSİHESAP, MAKASBOYUHESAP, 
  ZEMİNESASEBATHESAP, YanBağKirişHesap , ÇaprazYanHesap, KaplamaSınırHesap, ArkaKaplamaSınır } from './hesapla.js'; 

// Hesapla Const
  import { MKAÇI, YanKirişArası, YanBağKirişAdet, YATAYHOLGENİŞLİĞİ, DÜŞEYHOLSAYISI, DÜŞEYHOLGENİŞLİĞİ ,
   MAKAS_YÜKSEKL_HESAPLA, ÇaprazYükseklik} from './hesapla.js';

// Geometriler
import { YatayÇaprazÇap, KOLONEBAT, KOLON_BOX1 , MK_EN, YATAY_MK_GEO_1 } from './geometriler.js';  // 

// Malzemeler
import { ÇimZeminMalzeme1  } from './malzemeler.js';  // 

// Maliyetler Import
import { ÇelikTonajı , ÇelikTonaj,  MlytToplamÇlk, MlytToplamÇlkTL, dolarKuru} from './maliyet.js';  // 
export let currentLanguage = 'tr';  // Varsayılan dil Türkçe 


// BUTON Import

//#endregion Form ve Butonların Sonu

//#region Buton Çağırmalar

İLKFORM()
üçgenOpaklıkAyarlama();


// Sayfa yüklendiğinde çağır
document.addEventListener('DOMContentLoaded', () => {
  efcicon();
});

// Hide/Show işlevselliğini ekleme
hideButton.addEventListener('click', () => {
  formVisible = !formVisible;
  İlkkutu.style.display = formVisible ? 'block' : 'none';

});

vinçkirişkaldir();
İlkkutuAdjustfonk();  // sayfa yüklendiğinde en boy ayarı


// Form Hizalama Fonksion
function İlkkutuAdjustfonk() {
  const İlkkutu = document.getElementById('İlkkutu');
  if (İlkkutu) {
    İlkkutu.style.width = `${Math.min(window.innerWidth * 0.9, 200)}px`; // Maksimum genişlik 200px
  }
}

// Ekran Resize En Boy ayarla
window.addEventListener('resize', İlkkutuAdjustfonk);
window.addEventListener('orientationchange', İlkkutuAdjustfonk);

// Fonksiyon çağırmalar 

//#endregion

//#region Işık Ayarları
function addDirectionalLight() { // Yönlü ışık ekleme fonksiyonu

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);
}
function addAmbientLight() { // Ambient light ekleme fonksiyonu

  const ambientLight = new THREE.AmbientLight(0x404040, 1); // Yumuşak aydınlatma
  scene.add(ambientLight);
}
//#endregion

//#region ÇİM & GÖKYÜZÜ Fonksiyonları

  function gökyüzüfonksiyon(scene) {
    const textureLoader = new THREE.TextureLoader();
    const skyTexture = textureLoader.load('textures/sky.png');
    
    const skyGeometry = new THREE.SphereGeometry(300, 20,20); // Büyük bir küre, gökyüzü etkisi için
    const skyMaterial = new THREE.MeshBasicMaterial({
        map: skyTexture,
        side: THREE.BackSide // Kürenin iç yüzeyi görünsün
    });
    
    const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
    skyMesh.position.y = 0; 
    skyMesh.position.x = 0; 
    skyMesh.position.z = 0; 
  
    scene.add(skyMesh);     // Gökyüzü küresini sahneye ekleme

  }
//#endregion

//#region🔥 INIT fonksiyonu
function init() {
  // Sahne & Kamera & REndere
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer(); // renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement); // // OrbitControls 
  controls.enableZoom = true;
  addDirectionalLight();    // Işıkları ekleme
  addAmbientLight();
  gökyüzüfonksiyon(scene); // Gökyüzü küresi ekleme
animate();
}
//#endregion

//#region Butonlar: 3D Modelle Butonu EventListener
document.addEventListener('DOMContentLoaded', () => {
  const createCubeButton = document.getElementById('createCube');
  if (createCubeButton) {
    console.log("createCube butonu bulundu ve event listener eklendi."); // Bu mesaj DOM yüklendiğinde bir kez görünmeli
    createCubeButton.addEventListener('click', () => {
      console.log("createCube butonuna tıklanıldı.");
      üçdbutonabas(A, B, K,H); // Butona tıklandığında Üçdbutonhandler çalışır
    });
  } else {
    console.log("createCube butonu bulunamadı.");
  }
});
document.addEventListener('keydown', function(event) { // Alt + M kısayolu
  if (event.altKey && (event.key === 'm' || event.key === 'M')) {
      document.getElementById('createCube').click();
  }
});

//#endregion

//#region İLK SAYFA AÇILIŞ MODEL GÖSTER

window.addEventListener('DOMContentLoaded', () => {
  // Varsayılan değerleri inputlardan alarak A, B, H ve K'ya atıyoruz
  const A = parseFloat(document.getElementById('A').value);
  const B = parseFloat(document.getElementById('B').value);
  const H = parseFloat(document.getElementById('H').value);
  const K = parseFloat(document.getElementById('K').value);

  // Varsayılan değerlere göre modeli oluştur
  if (document.getElementById('createCube')) {
      document.getElementById('createCube').click(); // Modelleme butonuna tıklayarak modeli otomatik oluşturuyoruz
  }
      // Kamera pozisyonu
      camera.position.set(-60, 35, 55);
      // `controls` ile odak noktası belirleme
      controls.target.set(A/3, H/3, -B/3);

});
//#endregion

//#region animate Fonksiyonu Tanımlama
function animate() {
  requestAnimationFrame(animate);
  controls.update();  // Kontrolleri güncelle
  if (controlFly) controlFly.update(0.1); // Delta zamanı geçin

  renderer.render(scene, camera);  // Sahneyi render et 
}
//#endregion

//#region Init Çağırma ve Resize
init();
function updateRendererSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Kamera en-boy oranını güncelle
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Renderer boyutlarını güncelle
  renderer.setSize(width, height);
}

window.addEventListener('resize', updateRendererSize);
window.addEventListener('orientationchange', updateRendererSize);

//#endregion

//#region  // Dil değiştirici ikonlarını eklemek için fonksiyon
  let dropdownMenu; // Menüye global erişim için değişken tanımı

  function addLanguageSelector() {
      const languageSelector = document.createElement('div');
      languageSelector.id = 'languageSelector';
      languageSelector.style.position = 'fixed';
      languageSelector.style.top = '10px';
      languageSelector.style.right = '10px';
      languageSelector.style.cursor = 'pointer';
      languageSelector.style.zIndex = '1000';
  
      const selectedLang = document.createElement('button');
      selectedLang.textContent = '🌐'; 
      selectedLang.style.fontSize = '21px'; // Örneğin, 18 piksel
      selectedLang.style.width = '40px';
      selectedLang.style.height = '40px';
      selectedLang.style.borderRadius = '50%';
      selectedLang.style.border = 'none';
      selectedLang.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Beyaz arka plan, %80 opaklık
      selectedLang.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
      selectedLang.style.display = 'flex';
      selectedLang.style.alignItems = 'center';
      selectedLang.style.justifyContent = 'center';
  
      dropdownMenu = document.createElement('div'); // Global değişkene atandı
      dropdownMenu.style.position = 'absolute';
      dropdownMenu.style.top = '50px';
      dropdownMenu.style.right = '0px';
      dropdownMenu.style.display = 'flex'; // Görünür olması için
      dropdownMenu.style.flexDirection = 'column';
      dropdownMenu.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Beyaz arka plan, %80 opaklık
      dropdownMenu.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
      dropdownMenu.style.borderRadius = '5px';
      dropdownMenu.style.padding = '5px';
  

      const languages = [
        { code: 'tr', icon: 'textures/tr.png' },
        { code: 'en', icon: 'textures/eng.png' },
        { code: 'ar', icon: 'textures/arabic.png' },
          ];
  
          languages.forEach(lang => {
            const langButton = document.createElement('button');
            langButton.setAttribute('data-lang', lang.code);
            
            // İkon için img öğesi oluşturma
            const langImg = document.createElement('img');
            langImg.src = lang.icon; // PNG dosya yolu
            langImg.alt = `${lang.code} icon`; // Erişilebilirlik için alt metin
            langImg.style.width = '24px'; // Boyutlandırma
            langImg.style.height = '24px';
            langImg.style.borderRadius = '80%'; // Yuvarlak görünüm için
            langImg.style.display = 'block';
            langImg.style.margin = 'auto'; // Ortalamak için
            langImg.style.cursor = 'pointer'; // El işareti için

        
            langButton.style.width = '40px';
            langButton.style.height = '40px';
            langButton.style.borderRadius = '50%';
            langButton.style.border = 'none';
            langButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            langButton.style.marginBottom = '5px';
            langButton.style.cursor = 'pointer';
            langButton.style.display = 'flex'; // Merkezi hizalama
            langButton.style.alignItems = 'center';
            langButton.style.justifyContent = 'center';
            
            // PNG ekle
            langButton.appendChild(langImg);
            
            langButton.addEventListener('click', () => {
                onLanguageSelected(lang.code);
            });
            
            dropdownMenu.appendChild(langButton);
        });
        
  
      selectedLang.addEventListener('click', (event) => {
          event.stopPropagation(); 
          dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'flex' : 'none';
      });
  
      document.addEventListener('click', (event) => {
          if (!languageSelector.contains(event.target)) {
              dropdownMenu.style.display = 'none';
          }
      });
  
      languageSelector.appendChild(selectedLang);
      languageSelector.appendChild(dropdownMenu);
      document.body.appendChild(languageSelector);
  }
  
  function onLanguageSelected(lang) {
    currentLanguage = lang; // Mevcut dili güncelle
    applyTranslations(lang); // Seçilen dil için çevirileri uygula
    maliyetgösterfonk(A, B, H); // Maliyet container'ını yeni dile göre güncelle
    dropdownMenu.style.display = 'none'; // Menü kapat
}
    
  // Dil değiştirme fonksiyonu
  function changeLanguage(lang) {
      const translations = {
          tr: { createCube: "3D Modelle", hideButton: "Gizle" },
          en: { createCube: "Create 3D", hideButton: "Hide" },
          ar: { createCube: "إنشاء ثلاثي الأبعاد", hideButton: "إخفاء" },
      };
  
      document.getElementById('createCube').textContent = translations[lang].createCube;
      document.getElementById('hideButton').textContent = translations[lang].hideButton;
  }
  
  // Sayfa yüklendiğinde çağır
  document.addEventListener('DOMContentLoaded', () => {
      addLanguageSelector();
  });

  // Sayfa yüklendiğinde varsayılan dilde metinleri ayarla
document.addEventListener('DOMContentLoaded', () => {
  changeLanguage(currentLanguage); // Varsayılan dili kullanarak metinleri güncelle
});

  
  document.addEventListener('DOMContentLoaded', () => {
    const dropdownMenu = document.getElementById('languageSelector').querySelector('div'); // Dropdown menüyü seçin
    
    // Menü içindeki her bayrak için event listener ekleyin
    dropdownMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.hasAttribute('data-lang')) {
            dropdownMenu.style.display = 'none'; // Menü bayrak seçildikten sonra kapanır
        }
    });
});

//#endregion
