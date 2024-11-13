
export let YatayÇaprazÇap
export let KOLONEBAT
export let MK_EN 
export let MK_YÜKS


// #region DEĞİŞKENLER import
import { kolonMaterial1, MAKASMALZEME } from './malzemeler.js'; // Malzeme dosyasını import edin
import { KOLONUZUNLUK } from './nesneler.js'; // Malzeme dosyasını import edin


// #endregion

//#region HEA300
export function HEA300(H) {
  const FE = 0.3;  // Flanş eni
  const FK = 0.01; // Flanş kalınlığı
  const GE = 0.3;  // Gövde eni
  const GK = 0.01; // Gövde kalınlığı

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('textures/çelik7.png');
  
  // Texture'ün tekrarlanması için wrapS ve wrapT ayarlamaları
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 5);  // 2x2 oranında tekrar eder

  const KM = new THREE.MeshBasicMaterial({
    map: texture
  });

  const F1Geometry = new THREE.BoxGeometry(FK, H, FE);
  const F1 = new THREE.Mesh(F1Geometry, KM);
  F1.position.set(GE / 2, H / 2, 0);

  const F2Geometry = new THREE.BoxGeometry(FK, H, FE);
  const F2 = new THREE.Mesh(F2Geometry, KM);
  F2.position.set(-GE/2, H / 2, 0);

  const G1Geometry = new THREE.BoxGeometry(GE, H, GK);
  const G1 = new THREE.Mesh(G1Geometry, KM);
  G1.position.set(0, H / 2, 0);

  const kolonGroup = new THREE.Group();
  kolonGroup.add(F1);
  kolonGroup.add(F2);
  kolonGroup.add(G1);

  return kolonGroup;  // Grup olarak geri döndürülüyor
}
//#endregion

//#region Kolon Box 1
export function KOLON_BOX1(KOLONUZUNLUK, malzeme = kolonMaterial1) {

  // KOLONUZUNLUK değerine göre KOLONEBAT belirleniyor
  if (KOLONUZUNLUK > 0 && KOLONUZUNLUK <= 6) {
    KOLONEBAT = 0.23;
  } else if (KOLONUZUNLUK > 6 && KOLONUZUNLUK <= 7) {
    KOLONEBAT = 0.3;
  } else if (KOLONUZUNLUK > 7 && KOLONUZUNLUK < 8) {
    KOLONEBAT = 0.35;
  } else if (KOLONUZUNLUK >= 8 && KOLONUZUNLUK < 12) {
    KOLONEBAT = 0.4;
  } else if (KOLONUZUNLUK >= 12) {
    KOLONEBAT = 0.5;
  } else {
    console.error("Geçersiz KOLONUZUNLUK değeri:", KOLONUZUNLUK);
    return null; // Hata durumunda fonksiyonu sonlandır
  }

  // Kolon için BoxGeometry oluşturuluyor
  const geometry = new THREE.BoxGeometry(KOLONEBAT, KOLONUZUNLUK, KOLONEBAT);

  // Texture ekleniyor
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('textures/çelik7.png');
  const kolon = new THREE.Mesh(geometry, malzeme);

  // Kolonun başlangıç pozisyonu merkezde ayarlanıyor
  kolon.position.set(0, KOLONUZUNLUK / 2, 0); // Kolonun y ekseninde merkezlenmesi için

  // Siyah köşe çizgileri için EdgesGeometry ve LineBasicMaterial kullanılıyor
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Siyah çizgiler
  const outline = new THREE.LineSegments(edges, lineMaterial);

  // Kolon ve çizgiler aynı pozisyona yerleştiriliyor
  outline.position.copy(kolon.position);

  // Kolon ve çizgileri bir grup olarak döndürüyoruz
  const kolonGroup = new THREE.Group();
  kolonGroup.add(kolon);
  kolonGroup.add(outline);

  return kolonGroup;
}
//#endregion

