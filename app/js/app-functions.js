// Main App Functions


// App: Initialization. Setup save data.
function app_initialize() {

    // Check if user has been here before
    if (localStorage.getItem('dataListFavorites') === null) {
        localStorage.setItem('dataListFavorites', JSON.stringify(appData.favList));
        localStorage.setItem('dataListTags', JSON.stringify(appData.tagList));
    }

    // User has been here, load favorites and tag list.
    else {
        appData.favList = JSON.parse(localStorage.getItem('dataListFavorites'));
        appData.tagList = JSON.parse(localStorage.getItem('dataListTags'));
    }

    // Create listener for "ENTER"
    $("#app_input_field").on('keyup', function (e) {
        if (e.keyCode == 13) {
            app_nav_add();
        }
    });
}

// Navigation: Attempt to add new custom tag
function app_nav_add() {
    let inputField = $('#app_input_field');
    let inputValue = inputField.val();

    if (inputValue === '') { return null }

    inputField.val('');
    appData.tagList.push(inputValue);
    localStorage.setItem('dataListTags', JSON.stringify(appData.tagList));
    app_render_navigation();
}

// Navigation: Render all tags
function app_render_navigation() {

    $('nav').empty();
    appData.tagList.forEach(function (value, index) {
        let myHTML = `<button class="app_nav_cell" data-index="${index}" value="${appData.tagList[index]}" oncontextmenu="app_nav_remove(this)" onclick="app_get_images(this)">${appData.tagList[index]}</button>`;
        $('nav').append(myHTML);
    });
}

function app_nav_remove(thisBtn) {

    event.preventDefault();

    let btn = $(thisBtn);
    let index = btn.attr('data-index');
    let newArray = appData.tagList.splice(index, 1);
    localStorage.setItem('dataListTags', JSON.stringify(appData.tagList));
    btn.remove();

}

// AJAX: Request data from GIPHY
function app_get_images(value) {

    // Get Tag Value
    appData.apiSearch = $(value).attr('value');

    // Get offset value for API search, increase it.
    let index = parseInt($(value).attr('data-index'));

    // New Tag Check
    if (appData.lastTag !== appData.apiSearch) {
        appData.lastTag = appData.apiSearch;
        $('main').empty();
        appData.apiOffset = 0;
    }

    // Request images from GIPHY and push to DOM
    $.get(appData.apiURL(), function (response) {

        // Loop through response results write html template
        for (let i = 0; i < 10; i++) {
            let imgSource = response.data[i].images.fixed_height_small.url;
            let imgStill = response.data[i].images.fixed_height_small_still.url;

            let myHTML = `
                <div class="app_content_cell fade-in">
                    <div class="app_content_cell_options" onclick="app_fav_add(this)">
                        <i class="fas fa-heart"></i>
                    </div>
                    <img data-state="still" data-fav="${imgSource}" data-swap="${imgSource}" class="fade-in-fwd" src="${imgStill}" onclick="app_image_swap_state(this)">
                </div>`;


            // Check if image is in favorites and highlight
            if (appData.favList.includes(imgSource)) {

                myHTML = $(myHTML);
                myHTML.css('backgroundColor', '#26ad5e');
                myHTML.children().children('.fas').css('color', '#26ad5e');
            }

            // Add to the dom
            $('main').prepend(myHTML);
        }

        // Increase tag search offset
        appData.apiOffset += 10;
    });
}

function app_image_swap_state(img) {

    // Detect and swap
    switch ($(img).attr('data-state')) {

        case "still":
            $(img).attr('data-state', "animated");
            break;

        case "animated":
            $(img).attr('data-state', "still");
            break;
    }

    let imgOld = $(img).attr('src');
    let imgNew = $(img).attr('data-swap');

    // Swap States
    $(img).attr('src', imgNew);
    $(img).attr('data-swap', imgOld);
}

// Favorites: Render prepended favorite images to the favorites container
function app_render_favorites() {

    $('.app_favorites_content').empty();

    for (let i = 0; i < appData.favList.length; i++) {
        let imgSource = appData.favList[i];
        let myHTML = `
            <div class="app_content_cell app_favorites_cell fade-in">
                <div class="app_content_cell_options" onclick="app_fav_remove(this, ${i})">
                    <i class="fas fa-times"></i>
                </div>
                <img class="fade-in-fwd" src="${imgSource}">
            </div>`;

        // Append Favorite
        $('.app_favorites_content').prepend(myHTML);
    }
}


// Favorites: Render the latest favorite and append to list
//            This is done when you add a new favorites
function app_render_favorites_append() {
    let i = appData.favList.length - 1;
    let imgSource = appData.favList[i]
    //let imgURL = appData.favList[i].imgEmbed;
    let myHTML = `
            <div class="app_content_cell app_favorites_cell fade-in">
                <div class="app_content_cell_options" onclick="app_fav_remove(this, ${i})">
                    <i class="fas fa-times"></i>
                </div>
                <img class="fade-in-fwd" src="${imgSource}">
            </div>`;

    $('.app_favorites_content').append(myHTML);

    // Update Favorites Container Size
    app_favorites_update_size();

}

function app_favorites_update_size() {
    setTimeout(() => {

        let favDiv = $('.app_favorites_container');
        let scrollHeight = favDiv[0].scrollHeight + 'px';
        if (favDiv.css('max-height') !== '0px') {
            favDiv.css('max-height', scrollHeight);
        }
    }, 50);
}

// Favorites: Toggle Visibility
function app_toggle_favorites() {

    // Get container
    let favDiv = $('.app_favorites_container');
    let scrollHeight = favDiv[0].scrollHeight + 'px';

    // Swap CSS heights to open/close 
    if (favDiv.css('max-height') === '0px') {
        favDiv.css('max-height', scrollHeight);
    }

    if (favDiv.css('max-height') !== '0px') {
        favDiv.css('max-height', '0px');
    }
}

// Favorites: Remove item from list
function app_fav_remove(cell, index) {
    $(cell).parent().remove();
    appData.favList.splice(index, 1);
    localStorage.setItem('dataListFavorites', JSON.stringify(appData.favList));

    // Update Favorites Container Size
    app_favorites_update_size();
}

// Favorites: Add new item to list
function app_fav_add(imgCell) {

    // Setup image data sources
    let imgData = $(imgCell).parent().children('img');
    let src = imgData.attr('data-fav');

    if (appData.favList.includes(src)) { return null }

    // Change outline/heart color to green
    $(imgCell).parent().css('backgroundColor', '#26ad5e');
    $(imgCell).children('.fas').css('color', '#26ad5e')

    // Push to array and save to local storage
    appData.favList.push(src);
    localStorage.setItem('dataListFavorites', JSON.stringify(appData.favList));

    // Append latest favorites entry inside fav container
    app_render_favorites_append();
}

// ----------------------------------------
// !!! Experimental function incomplete !!!
// ----------------------------------------


// function fx_render_heart(imgCell) {

//     let heartElement = $(imgCell).children('.fas');
//     let xx = Math.floor(heartElement.offset().left - (heartElement.width()/2));
//     let yy = Math.floor(heartElement.offset().top - (heartElement.height()/2));

//     let myHTML = $(`<div id="fx-icon-heart" class="fx-heart"><i class="fas fa-heart"></i></div>`);
//     //myDIV.offset( { top: yy, left: xx});
//     myHTML.css('position', 'absolute');
//     myHTML.css('top', yy);
//     myHTML.css('left', xx);

//     $('body').append(myHTML);
// }