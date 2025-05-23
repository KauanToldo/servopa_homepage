looker.plugins.visualizations.add({
    id: "servopa_homepage",
    label: "Homepage",
    options: {
      
    },
    create: function(element, config) {
      element.innerHTML = `
        <style>
            #vis {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            body {
                width: 100% !important;
            }

            .card:hover {
                scale: 1.05;
                transition: .2s ease;
                box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
            }
            
            .card {
                transition: .2s ease;
                cursor: pointer;
            }

            .home-container {
                width: 100%; 
                min-height: 100vh; 
                font-family: 'Montserrat', sans-serif; 
                background-image: url(https://kauantoldo.github.io/servopa_homepage/fundo.png);
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                display: flex;
            }
            
            .menu-container {
                height: 100vh;
                width: 300px;
                background-color: #29479F;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            #logo {
                width: 150px;
                margin-top: 40px
            }

            .list-folders {
                width: 100%;
                margin: 100px 0px 0px 60px;
                display: flex;
                flex-direction: column;
                align-items: start;
            }

            .folder {
                color: white;
                cursor: pointer;
                font-size: 16px;
                list-style: none;
                margin-bottom: 10px
            }

            .line {
                background-color:rgba(255, 255, 255, 0.4);
                height: 1px;
                width: 150px;
                margin-bottom: 30px;
            }

            .folder-div {
                display: flex;
                align-item: center;
                gap: 10px;
            }

            .folder-icon {
                margin-bottom: 10px;
            }

            .titles-div {
                padding-left: 50px;
                margin-top: 50px;
                margin-right: 50px;
            }

            .subtitle {
                font-size: 12px;
                margin: 0px;
            }

            .title {
                font-size: 32px;
                font-weight: bold;
                margin-top: 15px;
            }

            .cards-container {
                height: 100%;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 25px;
                color:rgb(206, 206, 206);
                padding-right: 50px;
                padding-left: 50px;
            }

            .body-page {
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: column;
            }

        </style>
        `

        this._tableContainer = element.appendChild(document.createElement("div"));
    },

    updateAsync: function(data, element, config, queryResponse, details, done) {
        this.clearErrors();
        this._tableContainer.innerHTML = "";
        const homeContainer = document.createElement('div');
        homeContainer.className = "home-container";


        // 1. Pega a chave do campo "Grupos Pasta"
        const foldersField = queryResponse.fields.dimension_like.find(f => f.label === "Grupos Pasta");
        // 2. Extrai os valores da dimensão
        let folders = data.map(row => row[foldersField.name].value);
        // Eliminar os duplicados
        folders = [...new Set(folders)];

        create_menu();

        const body = document.createElement('div')
        body.classList = "body-page"


        const titlesDiv = document.createElement("div")
        titlesDiv.className = "titles-div";

        const subtitle = document.createElement('h2');
        const title = document.createElement('h1');
        subtitle.classList = "subtitle";
        title.classList = "title";
        subtitle.textContent = "Olá, seja bem vindo(a) ao"
        title.textContent = "Painel Geral"

        titlesDiv.appendChild(subtitle)
        titlesDiv.appendChild(title)

        body.appendChild(titlesDiv)

        const cardsContainer = document.createElement('div');
        cardsContainer.classList = "cards-container";
        cardsContainer.innerHTML = "Selecione uma pasta para visualizar o conteúdo";
        body.appendChild(cardsContainer);

        homeContainer.appendChild(body)


        console.log(queryResponse)
        console.log(data)

        this._tableContainer.appendChild(homeContainer);
        done();

        function create_menu() {
            const menuContainer = document.createElement('div');
            menuContainer.classList.add('menu-container');
            
            const logoImg = document.createElement('img')
            logoImg.src = "https://gruposervopa.com.br/themes/theme-grupo-servopa/assets/img/logos/servopa-grupo-branco.svg"
            logoImg.id = 'logo';
            menuContainer.appendChild(logoImg)

            const listFoldersDiv = document.createElement('ul');
            listFoldersDiv.classList = 'list-folders';
            
            folders.forEach(folder => {
                const folderDiv = document.createElement('div')
                folderDiv.classList = 'folder-div'

                const folderIcon = document.createElement('img')
                folderIcon.src = "https://kauantoldo.github.io/servopa_homepage/folder_icon.svg"
                folderIcon.classList = 'folder-icon'

                const li = document.createElement('li');
                li.textContent = folder;
                li.classList.add('folder')

                const line = document.createElement("div")
                line.classList.add('line')

                folderDiv.appendChild(folderIcon)
                folderDiv.appendChild(li);
                listFoldersDiv.appendChild(folderDiv);
                listFoldersDiv.appendChild(line);


                folderDiv.addEventListener('click', () => {
                    load_cards(folder);
                });

            });

            menuContainer.appendChild(listFoldersDiv);
            homeContainer.appendChild(menuContainer);
        }

        function load_cards(selectedFolder) {
            cardsContainer.innerHTML = "";  // limpa os cards anteriores

            const filteredRows = data.filter(row => row['grupos.pasta'].value === selectedFolder);

            if (filteredRows.length === 0) {
                cardsContainer.innerHTML = "Nenhum painel disponível para esta pasta.";
                return;
            }

            filteredRows.forEach((row, index) => {
                const card = document.createElement('div');
                card.classList = 'card';
                card.id = `card${index}`;
                card.style = "background-color: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border-radius: 12px; width: 350px; overflow: hidden; cursor: pointer;";

                const img = document.createElement('img');
                img.src = "https://via.placeholder.com/350x200";  // Substitua se tiver imagens
                img.alt = "Imagem do painel";
                img.style = "width: 100%; height: 200px; object-fit: cover;";

                const infoDiv = document.createElement('div');
                infoDiv.style = "padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 5px;";

                const titleSpan = document.createElement('span');
                titleSpan.style = "font-size: 20px; margin-bottom: 8px; font-weight: bold; color: #333;";
                titleSpan.textContent = row['paineis.painel'].value;

                const icon = document.createElement('img');
                icon.src = "https://cdn-icons-png.flaticon.com/512/5422/5422411.png";
                icon.alt = "Redirecionar";
                icon.width = 25;
                icon.height = 25;
                icon.style = "margin-top: -4px;";

                infoDiv.appendChild(titleSpan);
                infoDiv.appendChild(icon);

                card.appendChild(img);
                card.appendChild(infoDiv);

                // Torna o card inteiro clicável
                card.addEventListener('click', function() {
                    window.open(row['paineis.link'].value, '_blank');
                });

                cardsContainer.appendChild(card);
            });
        }

}});

