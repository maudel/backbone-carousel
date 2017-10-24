/**
 * Created by maudel on 10/23/17.
 */
var app = app || {};
$(function () {
    'use strict';
    // define main collection
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


});