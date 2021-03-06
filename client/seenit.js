Links = new Meteor.Collection("links");
Comments = new Meteor.Collection("comments");

Meteor.subscribe('links', function()
{
	
});

Meteor.autosubscribe(function ()
{
	var link_id = Session.get('link_id');
	if(link_id)
	{
		Meteor.subscribe('comments', link_id);
		Meteor.subscribe('link', link_id);
	}
});

Template.main_pane.commenting = function ()
{
	if(Session.get('link_id'))
		return true;
	
	return false;
}

Template.links.links = function ()
{
	return Links.find({}, {sort: {score: -1, timestamp: 1}});
}

Template.link_item.comment_count = function ()
{
	return Comments.find({link_id: this._id}).count();
}

Template.link_item.time_since_submit = function ()
{
	return new moment(this.timestamp).fromNow();
}

Template.link_item.host = function ()
{
	return new Uri(this.url).host();
}

Template.top_bar.events = 
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
	},
	
	'click .delete': function (evt)
	{
		console.log("Delete");
		Meteor.call("delete_link", this._id);
	},
	
	'click .link-details': function (evt)
	{
		console.log("Mouseover a link");
		$('.delete', evt.currentTarget).toggle();
	},
	
	'click .comments-summary': function (evt)
	{
		Session.set("link_id", this._id);
	}
}

Template.create_link.events =
{
	'click #create-link-button': function (evt)
	{
		console.log("Creating a new link");
		
		var linkTitle = $('#new-link-title');
		var linkUrl = $('#new-link-url');
		
		Meteor.call('create_link', linkTitle.val(), linkUrl.val(), function (error, result)
			{
				$('#new-link-title').val("");
				$('#new-link-url').val("");
				$('#create-link').hide();
			});
	},
	
	'click #cancel-create-link-button': function (evt)
	{
		$('#new-link-title').val("");
		$('#new-link-url').val("");
		$('#create-link').hide();
	}
}