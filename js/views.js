var EventView = Backbone.View.extend({
    tagName:  "div",
    events: {
        "click .favorite-toggle": "toggleFavorite",
        "click .favorite-star": "toggleFavorite"
    },
    initialize: function() {
        favorited = Cookies.get(this.model.cookieName());
        this.model.set('favorite', favorited ? true : false);
    },
    render: function() {
        template = _.template($("#event-template").html());
        var event_html = $(template({model:this.model}));
        this.$el.html(event_html);
        return this;
    },
    toggleFavorite: function(event){
        event.stopPropagation();
        this.model.toggleFavorite();
        this.render();
    }
});

var AppView = Backbone.View.extend({
    el: "#app",
    time:'0d,1m',
    zip: 10002,
    events: {
        "click li:not(.active) .city": "selectedCity",
        "click button.zip-submit": "searchForZip",
    },
    initialize: function(){
        this.meetup_events = new EventCollection;
        this.refresh();
        
    },
    refresh: function(){
        var self = this;
        this.meetup_events.fetch({
            data: {
                'key': MEETUP_API_KEY,
                'page': 30,
                'zip': this.zip,
                'radius': 5,
                'order': 'trending',
                'desc': true,
                'time': this.time,
            },
            success: function(collection, data){
                self.render();
            },
        });
    },
    render: function(){
        $("#events-list").empty();
        var slice = this.meetup_events.slice(0,10);
        _.each(slice, this.addOne);
        if (slice.length == 0){
            $('#warning').show();
        } else {
            $('#warning').hide();
        }
    },
    addOne: function(event){
        var view = new EventView({model:event});
        $("#events-list").append(view.render().el);
    },
    selectedCity: function(event){
        event.stopPropagation();
        $('.navbar-nav li').removeClass('active');
        $('.zip-input').val('');
        $(event.target).parent().addClass('active');
        this.zip = $(event.target).data('zip');
        this.refresh();
    },
    searchForZip: function(event){
        event.stopPropagation();
        $('.navbar-nav li').removeClass('active');
        this.zip = $('.zip-input').val();
        this.refresh();
    }
});