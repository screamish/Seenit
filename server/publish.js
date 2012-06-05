
Links = new Meteor.Collection("links");

Meteor.publish('links', function(){
	return Links.find();
});

