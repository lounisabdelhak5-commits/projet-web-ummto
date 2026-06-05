// SafeStorage: fallback when localStorage is unavailable (file://, private browsing, etc.)
const SafeStorage = (() => {
  let supported = false;
  try { supported = !!window.localStorage; } catch (e) { supported = false; }
  return {
    getItem(key) {
      try { if (supported) { const v = localStorage.getItem(key); if (v !== null) return v; } } catch (e) {}
      try { if (window.name) { const db = JSON.parse(window.name); if (db && typeof db === 'object') return db[key] !== undefined ? db[key] : null; } } catch (e) {}
      return null;
    },
    setItem(key, value) {
      try { if (supported) localStorage.setItem(key, value); } catch (e) {}
      try { let db = {}; if (window.name) { try { db = JSON.parse(window.name); if (!db || typeof db !== 'object') db = {}; } catch (e) { db = {}; } } db[key] = value; window.name = JSON.stringify(db); } catch (e) {}
    },
    removeItem(key) {
      try { if (supported) localStorage.removeItem(key); } catch (e) {}
      try { if (window.name) { let db = {}; try { db = JSON.parse(window.name); if (!db || typeof db !== 'object') db = {}; } catch (e) { db = {}; } delete db[key]; window.name = JSON.stringify(db); } } catch (e) {}
    }
  };
})();

