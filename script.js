    // Temel sahne, kamera ve renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
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
    groundTexture.repeat.set(25,25);

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

    let currentLine = null; // Mevcut yatay çizgi
let currentVerticalLine = null; // Mevcut dikey çizgi
let currentLabelDiv = null;  // Yatay ölçü yazısı için global değişken
let currentVerticalLabelDiv = null;  // Dikey ölçü yazısı için global değişken


function createWalls(A, B, H, D) {
    // Eski duvarları temizle
    while (scene.children.length > 3) { 
        scene.remove(scene.children[3]); 
    }

    // Eski yazıları temizle
    if (currentLabelDiv) {
        currentLabelDiv.remove();
        currentLabelDiv = null;
    }
    if (currentVerticalLabelDiv) {
        currentVerticalLabelDiv.remove();
        currentVerticalLabelDiv = null;
    }

    // Eğer eski çizgiler varsa sahneden çıkar
    if (currentLine) {
        scene.remove(currentLine);
        currentLine.geometry.dispose();
        currentLine.material.dispose();
        currentLine = null;
    }

    // DİKEY ÖLÇÜ ÇİZGİSİ OLUŞTURMA
    if (currentVerticalLine) {
        scene.remove(currentVerticalLine);
        currentVerticalLine.geometry.dispose();
        currentVerticalLine.material.dispose();
        currentVerticalLine = null;
    }
  
    // (Burada diğer duvar oluşturma kodları olacak)
    // 1. Duvar (Sarı)
    const duvarTexture = textureLoader.load('textures/sandviç3.png'); // yan duvar sandviç panel
    duvarTexture.wrapS = THREE.RepeatWrapping; // Yatayda tekrar etme
    duvarTexture.wrapT = THREE.RepeatWrapping; // Dikeyde tekrar etme
    duvarTexture.repeat.set(B, H / 12); // Dokunun Bx1 kez tekrarlanmasını sağlar
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

    // YATAY ÖLÇÜ ÇİZGİSİ OLUŞTURMA
    const point1 = new THREE.Vector3(0, 1, B / 2 + 1.5);
    const point2 = new THREE.Vector3(A, 1, B / 2 + 1.5);
    const points = [point1, point2];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
    currentLine = new THREE.Line(geometry, material);
    scene.add(currentLine);

    // Çizginin orta noktasını hesapla
    const midPoint = new THREE.Vector3().addVectors(point1, point2).divideScalar(2);
    const labelDiv = document.createElement('div');
    labelDiv.style.position = 'absolute';
    labelDiv.style.color = 'black';
    labelDiv.style.fontSize = '16px';
    labelDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    labelDiv.innerHTML = `${A} m`;
    document.body.appendChild(labelDiv);
    currentLabelDiv = labelDiv;

    // DİKEY ÖLÇÜ ÇİZGİSİ OLUŞTURMA
    const verticalPoint1 = new THREE.Vector3(-1, 0, -B / 2);
    const verticalPoint2 = new THREE.Vector3(-1, 0, B / 2);
    const verticalPoints = [verticalPoint1, verticalPoint2];
    const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints);
    const verticalMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    currentVerticalLine = new THREE.Line(verticalGeometry, verticalMaterial);
    scene.add(currentVerticalLine);

    const verticalMidPoint = new THREE.Vector3().addVectors(verticalPoint1, verticalPoint2).divideScalar(2);
    const verticalLabelDiv = document.createElement('div');
    verticalLabelDiv.style.position = 'absolute';
    verticalLabelDiv.style.color = 'black';
    verticalLabelDiv.style.fontSize = '16px';
    verticalLabelDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    verticalLabelDiv.innerHTML = `${B} m`;
    document.body.appendChild(verticalLabelDiv);
    currentVerticalLabelDiv = verticalLabelDiv;

    // Yatay yazı pozisyonunu güncelle
    function animateHorizontal() {
        requestAnimationFrame(animateHorizontal);
        camera.updateMatrixWorld();
        const vector = midPoint.clone().project(camera);
        const x = (vector.x * (window.innerWidth / 2)) + (window.innerWidth / 2);
        const y = -(vector.y * (window.innerHeight / 2)) + (window.innerHeight / 2);
        labelDiv.style.left = `${x}px`;
        labelDiv.style.top = `${y}px`;
    }
    animateHorizontal();

    // Dikey yazı pozisyonunu güncelle
    function animateVertical() {
        requestAnimationFrame(animateVertical);
        camera.updateMatrixWorld();
        const verticalVector = verticalMidPoint.clone().project(camera);
        const verticalX = (verticalVector.x * (window.innerWidth / 2)) + (window.innerWidth / 2);
        const verticalY = -(verticalVector.y * (window.innerHeight / 2)) + (window.innerHeight / 2);
        verticalLabelDiv.style.left = `${verticalX}px`;
        verticalLabelDiv.style.top = `${verticalY}px`;
    }
    animateVertical();
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
        duvarTexture.wrapS = THREE.RepeatWrapping;
        duvarTexture.wrapT = THREE.RepeatWrapping;
        duvarTexture.repeat.set(B, H / 12);
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
        const WALL3Texture = textureLoader.load('textures/sandviç5.png');
        WALL3Texture.wrapS = THREE.RepeatWrapping;
        WALL3Texture.wrapT = THREE.RepeatWrapping;
        WALL3Texture.repeat.set(1, B);
        const wall3Geometry = new THREE.BoxGeometry(A / 2, DK, B);
        const wall3Material = new THREE.MeshBasicMaterial({ map: WALL3Texture, side: THREE.BackSide });
        const wall3 = new THREE.Mesh(wall3Geometry, wall3Material);
        wall3.castShadow = true;
        wall3.receiveShadow = true;
        wall3.position.set(A / 4 + offsetx, H + (0.173 * (A / 4)), 0);
        wall3.rotation.z = THREE.Math.degToRad(10);
        scene.add(wall3);
    
        // 4. Çatı (Yeşil, X ekseni ile -10° açılı)
        const wall4 = new THREE.Mesh(wall3Geometry, wall3Material);
        wall4.castShadow = true;
        wall4.receiveShadow = true;
        wall4.position.set(3 * A / 4 + offsetx, H + (0.173 * (A / 4)), 0);
        wall4.rotation.z = THREE.Math.degToRad(-10);
        scene.add(wall4);
    }
        

    function BÜYÜKHOLÇİZGİEKLE(A, B, HS, A2, H) {
        // Önceki çizgileri temizle
        if (currentLine) {
            scene.remove(currentLine);
            currentLine.geometry.dispose();
            currentLine.material.dispose();
            currentLine = null;
        }
    
        if (currentVerticalLine) {
            scene.remove(currentVerticalLine);
            currentVerticalLine.geometry.dispose();
            currentVerticalLine.material.dispose();
            currentVerticalLine = null;
        }
                 
        // YATAY ÖLÇÜ ÇİZGİSİ OLUŞTURMA
        const point1 = new THREE.Vector3(offsetx, 1, B / 2 + 1.5);
        const point2 = new THREE.Vector3(offsetx + A, 1, B / 2 + 1.5);
        const points = [point1, point2];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
        currentLine = new THREE.Line(geometry, material);
        scene.add(currentLine);
    
        // Çizginin orta noktasını hesapla
        const midPoint = new THREE.Vector3().addVectors(point1, point2).divideScalar(2);
        const labelDiv = document.createElement('div');
        labelDiv.style.position = 'absolute';
        labelDiv.style.color = 'black';
        labelDiv.style.fontSize = '16px';
        labelDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        labelDiv.innerHTML = `${A.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} m`; // 0 haneli format
        document.body.appendChild(labelDiv);
        currentLabelDiv = labelDiv;
    
        // DİKEY ÖLÇÜ ÇİZGİSİ OLUŞTURMA
        const verticalPoint1 = new THREE.Vector3(offsetx - 1, 0, -B / 2);
        const verticalPoint2 = new THREE.Vector3(offsetx - 1, 0, B / 2);
        const verticalPoints = [verticalPoint1, verticalPoint2];
        const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints);
        const verticalMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        currentVerticalLine = new THREE.Line(verticalGeometry, verticalMaterial);
        scene.add(currentVerticalLine);
    
        const verticalMidPoint = new THREE.Vector3().addVectors(verticalPoint1, verticalPoint2).divideScalar(2);
        const verticalLabelDiv = document.createElement('div');
        verticalLabelDiv.style.position = 'absolute';
        verticalLabelDiv.style.color = 'black';
        verticalLabelDiv.style.fontSize = '16px';
        verticalLabelDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        verticalLabelDiv.innerHTML = `${B.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} m`; // 0 haneli format
        document.body.appendChild(verticalLabelDiv);
        currentVerticalLabelDiv = verticalLabelDiv;
    
        // Yatay yazı pozisyonunu güncelle
        function animateHorizontal() {
            requestAnimationFrame(animateHorizontal);
            camera.updateMatrixWorld();
            const vector = midPoint.clone().project(camera);
            const x = (vector.x * (window.innerWidth / 2)) + (window.innerWidth / 2);
            const y = -(vector.y * (window.innerHeight / 2)) + (window.innerHeight / 2);
            labelDiv.style.left = `${x}px`;
            labelDiv.style.top = `${y}px`;
        }
        animateHorizontal();
    
        // Dikey yazı pozisyonunu güncelle
        function animateVertical() {
            requestAnimationFrame(animateVertical);
            camera.updateMatrixWorld();
            const verticalVector = verticalMidPoint.clone().project(camera);
            const verticalX = (verticalVector.x * (window.innerWidth / 2)) + (window.innerWidth / 2);
            const verticalY = -(verticalVector.y * (window.innerHeight / 2)) + (window.innerHeight / 2);
            verticalLabelDiv.style.left = `${verticalX}px`;
            verticalLabelDiv.style.top = `${verticalY}px`;
        }
        animateVertical();
    }
    

    function BÜYÜKHOLÇİZGİEKLE(A, B, HS, A2, H) {
        // 1. Yatay ölçü çizgisi (A değeri ile)
        const mainPoint1 = new THREE.Vector3(0, 0, B / 2 + 4);
        const mainPoint2 = new THREE.Vector3(A, 0, B / 2 + 4);
        const mainPoints = [mainPoint1, mainPoint2];
        const mainGeometry = new THREE.BufferGeometry().setFromPoints(mainPoints);
        const mainMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Yeşil
        const mainLine = new THREE.Line(mainGeometry, mainMaterial);
        scene.add(mainLine);
    
        // Çizginin orta noktasını hesapla
        const mainMidPoint = new THREE.Vector3().addVectors(mainPoint1, mainPoint2).divideScalar(2);
        const mainLabelDiv = document.createElement('div');
        mainLabelDiv.style.position = 'absolute';
        mainLabelDiv.style.color = 'black';
        mainLabelDiv.style.fontSize = '16px';
        mainLabelDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        mainLabelDiv.innerHTML = `${A.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} m`;
        document.body.appendChild(mainLabelDiv);
    
        // Yatay yazı pozisyonunu güncelle
        function animateMain() {
            requestAnimationFrame(animateMain);
            const vector = mainMidPoint.clone().project(camera);
            const x = (vector.x * (window.innerWidth / 2)) + (window.innerWidth / 2);
            const y = -(vector.y * (window.innerHeight / 2)) + (window.innerHeight / 2);
            mainLabelDiv.style.left = `${x}px`;
            mainLabelDiv.style.top = `${y}px`;
        }
        animateMain();
    
        // 2. Yatay çizgi grubu (HS adet A2 değeri ile)
        for (let i = 0; i < HS; i++) {
            const point1 = new THREE.Vector3(i * A2, 0, B / 2 + 1.5);
            const point2 = new THREE.Vector3(i * A2 + A2, 0, B / 2 + 1.5);
            const points = [point1, point2];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: 0xffff00 }); // Sarı
            const line = new THREE.Line(geometry, material);
            scene.add(line);
    
            // Çizginin orta noktasını hesapla
            const midPoint = new THREE.Vector3().addVectors(point1, point2).divideScalar(2);
            const labelDiv = document.createElement('div');
            labelDiv.style.position = 'absolute';
            labelDiv.style.color = 'black';
            labelDiv.style.fontSize = '16px';
            labelDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            labelDiv.innerHTML = `${A2.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} m`; // 1 haneli format
            document.body.appendChild(labelDiv);
    
            // Yatay yazı pozisyonunu güncelle
            function animate() {
                requestAnimationFrame(animate);
                const vector = midPoint.clone().project(camera);
                const x = (vector.x * (window.innerWidth / 2)) + (window.innerWidth / 2);
                const y = -(vector.y * (window.innerHeight / 2)) + (window.innerHeight / 2);
                labelDiv.style.left = `${x}px`;
                labelDiv.style.top = `${y}px`;
            }
            animate();
        }
    
        // 3. Dikey çizgi grubu (B değeri ile)
        for (let i = 0; i < HS + 1; i++) {
            const verticalPoint1 = new THREE.Vector3(i * A2, 0, -B / 2); // X ekseninde
            const verticalPoint2 = new THREE.Vector3(i * A2, 0, B / 2); // Z ekseninde
            const verticalPoints = [verticalPoint1, verticalPoint2];
            const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints);
            const verticalMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Kırmızı
            const verticalLine = new THREE.Line(verticalGeometry, verticalMaterial);
            scene.add(verticalLine);
    
            const verticalMidPoint = new THREE.Vector3().addVectors(verticalPoint1, verticalPoint2).divideScalar(2);
            const verticalLabelDiv = document.createElement('div');
            verticalLabelDiv.style.position = 'absolute';
            verticalLabelDiv.style.color = 'black';
            verticalLabelDiv.style.fontSize = '16px';
            verticalLabelDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            verticalLabelDiv.innerHTML = `${B.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} m`; // 0 haneli format
            document.body.appendChild(verticalLabelDiv);
    
            // Dikey yazı pozisyonunu güncelle
            function animateVertical() {
                requestAnimationFrame(animateVertical);
                const vector = verticalMidPoint.clone().project(camera);
                const x = (vector.x * (window.innerWidth / 2)) + (window.innerWidth / 2);
                const y = -(vector.y * (window.innerHeight / 2)) + (window.innerHeight / 2);
                verticalLabelDiv.style.left = `${x}px`;
                verticalLabelDiv.style.top = `${y}px`;
            }
            animateVertical();
        }
    
        // 4. Yükseklik çizgisi (H değeri ile)
        const heightPoint1 = new THREE.Vector3(-2,0,B/2); // Başlangıç noktası
        const heightPoint2 = new THREE.Vector3(-2,H,B/2); // Bitiş noktası
        const heightPoints = [heightPoint1, heightPoint2];
        const heightGeometry = new THREE.BufferGeometry().setFromPoints(heightPoints);
        const heightMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Mavi
        const heightLine = new THREE.Line(heightGeometry, heightMaterial);
        scene.add(heightLine);
    
        // Çizginin orta noktasını hesapla
        const heightMidPoint = new THREE.Vector3().addVectors(heightPoint1, heightPoint2).divideScalar(2);
        const heightLabelDiv = document.createElement('div');
        heightLabelDiv.style.position = 'absolute';
        heightLabelDiv.style.color = 'black';
        heightLabelDiv.style.fontSize = '16px';
        heightLabelDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        heightLabelDiv.innerHTML = `${H.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} m`; // 0 haneli format
        document.body.appendChild(heightLabelDiv);
    
        // Yükseklik yazı pozisyonunu güncelle
        function animateHeight() {
            requestAnimationFrame(animateHeight);
            const vector = heightMidPoint.clone().project(camera);
            const x = (vector.x * (window.innerWidth / 2)) + (window.innerWidth / 2);
            const y = -(vector.y * (window.innerHeight / 2)) + (window.innerHeight / 2);
            heightLabelDiv.style.left = `${x}px`;
            heightLabelDiv.style.top = `${y}px`;
        }
        animateHeight();
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

        createWallsWithConditions(A, B, H, D, AZ, DK, BKE);


