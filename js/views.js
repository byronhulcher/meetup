var EventView = Backbone.View.extend({
    tagName:  "div",
    events: {
        "click .favorite-toggle": "toggleFavorite",
        "click .favorite-star": "toggleFavorite"
    },
    initialize: function() {
        favorited = Cookies.get(this.model.cookieName());
        this.model.set('favorite', favorited ? true : false);
        console.log(this.model.get('favorite'));
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
    el: "#events",
    time:'0d,1m',
    zip: 11226,
    events: {
        "click .city": "selectedCity"
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
            }
        });
    },
    render: function(){
        $("#events-list").empty();
        var slice = this.meetup_events.slice(0,10);
        _.each(slice, this.addOne);
    },
    addOne: function(event){
        console.log(event.attributes);
        var view = new EventView({model:event});
        $("#events-list").append(view.render().el);
    },
    selectedCity: function(event){
        this.zip = $(event.target).data('zip');
        console.log(this.zip);
        this.refresh();
    }
});