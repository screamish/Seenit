Meteor.startup(function () {
  // code to run on server at startup
	if(Links.find().count() === 0)
	{
		var data = [
			{	title: "The ill vibe",
				url: "http://www.example.org/1",
				comments: [
					"Love it!",
					"Hate it!!"
				]
			},
			{	title: "Awesome content in here y'all!",
				url: "http://www.reddit.com"
			}
		];
		
		_.each(data, function(link)
			{
				var link_id = Meteor.call("create_link", link.title, link.url);
				_.each(link.comments, function(comment)
					{
						Meteor.call("add_comment", link_id, comment);
					});
			});	
	}
	
});