function createWallsWithConditions(A, B, H, D, K, DK, AZ, BKE) {
    // Eski duvarları temizle
    while (scene.children.length > 3) {
        scene.remove(scene.children[3]);
    }

    // Eski yazıları temizle
    if (currentLabelDiv) {
        currentLabelDiv.remove();
        currentLabelDiv = null;
    }
    if (currentVerticalLabelDiv) {
        currentVerticalLabelDiv.remove();
        currentVerticalLabelDiv = null;
    }
    if (currentLine) {
        scene.remove(currentLine);
        currentLine.geometry.dispose();
        currentLine.material.dispose();
        currentLine = null;
    }
    if (currentVerticalLine) {
        scene.remove(currentVerticalLine);
        currentVerticalLine.geometry.dispose();
        currentVerticalLine.material.dispose();
        currentVerticalLine = null;
    }

    // A'nın değerine göre fonksiyonları çağırma
    if (A <= 35) {
        createWalls(A, B, H, D, K, DK, AZ, BKE); // Eğer A 35'ten küçükse
        createBATAR1(A, B, H, D);
    } else {
        const HS = Math.ceil(A / 35); // Hol sayısını belirle
        const A2 = A / HS; // Yeni bina genişliği (her hol için)

        for (let i = 0; i < HS; i++) {
            const offsetx = i * A2;
            createwallswithoffset(A2, B, H, D, K, DK, AZ, BKE, offsetx); // Duvarları kaydırarak oluştur
        }
        
        // A > 35 koşulunda ek yatay çizgi ve ölçü ekle
        BÜYÜKHOLÇİZGİEKLE(A, B, HS, A2, H); // 0 konumunda ek çizgiyi ve yazıyı ekle
        createBATAR5(A, B, H, D); // Eğer A 35'ten büyükse
    }
}
                                
                


        }
    );
    


    // Animasyon fonksiyonu
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

