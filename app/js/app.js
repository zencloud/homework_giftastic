

// Ajax setup
let apiKey, apiURL;
apiKey = 'Y064fSObyugIkHGsgpBbKtYy6JmTG1xW';

// Normal Query
// apiURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${apiKey}`;

// Filtered Query
//apiURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=Hong+Kong&facet_field=day_of_week&facet=true&begin_date=20190612&api-key=${apiKey}`;

$.get(apiURL, function(data) {
    console.log(data);
});
