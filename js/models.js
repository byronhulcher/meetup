var Event = Backbone.Model.extend({
    defaults: {
        favorite:true
    },
    toggleFavorite: function(){
        current_favorite = this.get('favorite');
        toggled_favorite = !current_favorite;
        this.set('favorite', toggled_favorite);
    }
});