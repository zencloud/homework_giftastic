// App Main JS

/* App TODO

- Add removeable navigation buttons
- Save Navigation
- Add Favorites
- Remove from Favorites

*/

// App Data 
const appData = {

    // Favorites List
    favList: [],

    // Current Navigation List
    tagList: [
        'Thundercats',
        'Darkwing Duck',
        'Batman',
        'Wonder Woman',
        'The Flash',
        'The Joker',
        'Superman',
        'Simpsons',
        'American Dad',
        'Kawaii',
        'Rainbows'
    ],

    // Giphy API Information
    apiKey: 'ZXL2tDFcTteEYQwe3fJR5UiPtdq30QOT',
    apiSearch: 'Monkey',
    apiOffset: 0,
    apiURL: function () {
        return `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}`
                +`&q=${this.apiSearch}`
                +`&offset=${this.apiOffset}`
                +`&limit=10`;
    },

    // General App Variables
    lastTag: ''
}


// Fresh loading of app
app_initialize();
app_render_navigation();
app_render_favorites();