// Sabit bir dolar kuru API'den alınacak
let dolarKuru = 1;

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

// Maliyet hesaplama fonksiyonları
function hesaplaMaliyet(A, B, H, D) {

    // ara kat tonajı
    AKT = D*50

    // Bina yaklaşık çelik tonajı (BYÇT)
    
    let ÇAKT;
    if (H <= 6) {
        ÇAKT = 60;
    } else if (H > 6 && H <= 12) {
        ÇAKT = 60 + 5 * (H-6);
    } else {
        ÇAKT = 90 + 4 * (H-6);
    }

    const BYÇT = (A * B * ÇAKT) +AKT; // kg

    const YÇM = BYÇT * 2; // Çelik maliyeti ($)

    // Bina toplam cephe alanı (CA)
    const CA = (A * 2 + B * 2) * H;

    // Bina toplam çatı alanı (TÇA)
    const TÇA = A * B;

    // Toplam kaplama alanı (TKA)
    const TKA = CA + TÇA;

    // Toplam kaplama maliyeti (TKM)
    const TKM = TKA * 20; // $/m²

     // ARA KAT SAHA BETONU
     AKSB = D*0.12

    // Toplam saha betonu alanı (SBA)
    const SBA = ((A + 2) * (B + 2) );
   

      // Yaklaşık saha betonu hacmi (YSBH)
    const YSBH = SBA * 0.2 + AKSB; // m³

    // Yaklaşık saha betonu maliyeti (YSBM)
    const YSBM = YSBH * 180; // $/m³

    // Toplam yaklaşık kaba yapı maliyeti (TYKMD) DOLAR
    const TYKMD = YÇM + TKM + YSBM; // Dolar cinsinden toplam maliyet

    return { TYKMD, BYÇT, YÇM, TKM, YSBM };
}

