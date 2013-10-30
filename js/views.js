var EventView = Backbone.View.extend({
    tagName:  "li",
    events: {
        "click .favorite-toggle": "toggleFavorite"
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
    el: $("#events"),
    time:'0d,1m',
    initialize: function(){
        this.events = new EventCollection;
        //this.listenTo(this.events, 'add', this.addOne);
        //this.listenTo(this.events, 'reset', this.addAll);
        //this.listenTo(this.events, 'all', this.render);
        this.refresh();
        
    },
    refresh: function(){
        var self = this;
        this.events.fetch({
            data: {
                'key': MEETUP_API_KEY,
                'page': 40,
                'zip': 10002,
                'order': 'trending',
                'desc': true,
                'time': this.time,
            },
            remove: false,
            success: function(collection, data){
                self.render();
            }
        });
    },
    render: function(){
        var slice = this.events.slice(0,10);
        _.each(slice, this.addOne);
    },
    addOne: function(event){
        console.log(event.attributes);
        var view = new EventView({model:event});
        $("#events-list").append(view.render().el);
    },
    addAll: function(){
    }
});