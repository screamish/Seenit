Meteor.startup(function () {
  // code to run on server at startup
	if(Links.find().count() === 0)
	{
		var data = [
			{	title: "The ill vibe",
				url: "http://www.example.org/1"
			},
			{	title: "Awesome content in here y'all!",
				url: "http://www.reddit.com"
			}
		];
		
		var timestamp = (new Date()).getTime();
		for (var i = 0; i < data.length; i++)
		{
			var link_id = Links.insert(
				{	title: data[i].title,
					url: data[i].url,
					timestamp: timestamp
				});
			
			timestamp += 1;
		}
		
	}
	
	
});