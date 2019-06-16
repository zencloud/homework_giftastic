// Main App Functions


function app_render_navigation() {

    appData.navList.forEach(function(value, index) {
       
        let myHTML = `<button class="app_nav_cell" data-index="${index}" value="${value.searchValue}" onclick="app_get_images(this)">${value.searchValue}</button>`;
        $('nav').append(myHTML);        
    });
}

function app_get_images(value) {
    
    appData.apiSearch = $(value).attr('value');

    let index = parseInt($(value).attr('data-index'));
    appData.navList[index].offset += 10;
    appData.apiOffset = appData.navList[index].offset;

    console.log(appData.apiOffset);

    // Test Query
    $.get(appData.apiURL(), function(response){

        for (let i = 0; i < 10; i++) {
            let img = response.data[i].images.fixed_height_small.url; 
            let myHTML = `
                <div class="app_content_cell fade-in">
                    <div class="app_content_cell_options">
                        <i class="fas fa-heart"></i>
                    </div>
                    <img class="fade-in-fwd" src="${img}">
                </div>`;

            $('main').prepend(myHTML);
        }
    });
}


function app_toggle_favorites() {

    let favDiv = $('.app_favorites_container');
    
    if (favDiv.css('max-height') === '0px') {
        favDiv.css('max-height', '500px');
    }

    if (favDiv.css('max-height') !== '0px') {
        favDiv.css('max-height', '0px');
    }
}