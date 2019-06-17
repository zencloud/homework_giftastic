// Main App Functions


// Initialization of App
function app_initialize() {

    // Check if user has been here before
    if (localStorage.getItem('dataListFavorites') === null) {
        localStorage.setItem('dataListFavorites', JSON.stringify(appData.favList));
        localStorage.setItem('dataListTags', JSON.stringify(appData.tagList));
    }
    else {
        appData.favList = JSON.parse(localStorage.getItem('dataListFavorites'));
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
            let imgURL    = response.data[i].embed_url;
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


function app_render_favorites() {

    $('.app_favorites_content').empty();

    for (let i = 0; i < appData.favList.length; i++) {
        let imgSource = appData.favList[i].imgURL;
        let imgURL    = appData.favList[i].imgEmbed;
        let myHTML = `
            <div class="app_content_cell app_favorites_cell fade-in">
                <div class="app_content_cell_options" onclick="app_fav_remove(this, ${i})">
                    <i class="fas fa-times"></i>
                </div>
                <img data-imgurl="${imgURL}" class="fade-in-fwd" src="${imgURL}">
            </div>`;

        $('.app_favorites_content').prepend(myHTML);
    }
}

function app_render_favorites_append() {
        let i = appData.favList.length-1;
        let imgSource = appData.favList[i].imgURL;
        let imgURL    = appData.favList[i].imgEmbed;
        let myHTML = `
            <div class="app_content_cell app_favorites_cell fade-in">
                <div class="app_content_cell_options" onclick="app_fav_remove(this, ${i})">
                    <i class="fas fa-times"></i>
                </div>
                <img data-imgurl="${imgURL}" class="fade-in-fwd" src="${imgURL}">
            </div>`;

        $('.app_favorites_content').append(myHTML);
}

// Toggle Favorites Panel
function app_toggle_favorites() {

    // Get container
    let favDiv = $('.app_favorites_container');
    
    // Swap CSS heights to open/close 
    if (favDiv.css('max-height') === '0px') {
        favDiv.css('max-height', '2000px');
    }

    if (favDiv.css('max-height') !== '0px') {
        favDiv.css('max-height', '0px');
    }
}


function app_fav_remove(cell, index) {
    $(cell).parent().remove();
    appData.favList.splice(index, 1);
    console.table(appData.favList);
    localStorage.setItem('dataListFavorites', JSON.stringify(appData.favList));
}
function app_fav_add(imgCell) {
    
    // Setup image data sources
    let imgData = $(imgCell).parent().children('img');
    let url = imgData.attr('data-imgurl');
    let src = imgData.attr('src');
    
    // Push to array and save to local storage
    let imgObj = {imgURL: url, imgEmbed: src}
    appData.favList.push(imgObj);
    localStorage.setItem('dataListFavorites', JSON.stringify(appData.favList));

    // Re-render favorites
    app_render_favorites_append();
}