//#region Kolon1
export function KOLON1(H) {
  const FK = 0.01; // Flanş kalınlığı
  const GK = 0.01; // Gövde kalınlığı

  let FE; // Flanş eni
  let GE; // Gövde eni

  // H değerine göre FE ve GE ayarlanıyor
  if (H > 0 && H <= 6) {
      FE = 0.3;
      GE = 0.3;
    } else if (H > 6 && H <= 7) {
      FE = 0.35;
      GE = 0.35;    
  } else if (H > 7 && H < 8) {
      FE = 0.43;
      GE = 0.43;
  } else if (H >= 8 && H < 12) {
      FE = 0.55;
      GE = 0.55;
  } else if (H >= 12) {
      FE = 0.62;
      GE = 0.62;
  } else {
      console.error("Geçersiz H değeri:", H);
      return null; // Hata durumunda fonksiyonu sonlandır
  }
  
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('textures/çelik7.png');
  
  // Texture'ün tekrarlanması için wrapS ve wrapT ayarlamaları
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 5);  // 2x2 oranında tekrar eder
  
  const KM = new THREE.MeshBasicMaterial({
    map: texture
  });

  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Siyah kenar çizgisi

  // Flanş ve gövde parçaları oluşturuluyor
  const F1Geometry = new THREE.BoxGeometry(FK, H, FE);
  const F1 = new THREE.Mesh(F1Geometry, KM);
  F1.position.set(GE / 2, H / 2, 0);

  const F1Edges = new THREE.EdgesGeometry(F1Geometry); // Kenar çizgisi için
  const F1Line = new THREE.LineSegments(F1Edges, edgeMaterial);
  F1.add(F1Line); // Kenar çizgilerini ekler

  const F2Geometry = new THREE.BoxGeometry(FK, H, FE);
  const F2 = new THREE.Mesh(F2Geometry, KM);
  F2.position.set(-GE / 2, H / 2, 0);

  const F2Edges = new THREE.EdgesGeometry(F2Geometry);
  const F2Line = new THREE.LineSegments(F2Edges, edgeMaterial);
  F2.add(F2Line);

  const G1Geometry = new THREE.BoxGeometry(GE, H, GK);
  const G1 = new THREE.Mesh(G1Geometry, KM);
  G1.position.set(0, H / 2, 0);

  const G1Edges = new THREE.EdgesGeometry(G1Geometry);
  const G1Line = new THREE.LineSegments(G1Edges, edgeMaterial);
  G1.add(G1Line);

  // Grupları birleştir
  const kolonGroup = new THREE.Group();
  kolonGroup.add(F1);
  kolonGroup.add(F2);
  kolonGroup.add(G1);

  return kolonGroup;  // Grup olarak geri döndürülüyor
}
//#endregion

//#region Yatay_Makas Geometri 1
export function YATAY_MK_GEO_1(YATAYHOLGENİŞLİĞİ, MK_UZUNLUK) {
 /* let MK_EN, MK_YÜKS;*/

  // YATAYHOLGENİŞLİĞİ değerine göre MK_EN ve MK_YÜKS belirleniyor
  if (YATAYHOLGENİŞLİĞİ > 0 && YATAYHOLGENİŞLİĞİ <= 6) {
    MK_EN = 0.20;
    MK_YÜKS = 0.17;
  } else if (YATAYHOLGENİŞLİĞİ > 6 && YATAYHOLGENİŞLİĞİ <= 10) {
    MK_EN = 0.22;
    MK_YÜKS = 0.20;
  } else if (YATAYHOLGENİŞLİĞİ > 10 && YATAYHOLGENİŞLİĞİ <= 15) {
    MK_EN = 0.25;
    MK_YÜKS = 0.22;
  } else if (YATAYHOLGENİŞLİĞİ > 15 && YATAYHOLGENİŞLİĞİ <= 20) {
    MK_EN = 0.28;
    MK_YÜKS = 0.26;
  } else if (YATAYHOLGENİŞLİĞİ > 20 && YATAYHOLGENİŞLİĞİ <= 25) {
    MK_EN = 0.31;
    MK_YÜKS = 0.29;
  } else if (YATAYHOLGENİŞLİĞİ > 25) {
    MK_EN = 0.33;
    MK_YÜKS = 0.33;
  } else {
    console.error("Geçersiz YATAYHOLGENİŞLİĞİ değeri:", YATAYHOLGENİŞLİĞİ);
    return null;
  }

  // Geometri ve mesh oluşturuluyor
  const geometry = new THREE.BoxGeometry(MK_EN, MK_UZUNLUK, MK_YÜKS);
  const mesh = new THREE.Mesh(geometry, MAKASMALZEME);

  // Siyah dış köşe çizgileri için EdgesGeometry ve LineBasicMaterial kullanılıyor
  const edges = new THREE.EdgesGeometry(geometry);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const edgeLines = new THREE.LineSegments(edges, edgeMaterial);

  // Grup olarak döndürülüyor
  const group = new THREE.Group();
  group.add(mesh);
  group.add(edgeLines);

  return group;
}
//#endregion

