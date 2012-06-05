Links = new Meteor.Collection("links");

Meteor.subscribe('links', function()
	{
		
	});

Template.links.links = function ()
{
	return Links.find({}, {sort: {score: -1, timestamp: 1}});
}

Template.link_item.time_since_submit = function ()
{
	return new moment(this.timestamp).fromNow();
}

Template.links.events = 
{
	'click #show-create-link': function (evt)
	{
		$('#create-link').show();
	}
}

Template.link_item.events = 
{
	'click .upvote': function (evt)
	{
		console.log("Upvote!");
		Links.update(this._id, {$inc: {upvotes: 1, score: 1}});
	},
	
	'click .downvote': function (evt)
	{
		console.log("Downvote!");
		Links.update(this._id, {$inc: {downvotes: 1, score: -1}});
	}
}

Template.create_link.events =
{
	'click #create-link-button': function (evt)
	{
		console.log("Creating a new link");
		
		var linkTitle = $('#new-link-title').val();
		var linkUrl = $('#new-link-url').val();
		
		Meteor.call('create_link', linkTitle, linkUrl, function (error, result)
			{
				$('#create-link').hide();
			});
	},
	
	'click #cancel-create-link-button': function (evt)
	{
			$('#create-link').hide();
	}
}