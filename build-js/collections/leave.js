define(["jquery","underscore","backbone","localstorage","models/day"],function(e,t,n,r,i){var s=n.Collection.extend({model:i,localStorage:new n.LocalStorage("hp-leave")});return s});