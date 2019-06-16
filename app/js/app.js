// App Main JS


// App Data 
const appData = {

    navList: [
        { searchValue: 'Thundercats', offset: 0 },
        { searchValue: 'Underdog', offset: 0 },
        { searchValue: 'Batman', offset: 0 },
        { searchValue: 'Wonder Woman', offset: 0 },
        { searchValue: 'The Flash', offset: 0 },
        { searchValue: 'The Joker', offset: 0 },
        { searchValue: 'Superman', offset: 0 },
        { searchValue: 'Simpsons', offset: 0 },
        { searchValue: 'American Dad', offset: 0 },
        { searchValue: 'Kawaii', offset: 0 },
        { searchValue: 'Rainbows', offset: 0 }
    ],

    apiKey: 'ZXL2tDFcTteEYQwe3fJR5UiPtdq30QOT',
    apiSearch: 'Monkey',
    apiOffset: 0,
    apiURL: function () {
        return `http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}`
                +`&q=${this.apiSearch}`
                +`&offset=${this.apiOffset}`
                +`&limit=5`;
    }
}


app_render_navigation();