//#region Yatay Kiriş profil 1
export function Yatay_Kiriş_Profil_1(yatayboy_1, malzeme, H) {
  let YK_EN;

  if (H < 6) {
      YK_EN = 0.1;
  } else if (H >= 6 && H < 12) {
      YK_EN = 0.12;
  } else if (H >= 12 && H < 18) {
      YK_EN = 0.14;
  } else if (H >= 18 && H < 25) {
      YK_EN = 0.16;
  } else if (H >= 25) {
      YK_EN = 0.25;
  }
  const geometry = new THREE.BoxGeometry(YK_EN, yatayboy_1, YK_EN);
  const kolon = new THREE.Mesh(geometry, malzeme);
  kolon.position.set(0, 0, 0);


  // Siyah köşe çizgileri 
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Siyah çizgiler
  const outline = new THREE.LineSegments(edges, lineMaterial);
  // Kolon ve çizgiler aynı pozisyona yerleştiriliyor
  outline.position.copy(kolon.position);

  // Kolon ve çizgileri bir grup olarak döndürüyoruz
  const kolonGroup = new THREE.Group();
  kolonGroup.add(kolon);
  kolonGroup.add(outline);

  return kolonGroup;
}
//#endregion

//#region Yatay Kiriş profili2
export function Yatay_Kiriş_Profil_2(yatayboy_1, malzeme, H) {
  let YK_EN =0.16
 
  const geometry = new THREE.BoxGeometry(YK_EN, yatayboy_1, YK_EN);
  const kolon = new THREE.Mesh(geometry, malzeme);
  kolon.position.set(0, 0, 0);

  // Siyah köşe çizgileri 
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Siyah çizgiler
  const outline = new THREE.LineSegments(edges, lineMaterial);
  // Kolon ve çizgiler aynı pozisyona yerleştiriliyor
  outline.position.copy(kolon.position);

  // Kolon ve çizgileri bir grup olarak döndürüyoruz
  const kolonGroup = new THREE.Group();
  kolonGroup.add(kolon);
  kolonGroup.add(outline);

  return kolonGroup;
}
//#endregion

//#region Yatay Çapraz Profili
export function YatayÇaprazProfil(H, yatayçaprazuzunluk) {
    if (H > 0 && H <= 6) {
      YatayÇaprazÇap = 0.09;
  } else if (H >6 && H < 12) {
      YatayÇaprazÇap = 0.11;
  } else if (H >= 12 && H < 18) {
      YatayÇaprazÇap = 0.13;
  } else if (H >= 18) {
      YatayÇaprazÇap = 0.16;
  } else {
      console.error("Geçersiz H değeri:", H);
      YatayÇaprazÇap = null;
  }

  // Açık pembe renkte standard material tanımı
  const malzeme = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Açık pembe renk (Hex kodu: 0xffc0cb)

  // Silindir geometrisi tanımı
  const geometry = new THREE.CylinderGeometry(YatayÇaprazÇap, YatayÇaprazÇap, yatayçaprazuzunluk, 32); // Silindir

  // Silindirin malzemesi atanıyor
  const yatayÇaprazSilindir = new THREE.Mesh(geometry, malzeme);
  yatayÇaprazSilindir.rotation.z = Math.PI / 2; // Silindiri yatay pozisyona getiriyoruz

  return { mesh: yatayÇaprazSilindir, YatayÇaprazÇap }; // Geometri (mesh) ve çap değerini döndürür

}
//#endregion Yatay Çapraz Profili

//#region Çatı Çapraz Profili
export function ÇatıÇaprazProfil(H, yatayçaprazuzunluk) {
  if (H > 0 && H <= 6) {
    YatayÇaprazÇap = 0.09;
} else if (H >6 && H < 12) {
    YatayÇaprazÇap = 0.11;
} else if (H >= 12 && H < 18) {
    YatayÇaprazÇap = 0.13;
} else if (H >= 18) {
    YatayÇaprazÇap = 0.16;
} else {
    console.error("Geçersiz H değeri:", H);
    YatayÇaprazÇap = null;
}

// Açık pembe renkte standard material tanımı
const malzeme = new THREE.MeshStandardMaterial({ color: 0x18c915 });
// Silindir geometrisi tanımı
const geometry = new THREE.CylinderGeometry(YatayÇaprazÇap, YatayÇaprazÇap, yatayçaprazuzunluk, 32);

// Silindirin malzemesi atanıyor
const yatayÇaprazSilindir = new THREE.Mesh(geometry, malzeme);
yatayÇaprazSilindir.rotation.z = 0 
yatayÇaprazSilindir.rotation.y = 0
yatayÇaprazSilindir.rotation.x = 0


return { mesh: yatayÇaprazSilindir, YatayÇaprazÇap }; // Geometri (mesh) ve çap değerini döndürür

}
//#endregion


