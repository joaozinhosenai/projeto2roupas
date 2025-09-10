document.addEventListener('DOMContentLoaded', () => {

    const cart = [];

    // Seletores dos elementos principais
    const navLinks = document.querySelectorAll('.nav-links a');
    const pageSections = document.querySelectorAll('.page-content');
    const cartButton = document.querySelector('[data-action="cart"]');
    const cartPopup = document.getElementById('cart-popup');
    const closeCartButton = cartPopup.querySelector('.close-button');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');

    // Funções de Interatividade
    function showPage(pageId) {
        // Oculta todas as páginas
        pageSections.forEach(section => {
            section.classList.remove('active');
        });

        // Exibe a página selecionada e aplica a animação
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
            // Re-aplica a animação de entrada para a página
            activePage.querySelectorAll('.fade-in').forEach(el => {
                el.classList.remove('visible');
                setTimeout(() => el.classList.add('visible'), 50);
            });
            // Ativa o efeito de digitação apenas na página Home
            if (pageId === 'home') {
                animateText();
            }
        }
    }

    function animateText() {
        const animatedTextElement = document.querySelector('#home .animated-text');
        if (animatedTextElement) {
            const textToAnimate = animatedTextElement.getAttribute('data-text');
            animatedTextElement.textContent = '';
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                animatedTextElement.textContent += textToAnimate[charIndex];
                charIndex++;
                if (charIndex === textToAnimate.length) {
                    clearInterval(typingInterval);
                }
            }, 100);
        }
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        alert(`${product.name} adicionado ao carrinho!`);
    }

    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            `;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            showPage(page);
        });
    });

    cartButton.addEventListener('click', () => {
        cartPopup.style.display = 'flex';
        updateCartDisplay();
    });

    closeCartButton.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });

    // Adiciona evento para os botões "Adicionar ao Carrinho"
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const itemContainer = e.target.closest('.product-item');
            const product = {
                id: itemContainer.dataset.id,
                name: itemContainer.dataset.name,
                price: parseFloat(itemContainer.dataset.price)
            };
            addToCart(product);
        });
    });

    // Efeito hover nas imagens dos produtos
    document.querySelectorAll('.product-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const image = item.querySelector('img');
            image.style.filter = 'contrast(1.5) saturate(1.8) hue-rotate(340deg)';
            image.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            const image = item.querySelector('img');
            image.style.filter = 'none';
            image.style.transform = 'scale(1)';
        });
    });

    // Exibe a página inicial ao carregar
    showPage('home');
    
document.addEventListener('DOMContentLoaded', () => {

    // URL da API que queremos usar
    const apiUrl = 'https://ali-express1.p.rapidapi.com/search?query=Xiomi&page=1'

    // Função para buscar dados da API
    async function fetchProductsFromAPI() {
        try {
            // Usa o fetch() para fazer a solicitação à API
            const response = await fetch(apiUrl);

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro na rede: ${response.statusText}`);
            }

            // Converte a resposta para JSON
            const data = await response.json();

            // Chama uma função para exibir os produtos no site
            displayProducts(data);

        } catch (error) {
            console.error('Houve um problema com a sua operação fetch:', error);
            // Você pode mostrar uma mensagem de erro na tela para o usuário
            const mainContent = document.querySelector('main');
            mainContent.innerHTML = `<p style="color: red; text-align: center;">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>`;
        }
    }

    // Função para exibir os produtos no HTML
    function displayProducts(products) {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = ''; // Limpa o conteúdo atual

        // Itera sobre os dados recebidos da API
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            `;
            productGrid.appendChild(productItem);
        });
    }

    // Chama a função para buscar os produtos quando a página é carregada
    fetchProductsFromAPI();
});
});