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
    appData.navList[index].offset += 5;
    appData.apiOffset = appData.navList[index].offset;

    console.log(appData.apiOffset);

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
    });
}