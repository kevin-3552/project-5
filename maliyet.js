
export let BrÇlkM2
export let ÇelikTonaj
export let BrmFytÇlk
export let MlytToplamÇlk
export let MlytToplamÇlkTL
export let dolarKuru;

// App.js den,
 import {vinçcheckbox} from './container.js'



// Dolar kurunu API'den al
fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
        dolarKuru = data.rates.TRY;
        console.log('Güncel Dolar Kuru:', dolarKuru);
    })
    .catch(error => {
        console.error('Dolar kuru alınırken hata oluştu:', error);
    });

export function checkDolarKuruReady(callback) {
        if (dolarKuru) {
            callback();
        } else {
            setTimeout(() => checkDolarKuruReady(callback), 100); // 100 ms sonra tekrar kontrol et
        }
      }
      

 export function ÇelikTonajı(A, B, H) {
    A = parseFloat(document.getElementById('A').value);
    B = parseFloat(document.getElementById('B').value);
    H = parseFloat(document.getElementById('H').value);

    if (isNaN(A) || isNaN(B) || isNaN(H)) {
        console.warn("Geçersiz A, B veya H değeri: ", { A, B, H });
        return { ÇelikTonaj: NaN, MlytToplamÇlk: NaN, MlytToplamÇlkTL: NaN };
      }
    

        // Vinç seçiliyse BrÇlkM2'yi farklı bir hesaplama ile belirleyin
        if (vinçcheckbox && vinçcheckbox.checked) {
            // Vinç işaretliyken BrÇlkM2'ye farklı değerler verilebilir
            if (H >= 0 && H <= 6) {
                BrÇlkM2 = 60; // Örneğin, normalden %20 daha fazla olarak belirleyin
            } else if (H > 6 && H <= 8) {
                BrÇlkM2 = 73;
            } else if (H > 8 && H <= 10) {
                BrÇlkM2 = 80;
            } else if (H > 10 && H <= 12) {
                BrÇlkM2 = 105;
            } else if (H > 12 && H <= 16) {
                BrÇlkM2 = 115;
            } else if (H > 16 && H <= 23) {
                BrÇlkM2 = 126;
            } else if (H > 23) {
                BrÇlkM2 = 125 + ((H - 23) * 3.6); // Yüzde artırarak bir hesaplama
            }
        } else {
            // Vinç işaretli değilken orijinal hesaplamalar
            if (H >= 0 && H <= 6) {
                BrÇlkM2 = 50;
            } else if (H > 6 && H <= 8) {
                BrÇlkM2 = 63;
            } else if (H > 8 && H <= 10) {
                BrÇlkM2 = 70;
            } else if (H > 10 && H <= 12) {
                BrÇlkM2 = 88;
            } else if (H > 12 && H <= 16) {
                BrÇlkM2 = 95;
            } else if (H > 16 && H <= 23) {
                BrÇlkM2 = 105;
            } else if (H > 23) {
                BrÇlkM2 = 105 + ((H - 23) * 3);
            }
        }
/*    
        
        if (H >= 0 && H <= 6) {
            BrÇlkM2 = 50;
        } else if (H > 6 && H <= 8) {
            BrÇlkM2 = 63;
        } else if (H > 8 && H <= 10) {
            BrÇlkM2 = 70;
        } else if (H > 10 && H <= 12) {
            BrÇlkM2 = 88;
        } else if (H > 12 && H <= 16) {
            BrÇlkM2 = 95;
        } else if (H > 16 && H <= 23) {
            BrÇlkM2 = 105;
        } else if (H > 23) {
            BrÇlkM2 = 105 + ((H - 23) * 3);
        }*/
             
        ÇelikTonaj = (A*B*BrÇlkM2)/1000
        BrmFytÇlk = 2000
        MlytToplamÇlk =BrmFytÇlk * ÇelikTonaj
        MlytToplamÇlkTL = dolarKuru* MlytToplamÇlk
        console.log("ÇelikTonaj:", ÇelikTonaj);
        console.log("MlytToplamÇlk:", MlytToplamÇlk);
                
        return { ÇelikTonaj, MlytToplamÇlk, MlytToplamÇlkTL};


    }


    