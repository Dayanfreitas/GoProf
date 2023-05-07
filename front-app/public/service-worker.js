// Define o nome do cache
const CACHE_NAME = "version-1";
let self = this
// Lista de arquivos a serem armazenados em cache
const filesToCache = ['/index.html'];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(filesToCache))
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Intercepta as solicitações de rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a resposta em cache, se encontrada
        if (response) {
          return response;
        }
        // Caso contrário, faz a solicitação à rede
        return fetch(event.request);
      })
  );
});
