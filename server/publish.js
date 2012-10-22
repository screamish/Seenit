
Links = new Meteor.Collection("links");

Meteor.publish('links', function()
{
	// TODO this probably needs to add in comment totals
	return Links.find();
});

Comments = new Meteor.Collection("comments");

Meteor.publish('comments', function (link_id)
{
	return Comments.find({link_id: link_id});
});

Meteor.publish('link', function (link_id)
{
	return Links.findOne({_id: link_id})
});