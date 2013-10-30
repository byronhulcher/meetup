var EventView = Backbone.View.extend({
    tagName:  "li",
    render: function() {
        var link = $('<a />', {
            id:'event_'+this.model.id,
            href: this.model.get('event_url'),
            target: '_blank'
        }).text(this.model.get('name'));
        this.$el.html(link);
        return this;
    }
});

var AppView = Backbone.View.extend({
    el: $("#events"),
    initialize: function(){
        this.events = new EventCollection;
        this.listenTo(this.events, 'add', this.addOne);
        this.listenTo(this.events, 'reset', this.addAll);
        this.listenTo(this.events, 'all', this.render);
        this.events.fetch({
            data: {
                'key': MEETUP_API_KEY,
                'page': 40,
                'zip': 11226,
            },
            remove: false
        });
    },
    render: function(){},
    addOne: function(event){
        var view = new EventView({model:event});
        $("#events-list").append(view.render().el);

    },
    addAll: function(){
        this.events.each(this.addOne, this);
    }
});