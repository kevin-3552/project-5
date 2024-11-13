/*
// #region ESKİ - AĞIR YÜKLENEN MALZEMELER 
//#region // DİYAGONEL MALZEMESİ ESKİ
const textureLoader3 = new THREE.TextureLoader();
export const DİYAGONELMALZEME= new THREE.MeshBasicMaterial({
map: textureLoader3.load('textures/diyagonel1.png')});  // DİYAGONEL malzemesi texture atanıyor
// #endregion

DİYAGONEL MALZEMESİ ESKİ
const textureLoader2 = new THREE.TextureLoader();
export const DİKMEMALZEME = new THREE.MeshBasicMaterial({
  map: textureLoader2.load('textures/dikme1.png')});  // DİYAGONEL malzemesi texture atanıyor

MAKAS MALZEME ESKİ
  const textureLoader = new THREE.TextureLoader();
export const MAKASMALZEME = new THREE.MeshBasicMaterial({
  map: textureLoader.load('textures/makas1.png')});  // Makas malzemesi texture atanıyor
//#endregion


// #endregion
*/

//#region Çim Zemin malzemesi
export const ÇimZeminMalzeme1 = (() => {
  // Texture yükleyici
  const textureLoader = new THREE.TextureLoader();
  const groundTexture = textureLoader.load('./textures/zemin.png');
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(5, 5);  // Zemin dokusunun tekrarlanmasını sağlar
  groundTexture.offset.y = -1;     // Y ekseninde dokuyu aşağı kaydırır

  // Çim zemin malzemesini oluştur
  return new THREE.MeshBasicMaterial({
    map: groundTexture,
    side: THREE.DoubleSide  // Zeminin iki yüzüne de doku ekler
  });
})();
//#endregion

// #region Kolon Malzemeleri - Kolon Material 1
export const kolonMaterial1 = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('textures/çelik7.png')
});
//#endregion

// #region Kolon Malzemeleri - Kolon Material 2
export const kolonMaterial2 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('textures/çelik13.png')
  });
// #endregion

// #region Kolon Malzemeleri - Kolon Material 3
export const kolonMaterial3 = new THREE.MeshStandardMaterial({
  color: 0xff0000 // Kırmızı renk için renk kodu
});

// #endregion

//#region Makas Malzemesi
const textureLoader = new THREE.TextureLoader();
export const MAKASMALZEME = new THREE.MeshBasicMaterial({
  map: textureLoader.load('./textures/makas1.png')});  // Makas malzemesi texture atanıyor
//#endregion

//#region  Dikme Malzemesi
export const DİKMEMALZEME = new THREE.MeshStandardMaterial({
  color: 0x8229c0,   // Açık mavi renk
  roughness: 0.5,    // Pürüzlülük; 0’a yakınsa daha parlak, 1’e yakınsa mat olur
  metalness: 0.1     // Metalik görünüm; 0 mat, 1 tamamen metalik
});
//#endregion

//#region // Diyagonel Malzemesi
export const DİYAGONELMALZEME = new THREE.MeshStandardMaterial({
  color: 0x87CEEB,   // Açık mavi renk
  roughness: 0.5,    // Pürüzlülük; 0’a yakınsa daha parlak, 1’e yakınsa mat olur
  metalness: 0.1     // Metalik görünüm; 0 mat, 1 tamamen metalik
});
// #endregion

//#region BağKirişi Malzemesi- Boyuna Akslarda
export const BağKirişiMalzeme = new THREE.MeshStandardMaterial({
  color: 0x20c0c0 
});
//#endregion

//#region BağKirişi 2 Malzemesi - makas içi
export const BağKirişiMalzeme2 = new THREE.MeshStandardMaterial({
  color: 0xc99b15 
});
//#endregion

//#region Kaplama malzemeleri
// cephe paneli
export function createKaplamaTexture() {
    const texture = new THREE.TextureLoader().load('textures/mavisandviç.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    /*texture.needsUpdate = true;*/
    return texture;
}

// Çatı Paneli
export function createKaplamaTexture2() {
  const textureLoader = new THREE.TextureLoader();
  

  
  // Texture yüklenme durumunu kontrol et
  const texture = textureLoader.load(
    'textures/kırmızıpanel.png',
    // Yükleme başarılı olduğunda
    (loadedTexture) => {
      console.log('kırmızıpanel.png başarıyla yüklendi');
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      loadedTexture.needsUpdate = true;
    },
    undefined,
    // Hata durumunda
    (error) => {
      console.error('kırmızıpanel.png yüklenirken hata oluştu:', error);
    }
  );

  return texture;
}

/*export function createKaplamaTexture2() {
  const texture = new THREE.TextureLoader().load('textures/kırmızıpanel.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
} orjinal console log göstermeyen..*/

//#endregion