// Butona basıldıktan sonra maliyet hesaplama ve gösterim
document.getElementById('create').addEventListener('click', () => {
    const A = parseFloat(document.getElementById('A').value);
    const B = parseFloat(document.getElementById('B').value);
    const H = parseFloat(document.getElementById('H').value);
    const D = parseFloat(document.getElementById('D').value);


    // Maliyet hesapla
    const { TYKMD, BYÇT, YÇM, TKM, YSBM } = hesaplaMaliyet(A, B, H, D);
    const maliyetTRY = TYKMD * dolarKuru;

    // Maliyet kutusunu göster
    document.getElementById('maliyetBox').style.display = 'block';

    // Maliyet değerlerini güncelle
    document.getElementById('costUSD').textContent = TYKMD.toLocaleString('tr-TR', { minimumFractionDigits: 0})+' $';
    document.getElementById('costTRY').textContent = maliyetTRY.toLocaleString('tr-TR', { maximumFractionDigits: 0})+' TL';

    // Ek bilgileri güncelle
    const kapaliAlan = (A * B).toLocaleString('tr-TR', { minimumFractionDigits: 0 }) + ' m²';
    const toplamCelik = (BYÇT/1000).toLocaleString('tr-TR', { minimumFractionDigits: 0});
    const toplamKaplama = (A * B + (A * 2 + B * 2) * H).toLocaleString('tr-TR', { minimumFractionDigits: 0});
    const sahaBetonu = ((A + 2) * (B + 2) * 0.2+AKSB).toLocaleString('tr-TR', { maximumFractionDigits: 0 });

    // Parasal karşılıkları hesapla
    const toplamCelikParasi = `<span style="color:yellow;">${YÇM.toLocaleString('tr-TR', { minimumFractionDigits: 0})} $</span>`;
    const toplamKaplamaParasi = `<span style="color:yellow;">${TKM.toLocaleString('tr-TR', { minimumFractionDigits: 0})} $</span>`;
    const sahaBetonuParasi = `<span style="color:yellow;">${YSBM.toLocaleString('tr-TR', { maximumFractionDigits: 0})} $</span>`;

    // Dinamik olarak hesaplanan değerleri HTML'de güncelle
    document.getElementById("kapaliAlan").textContent = `${kapaliAlan}`;
    document.getElementById("toplamCelik").innerHTML = `${toplamCelik} ton - ${toplamCelikParasi}`;
    document.getElementById("toplamKaplama").innerHTML = `${toplamKaplama} m² - ${toplamKaplamaParasi}`;
    document.getElementById("sahaBetonu").innerHTML = `${sahaBetonu} m³ - ${sahaBetonuParasi}`;

// Gizle/Göster işlevi
const maliyetBox = document.getElementById('maliyetBox');
const maliyetToggleButton = document.getElementById('maliyetToggleButton');

maliyetToggleButton.addEventListener('click', () => {
    if (maliyetBox.style.display === 'none') {
        maliyetBox.style.display = 'block';
        maliyetToggleButton.textContent = '▲';
    } else {
        maliyetBox.style.display = 'none';
        maliyetToggleButton.textContent = '▼';
    }
});
    
});
    window.addEventListener('resize', function () {
        let width = window.innerWidth;
        let height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
