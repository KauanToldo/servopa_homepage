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
                display: flex; 
                justify-content: center; 
                align-items: center;
                background-image: url(fundo.png);
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            
            .menu-container {
                height: 100vh;
                width: 300px;
                background-color: #29479F;
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
        create_menu(queryResponse);

        console.log(queryResponse)
        console.log(data)

        this._tableContainer.appendChild(homeContainer);
        done();

        function create_menu(queryResponse) {
            const menuContainer = document.createElement('div');
            menuContainer.classList.add('menu-container');
            homeContainer.appendChild(menuContainer);
        }

}});

