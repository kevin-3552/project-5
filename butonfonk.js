
//#region Değişkenler
export let kolonGrubu;
export let soldiyagonelGrup 
export let sağdiyagonelGrup
export let zeminesascons; 
export let makasçoğal
export let yankirişcons
export let makasiçibracingTamCons
export let ÇaprazYanCons
export let ÇatıÇAprazCons 
export let totemcons
export let CepheKaplamaCons
export let SolÇatıKaplamacons
export let vinçkirişicons
export let triangleWrapper

//#endregion

//#region IMPORT'lar
// App.js den ve container.js den 
import { scene, camera, renderer, controls, } from './app.js'
import { vinçcheckbox, maliyetgösterfonk } from './container.js'



// Nesneler
import { YATAYKOLONGRUBU, SOLDİYAGONELGRUBU, SAĞDİYAGONELGRUBU, MakasGrupÇoğalt, YanKiriş_1, MakasİçiAltTamBracing, 
    Bracing_MakasİçiTam, ÇaprazYanKomple, ÇatıÇapraz1MakasGrup, ÇatıÇaprazTam, Totem1,CepheKaplamaSağSol, SolÇatıKaplama,
MK_UZUNLUK, ZEMİNESAS, VinçKirişi, VincKancasi, loadedFont, DKG} from './nesneler.js';  // 
  
// Hesaplar
import { DİKMEHESAPLA, hesaplaDüşeyAks, hesaplaYatayKolon, ÇATIEĞİMHETKİSİHESAP, MAKASBOYUHESAP, 
ZEMİNESASEBATHESAP, YanBağKirişHesap , ÇaprazYanHesap, KaplamaSınırHesap, ArkaKaplamaSınır } from './hesapla.js'; 
  
// Hesapla Const
import { MKAÇI, YanKirişArası, YanBağKirişAdet, YATAYHOLGENİŞLİĞİ, DÜŞEYHOLSAYISI, DÜŞEYHOLGENİŞLİĞİ ,
MAKAS_YÜKSEKL_HESAPLA, ÇaprazYükseklik} from './hesapla.js';
  
// Geometriler
import { YatayÇaprazÇap, KOLONEBAT, KOLON_BOX1 , MK_EN, YATAY_MK_GEO_1 } from './geometriler.js';  // 
  
  
//#region Maliyetler Import
import { ÇelikTonajı , ÇelikTonaj,  MlytToplamÇlk, MlytToplamÇlkTL, dolarKuru, checkDolarKuruReady} from './maliyet.js';  // 

//#endregion 
//#endregion 

//#region 3D Buton Fonksyion
export function üçdbutonabas (A, B, K,H) {
      //#region Buton iç Fonksiyon detaylar
          if (kolonGrubu) {scene.remove(kolonGrubu);}
          if (soldiyagonelGrup) {scene.remove(soldiyagonelGrup);}
          if (sağdiyagonelGrup) {scene.remove(sağdiyagonelGrup);}
          if (zeminesascons) { scene.remove(zeminesascons); }
          if (makasçoğal) { scene.remove(makasçoğal);}
          if (yankirişcons) { scene.remove(yankirişcons);}
          if (makasiçibracingTamCons) { scene.remove(makasiçibracingTamCons);}
          if (ÇaprazYanCons) { scene.remove(ÇaprazYanCons);}
          if (ÇatıÇAprazCons) { scene.remove(ÇatıÇAprazCons);}
          if (totemcons) { scene.remove(totemcons);}
          if (CepheKaplamaCons) { scene.remove(CepheKaplamaCons);}
          if (SolÇatıKaplamacons) { scene.remove(SolÇatıKaplamacons);}
          if (vinçkirişicons) { scene.remove(vinçkirişicons);}
                  
          A = parseFloat(document.getElementById('A').value);  
          B = parseFloat(document.getElementById('B').value);   
          H = parseFloat(document.getElementById('H').value);  
          K = parseFloat(document.getElementById('K').value); 
      
          hesaplaDüşeyAks(B, K); 
          hesaplaYatayKolon(A); 
          MAKAS_YÜKSEKL_HESAPLA(YATAYHOLGENİŞLİĞİ, H)
          ÇATIEĞİMHETKİSİHESAP(H, YATAYHOLGENİŞLİĞİ, MKAÇI);
          MAKASBOYUHESAP()
          ZEMİNESASEBATHESAP(A, B)
          DİKMEHESAPLA(H)
          DKG(H)
          YanBağKirişHesap(H)
          ÇaprazYanHesap() 
          YATAY_MK_GEO_1(YATAYHOLGENİŞLİĞİ, MK_UZUNLUK)
          KaplamaSınırHesap ()
      
      
          maliyetgösterfonk(A, B, H)
       
          kolonGrubu = YATAYKOLONGRUBU(H);  // Kolon grubu oluşturuluyor
          soldiyagonelGrup = SOLDİYAGONELGRUBU(H);
          sağdiyagonelGrup = SAĞDİYAGONELGRUBU(H);
          makasçoğal = MakasGrupÇoğalt(H);
          zeminesascons =ZEMİNESAS(A, B);
          yankirişcons = YanKiriş_1(H, A);
          makasiçibracingTamCons =  Bracing_MakasİçiTam(H)
          ÇaprazYanCons = ÇaprazYanKomple(H)
          ÇatıÇAprazCons = ÇatıÇaprazTam(H)
          totemcons= Totem1(H)
          CepheKaplamaCons = CepheKaplamaSağSol(B, H, A)
          SolÇatıKaplamacons = SolÇatıKaplama(H, B,)
          vinçkirişicons = VinçKirişi(H, B);
          
          scene.add(kolonGrubu);  
          scene.add(soldiyagonelGrup); 
          scene.add(sağdiyagonelGrup); 
          scene.add(zeminesascons);  
          scene.add(zeminesascons);
          scene.add(makasçoğal);
          scene.add(yankirişcons);
          scene.add(makasiçibracingTamCons);
          scene.add(ÇaprazYanCons);
          scene.add(ÇatıÇAprazCons);
          scene.add(totemcons)
          scene.add(CepheKaplamaCons)
          scene.add(SolÇatıKaplamacons)
              if (vinçcheckbox.checked) {
                  scene.add(vinçkirişicons);  // Vinç kirişini sahneye ekle
              } else {
              }
        
                
      //#endregion buton iç fonksiyon detay bitiş  

        };
