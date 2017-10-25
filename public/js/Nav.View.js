/**
 * Created by maudel on 10/23/17.
 */
// Event handlers for navigation buttons
var NavView = Backbone.View.extend({
    el: ".nav-wrapper",

    initialize: function() {
        this.btnNext = $('.next');
        this.btnPrevious = $('.previous');
    },

    events: {
        "click .next": "goNext",
        "click .previous": "goPrevious",
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

        // slice is index based so remove 1 from position and select new models
        nextBlock -= 1;
        $.each(slideCollection.slice(nextBlock * 4, nextBlock * 4 + 4), function(index, m) {
            m.set('selected', true);
        });

        // update render, not listening since the model/collection changes twice
        slideView.render();
    }

});
