Links = new Meteor.Collection("links");

Meteor.subscribe('links', function()
	{
		
	});

Template.links.links = function ()
{
	return Links.find({}, {sort: {timestamp: 1}});
}
	
Template.links.events = 
{
	'click #upvote': function (evt)
	{
		console.log("Upvote!");
		Links.update(this._id, {$set: {upvotes: this.upvotes++}});
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