const products = [
  {
    "id": 1,
    "name": "AMD Ryzen 5 2600X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 210,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R5+2600X",
    "description": "Processeur Ryzen 5 génération 2000",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Architecture Zen 2",
      "TDP 65W",
      "AM4"
    ],
    "isNew": false,
    "stock": 20,
    "discount": 15
  },
  {
    "id": 2,
    "name": "AMD Ryzen 7 2700X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 320,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R7+2700X",
    "description": "Processeur Ryzen 7 génération 2000",
    "caracteristiques": [
      "8 Cores / 16 Threads",
      "Architecture Zen 2",
      "TDP 105W",
      "AM4"
    ],
    "isNew": false,
    "stock": 5,
    "discount": 15
  },
  {
    "id": 3,
    "name": "AMD Ryzen 9 2900X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 430,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R9+2900X",
    "description": "Processeur Ryzen 9 génération 2000",
    "caracteristiques": [
      "12 Cores / 24 Threads",
      "Architecture Zen 2",
      "TDP 105W-170W",
      "AM4"
    ],
    "isNew": false,
    "stock": 6,
    "discount": 15
  },
  {
    "id": 4,
    "name": "AMD Ryzen 5 3600X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 240,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R5+3600X",
    "description": "Processeur Ryzen 5 génération 3000",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Architecture Zen 2",
      "TDP 65W",
      "AM4"
    ],
    "isNew": false,
    "stock": 8,
    "discount": 15
  },
  {
    "id": 5,
    "name": "AMD Ryzen 7 3700X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 355,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R7+3700X",
    "description": "Processeur Ryzen 7 génération 3000",
    "caracteristiques": [
      "8 Cores / 16 Threads",
      "Architecture Zen 2",
      "TDP 105W",
      "AM4"
    ],
    "isNew": false,
    "stock": 8,
    "discount": 15
  },
  {
    "id": 6,
    "name": "AMD Ryzen 9 3900X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 470,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R9+3900X",
    "description": "Processeur Ryzen 9 génération 3000",
    "caracteristiques": [
      "12 Cores / 24 Threads",
      "Architecture Zen 2",
      "TDP 105W-170W",
      "AM4"
    ],
    "isNew": false,
    "stock": 8,
    "discount": 15
  },
  {
    "id": 7,
    "name": "AMD Ryzen 5 5600X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 300,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R5+5600X",
    "description": "Processeur Ryzen 5 génération 5000",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Architecture Zen 3",
      "TDP 65W",
      "AM4"
    ],
    "isNew": false,
    "stock": 9
  },
  {
    "id": 8,
    "name": "AMD Ryzen 7 5700X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 425,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R7+5700X",
    "description": "Processeur Ryzen 7 génération 5000",
    "caracteristiques": [
      "8 Cores / 16 Threads",
      "Architecture Zen 3",
      "TDP 105W",
      "AM4"
    ],
    "isNew": false,
    "stock": 4
  },
  {
    "id": 9,
    "name": "AMD Ryzen 9 5900X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 550,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R9+5900X",
    "description": "Processeur Ryzen 9 génération 5000",
    "caracteristiques": [
      "12 Cores / 24 Threads",
      "Architecture Zen 3",
      "TDP 105W-170W",
      "AM4"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 10,
    "name": "AMD Ryzen 5 7600X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 360,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R5+7600X",
    "description": "Processeur Ryzen 5 génération 7000",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Architecture Zen 4",
      "TDP 65W",
      "AM5"
    ],
    "isNew": false,
    "stock": 11
  },
  {
    "id": 11,
    "name": "AMD Ryzen 7 7700X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 495,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R7+7700X",
    "description": "Processeur Ryzen 7 génération 7000",
    "caracteristiques": [
      "8 Cores / 16 Threads",
      "Architecture Zen 4",
      "TDP 105W",
      "AM5"
    ],
    "isNew": false,
    "stock": 5
  },
  {
    "id": 12,
    "name": "AMD Ryzen 9 7900X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 630,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R9+7900X",
    "description": "Processeur Ryzen 9 génération 7000",
    "caracteristiques": [
      "12 Cores / 24 Threads",
      "Architecture Zen 4",
      "TDP 105W-170W",
      "AM5"
    ],
    "isNew": false,
    "stock": 11
  },
  {
    "id": 13,
    "name": "AMD Ryzen 5 9600X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 420,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R5+9600X",
    "description": "Processeur Ryzen 5 génération 9000",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Architecture Zen 5",
      "TDP 65W",
      "AM5"
    ],
    "isNew": true,
    "stock": 6
  },
  {
    "id": 14,
    "name": "AMD Ryzen 7 9700X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 565,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R7+9700X",
    "description": "Processeur Ryzen 7 génération 9000",
    "caracteristiques": [
      "8 Cores / 16 Threads",
      "Architecture Zen 5",
      "TDP 105W",
      "AM5"
    ],
    "isNew": true,
    "stock": 9
  },
  {
    "id": 15,
    "name": "AMD Ryzen 9 9900X",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 710,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R9+9900X",
    "description": "Processeur Ryzen 9 génération 9000",
    "caracteristiques": [
      "12 Cores / 24 Threads",
      "Architecture Zen 5",
      "TDP 105W-170W",
      "AM5"
    ],
    "isNew": true,
    "stock": 5
  },
  {
    "id": 16,
    "name": "Intel Core i5-9600K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 200,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-9600K",
    "description": "Processeur Intel Core i5 9ème Gen",
    "caracteristiques": [
      "Intel 9th Gen",
      "Base Clock 3.6GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 9,
    "discount": 20
  },
  {
    "id": 17,
    "name": "Intel Core i7-9700K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 300,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-9700K",
    "description": "Processeur Intel Core i7 9ème Gen",
    "caracteristiques": [
      "Intel 9th Gen",
      "Base Clock 3.8GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 19,
    "discount": 20
  },
  {
    "id": 18,
    "name": "Intel Core i9-9900K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 450,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-9900K",
    "description": "Processeur Intel Core i9 9ème Gen",
    "caracteristiques": [
      "Intel 9th Gen",
      "Hyper-Threading",
      "Excellentes performances"
    ],
    "isNew": false,
    "stock": 5,
    "discount": 20
  },
  {
    "id": 19,
    "name": "Intel Core i5-10600K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 220,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-10600K",
    "description": "Processeur Intel Core i5 10ème Gen",
    "caracteristiques": [
      "Intel 10th Gen",
      "Base Clock 3.6GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 10,
    "discount": 20
  },
  {
    "id": 20,
    "name": "Intel Core i7-10700K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 330,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-10700K",
    "description": "Processeur Intel Core i7 10ème Gen",
    "caracteristiques": [
      "Intel 10th Gen",
      "Base Clock 3.8GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 8,
    "discount": 20
  },
  {
    "id": 21,
    "name": "Intel Core i9-10900K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 490,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-10900K",
    "description": "Processeur Intel Core i9 10ème Gen",
    "caracteristiques": [
      "Intel 10th Gen",
      "Hyper-Threading",
      "Excellentes performances"
    ],
    "isNew": false,
    "stock": 7,
    "discount": 20
  },
  {
    "id": 22,
    "name": "Intel Core i5-11600K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 240,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-11600K",
    "description": "Processeur Intel Core i5 11ème Gen",
    "caracteristiques": [
      "Intel 11th Gen",
      "Base Clock 3.6GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 16,
    "discount": 20
  },
  {
    "id": 23,
    "name": "Intel Core i7-11700K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 360,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-11700K",
    "description": "Processeur Intel Core i7 11ème Gen",
    "caracteristiques": [
      "Intel 11th Gen",
      "Base Clock 3.8GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 10,
    "discount": 20
  },
  {
    "id": 24,
    "name": "Intel Core i9-11900K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 530,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-11900K",
    "description": "Processeur Intel Core i9 11ème Gen",
    "caracteristiques": [
      "Intel 11th Gen",
      "Hyper-Threading",
      "Excellentes performances"
    ],
    "isNew": false,
    "stock": 7,
    "discount": 20
  },
  {
    "id": 25,
    "name": "Intel Core i5-12600K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 260,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-12600K",
    "description": "Processeur Intel Core i5 12ème Gen",
    "caracteristiques": [
      "Intel 12th Gen",
      "Base Clock 3.6GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 13
  },
  {
    "id": 26,
    "name": "Intel Core i7-12700K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 390,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-12700K",
    "description": "Processeur Intel Core i7 12ème Gen",
    "caracteristiques": [
      "Intel 12th Gen",
      "Base Clock 3.8GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 4
  },
  {
    "id": 27,
    "name": "Intel Core i9-12900K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 570,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-12900K",
    "description": "Processeur Intel Core i9 12ème Gen",
    "caracteristiques": [
      "Intel 12th Gen",
      "Hyper-Threading",
      "Excellentes performances"
    ],
    "isNew": false,
    "stock": 4
  },
  {
    "id": 28,
    "name": "Intel Core i5-13600K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 280,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-13600K",
    "description": "Processeur Intel Core i5 13ème Gen",
    "caracteristiques": [
      "Intel 13th Gen",
      "Base Clock 3.6GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 19
  },
  {
    "id": 29,
    "name": "Intel Core i7-13700K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 420,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-13700K",
    "description": "Processeur Intel Core i7 13ème Gen",
    "caracteristiques": [
      "Intel 13th Gen",
      "Base Clock 3.8GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 5
  },
  {
    "id": 30,
    "name": "Intel Core i9-13900K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 610,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-13900K",
    "description": "Processeur Intel Core i9 13ème Gen",
    "caracteristiques": [
      "Intel 13th Gen",
      "Hyper-Threading",
      "Excellentes performances"
    ],
    "isNew": false,
    "stock": 3
  },
  {
    "id": 31,
    "name": "Intel Core i5-14600K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 300,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-14600K",
    "description": "Processeur Intel Core i5 14ème Gen",
    "caracteristiques": [
      "Intel 14th Gen",
      "Base Clock 3.6GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 9
  },
  {
    "id": 32,
    "name": "Intel Core i7-14700K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 450,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-14700K",
    "description": "Processeur Intel Core i7 14ème Gen",
    "caracteristiques": [
      "Intel 14th Gen",
      "Base Clock 3.8GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": false,
    "stock": 7
  },
  {
    "id": 33,
    "name": "Intel Core i9-14900K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 650,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-14900K",
    "description": "Processeur Intel Core i9 14ème Gen",
    "caracteristiques": [
      "Intel 14th Gen",
      "Hyper-Threading",
      "Excellentes performances"
    ],
    "isNew": false,
    "stock": 3
  },
  {
    "id": 34,
    "name": "Intel Core Ultra 5 245K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 320,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Ultra+5+245K",
    "description": "Processeur Intel Core Ultra 5 245K (Arrow Lake)",
    "caracteristiques": [
      "Intel Arrow Lake",
      "Base Clock 3.6GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": true,
    "stock": 8
  },
  {
    "id": 35,
    "name": "Intel Core Ultra 7 265K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 480,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Ultra+7+265K",
    "description": "Processeur Intel Core Ultra 7 265K (Arrow Lake)",
    "caracteristiques": [
      "Intel Arrow Lake",
      "Base Clock 3.8GHz",
      "LGA1151/LGA1200/LGA1700"
    ],
    "isNew": true,
    "stock": 7
  },
  {
    "id": 36,
    "name": "Intel Core Ultra 9 285K",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 690,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Ultra+9+285K",
    "description": "Processeur Intel Core Ultra 9 285K (Arrow Lake)",
    "caracteristiques": [
      "Intel Arrow Lake",
      "Hyper-Threading",
      "Excellentes performances"
    ],
    "isNew": true,
    "stock": 9
  },
  {
    "id": 37,
    "name": "NVIDIA GeForce GTX 1650",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/76b900?text=GTX+1650",
    "description": "Carte graphique abordable pour 1080p",
    "caracteristiques": [
      "Architecture Turing",
      "GDDR5/GDDR6",
      "1080p Gaming"
    ],
    "isNew": false,
    "stock": 20
  },
  {
    "id": 38,
    "name": "NVIDIA GeForce GTX 1660 Ti",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/76b900?text=GTX+1660+Ti",
    "description": "Carte graphique abordable pour 1080p",
    "caracteristiques": [
      "Architecture Turing",
      "GDDR5/GDDR6",
      "1080p Gaming"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 39,
    "name": "NVIDIA GeForce RTX 2060",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 300,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+2060",
    "description": "Carte Graphique RTX Série 2000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "6GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 9,
    "discount": 10
  },
  {
    "id": 40,
    "name": "NVIDIA GeForce RTX 2070",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 450,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+2070",
    "description": "Carte Graphique RTX Série 2000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "7GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 9,
    "discount": 10
  },
  {
    "id": 41,
    "name": "NVIDIA GeForce RTX 2080",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 600,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+2080",
    "description": "Carte Graphique RTX Série 2000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 3,
    "discount": 10
  },
  {
    "id": 42,
    "name": "NVIDIA GeForce RTX 2090",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 750,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+2090",
    "description": "Carte Graphique RTX Série 2000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "9GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 6,
    "discount": 10
  },
  {
    "id": 43,
    "name": "NVIDIA GeForce RTX 3060",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 800,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+3060",
    "description": "Carte Graphique RTX Série 3000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "6GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 6,
    "discount": 20
  },
  {
    "id": 44,
    "name": "NVIDIA GeForce RTX 3070",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 950,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+3070",
    "description": "Carte Graphique RTX Série 3000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "7GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 3,
    "discount": 20
  },
  {
    "id": 45,
    "name": "NVIDIA GeForce RTX 3080",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1100,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+3080",
    "description": "Carte Graphique RTX Série 3000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 4,
    "discount": 20
  },
  {
    "id": 46,
    "name": "NVIDIA GeForce RTX 3090",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1250,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+3090",
    "description": "Carte Graphique RTX Série 3000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "9GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 9,
    "discount": 20
  },
  {
    "id": 47,
    "name": "NVIDIA GeForce RTX 4060",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1300,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+4060",
    "description": "Carte Graphique RTX Série 4000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "6GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 2
  },
  {
    "id": 48,
    "name": "NVIDIA GeForce RTX 4070",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1450,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+4070",
    "description": "Carte Graphique RTX Série 4000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "7GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 3
  },
  {
    "id": 49,
    "name": "NVIDIA GeForce RTX 4080",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1600,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+4080",
    "description": "Carte Graphique RTX Série 4000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 9
  },
  {
    "id": 50,
    "name": "NVIDIA GeForce RTX 4090",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1750,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+4090",
    "description": "Carte Graphique RTX Série 4000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "9GB VRAM minimum"
    ],
    "isNew": false,
    "stock": 4
  },
  {
    "id": 51,
    "name": "NVIDIA GeForce RTX 5060",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1800,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+5060",
    "description": "Carte Graphique RTX Série 5000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "6GB VRAM minimum"
    ],
    "isNew": true,
    "stock": 5
  },
  {
    "id": 52,
    "name": "NVIDIA GeForce RTX 5070",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1950,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+5070",
    "description": "Carte Graphique RTX Série 5000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "7GB VRAM minimum"
    ],
    "isNew": true,
    "stock": 2
  },
  {
    "id": 53,
    "name": "NVIDIA GeForce RTX 5080",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 2100,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+5080",
    "description": "Carte Graphique RTX Série 5000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB VRAM minimum"
    ],
    "isNew": true,
    "stock": 2
  },
  {
    "id": 54,
    "name": "NVIDIA GeForce RTX 5090",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 2250,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+5090",
    "description": "Carte Graphique RTX Série 5000",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "9GB VRAM minimum"
    ],
    "isNew": true,
    "stock": 3
  },
  {
    "id": 55,
    "name": "AMD Radeon RX 6600 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 250,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+6600+XT",
    "description": "Carte Graphique Radeon Série 6000",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "10GB VRAM"
    ],
    "isNew": false,
    "stock": 18,
    "discount": 15
  },
  {
    "id": 56,
    "name": "AMD Radeon RX 6700 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 1250,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+6700+XT",
    "description": "Carte Graphique Radeon Série 6000",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "11GB VRAM"
    ],
    "isNew": false,
    "stock": 5,
    "discount": 15
  },
  {
    "id": 57,
    "name": "AMD Radeon RX 6800 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 2250,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+6800+XT",
    "description": "Carte Graphique Radeon Série 6000",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "12GB VRAM"
    ],
    "isNew": false,
    "stock": 3,
    "discount": 15
  },
  {
    "id": 58,
    "name": "AMD Radeon RX 6900 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 3250,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+6900+XT",
    "description": "Carte Graphique Radeon Série 6000",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "13GB VRAM"
    ],
    "isNew": false,
    "stock": 1,
    "discount": 15
  },
  {
    "id": 59,
    "name": "AMD Radeon RX 7600 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 310,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+7600+XT",
    "description": "Carte Graphique Radeon Série 7000",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "10GB VRAM"
    ],
    "isNew": false,
    "stock": 3,
    "discount": 10
  },
  {
    "id": 60,
    "name": "AMD Radeon RX 7700 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 1310,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+7700+XT",
    "description": "Carte Graphique Radeon Série 7000",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "11GB VRAM"
    ],
    "isNew": false,
    "stock": 4,
    "discount": 10
  },
  {
    "id": 61,
    "name": "AMD Radeon RX 7800 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 2310,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+7800+XT",
    "description": "Carte Graphique Radeon Série 7000",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "12GB VRAM"
    ],
    "isNew": false,
    "stock": 2,
    "discount": 10
  },
  {
    "id": 62,
    "name": "AMD Radeon RX 7900 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 3310,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+7900+XT",
    "description": "Carte Graphique Radeon Série 7000",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "13GB VRAM"
    ],
    "isNew": false,
    "stock": 1,
    "discount": 10
  },
  {
    "id": 67,
    "name": "AMD Radeon RX 9070 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 430,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+9070+XT",
    "description": "Carte Graphique Radeon RX 9070 XT nouvelle génération",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "10GB VRAM"
    ],
    "isNew": true,
    "stock": 10
  },
  {
    "id": 68,
    "name": "AMD Radeon RX 9070",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 1430,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+9070",
    "description": "Carte Graphique Radeon RX 9070 performante",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "11GB VRAM"
    ],
    "isNew": true,
    "stock": 9
  },
  {
    "id": 69,
    "name": "AMD Radeon RX 9060 XT",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 2430,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+9060+XT",
    "description": "Carte Graphique Radeon RX 9060 XT abordable",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "12GB VRAM"
    ],
    "isNew": true,
    "stock": 1
  },
  {
    "id": 70,
    "name": "AMD Radeon RX 9060",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 3430,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+9060",
    "description": "Carte Graphique Radeon RX 9060 entrée de gamme",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "13GB VRAM"
    ],
    "isNew": true,
    "stock": 2
  },
  {
    "id": 71,
    "name": "Intel Arc A750",
    "brand": "Intel",
    "category": "Cartes Graphiques",
    "price": 250,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Arc+A750",
    "description": "Carte graphique Intel pour le gaming 1080p",
    "caracteristiques": [
      "8GB GDDR6",
      "Xe HPG Architecture",
      "AV1 Encode"
    ],
    "isNew": false,
    "stock": 20
  },
  {
    "id": 72,
    "name": "Intel Arc A770",
    "brand": "Intel",
    "category": "Cartes Graphiques",
    "price": 330,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Arc+A770",
    "description": "Carte graphique Intel haut de gamme",
    "caracteristiques": [
      "16GB GDDR6",
      "Xe HPG Architecture",
      "XeSS"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 73,
    "name": "MSI B450 Gaming",
    "brand": "MSI",
    "category": "Cartes Mères AMD",
    "price": 100,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=MSI+B450",
    "description": "Carte mère pour processeurs Ryzen",
    "caracteristiques": [
      "Chipset B450",
      "Support DDR4/DDR5",
      "PCIe 4.0/5.0"
    ],
    "isNew": false,
    "stock": 22
  },
  {
    "id": 74,
    "name": "Gigabyte X570 Gaming",
    "brand": "Gigabyte",
    "category": "Cartes Mères AMD",
    "price": 250,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Gigabyte+X570",
    "description": "Carte mère pour processeurs Ryzen",
    "caracteristiques": [
      "Chipset X570",
      "Support DDR4/DDR5",
      "PCIe 4.0/5.0"
    ],
    "isNew": false,
    "stock": 13
  },
  {
    "id": 75,
    "name": "ASUS B550 Gaming",
    "brand": "ASUS",
    "category": "Cartes Mères AMD",
    "price": 100,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=ASUS+B550",
    "description": "Carte mère pour processeurs Ryzen",
    "caracteristiques": [
      "Chipset B550",
      "Support DDR4/DDR5",
      "PCIe 4.0/5.0"
    ],
    "isNew": false,
    "stock": 26
  },
  {
    "id": 76,
    "name": "ASUS B650 Gaming",
    "brand": "ASUS",
    "category": "Cartes Mères AMD",
    "price": 100,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=ASUS+B650",
    "description": "Carte mère pour processeurs Ryzen",
    "caracteristiques": [
      "Chipset B650",
      "Support DDR4/DDR5",
      "PCIe 4.0/5.0"
    ],
    "isNew": false,
    "stock": 31
  },
  {
    "id": 77,
    "name": "Gigabyte X670E Gaming",
    "brand": "Gigabyte",
    "category": "Cartes Mères AMD",
    "price": 250,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Gigabyte+X670E",
    "description": "Carte mère pour processeurs Ryzen",
    "caracteristiques": [
      "Chipset X670E",
      "Support DDR4/DDR5",
      "PCIe 4.0/5.0"
    ],
    "isNew": false,
    "stock": 10
  },
  {
    "id": 78,
    "name": "Gigabyte X870E Gaming",
    "brand": "Gigabyte",
    "category": "Cartes Mères AMD",
    "price": 250,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Gigabyte+X870E",
    "description": "Carte mère pour processeurs Ryzen",
    "caracteristiques": [
      "Chipset X870E",
      "Support DDR4/DDR5",
      "PCIe 4.0/5.0"
    ],
    "isNew": false,
    "stock": 22
  },
  {
    "id": 79,
    "name": "Gigabyte Z390 Pro",
    "brand": "Gigabyte",
    "category": "Cartes Mères Intel",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Gigabyte+Z390",
    "description": "Carte mère pour processeurs Intel",
    "caracteristiques": [
      "Chipset Z390",
      "LGA Socket",
      "Thunderbolt 4"
    ],
    "isNew": false,
    "stock": 18
  },
  {
    "id": 80,
    "name": "Gigabyte Z490 Pro",
    "brand": "Gigabyte",
    "category": "Cartes Mères Intel",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Gigabyte+Z490",
    "description": "Carte mère pour processeurs Intel",
    "caracteristiques": [
      "Chipset Z490",
      "LGA Socket",
      "Thunderbolt 4"
    ],
    "isNew": false,
    "stock": 14
  },
  {
    "id": 81,
    "name": "MSI Z590 Pro",
    "brand": "MSI",
    "category": "Cartes Mères Intel",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=MSI+Z590",
    "description": "Carte mère pour processeurs Intel",
    "caracteristiques": [
      "Chipset Z590",
      "LGA Socket",
      "Thunderbolt 4"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 82,
    "name": "Gigabyte Z690 Pro",
    "brand": "Gigabyte",
    "category": "Cartes Mères Intel",
    "price": 300,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Gigabyte+Z690",
    "description": "Carte mère pour processeurs Intel",
    "caracteristiques": [
      "Chipset Z690",
      "LGA Socket",
      "Thunderbolt 4"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 83,
    "name": "ASUS Z790 Pro",
    "brand": "ASUS",
    "category": "Cartes Mères Intel",
    "price": 300,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ASUS+Z790",
    "description": "Carte mère pour processeurs Intel",
    "caracteristiques": [
      "Chipset Z790",
      "LGA Socket",
      "Thunderbolt 4"
    ],
    "isNew": false,
    "stock": 9
  },
  {
    "id": 84,
    "name": "ASUS Z890 Pro",
    "brand": "ASUS",
    "category": "Cartes Mères Intel",
    "price": 300,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ASUS+Z890",
    "description": "Carte mère pour processeurs Intel",
    "caracteristiques": [
      "Chipset Z890",
      "LGA Socket",
      "Thunderbolt 4"
    ],
    "isNew": false,
    "stock": 17
  },
  {
    "id": 85,
    "name": "G.Skill 16GB DDR4 3200MHz",
    "brand": "G.Skill",
    "category": "Mémoire RAM",
    "price": 64,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR4+16GB",
    "description": "Kit de mémoire RAM DDR4",
    "caracteristiques": [
      "DDR4",
      "16 GB",
      "3200 MT/s"
    ],
    "isNew": false,
    "stock": 16
  },
  {
    "id": 86,
    "name": "Kingston 32GB DDR4 3200MHz",
    "brand": "Kingston",
    "category": "Mémoire RAM",
    "price": 128,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR4+32GB",
    "description": "Kit de mémoire RAM DDR4",
    "caracteristiques": [
      "DDR4",
      "32 GB",
      "3200 MT/s"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 87,
    "name": "Crucial 64GB DDR4 3200MHz",
    "brand": "Crucial",
    "category": "Mémoire RAM",
    "price": 256,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR4+64GB",
    "description": "Kit de mémoire RAM DDR4",
    "caracteristiques": [
      "DDR4",
      "64 GB",
      "3200 MT/s"
    ],
    "isNew": false,
    "stock": 21
  },
  {
    "id": 88,
    "name": "Crucial 16GB DDR5 6000MHz",
    "brand": "Crucial",
    "category": "Mémoire RAM",
    "price": 96,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR5+16GB",
    "description": "Kit de mémoire RAM DDR5",
    "caracteristiques": [
      "DDR5",
      "16 GB",
      "6000 MT/s"
    ],
    "isNew": true,
    "stock": 25
  },
  {
    "id": 89,
    "name": "Kingston 32GB DDR5 6000MHz",
    "brand": "Kingston",
    "category": "Mémoire RAM",
    "price": 192,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR5+32GB",
    "description": "Kit de mémoire RAM DDR5",
    "caracteristiques": [
      "DDR5",
      "32 GB",
      "6000 MT/s"
    ],
    "isNew": true,
    "stock": 10
  },
  {
    "id": 90,
    "name": "Crucial 64GB DDR5 6000MHz",
    "brand": "Crucial",
    "category": "Mémoire RAM",
    "price": 384,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR5+64GB",
    "description": "Kit de mémoire RAM DDR5",
    "caracteristiques": [
      "DDR5",
      "64 GB",
      "6000 MT/s"
    ],
    "isNew": true,
    "stock": 10
  },
  {
    "id": 91,
    "name": "Raspberry Pi 5 - 8GB",
    "brand": "Raspberry Pi",
    "category": "Microcontrôleurs et SBC",
    "price": 89.99,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Raspberry+Pi+5",
    "description": "Le dernier nano-ordinateur ultra puissant.",
    "caracteristiques": [
      "Broadcom BCM2712",
      "8GB LPDDR4X",
      "PCIe 2.0"
    ],
    "isNew": true,
    "stock": 26
  },
  {
    "id": 92,
    "name": "Raspberry Pi 5 - 4GB",
    "brand": "Raspberry Pi",
    "category": "Microcontrôleurs et SBC",
    "price": 69.99,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Pi+5+4GB",
    "description": "Version 4GB du Raspberry Pi 5, idéale pour la bureautique.",
    "caracteristiques": [
      "Broadcom BCM2712",
      "4GB LPDDR4X",
      "PCIe 2.0"
    ],
    "isNew": true,
    "stock": 16
  },
  {
    "id": 93,
    "name": "Raspberry Pi 4 Model B - 4GB",
    "brand": "Raspberry Pi",
    "category": "Microcontrôleurs et SBC",
    "price": 65,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Raspberry+Pi+4",
    "description": "Idéal pour les petits projets et la domotique.",
    "caracteristiques": [
      "Broadcom BCM2711",
      "4GB LPDDR4",
      "Double Micro-HDMI"
    ],
    "isNew": false,
    "stock": 27
  },
  {
    "id": 94,
    "name": "Raspberry Pi 3 Model B+",
    "brand": "Raspberry Pi",
    "category": "Microcontrôleurs et SBC",
    "price": 45,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Raspberry+Pi+3",
    "description": "Classique et abordable.",
    "caracteristiques": [
      "Broadcom BCM2837B0",
      "1GB RAM",
      "Wi-Fi, Bluetooth"
    ],
    "isNew": false,
    "stock": 16
  },
  {
    "id": 95,
    "name": "Raspberry Pi Zero 2 W",
    "brand": "Raspberry Pi",
    "category": "Microcontrôleurs et SBC",
    "price": 20,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Pi+Zero+2W",
    "description": "Format ultra compact pour l'IoT.",
    "caracteristiques": [
      "Broadcom BCM2710A1",
      "512MB RAM",
      "Wi-Fi intégré"
    ],
    "isNew": false,
    "stock": 29
  },
  {
    "id": 96,
    "name": "Raspberry Pi 400",
    "brand": "Raspberry Pi",
    "category": "Microcontrôleurs et SBC",
    "price": 79.99,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Pi+400",
    "description": "Un ordinateur complet intégré dans un clavier compact.",
    "caracteristiques": [
      "Broadcom BCM2711",
      "4GB RAM",
      "Clavier intégré",
      "Wi-Fi, Bluetooth"
    ],
    "isNew": false,
    "stock": 30
  },
  {
    "id": 97,
    "name": "Raspberry Pi Pico 2",
    "brand": "Raspberry Pi",
    "category": "Microcontrôleurs et SBC",
    "price": 7.5,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Pi+Pico+2",
    "description": "Microcontrôleur ultra compact pour projets embarqués.",
    "caracteristiques": [
      "RP2350",
      "Dual Cortex-M33",
      "520KB SRAM",
      "GPIO 26 pins"
    ],
    "isNew": true,
    "stock": 15
  },
  {
    "id": 98,
    "name": "Raspberry Pi Compute Module 5",
    "brand": "Raspberry Pi",
    "category": "Microcontrôleurs et SBC",
    "price": 59.99,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=CM5",
    "description": "Module de calcul pour applications industrielles et embarquées.",
    "caracteristiques": [
      "Broadcom BCM2712",
      "Jusqu'à 8GB RAM",
      "PCIe 2.0",
      "Form factor SODIMM"
    ],
    "isNew": true,
    "stock": 25
  },
  {
    "id": 99,
    "name": "ESP32 NodeMCU",
    "brand": "Espressif",
    "category": "Microcontrôleurs et SBC",
    "price": 9.99,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ESP32",
    "description": "Microcontrôleur parfait pour le Wi-Fi et Bluetooth.",
    "caracteristiques": [
      "Wi-Fi",
      "Bluetooth Low Energy",
      "Projets IoT"
    ],
    "isNew": false,
    "stock": 24
  },
  {
    "id": 100,
    "name": "ESP32-WROOM-32",
    "brand": "Espressif",
    "category": "Microcontrôleurs et SBC",
    "price": 6.5,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ESP32-WROOM",
    "description": "Module ESP32 standard avec antenne intégrée.",
    "caracteristiques": [
      "Xtensa LX6",
      "Wi-Fi + BLE",
      "4MB Flash",
      "GPIO 25 pins"
    ],
    "isNew": false,
    "stock": 34
  },
  {
    "id": 101,
    "name": "ESP32-S3-DevKitC-1",
    "brand": "Espressif",
    "category": "Microcontrôleurs et SBC",
    "price": 14.99,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ESP32-S3",
    "description": "Kit de développement ESP32-S3 avec support USB OTG.",
    "caracteristiques": [
      "Xtensa LX7 dual-core",
      "Wi-Fi + BLE 5.0",
      "USB OTG",
      "16MB Flash"
    ],
    "isNew": true,
    "stock": 30
  },
  {
    "id": 102,
    "name": "ESP32-C3-DevKitM-1",
    "brand": "Espressif",
    "category": "Microcontrôleurs et SBC",
    "price": 8.99,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ESP32-C3",
    "description": "Kit basé sur ESP32-C3 avec RISC-V 32 bits.",
    "caracteristiques": [
      "RISC-V 32-bit",
      "Wi-Fi + BLE 5.0",
      "USB Type-C",
      "4MB Flash"
    ],
    "isNew": true,
    "stock": 19
  },
  {
    "id": 103,
    "name": "ESP32-CAM",
    "brand": "Espressif",
    "category": "Microcontrôleurs et SBC",
    "price": 11.99,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ESP32-CAM",
    "description": "Module ESP32 avec caméra OV2640 pour projets de surveillance.",
    "caracteristiques": [
      "ESP32 + Caméra OV2640",
      "Wi-Fi + BLE",
      "Slot microSD",
      "Flash LED intégrée"
    ],
    "isNew": false,
    "stock": 26
  },
  {
    "id": 104,
    "name": "ESP8266 NodeMCU V3",
    "brand": "Espressif",
    "category": "Microcontrôleurs et SBC",
    "price": 4.99,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ESP8266",
    "description": "Module Wi-Fi économique pour projets IoT basiques.",
    "caracteristiques": [
      "ESP8266EX",
      "Wi-Fi 802.11 b/g/n",
      "4MB Flash",
      "GPIO 12 pins"
    ],
    "isNew": false,
    "stock": 28
  },
  {
    "id": 105,
    "name": "ESP32-S2-Saola-1",
    "brand": "Espressif",
    "category": "Microcontrôleurs et SBC",
    "price": 10.99,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=ESP32-S2",
    "description": "Kit de développement ESP32-S2 avec support USB Host.",
    "caracteristiques": [
      "Xtensa LX7 single-core",
      "Wi-Fi + USB OTG",
      "128KB SRAM",
      "4MB Flash"
    ],
    "isNew": false,
    "stock": 24
  },
  {
    "id": 106,
    "name": "Arduino Uno R4 WiFi",
    "brand": "Arduino",
    "category": "Microcontrôleurs et SBC",
    "price": 27.5,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Arduino+Uno+R4",
    "description": "La nouvelle génération d'Arduino avec Wi-Fi.",
    "caracteristiques": [
      "Microcontrôleur 32-bit",
      "Matrice LED",
      "Wi-Fi, Bluetooth"
    ],
    "isNew": true,
    "stock": 32
  },
  {
    "id": 107,
    "name": "Arduino Nano RP2040 Connect",
    "brand": "Arduino",
    "category": "Microcontrôleurs et SBC",
    "price": 24.5,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Arduino+Nano",
    "description": "Arduino Nano avec RP2040 et Wi-Fi intégré.",
    "caracteristiques": [
      "Raspberry Pi RP2040",
      "Wi-Fi + BLE",
      "MicroPython",
      "6 axes IMU"
    ],
    "isNew": false,
    "stock": 30
  },
  {
    "id": 108,
    "name": "Intel Core i5-12400",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 210,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-12400",
    "description": "Processeur Intel Core i5 12ème Gen sans overclocking.",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Base 2.5GHz / Boost 4.4GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 9
  },
  {
    "id": 109,
    "name": "Intel Core i7-12700",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 350,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-12700",
    "description": "Processeur Intel Core i7 12ème Gen hautes performances.",
    "caracteristiques": [
      "8 P-Cores + 4 E-Cores",
      "Base 2.1GHz / Boost 4.9GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 10
  },
  {
    "id": 110,
    "name": "Intel Core i9-12900",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 520,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-12900",
    "description": "Processeur Intel Core i9 12ème Gen, le sommet de la gamme.",
    "caracteristiques": [
      "8 P-Cores + 8 E-Cores",
      "Base 2.4GHz / Boost 5.1GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 6
  },
  {
    "id": 111,
    "name": "Intel Core i5-13400",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 240,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-13400",
    "description": "Processeur Intel Core i5 13ème Gen, excellent rapport qualité-prix.",
    "caracteristiques": [
      "6 P-Cores + 4 E-Cores",
      "Base 2.5GHz / Boost 4.6GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 112,
    "name": "Intel Core i7-13700",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 380,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-13700",
    "description": "Processeur Intel Core i7 13ème Gen pour création de contenu.",
    "caracteristiques": [
      "8 P-Cores + 8 E-Cores",
      "Base 2.1GHz / Boost 5.2GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 10
  },
  {
    "id": 113,
    "name": "Intel Core i9-13900",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 560,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-13900",
    "description": "Processeur Intel Core i9 13ème Gen pour stations de travail.",
    "caracteristiques": [
      "8 P-Cores + 16 E-Cores",
      "Base 2.0GHz / Boost 5.4GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 114,
    "name": "Intel Core i5-14400",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 260,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i5-14400",
    "description": "Processeur Intel Core i5 14ème Gen multithread performant.",
    "caracteristiques": [
      "6 P-Cores + 4 E-Cores",
      "Base 2.5GHz / Boost 4.7GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 10
  },
  {
    "id": 115,
    "name": "Intel Core i7-14700",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 410,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i7-14700",
    "description": "Processeur Intel Core i7 14ème Gen avec cœurs hybrides.",
    "caracteristiques": [
      "8 P-Cores + 12 E-Cores",
      "Base 2.1GHz / Boost 5.4GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 11
  },
  {
    "id": 116,
    "name": "Intel Core i9-14900",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 600,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=i9-14900",
    "description": "Processeur Intel Core i9 14ème Gen, performances extrêmes.",
    "caracteristiques": [
      "8 P-Cores + 16 E-Cores",
      "Base 2.0GHz / Boost 5.6GHz",
      "LGA1700",
      "TDP 65W"
    ],
    "isNew": false,
    "stock": 6
  },
  {
    "id": 117,
    "name": "Intel Core Ultra 5 235",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 280,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Ultra+5+235",
    "description": "Processeur Intel Core Ultra 5 235 (Arrow Lake)",
    "caracteristiques": [
      "6 P-Cores + 8 E-Cores",
      "Base 2.5GHz / Boost 4.8GHz",
      "LGA1851",
      "TDP 65W"
    ],
    "isNew": true,
    "stock": 19
  },
  {
    "id": 118,
    "name": "Intel Core Ultra 7 265",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 440,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Ultra+7+265",
    "description": "Processeur Intel Core Ultra 7 265 (Arrow Lake)",
    "caracteristiques": [
      "8 P-Cores + 12 E-Cores",
      "Base 2.1GHz / Boost 5.5GHz",
      "LGA1851",
      "TDP 65W"
    ],
    "isNew": true,
    "stock": 12
  },
  {
    "id": 119,
    "name": "Intel Core Ultra 9 285",
    "brand": "Intel",
    "category": "Processeurs Intel",
    "price": 650,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Ultra+9+285",
    "description": "Processeur Intel Core Ultra 9 285 (Arrow Lake)",
    "caracteristiques": [
      "8 P-Cores + 16 E-Cores",
      "Base 2.0GHz / Boost 5.7GHz",
      "LGA1851",
      "TDP 65W"
    ],
    "isNew": true,
    "stock": 8
  },
  {
    "id": 120,
    "name": "AMD Ryzen 5 5600",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 165,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R5+5600",
    "description": "Processeur Ryzen 5 économique, parfait pour le gaming 1080p.",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Architecture Zen 3",
      "TDP 65W",
      "Ventilateur inclus",
      "AM4"
    ],
    "isNew": false,
    "stock": 14
  },
  {
    "id": 121,
    "name": "AMD Ryzen 5 7600",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 240,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R5+7600",
    "description": "Processeur Ryzen 5 génération 7000 avec architecture Zen 4.",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Architecture Zen 4",
      "TDP 65W",
      "AM5"
    ],
    "isNew": false,
    "stock": 19
  },
  {
    "id": 122,
    "name": "AMD Ryzen 7 7700",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 355,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R7+7700",
    "description": "Processeur Ryzen 7 pour créateurs de contenu et gaming.",
    "caracteristiques": [
      "8 Cores / 16 Threads",
      "Architecture Zen 4",
      "TDP 65W",
      "AM5"
    ],
    "isNew": false,
    "stock": 4
  },
  {
    "id": 123,
    "name": "AMD Ryzen 9 7900",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 480,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R9+7900",
    "description": "Processeur Ryzen 9 12 cœurs pour stations de travail.",
    "caracteristiques": [
      "12 Cores / 24 Threads",
      "Architecture Zen 4",
      "TDP 65W",
      "AM5"
    ],
    "isNew": false,
    "stock": 7
  },
  {
    "id": 124,
    "name": "AMD Ryzen 5 9600",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 290,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R5+9600",
    "description": "Processeur Ryzen 5 dernière génération Zen 5.",
    "caracteristiques": [
      "6 Cores / 12 Threads",
      "Architecture Zen 5",
      "TDP 65W",
      "AM5"
    ],
    "isNew": true,
    "stock": 15
  },
  {
    "id": 125,
    "name": "AMD Ryzen 7 9700",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 420,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R7+9700",
    "description": "Processeur Ryzen 7 Zen 5 pour performances avancées.",
    "caracteristiques": [
      "8 Cores / 16 Threads",
      "Architecture Zen 5",
      "TDP 65W",
      "AM5"
    ],
    "isNew": true,
    "stock": 3
  },
  {
    "id": 126,
    "name": "AMD Ryzen 9 9900",
    "brand": "AMD",
    "category": "Processeurs AMD (Ryzen)",
    "price": 560,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=R9+9900",
    "description": "Processeur Ryzen 9 12 cœurs Zen 5 nouvelle génération.",
    "caracteristiques": [
      "12 Cores / 24 Threads",
      "Architecture Zen 5",
      "TDP 65W",
      "AM5"
    ],
    "isNew": true,
    "stock": 12
  },
  {
    "id": 130,
    "name": "NVIDIA GeForce RTX 2060 Super",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 420,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+2060+S",
    "description": "Carte Graphique RTX 2060 Super, performances accrues.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB VRAM",
      "Architecture Turing"
    ],
    "isNew": false,
    "stock": 7,
    "discount": 10
  },
  {
    "id": 131,
    "name": "NVIDIA GeForce RTX 2070 Super",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 550,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+2070+S",
    "description": "Carte Graphique RTX 2070 Super pour gaming 1440p.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB VRAM",
      "Architecture Turing"
    ],
    "isNew": false,
    "stock": 4,
    "discount": 10
  },
  {
    "id": 132,
    "name": "NVIDIA GeForce RTX 2080 Super",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 720,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+2080+S",
    "description": "Carte Graphique RTX 2080 Super haut de gamme.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB VRAM",
      "Architecture Turing"
    ],
    "isNew": false,
    "stock": 7,
    "discount": 10
  },
  {
    "id": 133,
    "name": "NVIDIA GeForce RTX 3060 Ti",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 420,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+3060+Ti",
    "description": "Carte Graphique RTX 3060 Ti, excellent rapport qualité-prix.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB GDDR6",
      "Architecture Ampere"
    ],
    "isNew": false,
    "stock": 5,
    "discount": 20
  },
  {
    "id": 134,
    "name": "NVIDIA GeForce RTX 3070 Ti",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 650,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+3070+Ti",
    "description": "Carte Graphique RTX 3070 Ti pour gaming 1440p ultra.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "8GB GDDR6X",
      "Architecture Ampere"
    ],
    "isNew": false,
    "stock": 12,
    "discount": 20
  },
  {
    "id": 135,
    "name": "NVIDIA GeForce RTX 3080 Ti",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 950,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+3080+Ti",
    "description": "Carte Graphique RTX 3080 Ti pour gaming 4K.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS",
      "12GB GDDR6X",
      "Architecture Ampere"
    ],
    "isNew": false,
    "stock": 3,
    "discount": 20
  },
  {
    "id": 136,
    "name": "NVIDIA GeForce RTX 4060 Ti",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 450,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+4060+Ti",
    "description": "Carte Graphique RTX 4060 Ti pour gaming 1080p/1440p.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS 3",
      "8GB GDDR6",
      "Architecture Ada Lovelace"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 137,
    "name": "NVIDIA GeForce RTX 4070 Super",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 650,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+4070+S",
    "description": "Carte Graphique RTX 4070 Super performances accrues.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS 3",
      "12GB GDDR6X",
      "Architecture Ada Lovelace"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 138,
    "name": "NVIDIA GeForce RTX 4080 Super",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1050,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+4080+S",
    "description": "Carte Graphique RTX 4080 Super pour gaming 4K ultra.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS 3",
      "16GB GDDR6X",
      "Architecture Ada Lovelace"
    ],
    "isNew": true,
    "stock": 3
  },
  {
    "id": 139,
    "name": "NVIDIA GeForce RTX 5070 Ti",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 850,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+5070+Ti",
    "description": "Carte Graphique RTX 5070 Ti nouvelle génération.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS 4",
      "12GB GDDR7",
      "Architecture Blackwell"
    ],
    "isNew": true,
    "stock": 4
  },
  {
    "id": 140,
    "name": "NVIDIA GeForce RTX 5080 Super",
    "brand": "NVIDIA",
    "category": "Cartes Graphiques",
    "price": 1300,
    "image": "https://placehold.co/400x300/161b22/76b900?text=RTX+5080+S",
    "description": "Carte Graphique RTX 5080 Super performances extrêmes.",
    "caracteristiques": [
      "Ray Tracing",
      "DLSS 4",
      "16GB GDDR7",
      "Architecture Blackwell"
    ],
    "isNew": true,
    "stock": 6
  },
  {
    "id": 141,
    "name": "AMD Radeon RX 6600",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 220,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+6600",
    "description": "Carte Graphique Radeon RX 6600 pour gaming 1080p.",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "8GB VRAM"
    ],
    "isNew": false,
    "stock": 15,
    "discount": 15
  },
  {
    "id": 142,
    "name": "AMD Radeon RX 6700",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 330,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+6700",
    "description": "Carte Graphique Radeon RX 6700 pour gaming 1440p.",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "10GB VRAM"
    ],
    "isNew": false,
    "stock": 4,
    "discount": 15
  },
  {
    "id": 143,
    "name": "AMD Radeon RX 6800",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 480,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+6800",
    "description": "Carte Graphique Radeon RX 6800 pour gaming 1440p ultra.",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "16GB VRAM"
    ],
    "isNew": false,
    "stock": 9,
    "discount": 15
  },
  {
    "id": 144,
    "name": "AMD Radeon RX 7600",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 280,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+7600",
    "description": "Carte Graphique Radeon RX 7600 abordable et performante.",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "8GB VRAM"
    ],
    "isNew": false,
    "stock": 15,
    "discount": 10
  },
  {
    "id": 145,
    "name": "AMD Radeon RX 7700",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 450,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+7700",
    "description": "Carte Graphique Radeon RX 7700 pour gaming 1440p.",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "12GB VRAM"
    ],
    "isNew": false,
    "stock": 4,
    "discount": 10
  },
  {
    "id": 146,
    "name": "AMD Radeon RX 7900 GRE",
    "brand": "AMD",
    "category": "Cartes Graphiques",
    "price": 550,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=RX+7900+GRE",
    "description": "Carte Graphique Radeon RX 7900 GRE édition spéciale.",
    "caracteristiques": [
      "RDNA Architecture",
      "FSR Support",
      "16GB VRAM"
    ],
    "isNew": false,
    "stock": 3,
    "discount": 10
  },
  {
    "id": 151,
    "name": "ASUS Prime H610M-A DDR4",
    "brand": "ASUS",
    "category": "Cartes Mères Intel",
    "price": 95,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=H610M-A",
    "description": "Carte mère Intel LGA1700 économique avec DDR4.",
    "caracteristiques": [
      "Chipset H610",
      "LGA1700",
      "DDR4",
      "PCIe 4.0"
    ],
    "isNew": false,
    "stock": 33
  },
  {
    "id": 152,
    "name": "Gigabyte H610M S2H",
    "brand": "Gigabyte",
    "category": "Cartes Mères Intel",
    "price": 85,
    "image": "https://placehold.co/400x300/161b22/ff6a00?text=H610M+S2H",
    "description": "Carte mère Intel entrée de gamme fiable et abordable.",
    "caracteristiques": [
      "Chipset H610",
      "LGA1700",
      "DDR4",
      "PCIe 4.0"
    ],
    "isNew": false,
    "stock": 30
  },
  {
    "id": 153,
    "name": "MSI PRO H610M-G DDR4",
    "brand": "MSI",
    "category": "Cartes Mères Intel",
    "price": 90,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=H610M-G",
    "description": "Carte mère MSI PRO pour configurations Intel budget.",
    "caracteristiques": [
      "Chipset H610",
      "LGA1700",
      "DDR4",
      "PCIe 4.0"
    ],
    "isNew": false,
    "stock": 25
  },
  {
    "id": 154,
    "name": "ASUS Prime A520M-K",
    "brand": "ASUS",
    "category": "Cartes Mères AMD",
    "price": 75,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=A520M-K",
    "description": "Carte mère AMD A520 pour Ryzen petits budgets.",
    "caracteristiques": [
      "Chipset A520",
      "AM4",
      "DDR4",
      "PCIe 3.0"
    ],
    "isNew": false,
    "stock": 15
  },
  {
    "id": 155,
    "name": "Gigabyte A520M S2H",
    "brand": "Gigabyte",
    "category": "Cartes Mères AMD",
    "price": 70,
    "image": "https://placehold.co/400x300/161b22/ff6a00?text=A520M+S2H",
    "description": "Carte mère AMD économique pour usage bureautique.",
    "caracteristiques": [
      "Chipset A520",
      "AM4",
      "DDR4",
      "PCIe 3.0"
    ],
    "isNew": false,
    "stock": 21
  },
  {
    "id": 156,
    "name": "ASRock A620M-HDV",
    "brand": "ASRock",
    "category": "Cartes Mères AMD",
    "price": 85,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=A620M-HDV",
    "description": "Carte mère AMD AM5 d'entrée de gamme pour Ryzen 7000.",
    "caracteristiques": [
      "Chipset A620",
      "AM5",
      "DDR5",
      "PCIe 4.0"
    ],
    "isNew": false,
    "stock": 24
  },
  {
    "id": 157,
    "name": "MSI MAG B660M Mortar",
    "brand": "MSI",
    "category": "Cartes Mères Intel",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=B660M+Mortar",
    "description": "Carte mère Intel B660 avec excellent rapport qualité-prix.",
    "caracteristiques": [
      "Chipset B660",
      "LGA1700",
      "DDR4",
      "PCIe 5.0"
    ],
    "isNew": false,
    "stock": 20
  },
  {
    "id": 158,
    "name": "ASUS TUF Gaming B760M-PLUS",
    "brand": "ASUS",
    "category": "Cartes Mères Intel",
    "price": 180,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=TUF+B760M",
    "description": "Carte mère Intel B760 robuste pour gaming durable.",
    "caracteristiques": [
      "Chipset B760",
      "LGA1700",
      "DDR5",
      "PCIe 5.0"
    ],
    "isNew": false,
    "stock": 14
  },
  {
    "id": 159,
    "name": "Gigabyte B760M DS3H",
    "brand": "Gigabyte",
    "category": "Cartes Mères Intel",
    "price": 130,
    "image": "https://placehold.co/400x300/161b22/ff6a00?text=B760M+DS3H",
    "description": "Carte mère Intel B760 abordable et complète.",
    "caracteristiques": [
      "Chipset B760",
      "LGA1700",
      "DDR5",
      "PCIe 5.0"
    ],
    "isNew": false,
    "stock": 16
  },
  {
    "id": 160,
    "name": "ASUS TUF Gaming B550M-PLUS",
    "brand": "ASUS",
    "category": "Cartes Mères AMD",
    "price": 140,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=TUF+B550M",
    "description": "Carte mère AMD B550 fiable pour Ryzen série 5000.",
    "caracteristiques": [
      "Chipset B550",
      "AM4",
      "DDR4",
      "PCIe 4.0"
    ],
    "isNew": false,
    "stock": 18
  },
  {
    "id": 161,
    "name": "MSI MAG B650M Mortar",
    "brand": "MSI",
    "category": "Cartes Mères AMD",
    "price": 170,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=B650M+Mortar",
    "description": "Carte mère AMD B650 pour Ryzen série 7000 haut de gamme.",
    "caracteristiques": [
      "Chipset B650",
      "AM5",
      "DDR5",
      "PCIe 5.0"
    ],
    "isNew": false,
    "stock": 19
  },
  {
    "id": 162,
    "name": "ASRock B650M Pro RS",
    "brand": "ASRock",
    "category": "Cartes Mères AMD",
    "price": 130,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=B650M+Pro+RS",
    "description": "Carte mère AMD B650 au meilleur rapport qualité-prix.",
    "caracteristiques": [
      "Chipset B650",
      "AM5",
      "DDR5",
      "PCIe 5.0"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 163,
    "name": "ASUS ROG STRIX Z790-E Gaming",
    "brand": "ASUS",
    "category": "Cartes Mères Intel",
    "price": 420,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=Z790-E",
    "description": "Carte mère Intel Z790 premium pour gaming extrême.",
    "caracteristiques": [
      "Chipset Z790",
      "LGA1700",
      "DDR5",
      "PCIe 5.0",
      "WiFi 6E"
    ],
    "isNew": false,
    "stock": 10
  },
  {
    "id": 164,
    "name": "MSI MEG Z790 ACE",
    "brand": "MSI",
    "category": "Cartes Mères Intel",
    "price": 520,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=Z790+ACE",
    "description": "Carte mère Intel Z790 ultra premium pour overclocking.",
    "caracteristiques": [
      "Chipset Z790",
      "LGA1700",
      "DDR5",
      "PCIe 5.0",
      "WiFi 6E"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 165,
    "name": "ASUS ROG Crosshair X670E Hero",
    "brand": "ASUS",
    "category": "Cartes Mères AMD",
    "price": 650,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=X670E+Hero",
    "description": "Carte mère AMD X670E ultime pour Ryzen série 7000.",
    "caracteristiques": [
      "Chipset X670E",
      "AM5",
      "DDR5",
      "PCIe 5.0",
      "WiFi 6E"
    ],
    "isNew": false,
    "stock": 4
  },
  {
    "id": 170,
    "name": "AMD Ryzen Threadripper 7960X",
    "brand": "AMD",
    "category": "Processeurs Serveur",
    "price": 1500,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=TR+7960X",
    "description": "Processeur Threadripper 24 cœurs pour stations de travail.",
    "caracteristiques": [
      "24 Cores / 48 Threads",
      "Zen 4",
      "TDP 350W",
      "sTR5"
    ],
    "isNew": true,
    "stock": 2
  },
  {
    "id": 171,
    "name": "AMD Ryzen Threadripper 7980X",
    "brand": "AMD",
    "category": "Processeurs Serveur",
    "price": 5000,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=TR+7980X",
    "description": "Processeur Threadripper 64 cœurs puissance de calcul ultime.",
    "caracteristiques": [
      "64 Cores / 128 Threads",
      "Zen 4",
      "TDP 350W",
      "sTR5"
    ],
    "isNew": true,
    "surCommande": true,
    "stock": 0
  },
  {
    "id": 172,
    "name": "AMD EPYC 9124",
    "brand": "AMD",
    "category": "Processeurs Serveur",
    "price": 1200,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=EPYC+9124",
    "description": "Processeur serveur EPYC 16 cœurs pour datacenters.",
    "caracteristiques": [
      "16 Cores / 32 Threads",
      "Zen 4c",
      "TDP 200W",
      "SP5"
    ],
    "isNew": true,
    "stock": 6
  },
  {
    "id": 173,
    "name": "AMD EPYC 9554",
    "brand": "AMD",
    "category": "Processeurs Serveur",
    "price": 9000,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=EPYC+9554",
    "description": "Processeur serveur EPYC 64 cœurs pour cloud et HPC.",
    "caracteristiques": [
      "64 Cores / 128 Threads",
      "Zen 4",
      "TDP 360W",
      "SP5"
    ],
    "isNew": true,
    "surCommande": true,
    "stock": 0
  },
  {
    "id": 174,
    "name": "Intel Xeon w9-3495X",
    "brand": "Intel",
    "category": "Processeurs Serveur",
    "price": 6000,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Xeon+w9",
    "description": "Processeur Xeon W 56 cœurs pour stations de travail pro.",
    "caracteristiques": [
      "56 Cores / 112 Threads",
      "Sapphire Rapids",
      "TDP 350W",
      "LGA4677"
    ],
    "isNew": true,
    "surCommande": true,
    "stock": 0
  },
  {
    "id": 175,
    "name": "Intel Xeon w5-2455X",
    "brand": "Intel",
    "category": "Processeurs Serveur",
    "price": 1300,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Xeon+w5",
    "description": "Processeur Xeon W 12 cœurs pour création de contenu.",
    "caracteristiques": [
      "12 Cores / 24 Threads",
      "Sapphire Rapids",
      "TDP 200W",
      "LGA4677"
    ],
    "isNew": false,
    "stock": 7
  },
  {
    "id": 176,
    "name": "Intel Xeon E-2388G",
    "brand": "Intel",
    "category": "Processeurs Serveur",
    "price": 550,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Xeon+E-2388G",
    "description": "Processeur Xeon E pour serveurs d'entrée de gamme.",
    "caracteristiques": [
      "8 Cores / 16 Threads",
      "Rocket Lake",
      "TDP 95W",
      "LGA1200"
    ],
    "isNew": false,
    "stock": 5
  },
  {
    "id": 177,
    "name": "Intel Xeon Platinum 8490H",
    "brand": "Intel",
    "category": "Processeurs Serveur",
    "price": 15000,
    "image": "https://placehold.co/400x300/161b22/0071c5?text=Xeon+8490H",
    "description": "Processeur Xeon Platinum 60 cœurs pour serveurs enterprise.",
    "caracteristiques": [
      "60 Cores / 120 Threads",
      "Sapphire Rapids",
      "TDP 350W",
      "LGA4677"
    ],
    "isNew": true,
    "surCommande": true,
    "stock": 0
  },
  {
    "id": 178,
    "name": "AMD EPYC 7713",
    "brand": "AMD",
    "category": "Processeurs Serveur",
    "price": 7000,
    "image": "https://placehold.co/400x300/161b22/ce0014?text=EPYC+7713",
    "description": "Processeur EPYC 64 cœurs Milan pour virtualisation.",
    "caracteristiques": [
      "64 Cores / 128 Threads",
      "Zen 3",
      "TDP 225W",
      "SP3"
    ],
    "isNew": false,
    "stock": 1
  },
  {
    "id": 181,
    "name": "ASUS Pro WS TRX50-SAGE WIFI",
    "brand": "ASUS",
    "category": "Cartes Mères Serveur",
    "price": 800,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=TRX50+SAGE",
    "description": "Carte mère workstation pour Threadripper 7000.",
    "caracteristiques": [
      "Chipset TRX50",
      "sTR5",
      "DDR5 ECC",
      "PCIe 5.0",
      "7 slots PCIe"
    ],
    "isNew": true,
    "stock": 4
  },
  {
    "id": 182,
    "name": "Supermicro H13SSL-N",
    "brand": "Supermicro",
    "category": "Cartes Mères Serveur",
    "price": 900,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=H13SSL-N",
    "description": "Carte mère serveur pour EPYC 9004 avec gestion IPMI.",
    "caracteristiques": [
      "Chipset SP5",
      "DDR5 ECC",
      "PCIe 5.0",
      "IPMI 2.0",
      "Dual LAN 10Gb"
    ],
    "isNew": true,
    "stock": 7
  },
  {
    "id": 183,
    "name": "ASUS Pro WS W790E-SAGE SE",
    "brand": "ASUS",
    "category": "Cartes Mères Serveur",
    "price": 900,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=W790E+SAGE",
    "description": "Carte mère pour Xeon W-2400 avec support ECC.",
    "caracteristiques": [
      "Chipset W790",
      "LGA4677",
      "DDR5 ECC",
      "PCIe 5.0",
      "WiFi 6E"
    ],
    "isNew": true,
    "stock": 7
  },
  {
    "id": 184,
    "name": "Supermicro X13SEI-F",
    "brand": "Supermicro",
    "category": "Cartes Mères Serveur",
    "price": 400,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=X13SEI-F",
    "description": "Carte mère pour Xeon E-2400 avec IPMI intégré.",
    "caracteristiques": [
      "Chipset R680E",
      "LGA1700",
      "DDR5 ECC",
      "PCIe 5.0",
      "IPMI"
    ],
    "isNew": false,
    "stock": 3
  },
  {
    "id": 185,
    "name": "Gigabyte TRX50 AERO D",
    "brand": "Gigabyte",
    "category": "Cartes Mères Serveur",
    "price": 750,
    "image": "https://placehold.co/400x300/161b22/ff6a00?text=TRX50+AERO",
    "description": "Carte mère Threadripper 7000 avec support DDR5 ECC.",
    "caracteristiques": [
      "Chipset TRX50",
      "sTR5",
      "DDR5 ECC",
      "PCIe 5.0",
      "10Gb LAN"
    ],
    "isNew": true,
    "stock": 10
  },
  {
    "id": 186,
    "name": "Samsung 16GB DDR4 ECC Reg",
    "brand": "Samsung",
    "category": "RAM ECC",
    "price": 80,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR4+16GB+ECC",
    "description": "Barrette DDR4 ECC enregistrée pour serveur.",
    "caracteristiques": [
      "DDR4",
      "16 GB",
      "3200 MHz",
      "ECC Registered"
    ],
    "isNew": false,
    "stock": 25
  },
  {
    "id": 187,
    "name": "Samsung 32GB DDR4 ECC Reg",
    "brand": "Samsung",
    "category": "RAM ECC",
    "price": 160,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR4+32GB+ECC",
    "description": "Barrette DDR4 ECC 32 Go pour serveur workstation.",
    "caracteristiques": [
      "DDR4",
      "32 GB",
      "3200 MHz",
      "ECC Registered"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 188,
    "name": "Samsung 32GB DDR5 ECC",
    "brand": "Samsung",
    "category": "RAM ECC",
    "price": 220,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR5+32GB+ECC",
    "description": "Barrette DDR5 ECC nouvelle génération pour serveur.",
    "caracteristiques": [
      "DDR5",
      "32 GB",
      "4800 MHz",
      "ECC"
    ],
    "isNew": false,
    "stock": 18
  },
  {
    "id": 189,
    "name": "Samsung 64GB DDR5 ECC",
    "brand": "Samsung",
    "category": "RAM ECC",
    "price": 450,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DDR5+64GB+ECC",
    "description": "Barrette DDR5 ECC 64 Go haute capacité pour serveur.",
    "caracteristiques": [
      "DDR5",
      "64 GB",
      "4800 MHz",
      "ECC"
    ],
    "isNew": true,
    "stock": 3
  },
  {
    "id": 190,
    "name": "SK Hynix 128GB DDR5 ECC",
    "brand": "SK Hynix",
    "category": "RAM ECC",
    "price": 900,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=128GB+DDR5+ECC",
    "description": "Barrette DDR5 ECC 128 Go pour serveurs enterprise.",
    "caracteristiques": [
      "DDR5",
      "128 GB",
      "5600 MHz",
      "ECC"
    ],
    "isNew": true,
    "stock": 9
  },
  {
    "id": 191,
    "name": "Seagate IronWolf 4TB HDD",
    "brand": "Seagate",
    "category": "Stockage",
    "price": 90,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=4TB+IronWolf",
    "description": "Disque dur NAS 4To fiable pour stockage réseau.",
    "caracteristiques": [
      "4 TB",
      "7200 RPM",
      "SATA III",
      "NAS Optimisé"
    ],
    "isNew": false,
    "stock": 18
  },
  {
    "id": 192,
    "name": "WD Red Plus 4TB HDD",
    "brand": "WD",
    "category": "Stockage",
    "price": 100,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=WD+Red+4TB",
    "description": "Disque dur NAS 4To Western Digital pour serveur.",
    "caracteristiques": [
      "4 TB",
      "5400 RPM",
      "SATA III",
      "NASware 3.0"
    ],
    "isNew": false,
    "stock": 28
  },
  {
    "id": 193,
    "name": "Seagate IronWolf 8TB HDD",
    "brand": "Seagate",
    "category": "Stockage",
    "price": 160,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=8TB+IronWolf",
    "description": "Disque dur NAS 8To pour serveur de stockage.",
    "caracteristiques": [
      "8 TB",
      "7200 RPM",
      "SATA III",
      "NAS Optimisé"
    ],
    "isNew": false,
    "stock": 11
  },
  {
    "id": 194,
    "name": "WD Red Pro 8TB HDD",
    "brand": "WD",
    "category": "Stockage",
    "price": 180,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=WD+Red+8TB",
    "description": "Disque dur NAS 8To Pro pour serveurs professionnels.",
    "caracteristiques": [
      "8 TB",
      "7200 RPM",
      "SATA III",
      "NASware 3.0"
    ],
    "isNew": false,
    "stock": 20
  },
  {
    "id": 195,
    "name": "Seagate IronWolf 12TB HDD",
    "brand": "Seagate",
    "category": "Stockage",
    "price": 230,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=12TB+IronWolf",
    "description": "Disque dur NAS 12To grande capacité pour datacenter.",
    "caracteristiques": [
      "12 TB",
      "7200 RPM",
      "SATA III",
      "NAS Optimisé"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 196,
    "name": "Seagate Exos 16TB HDD",
    "brand": "Seagate",
    "category": "Stockage",
    "price": 280,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=16TB+Exos",
    "description": "Disque dur entreprise 16To pour datacenter.",
    "caracteristiques": [
      "16 TB",
      "7200 RPM",
      "SATA III",
      "Helium"
    ],
    "isNew": false,
    "stock": 19
  },
  {
    "id": 197,
    "name": "Seagate Exos 20TB HDD",
    "brand": "Seagate",
    "category": "Stockage",
    "price": 350,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=20TB+Exos",
    "description": "Disque dur entreprise 20To capacité maximale.",
    "caracteristiques": [
      "20 TB",
      "7200 RPM",
      "SATA III",
      "Helium"
    ],
    "isNew": true,
    "stock": 9
  },
  {
    "id": 198,
    "name": "Samsung 870 EVO 4TB SSD",
    "brand": "Samsung",
    "category": "Stockage",
    "price": 250,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=870+EVO+4TB",
    "description": "SSD SATA 4To pour stockage rapide serveur.",
    "caracteristiques": [
      "4 TB",
      "SATA III",
      "560 MB/s",
      "V-NAND"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 199,
    "name": "Samsung 870 EVO 8TB SSD",
    "brand": "Samsung",
    "category": "Stockage",
    "price": 500,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=870+EVO+8TB",
    "description": "SSD SATA 8To pour serveur haute performance.",
    "caracteristiques": [
      "8 TB",
      "SATA III",
      "560 MB/s",
      "V-NAND"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 200,
    "name": "Samsung 990 Pro 4TB NVMe",
    "brand": "Samsung",
    "category": "Stockage",
    "price": 350,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=990+Pro+4TB",
    "description": "SSD NVMe 4To ultra rapide pour workstation et serveur.",
    "caracteristiques": [
      "4 TB",
      "NVMe PCIe 4.0",
      "7450 MB/s",
      "V-NAND"
    ],
    "isNew": true,
    "stock": 9
  },
  {
    "id": 201,
    "name": "Corsair CV550 550W 80+ Bronze",
    "brand": "Corsair",
    "category": "Alimentations (PSU)",
    "price": 55,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=CV550",
    "description": "Alimentation 550W certifiée 80+ Bronze, entrée de gamme.",
    "caracteristiques": [
      "550W",
      "80+ Bronze",
      "120mm Ventilateur",
      "Protection OVP/SCP"
    ],
    "isNew": false,
    "stock": 32
  },
  {
    "id": 202,
    "name": "Corsair CV650 650W 80+ Bronze",
    "brand": "Corsair",
    "category": "Alimentations (PSU)",
    "price": 65,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=CV650",
    "description": "Alimentation 650W silencieuse pour PC gaming.",
    "caracteristiques": [
      "650W",
      "80+ Bronze",
      "120mm Ventilateur",
      "Câbles fixes"
    ],
    "isNew": false,
    "stock": 27
  },
  {
    "id": 203,
    "name": "Corsair RM750e 750W 80+ Gold",
    "brand": "Corsair",
    "category": "Alimentations (PSU)",
    "price": 100,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=RM750e",
    "description": "Alimentation 750W modulaire 80+ Gold excellent rapport qualité-prix.",
    "caracteristiques": [
      "750W",
      "80+ Gold",
      "Modulaire",
      "Ventilateur 135mm"
    ],
    "isNew": false,
    "stock": 32
  },
  {
    "id": 204,
    "name": "Corsair RM850x 850W 80+ Gold",
    "brand": "Corsair",
    "category": "Alimentations (PSU)",
    "price": 130,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=RM850x",
    "description": "Alimentation 850W modulaire haut de gamme pour PC puissant.",
    "caracteristiques": [
      "850W",
      "80+ Gold",
      "Modulaire",
      "Ventilateur 140mm"
    ],
    "isNew": false,
    "stock": 22
  },
  {
    "id": 205,
    "name": "Corsair RM1000x 1000W 80+ Gold",
    "brand": "Corsair",
    "category": "Alimentations (PSU)",
    "price": 170,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=RM1000x",
    "description": "Alimentation 1000W pour configurations extrêmes multi-GPU.",
    "caracteristiques": [
      "1000W",
      "80+ Gold",
      "Modulaire",
      "Ventilateur 140mm"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 206,
    "name": "EVGA SuperNOVA 750 G7 750W",
    "brand": "EVGA",
    "category": "Alimentations (PSU)",
    "price": 110,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=750+G7",
    "description": "Alimentation 750W EVGA 80+ Gold compacte et fiable.",
    "caracteristiques": [
      "750W",
      "80+ Gold",
      "Modulaire",
      "Ventilateur 120mm"
    ],
    "isNew": false,
    "stock": 16
  },
  {
    "id": 207,
    "name": "Seasonic Focus GX-850 850W",
    "brand": "Seasonic",
    "category": "Alimentations (PSU)",
    "price": 140,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=GX-850",
    "description": "Alimentation 850W Seasonic 80+ Gold référence du marché.",
    "caracteristiques": [
      "850W",
      "80+ Gold",
      "Modulaire",
      "Ventilateur 135mm"
    ],
    "isNew": false,
    "stock": 22
  },
  {
    "id": 208,
    "name": "be quiet! Dark Power 13 1000W",
    "brand": "be quiet!",
    "category": "Alimentations (PSU)",
    "price": 250,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=DP13+1000W",
    "description": "Alimentation 1000W Titanium silencieuse pour PC premium.",
    "caracteristiques": [
      "1000W",
      "80+ Titanium",
      "Modulaire",
      "135mm Silent Wings"
    ],
    "isNew": true,
    "stock": 16
  },
  {
    "id": 210,
    "name": "NZXT H5 Flow (Moyen Tour)",
    "brand": "NZXT",
    "category": "Boîtiers (Cases)",
    "price": 95,
    "image": "https://placehold.co/400x300/161b22/702670?text=H5+Flow",
    "description": "Boîtier moyen tour avec flux d'air optimisé.",
    "caracteristiques": [
      "Moyen Tour",
      "ATX",
      "Verre trempé",
      "2x Ventilateurs inclus"
    ],
    "isNew": false,
    "stock": 19
  },
  {
    "id": 211,
    "name": "NZXT H7 Flow (Grand Tour)",
    "brand": "NZXT",
    "category": "Boîtiers (Cases)",
    "price": 130,
    "image": "https://placehold.co/400x300/161b22/702670?text=H7+Flow",
    "description": "Boîtier grand tour spacieux pour configuration haut de gamme.",
    "caracteristiques": [
      "Grand Tour",
      "ATX/E-ATX",
      "Verre trempé",
      "3x Ventilateurs 120mm"
    ],
    "isNew": false,
    "stock": 20
  },
  {
    "id": 212,
    "name": "Corsair 4000D Airflow",
    "brand": "Corsair",
    "category": "Boîtiers (Cases)",
    "price": 90,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=4000D",
    "description": "Boîtier moyen tour Corsair avec panneau en mesh.",
    "caracteristiques": [
      "Moyen Tour",
      "ATX",
      "Mesh avant",
      "2x Ventilateurs 120mm"
    ],
    "isNew": false,
    "stock": 30
  },
  {
    "id": 213,
    "name": "Corsair 5000D Airflow",
    "brand": "Corsair",
    "category": "Boîtiers (Cases)",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=5000D",
    "description": "Boîtier grand tour Corsair pour refroidissement liquide.",
    "caracteristiques": [
      "Grand Tour",
      "ATX/E-ATX",
      "Mesh avant",
      "3x Ventilateurs 120mm"
    ],
    "isNew": false,
    "stock": 19
  },
  {
    "id": 214,
    "name": "Fractal Design Meshify 2",
    "brand": "Fractal",
    "category": "Boîtiers (Cases)",
    "price": 140,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=Meshify+2",
    "description": "Boîtier moyen tour avec flux d'air exceptionnel.",
    "caracteristiques": [
      "Moyen Tour",
      "ATX",
      "Mesh 3D",
      "3x Ventilateurs 140mm"
    ],
    "isNew": false,
    "stock": 22
  },
  {
    "id": 215,
    "name": "Fractal Design North",
    "brand": "Fractal",
    "category": "Boîtiers (Cases)",
    "price": 140,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=North",
    "description": "Boîtier au design bois élégant pour PC gaming premium.",
    "caracteristiques": [
      "Moyen Tour",
      "ATX",
      "Finition bois",
      "2x Ventilateurs 140mm"
    ],
    "isNew": true,
    "stock": 10
  },
  {
    "id": 216,
    "name": "Lian Li O11 Dynamic",
    "brand": "Lian Li",
    "category": "Boîtiers (Cases)",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=O11+Dynamic",
    "description": "Boîtier vitré double chambre pour show gaming.",
    "caracteristiques": [
      "Moyen Tour",
      "ATX/E-ATX",
      "Double vitre",
      "Support watercooling 360mm"
    ],
    "isNew": false,
    "stock": 17
  },
  {
    "id": 217,
    "name": "be quiet! Silent Base 802",
    "brand": "be quiet!",
    "category": "Boîtiers (Cases)",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=SB+802",
    "description": "Boîtier grand tour silencieux pour workstation.",
    "caracteristiques": [
      "Grand Tour",
      "ATX/E-ATX",
      "Panneaux insonorisés",
      "3x Pure Wings 2"
    ],
    "isNew": false,
    "stock": 18
  },
  {
    "id": 220,
    "name": "Cooler Master Hyper 212 Black",
    "brand": "Cooler Master",
    "category": "Refroidissement CPU",
    "price": 40,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=Hyper+212",
    "description": "Ventilateur CPU air abordable et performant.",
    "caracteristiques": [
      "Air Cooler",
      "120mm PWM",
      "4 Caloducs",
      "TDP 150W"
    ],
    "isNew": false,
    "stock": 29
  },
  {
    "id": 221,
    "name": "Noctua NH-D15 chromax.black",
    "brand": "Noctua",
    "category": "Refroidissement CPU",
    "price": 110,
    "image": "https://placehold.co/400x300/161b22/7c4422?text=NH-D15",
    "description": "Le meilleur ventirad air du marché, double tour.",
    "caracteristiques": [
      "Air Cooler",
      "2x 140mm NF-A15",
      "6 Caloducs",
      "TDP 250W"
    ],
    "isNew": false,
    "stock": 9
  },
  {
    "id": 222,
    "name": "be quiet! Dark Rock Pro 5",
    "brand": "be quiet!",
    "category": "Refroidissement CPU",
    "price": 90,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=Dark+Rock+5",
    "description": "Ventirad air haut de gamme silencieux.",
    "caracteristiques": [
      "Air Cooler",
      "2x 135mm Silent Wings",
      "7 Caloducs",
      "TDP 270W"
    ],
    "isNew": false,
    "stock": 23
  },
  {
    "id": 223,
    "name": "Arctic Freezer 34 eSports",
    "brand": "Arctic",
    "category": "Refroidissement CPU",
    "price": 35,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=Freezer+34",
    "description": "Ventirad air économique pour PC gaming.",
    "caracteristiques": [
      "Air Cooler",
      "120mm PWM",
      "4 Caloducs",
      "TDP 150W"
    ],
    "isNew": false,
    "stock": 25
  },
  {
    "id": 224,
    "name": "Corsair H100i Elite Capellix 240mm",
    "brand": "Corsair",
    "category": "Refroidissement CPU",
    "price": 120,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=H100i+Elite",
    "description": "Watercooling AIO 240mm avec RGB Capellix.",
    "caracteristiques": [
      "Liquid Cooler 240mm",
      "2x ML120 RGB",
      "Pompe Capellix",
      "iCUE"
    ],
    "isNew": false,
    "stock": 21
  },
  {
    "id": 225,
    "name": "Corsair H150i Elite Capellix 360mm",
    "brand": "Corsair",
    "category": "Refroidissement CPU",
    "price": 160,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=H150i+Elite",
    "description": "Watercooling AIO 360mm pour CPU haut de gamme.",
    "caracteristiques": [
      "Liquid Cooler 360mm",
      "3x ML120 RGB",
      "Pompe Capellix",
      "iCUE"
    ],
    "isNew": false,
    "stock": 16
  },
  {
    "id": 226,
    "name": "NZXT Kraken X73 360mm",
    "brand": "NZXT",
    "category": "Refroidissement CPU",
    "price": 180,
    "image": "https://placehold.co/400x300/161b22/702670?text=Kraken+X73",
    "description": "Watercooling AIO 360mm avec écran LCD personnalisable.",
    "caracteristiques": [
      "Liquid Cooler 360mm",
      "3x Aer P 120mm",
      "Écran LCD",
      "CAM"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 227,
    "name": "Arctic Liquid Freezer III 360",
    "brand": "Arctic",
    "category": "Refroidissement CPU",
    "price": 110,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=LF+III+360",
    "description": "Watercooling AIO 360mm au meilleur rapport qualité-prix.",
    "caracteristiques": [
      "Liquid Cooler 360mm",
      "3x P12 PWM",
      "Pompe intégrée",
      "TDP 350W"
    ],
    "isNew": true,
    "stock": 10
  },
  {
    "id": 230,
    "name": "Corsair Vengeance LPX 16GB DDR4-3200",
    "brand": "Corsair",
    "category": "Mémoire RAM",
    "price": 45,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=LPX+16GB",
    "description": "Kit RAM DDR4 16Go entrée de gamme pour gaming.",
    "caracteristiques": [
      "DDR4",
      "16 GB (2x8GB)",
      "3200 MHz",
      "CL16"
    ],
    "isNew": false,
    "stock": 31
  },
  {
    "id": 231,
    "name": "Corsair Vengeance LPX 32GB DDR4-3200",
    "brand": "Corsair",
    "category": "Mémoire RAM",
    "price": 85,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=LPX+32GB",
    "description": "Kit RAM DDR4 32Go pour gaming et création.",
    "caracteristiques": [
      "DDR4",
      "32 GB (2x16GB)",
      "3200 MHz",
      "CL16"
    ],
    "isNew": false,
    "stock": 15
  },
  {
    "id": 232,
    "name": "Corsair Vengeance RGB 32GB DDR5-6000",
    "brand": "Corsair",
    "category": "Mémoire RAM",
    "price": 110,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=RGB+32GB+D5",
    "description": "Kit RAM DDR5 32Go RGB pour plateforme moderne.",
    "caracteristiques": [
      "DDR5",
      "32 GB (2x16GB)",
      "6000 MHz",
      "CL36",
      "RGB"
    ],
    "isNew": false,
    "stock": 19
  },
  {
    "id": 233,
    "name": "Corsair Dominator Platinum 32GB DDR5-6000",
    "brand": "Corsair",
    "category": "Mémoire RAM",
    "price": 150,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=Dominator+32",
    "description": "Kit RAM DDR5 premium avec RGB haute luminosité.",
    "caracteristiques": [
      "DDR5",
      "32 GB (2x16GB)",
      "6000 MHz",
      "CL30",
      "RGB"
    ],
    "isNew": false,
    "stock": 20
  },
  {
    "id": 234,
    "name": "G.Skill Trident Z5 RGB 32GB DDR5-6000",
    "brand": "G.Skill",
    "category": "Mémoire RAM",
    "price": 120,
    "image": "https://placehold.co/400x300/161b22/e51e25?text=Trident+Z5",
    "description": "Kit RAM DDR5 32Go RGB hautes performances.",
    "caracteristiques": [
      "DDR5",
      "32 GB (2x16GB)",
      "6000 MHz",
      "CL36",
      "RGB"
    ],
    "isNew": false,
    "stock": 15
  },
  {
    "id": 235,
    "name": "G.Skill Trident Z5 Neo 64GB DDR5-6000",
    "brand": "G.Skill",
    "category": "Mémoire RAM",
    "price": 210,
    "image": "https://placehold.co/400x300/161b22/e51e25?text=Z5+Neo+64",
    "description": "Kit RAM DDR5 64Go pour stations de travail et création.",
    "caracteristiques": [
      "DDR5",
      "64 GB (2x32GB)",
      "6000 MHz",
      "CL30",
      "EXPO"
    ],
    "isNew": true,
    "stock": 8
  },
  {
    "id": 240,
    "name": "Samsung 990 Pro 1TB NVMe",
    "brand": "Samsung",
    "category": "Stockage",
    "price": 120,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=990+Pro+1TB",
    "description": "SSD NVMe PCIe 4.0 ultra-rapide pour gaming et pro.",
    "caracteristiques": [
      "1 TB",
      "NVMe PCIe 4.0",
      "7450 MB/s",
      "V-NAND TLC"
    ],
    "isNew": false,
    "stock": 22
  },
  {
    "id": 241,
    "name": "Samsung 990 Pro 2TB NVMe",
    "brand": "Samsung",
    "category": "Stockage",
    "price": 200,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=990+Pro+2TB",
    "description": "SSD NVMe 2To pour chargements de jeux instantanés.",
    "caracteristiques": [
      "2 TB",
      "NVMe PCIe 4.0",
      "7450 MB/s",
      "V-NAND TLC"
    ],
    "isNew": false,
    "stock": 9
  },
  {
    "id": 242,
    "name": "WD Black SN850X 1TB NVMe",
    "brand": "WD",
    "category": "Stockage",
    "price": 110,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=SN850X+1TB",
    "description": "SSD NVMe gaming ultra-rapide avec cache dynamique.",
    "caracteristiques": [
      "1 TB",
      "NVMe PCIe 4.0",
      "7300 MB/s",
      "TLC 3D NAND"
    ],
    "isNew": false,
    "stock": 9
  },
  {
    "id": 243,
    "name": "WD Black SN850X 2TB NVMe",
    "brand": "WD",
    "category": "Stockage",
    "price": 180,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=SN850X+2TB",
    "description": "SSD NVMe 2To gaming avec mode Game Mode 2.0.",
    "caracteristiques": [
      "2 TB",
      "NVMe PCIe 4.0",
      "7300 MB/s",
      "Game Mode 2.0"
    ],
    "isNew": false,
    "stock": 17
  },
  {
    "id": 244,
    "name": "Crucial P3 Plus 1TB NVMe",
    "brand": "Crucial",
    "category": "Stockage",
    "price": 80,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=P3+Plus+1TB",
    "description": "SSD NVMe économique pour upgrade rapide.",
    "caracteristiques": [
      "1 TB",
      "NVMe PCIe 4.0",
      "5000 MB/s",
      "TLC 3D NAND"
    ],
    "isNew": false,
    "stock": 29
  },
  {
    "id": 245,
    "name": "Crucial P3 Plus 2TB NVMe",
    "brand": "Crucial",
    "category": "Stockage",
    "price": 130,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=P3+Plus+2TB",
    "description": "SSD NVMe 2To au meilleur rapport capacité/prix.",
    "caracteristiques": [
      "2 TB",
      "NVMe PCIe 4.0",
      "5000 MB/s",
      "TLC 3D NAND"
    ],
    "isNew": false,
    "stock": 10
  },
  {
    "id": 246,
    "name": "Kingston KC3000 1TB NVMe",
    "brand": "Kingston",
    "category": "Stockage",
    "price": 100,
    "image": "https://placehold.co/400x300/161b22/da291c?text=KC3000+1TB",
    "description": "SSD NVMe PCIe 4.0 haute performance pour PC gaming.",
    "caracteristiques": [
      "1 TB",
      "NVMe PCIe 4.0",
      "7000 MB/s",
      "TLC 3D NAND"
    ],
    "isNew": false,
    "stock": 34
  },
  {
    "id": 247,
    "name": "Kingston KC3000 2TB NVMe",
    "brand": "Kingston",
    "category": "Stockage",
    "price": 170,
    "image": "https://placehold.co/400x300/161b22/da291c?text=KC3000+2TB",
    "description": "SSD NVMe 2To avec dissipateur thermique intégré.",
    "caracteristiques": [
      "2 TB",
      "NVMe PCIe 4.0",
      "7000 MB/s",
      "Dissipateur inclus"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 250,
    "name": "ASUS TUF Gaming VG27AQ1A 27\" QHD 170Hz",
    "brand": "ASUS",
    "category": "Écrans",
    "price": 320,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=VG27AQ1A",
    "description": "Écran gaming 27 pouces QHD 170Hz IPS.",
    "caracteristiques": [
      "27\"",
      "QHD 2560x1440",
      "170Hz",
      "IPS",
      "1ms",
      "G-Sync Compatible"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 251,
    "name": "ASUS ROG Swift PG279QM 27\" QHD 240Hz",
    "brand": "ASUS",
    "category": "Écrans",
    "price": 750,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=PG279QM",
    "description": "Écran gaming premium 27 pouces QHD 240Hz.",
    "caracteristiques": [
      "27\"",
      "QHD 2560x1440",
      "240Hz",
      "IPS",
      "1ms",
      "G-Sync"
    ],
    "isNew": false,
    "stock": 5
  },
  {
    "id": 252,
    "name": "Samsung Odyssey G7 32\" 4K 144Hz",
    "brand": "Samsung",
    "category": "Écrans",
    "price": 900,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=Odyssey+G7",
    "description": "Écran gaming 32 pouces 4K 144Hz incurvé.",
    "caracteristiques": [
      "32\"",
      "4K UHD 3840x2160",
      "144Hz",
      "VA",
      "1ms",
      "HDR600"
    ],
    "isNew": true,
    "stock": 3
  },
  {
    "id": 253,
    "name": "Dell S2722QC 27\" 4K 60Hz",
    "brand": "Dell",
    "category": "Écrans",
    "price": 400,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=S2722QC",
    "description": "Écran 27 pouces 4K pour productivité et création.",
    "caracteristiques": [
      "27\"",
      "4K UHD 3840x2160",
      "60Hz",
      "IPS",
      "USB-C 65W"
    ],
    "isNew": false,
    "stock": 8
  },
  {
    "id": 254,
    "name": "ASUS ProArt PA279CRV 27\" 4K",
    "brand": "ASUS",
    "category": "Écrans",
    "price": 550,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=PA279CRV",
    "description": "Écran professionnel 27 pouces 4K calibré Delta E < 2.",
    "caracteristiques": [
      "27\"",
      "4K UHD",
      "60Hz",
      "IPS",
      "Calibré",
      "USB-C 96W"
    ],
    "isNew": true,
    "stock": 4
  },
  {
    "id": 255,
    "name": "Samsung Odyssey G3 24\" 1080p 165Hz",
    "brand": "Samsung",
    "category": "Écrans",
    "price": 180,
    "image": "https://placehold.co/400x300/161b22/ffffff?text=Odyssey+G3",
    "description": "Écran gaming 24 pouces 165Hz entrée de gamme.",
    "caracteristiques": [
      "24\"",
      "Full HD 1920x1080",
      "165Hz",
      "IPS",
      "1ms"
    ],
    "isNew": false,
    "stock": 20
  },
  {
    "id": 260,
    "name": "Logitech G Pro X Superlight",
    "brand": "Logitech",
    "category": "Périphériques",
    "price": 130,
    "image": "https://placehold.co/400x300/161b22/00b8fc?text=Superlight",
    "description": "Souris gaming sans fil ultra-légère 63g.",
    "caracteristiques": [
      "Sans fil",
      "63g",
      "HERO 25K",
      "Batterie 70h",
      "PTFE"
    ],
    "isNew": false,
    "stock": 15
  },
  {
    "id": 261,
    "name": "Logitech G502 X Plus",
    "brand": "Logitech",
    "category": "Périphériques",
    "price": 110,
    "image": "https://placehold.co/400x300/161b22/00b8fc?text=G502+X",
    "description": "Souris gaming filaire RGB avec double roue.",
    "caracteristiques": [
      "Filaire USB-C",
      "HERO 25K",
      "RGB",
      "11 boutons",
      "Poids ajustable"
    ],
    "isNew": false,
    "stock": 18
  },
  {
    "id": 262,
    "name": "Logitech G213 Prodigy",
    "brand": "Logitech",
    "category": "Périphériques",
    "price": 50,
    "image": "https://placehold.co/400x300/161b22/00b8fc?text=G213",
    "description": "Clavier gaming membrane avec repose-poignet.",
    "caracteristiques": [
      "Membrane",
      "RGB",
      "Repose-poignet",
      "Touches multimedia"
    ],
    "isNew": false,
    "stock": 25
  },
  {
    "id": 263,
    "name": "Logitech G915 X Lightspeed",
    "brand": "Logitech",
    "category": "Périphériques",
    "price": 200,
    "image": "https://placehold.co/400x300/161b22/00b8fc?text=G915+X",
    "description": "Clavier gaming sans fil low profile RGB.",
    "caracteristiques": [
      "Sans fil Lightspeed",
      "Low Profile GL",
      "RGB",
      "Aluminium",
      "Batterie 40h"
    ],
    "isNew": true,
    "stock": 6
  },
  {
    "id": 264,
    "name": "Razer DeathAdder V3 Pro",
    "brand": "Razer",
    "category": "Périphériques",
    "price": 140,
    "image": "https://placehold.co/400x300/161b22/44d62c?text=DeathAdder+V3",
    "description": "Souris gaming sans fil ergonomique 64g.",
    "caracteristiques": [
      "Sans fil",
      "64g",
      "Focus Pro 30K",
      "Batterie 90h"
    ],
    "isNew": false,
    "stock": 10
  },
  {
    "id": 265,
    "name": "Razer BlackWidow V4 75%",
    "brand": "Razer",
    "category": "Périphériques",
    "price": 180,
    "image": "https://placehold.co/400x300/161b22/44d62c?text=BlackWidow+V4",
    "description": "Clavier gaming mécanique 75% hot-swappable.",
    "caracteristiques": [
      "Mécanique",
      "75%",
      "Hot-swap",
      "RGB",
      "Aluminium",
      "USB-C"
    ],
    "isNew": true,
    "stock": 7
  },
  {
    "id": 266,
    "name": "Logitech G Pro X Mechanical",
    "brand": "Logitech",
    "category": "Périphériques",
    "price": 120,
    "image": "https://placehold.co/400x300/161b22/00b8fc?text=G+Pro+X",
    "description": "Clavier gaming compact avec switches GX Blue/Brown/Red.",
    "caracteristiques": [
      "Mécanique",
      "Tenkeyless",
      "GX Switches",
      "RGB",
      "Câble detachable"
    ],
    "isNew": false,
    "stock": 12
  },
  {
    "id": 267,
    "name": "Logitech G733 Lightspeed",
    "brand": "Logitech",
    "category": "Périphériques",
    "price": 110,
    "image": "https://placehold.co/400x300/161b22/00b8fc?text=G733",
    "description": "Casque gaming sans fil RGB léger.",
    "caracteristiques": [
      "Sans fil",
      "RGB",
      "DTS Headphone:X",
      "Batterie 29h",
      "Bandeau ajustable"
    ],
    "isNew": false,
    "stock": 14
  }
];

const categories = [...new Set(products.map(p => p.category))];

const brands = [...new Set(products.map(p => p.brand))];
