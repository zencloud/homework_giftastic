// App Main JS


// App Data 
const appData = {

    apiKey: 'ZXL2tDFcTteEYQwe3fJR5UiPtdq30QOT',
    apiSearch: 'Monkey',
    apiURL: function () {
        return `http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}`
                +`&q=${this.apiSearch}`
                +`&limit=5`;
    }
}

// Test Query
$.get(appData.apiURL(), function(response){

    for (let i = 0; i < 5; i++) {
        let img = response.data[i].images.fixed_height.url; 
        let myHTML = `
            <div class="app_content_cell">
                <img src="${img}">
            </div>`;

        $('main').append(myHTML);
    }
})