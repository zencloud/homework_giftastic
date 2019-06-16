// Main App Functions


// Initialization of App
function app_initialize() {

    // Check if user has been here before
    if (localStorage.getItem('dataListFavorites') === null) {

        localStorage.setItem('dataListFavorites', JSON.stringify(appData.favList));
        localStorage.setItem('dataListTags', JSON.stringify(appData.tagList));
    }
}
// Generates navigation
function app_render_navigation() {

    appData.tagList.forEach(function(value, index) {
       
        let myHTML = `<button class="app_nav_cell" data-index="${index}" value="${value.tagValue}" onclick="app_get_images(this)">${value.tagValue}</button>`;
        $('nav').append(myHTML);        
    });
}


// Send request to giphy to return images
function app_get_images(value) {
    
    appData.apiSearch = $(value).attr('value');

    let index = parseInt($(value).attr('data-index'));
    appData.tagList[index].offset += 10;
    appData.apiOffset = appData.tagList[index].offset;

    console.log(appData.apiOffset);

    // Test Query
    $.get(appData.apiURL(), function(response){

        for (let i = 0; i < 10; i++) {
            let imgSource = response.data[i].images.fixed_height_small.url;
            let imgURL    = response.data[i].url;
            let myHTML = `
                <div class="app_content_cell fade-in">
                    <div class="app_content_cell_options" onclick="app_fav_add(this)">
                        <i class="fas fa-heart"></i>
                    </div>
                    <img data-imgurl="${imgURL}" class="fade-in-fwd" src="${imgSource}">
                </div>`;

            $('main').prepend(myHTML);
        }
    });
}


// Toggle Favorites Panel
function app_toggle_favorites() {

    // Get container
    let favDiv = $('.app_favorites_container');
    
    // Swap CSS heights to open/close 
    if (favDiv.css('max-height') === '0px') {
        favDiv.css('max-height', '500px');
    }

    if (favDiv.css('max-height') !== '0px') {
        favDiv.css('max-height', '0px');
    }
}


function app_fav_add(imgCell) {
    
    let imgData = $(imgCell).parent().children('img');
    let url = imgData.attr('data-imgurl');
    let src = imgData.attr('src');
    
    // Save To Array
    let imgObj = {imgURL: url, imgEmbed: src}
    appData.favList.push(imgObj);
    localStorage.setItem('dataListFavorites', JSON.stringify(appData.favList));
    console.log(src);
}