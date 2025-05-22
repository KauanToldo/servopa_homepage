looker.plugins.visualizations.add({
    id: "servopa_homepage",
    label: "Homepage",
    options: {
      
    },
    create: function(element, config) {
      this._tableContainer = element.appendChild(document.createElement("div"));
    },

    updateAsync: function(data, element, config, queryResponse, details, done) {
        this.clearErrors();
        this._tableContainer.innerHTML = `
            <h1>Hello World</h1>
        `
        console.log(queryResponse)
        console.log(data)
        done();

}});