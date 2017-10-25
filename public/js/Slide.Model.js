/**
 * Created by maudel on 10/23/17.
 */
var app = app || {};
$(function () {
    'use strict';
// define main model
    var Slide = Backbone.Model.extend({
        // Default todo attribute values
        defaults: {
            title: '',
            images: [],
            selected: false
        },

        select: function() {
            this.set({ selected: true });
        }
    });




});