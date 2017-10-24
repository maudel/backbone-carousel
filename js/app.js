var Slide = Backbone.Model.extend({
  defaults: {
    title: '',
    images: [],
    selected: false
  },
  select: function() {
    this.set({ selected: true });
  }
});




var SlideCollection = Backbone.Collection.extend({
  model: Slide,
  url: './js/data.json',
  numberOfBlocks: function() {
    return Math.ceil(this.length / 4);
  },
  selectedBlock: function() {
    var modelSelected = this.findWhere({ selected: true });
    var modelPosition = this.indexOf(modelSelected) + 1;
    return Math.ceil(modelPosition/4);
  }
});






// A little helper to randomize the image
var util = {
  randomImage: function(images){
    return images[Math.floor(Math.random()*images.length)];
  }
}
// define main view
var SlideView = Backbone.View.extend({
  el:  '.slider',

  template: _.template( $('#slide-template').html() ),

  initialize: function (options) {
    this.options = options || {};
    this.render();
  },

  // Re-render the title of the todo item.
  render: function() {
    var data = this.collection.toJSON();
    // _.extend(data, util);

    this.$el.html( this.template({ collection: data, helpers: util }) );
    return this;
  }
});



// Event handlers for navigation buttons
var NavView = Backbone.View.extend({
  el: ".nav-wrapper",

  initialize: function() {
    this.btnNext = $('.next');
    this.btnPrevious = $('.previous');
  },

  events: {
    "click .next": "goNext",
    "click .previous": "goPrevious"
  },

  goNext: function() {
    this.changeSlide("next");
    this.navigationState();
  },

  goPrevious: function() {
    this.changeSlide("previous");
    this.navigationState();
  },

  navigationState: function() {
    var totalSlides = slideCollection.length;
    var totalBlocks = slideCollection.numberOfBlocks();
    var currentBlock = slideCollection.selectedBlock();

    this.btnPrevious.removeClass("disabled");
    this.btnNext.removeClass("disabled");

    if (currentBlock == totalBlocks){
      this.btnNext.addClass("disabled");
    } else if(currentBlock == 1) {
      this.btnPrevious.addClass("disabled");
    }
  },

  changeSlide: function(step) {
    var totalSlides = slideCollection.length;
    var totalBlocks = slideCollection.numberOfBlocks();
    var nextBlock = (step === 'previous') ? slideCollection.selectedBlock() - 1 : slideCollection.selectedBlock() + 1;

    // currently selected wont be anymore
    $.each(slideCollection.where({ selected: true }), function(index, m) {
      m.set('selected', false);
    });

    // slice is index based s
    $.each(slideCollection.slice(nextBlock * 4, nextBlock * 4 + 4), function(index, m) {
      m.set('selected', true);
    });

    // update render, not listening since the model/collection changes twice
    slideView.render();
  }

});
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
