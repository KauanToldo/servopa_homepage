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
                const li = document.createElement('li');
                li.textContent = folder;
                li.classList.add('folder')
                const line = document.createElement("div")
                line.classList.add('line')
                listFoldersDiv.appendChild(li);
                listFoldersDiv.appendChild(line);
            });


            menuContainer.appendChild(listFoldersDiv);


            homeContainer.appendChild(menuContainer);
        }

}});

