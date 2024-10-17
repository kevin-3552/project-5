    // Temel sahne, kamera ve renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Gölgelendirme etkinleştir
    document.body.appendChild(renderer.domElement);

    // Orbit Controls ekleyelim
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Formu gizlemek/göstermek için buton ayarları
const form = document.getElementById("form");
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", () => {
    if (form.style.display === "none") {
        form.style.display = "block";
        toggleButton.innerHTML = "▲"; // Form açıldığında yukarı ok göster
    } else {
        form.style.display = "none";
        toggleButton.innerHTML = "▼"; // Form kapandığında aşağı ok göster
    }
});


    const BKAT=0.5
    const K=1

    // Güneş ve gökyüzü için bir ışık kaynağı ekleyelim
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(50, 100, 50);
    dirLight.castShadow = true; // Gölge oluşturma etkinleştir
    scene.add(dirLight);

    // Texture yükleyici oluştur
    const textureLoader = new THREE.TextureLoader();

    // Zemin (çim) ekleyelim
    const groundTexture = textureLoader.load('textures/çim 2.png'); // Gerçekçi çim dokusu
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);

    const groundBumpMap = textureLoader.load('textures/çim 3.png'); // Çim için bump map


    const groundMaterial = new THREE.MeshStandardMaterial({
        map: groundTexture,
        bumpMap: groundBumpMap,
        bumpScale: 0.2,   
    });


    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Zemin yatay olsun
    ground.receiveShadow = true;
    scene.add(ground);

    // Gökyüzü (skybox) ekleyelim
    const skyTexture = textureLoader.load('textures/cloud 1.png'); // Bulutlu gökyüzü dokusu
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Kamera pozisyonu
    camera.position.z = 50;
    camera.position.x = 20;

    // Duvarları oluşturma fonksiyonu
    function createWalls(A, B, H, D) {
        // Eski duvarları temizle
        while (scene.children.length > 3) { 
            scene.remove(scene.children[3]); 
        }

        // 1. Duvar (Sarı)
        const duvarTexture = textureLoader.load('textures/sandviç3.png'); // yan duvar sandviç panel
        duvarTexture.wrapS = THREE.RepeatWrapping; // Yatayda tekrar etme
        duvarTexture.wrapT = THREE.RepeatWrapping; // Dikeyde tekrar etme
        duvarTexture.repeat.set(B, H/12); // Dokunun Bx1 kez tekrarlanmasını sağlar
        const wall1Geometry = new THREE.BoxGeometry(DK, H, B);
        const wall1Material = new THREE.MeshBasicMaterial({ map: duvarTexture, side: THREE.BackSide });
        const wall1 = new THREE.Mesh(wall1Geometry, wall1Material);
        wall1.castShadow = true;
        wall1.receiveShadow = true;
        wall1.position.set(0, H / 2, 0);
        scene.add(wall1);

        // 2. Duvar (Mavi)
        const wall2Geometry = new THREE.BoxGeometry(DK, H, B);
        const wall2 = new THREE.Mesh(wall2Geometry, wall1Material);
        wall2.castShadow = true;
        wall2.receiveShadow = true;
        wall2.position.set(A, H / 2, 0);
        scene.add(wall2);

        // 3. Çatı (Yeşil, X ekseni ile 10° açılı)
        const WALL3Texture = textureLoader.load('textures/sandviç5.png'); // yan duvar sandviç panel
        WALL3Texture.wrapS = THREE.RepeatWrapping; // Yatayda tekrar etme
        WALL3Texture.wrapT = THREE.RepeatWrapping; // Dikeyde tekrar etme
        WALL3Texture.repeat.set(1, B); // Dokunun Bx1 kez tekrarlanmasını sağlar
        const wall3Geometry = new THREE.BoxGeometry(A / 2, DK, B);
        const wall3Material = new THREE.MeshBasicMaterial({ map: WALL3Texture, side: THREE.BackSide });
        const wall3 = new THREE.Mesh(wall3Geometry, wall3Material);
        wall3.castShadow = true;
        wall3.receiveShadow = true;
        wall3.position.set(A / 4, H + (0.173 * (A / 4)), 0);
        wall3.rotation.z = THREE.Math.degToRad(10); // 10° açı yap
        scene.add(wall3);

        // 4. Çatı (Yeşil, X ekseni ile -10° açılı)
        const wall4 = new THREE.Mesh(wall3Geometry, wall3Material);
        wall4.castShadow = true;
        wall4.receiveShadow = true;
        wall4.position.set(3 * A / 4, H + (0.173 * (A / 4)), 0);
        wall4.rotation.z = THREE.Math.degToRad(-10); // -10° açı yap
        scene.add(wall4);

    }

    function createBATAR1(A, B, H, D) {
        

        // 5.BATAR KAT
        const batarTexture = textureLoader.load('textures/concrete.png'); // batar beton gökyüzü dokusu
        const BATAR1Geometry = new THREE.BoxGeometry(A/2, DK , AZ);
        const BATARMaterial = new THREE.MeshBasicMaterial({ map: batarTexture, side: THREE.BackSide });
        const BATAR1 = new THREE.Mesh(BATAR1Geometry, BATARMaterial);
        BATAR1.position.set(A/4, H/2, B/2-(D/(A)))
        scene.add(BATAR1);
        

        // 6.BATAR KAT KOLON 1
        const BATARKOLON1Geometry = new THREE.BoxGeometry(BKE, H/2, BKE);
        const BATARKOLON1Material = new THREE.MeshBasicMaterial({ color: 0xba4a00 });
        const BATARKOLON1 = new THREE.Mesh(BATARKOLON1Geometry, BATARKOLON1Material);
        BATARKOLON1.position.set(A/2, H/4, B/2)
        scene.add(BATARKOLON1);
    
        // 7.BATAR KAT KOLON 2
        const BATARKOLON2Geometry = new THREE.BoxGeometry(BKE, H/2, BKE);
        const BATARKOLON2Material = new THREE.MeshBasicMaterial({ color: 0xba4a00 });
        const BATARKOLON2 = new THREE.Mesh(BATARKOLON2Geometry, BATARKOLON1Material);
        BATARKOLON2.position.set(A/2, H/4, B/2-AZ)
        scene.add(BATARKOLON2);

    }

    function createBATAR5(A, B, H, D) {
        

        // 8.BATAR KAT
        const batarTexture = textureLoader.load('textures/concrete.png'); // batar beton gökyüzü dokusu
        const BATAR8Geometry = new THREE.BoxGeometry(A/3, DK , AZZ);
        const BATARMaterial = new THREE.MeshBasicMaterial({ map: batarTexture, side: THREE.BackSide });
        const BATAR8 = new THREE.Mesh(BATAR8Geometry, BATARMaterial);
        BATAR8.position.set((A/6) , H/2, B/2 - AZZ/2) 
        scene.add(BATAR8);
        

        // 9.BATAR KAT KOLON 1
        const BATARKOLON1Geometry = new THREE.BoxGeometry(BKE, H/2, BKE);
        const BATARKOLON1Material = new THREE.MeshBasicMaterial({ color: 0xba4a00 });
        const BATARKOLON9 = new THREE.Mesh(BATARKOLON1Geometry, BATARKOLON1Material);
        BATARKOLON9.position.set(A/3, H/4, B/2)
        scene.add(BATARKOLON9);
    
        // 10.BATAR KAT KOLON 2
        const BATARKOLON10Geometry = new THREE.BoxGeometry(BKE, H/2, BKE);
        const BATARKOLON10 = new THREE.Mesh(BATARKOLON10Geometry, BATARKOLON1Material);
        BATARKOLON10.position.set(A/3 , H/4, B/2-AZZ)
        scene.add(BATARKOLON10);

    }


    function createwallswithoffset(A, B, H, D, K, DK, AZ, BKE, offsetx) {


        // 1. Duvar (Sarı)
    const duvarTexture = textureLoader.load('textures/sandviç3.png'); // yan duvar sandviç panel
    duvarTexture.wrapS = THREE.RepeatWrapping; // Yatayda tekrar etme
    duvarTexture.wrapT = THREE.RepeatWrapping; // Dikeyde tekrar etme
    duvarTexture.repeat.set(B, H/12); // Dokunun Bx1 kez tekrarlanmasını sağlar
    const wall1Geometry = new THREE.BoxGeometry(DK, H, B);
    const wall1Material = new THREE.MeshBasicMaterial({ map: duvarTexture, side: THREE.BackSide });
    const wall1 = new THREE.Mesh(wall1Geometry, wall1Material);
    wall1.castShadow = true;
    wall1.receiveShadow = true;
    wall1.position.set(0 + offsetx, H / 2, 0);
    scene.add(wall1);

    // 2. Duvar (Mavi)
    const wall2Geometry = new THREE.BoxGeometry(DK, H, B);
    const wall2 = new THREE.Mesh(wall2Geometry, wall1Material);
    wall2.castShadow = true;
    wall2.receiveShadow = true;
    wall2.position.set(A + offsetx, H / 2, 0);
    scene.add(wall2);

    // 3. Çatı (Yeşil, X ekseni ile 10° açılı)
    const WALL3Texture = textureLoader.load('textures/sandviç5.png'); // yan duvar sandviç panel
    WALL3Texture.wrapS = THREE.RepeatWrapping; // Yatayda tekrar etme
    WALL3Texture.wrapT = THREE.RepeatWrapping; // Dikeyde tekrar etme
    WALL3Texture.repeat.set(1, B); // Dokunun Bx1 kez tekrarlanmasını sağlar
    const wall3Geometry = new THREE.BoxGeometry(A / 2, DK, B);
    const wall3Material = new THREE.MeshBasicMaterial({ map: WALL3Texture, side: THREE.BackSide });
    const wall3 = new THREE.Mesh(wall3Geometry, wall3Material);
    wall3.castShadow = true;
    wall3.receiveShadow = true;
    wall3.position.set(A / 4 + offsetx, H + (0.173 * (A / 4)), 0);
    wall3.rotation.z = THREE.Math.degToRad(10); // 10° açı yap
    scene.add(wall3);

    // 4. Çatı (Yeşil, X ekseni ile -10° açılı)
    const wall4 = new THREE.Mesh(wall3Geometry, wall3Material);
    wall4.castShadow = true;
    wall4.receiveShadow = true;
    wall4.position.set(3 * A / 4 + offsetx, H + (0.173 * (A / 4)), 0);
    wall4.rotation.z = THREE.Math.degToRad(-10); // -10° açı yap
    scene.add(wall4);
    }



    // Kullanıcı formu ve buton işlemleri
    document.getElementById('create').addEventListener('click', () => {
        const A = parseFloat(document.getElementById('A').value);
        const B = parseFloat(document.getElementById('B').value);
        const H = parseFloat(document.getElementById('H').value);
        const D = parseFloat(document.getElementById('D').value); // batar kat alanı

        AZ=(D/(A/2))   // ara kat uzunluğu - Alan / bina kısa kenarın yarısı
        AZZ=D/(A/3)
        DK=0.3    // duvar kalınlığı
        BKE=0.4 // batar kat kolon

        if (A<35) {createWalls(A, B, H, D, K, DK, AZ, BKE);createBATAR1(A, B, H, D)} 

        if (A>35) {
            const HS = Math.ceil(A / 35); // Hol sayısını belirle (aşağı yuvarla)
            const A2 = A / HS; // Yeni bina genişliği (her hol için)
            
            console.log(`HS (Hol Sayısı): ${HS}`);
            console.log(`A2 (Yeni Bina Genişliği): ${A2}`);

            while (scene.children.length > 3) 
                scene.remove(scene.children[3]); 
             
            createBATAR5 (A,B,H, D);
            
            for (let i = 0; i < HS; i++) {
                const offsetx = i * A2; // X ekseninde kaydırma mesafesi
                createwallswithoffset(A2, B, H, D, K, DK, AZ, BKE, offsetx); // Duvarları X ekseninde kaydırarak oluştur



            }
        }
    });
    


    // Animasyon fonksiyonu
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', function () {
        let width = window.innerWidth;
        let height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
