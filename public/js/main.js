



var navView = new NavView();
// Load View Collection
var slideView = null;
var slideCollection = new SlideCollection();

slideCollection.fetch().done(function(){
    // select first block when loading
    $.each(slideCollection.first(4), function(index, m) {
        m.set('selected', true);
    });

    slideView = new SlideView({ collection: slideCollection });
    navView.navigationState();
});

