Links = new Meteor.Collection("links");

Meteor.subscribe('links', function()
	{
		
	});

Template.links.links = function ()
{
	return Links.find({}, {sort: {timestamp: 1}});
}

Template.link_item.time_since_submit = function ()
{
	return new moment(this.timestamp).fromNow();
}

Template.link_item.score = function ()
{
	return (this.upvotes - this.downvotes);
}

Template.link_item.events = 
{
	'click .upvote': function (evt)
	{
		console.log("Upvote!");
		Links.update(this._id, {$inc: {upvotes: 1}});
	},
	
	'click .downvote': function (evt)
	{
		console.log("Downvote!");
		Links.update(this._id, {$inc: {downvotes: 1}});
	}
}

// Default crap below

Template.hello.greeting = function () {
  return "Welcome to seenit.";
};

Template.hello.events = {
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  }
};