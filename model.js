Meteor.methods({
	create_link: function (title, url)
	{
		if (!$.trim(title) || !$.trim(url))
			throw new Meteor.Error(400, "Links must have a title and a URL");
		
		var link_id = Links.insert(
			{	title: $.trim(title),
				url: $.trim(url),
				timestamp: new Date().getTime(),
				upvotes: 0,
				downvotes: 0,
				score: 0
			});
			
		return link_id;
	}
});