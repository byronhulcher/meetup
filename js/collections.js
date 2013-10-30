var EventCollection = Backbone.Collection.extend({
    model: Event,
    url:'https://api.meetup.com/2/open_events',
    parse: function(response){
        return response.results
    },
    sync: function(method, model, options){  // jsonp hack via http://iainjmitchell.com/blog/?p=777
        options.dataType = "jsonp";  
        return Backbone.sync(method, model, options);  
    }
});