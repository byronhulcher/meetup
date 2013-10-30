var Event = Backbone.Model.extend({
    defaults: {
        favorite:false
    },
    events: {
        "change:id": 'updateFavorite'
    },
    toggleFavorite: function(){
        current_favorite = this.get('favorite');
        toggled_favorite = !current_favorite;
        this.set('favorite', toggled_favorite);
        this.updateFavoriteCookie();
    },
    updateFavoriteCookie: function(){
        Cookies.set(this.cookieName(), this.get('favorite')? 'true' : '');
    },
    cookieName: function(){
        return 'event_'+this.id+'_favorite';
    },
    updateFavorite: function(){
        console.log('updating')
    }
});