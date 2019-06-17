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
        { tagValue: 'Thundercats', offset: 0 },
        { tagValue: 'Darkwing Duck', offset: 0 },
        { tagValue: 'Batman', offset: 0 },
        { tagValue: 'Wonder Woman', offset: 0 },
        { tagValue: 'The Flash', offset: 0 },
        { tagValue: 'The Joker', offset: 0 },
        { tagValue: 'Superman', offset: 0 },
        { tagValue: 'Simpsons', offset: 0 },
        { tagValue: 'American Dad', offset: 0 },
        { tagValue: 'Kawaii', offset: 0 },
        { tagValue: 'Rainbows', offset: 0 }
    ],

    // Giphy API Information
    apiKey: 'ZXL2tDFcTteEYQwe3fJR5UiPtdq30QOT',
    apiSearch: 'Monkey',
    apiOffset: 0,
    apiURL: function () {
        return `http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}`
                +`&q=${this.apiSearch}`
                +`&offset=${this.apiOffset}`
                +`&limit=10`;
    }
}

app_initialize();
app_render_navigation();
app_render_favorites();