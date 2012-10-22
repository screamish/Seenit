
Meteor.methods({
	create_link: function (title, url)
	{
		if (!_.str.trim(title) || !_.str.trim(url))
			throw new Meteor.Error(400, "Links must have a title and a URL");
		
		var uri = new Uri(url);
		if(!uri.protocol())
			uri.protocol('http');
		
		var link_id = Links.insert(
			{	title: _.str.trim(title),
				url: uri.toString(),
				timestamp: new Date().getTime(),
				upvotes: 0,
				downvotes: 0,
				score: 0
			});
			
		return link_id;
	},
	
	delete_link: function (link_id)
	{
		if (!Links.findOne(link_id))
			throw new Meteor.Error(400, "Unknown link, unable to delete");
			
		Links.remove(link_id);
	},
	
	add_comment: function (link_id, comment)
	{
		var link = Links.findOne(link_id);
		if (!link)
			throw new Meteor.Error(400, "Unknown link, unable to add comment");
			
		Comments.insert(
			{
				text: comment,
				link_id: link_id,
				timestamp: (new Date()).getTime(),
				upvotes: 0,
				downvotes: 0,
				score: 0
			});
	}
});