//#endregion

//#region Vinç kirişini sahneye ekleme/çıkarma fonksiyonu
export function vinçkirişkaldir() {
    vinçcheckbox.addEventListener('change', () => {
      if (vinçcheckbox.checked) {
        scene.add(vinçkirişicons);
        maliyetgösterfonk(A, B, H); // Maliyeti güncelle
        console.log("Vinç sahneye eklendi:", vinçkirişicons);
      } else {
        // Checkbox işareti kaldırıldıysa vinç kirişini sahneden çıkar
        if (vinçkirişicons) {
          scene.remove(vinçkirişicons);
          maliyetgösterfonk(A, B, H); // Maliyeti güncelle
          console.log("Vinç sahneden çıkarıldı.");
        }
      }
    });
  }
  //#endregion
  
//#region Üçgen drag opaklık ayarlama fonksiyonu
export function üçgenOpaklıkAyarlama() {
  // Ana wrapper oluşturma
  triangleWrapper = document.createElement("div");
  triangleWrapper.style.position = "absolute";
  triangleWrapper.style.top = "15px";
  triangleWrapper.style.left = "250px";
  triangleWrapper.style.display = "flex";
  triangleWrapper.style.flexDirection = "column";
  triangleWrapper.style.alignItems = "center";

  // Opaklık yazısı ekleme
  const opacityLabel = document.createElement("span");
  opacityLabel.textContent = "Opaklık";
  opacityLabel.style.fontSize = "14px";
  opacityLabel.style.color = "black";
  opacityLabel.style.marginBottom = "5px";
  triangleWrapper.appendChild(opacityLabel);

  // Üçgen şekli oluşturma
  const opacityTriangle = document.createElement("div");
  opacityTriangle.style.width = "0";
  opacityTriangle.style.height = "0";
  opacityTriangle.style.borderTop = "7px solid transparent";
  opacityTriangle.style.borderBottom = "7px solid transparent";
  opacityTriangle.style.borderLeft = "80px solid rgba(0, 0, 0, 0.5)";
  triangleWrapper.appendChild(opacityTriangle);

  // İşaretçi olarak hareket edecek dikdörtgen oluşturma
  const sliderHandle = document.createElement("div");
  sliderHandle.style.position = "absolute";
  sliderHandle.style.width = "10px";
  sliderHandle.style.height = "20px";
  sliderHandle.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  sliderHandle.style.cursor = "pointer";
  sliderHandle.style.top = "18px";
  sliderHandle.style.left = "10px";
  triangleWrapper.appendChild(sliderHandle);

  // Elemanları DOM'a ekleme
  document.body.appendChild(triangleWrapper);

  let isDragging = false;

  // Masaüstü için sürükleme başlatma
  sliderHandle.addEventListener("mousedown", function() {
    isDragging = true;
  });

  // Mobil için sürükleme başlatma
  sliderHandle.addEventListener("touchstart", function() {
    isDragging = true;
  });

  // Sürükleme bitirme olayları
  document.addEventListener("mouseup", function() {
    isDragging = false;
  });

  document.addEventListener("touchend", function() {
    isDragging = false;
  });

  // Sürükleme esnasında işaretçiyi hareket ettirme
  function moveSlider(event) {
    if (isDragging) {
      const minLeft = 0;
      const maxLeft = 70;

      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      let newLeft = clientX - triangleWrapper.offsetLeft;
      newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));

      sliderHandle.style.left = `${newLeft}px`;

      const opacityValue = 1 - ((newLeft - minLeft) / (maxLeft - minLeft)) * (1 - 0.1);

      if (typeof CepheKaplamaCons !== "undefined") {
        CepheKaplamaCons.children.forEach(mesh => {
          if (mesh.material) {
            mesh.material.opacity = opacityValue;
            mesh.material.needsUpdate = true;
          }
        });
      }
      
      if (typeof SolÇatıKaplamacons !== "undefined") {
        SolÇatıKaplamacons.children.forEach(mesh => {
          if (mesh.material) {
            mesh.material.opacity = opacityValue;
            mesh.material.needsUpdate = true;
          }
        });
      }
    }
  }

  // Masaüstü ve mobil için sürükleme hareketini algıla
  document.addEventListener("mousemove", moveSlider);
  document.addEventListener("touchmove", moveSlider);

  // **Mobilde Farklı Stil Uygula**
  if (window.innerWidth <= 768) { // 768px altındaki ekranları mobil olarak kabul ediyoruz
      triangleWrapper.style.top = "9px"; // Mobil için yukarı taşı
      triangleWrapper.style.left =`${mobilpikselkenar+50}px`;
      opacityLabel.style.fontSize = "14px"; // Yazıyı küçült
      opacityTriangle.style.marginTop = "4px"; // Üçgeni aşağı çekmek için
      sliderHandle.style.marginTop = "7px"; // İşaretçiyi daha aşağı taşımak için top değerini artırdık
      opacityLabel.style.marginBottom = "8px";
      


  }

  
}
//#endregion