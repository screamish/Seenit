Meteor.methods({
	create_link: function (title, url)
	{
		var link_id = Links.insert(
			{	title: title,
				url: url,
				timestamp: new Date().getTime(),
				upvotes: 0,
				downvotes: 0,
				score: 0
			});
			
		return link_id;
	}
});