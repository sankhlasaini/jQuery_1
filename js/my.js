
$(function () 
{
	var $mytext = $('#mytext');
	var $movieDetail = $('#movieDetail');
	var $title = $('#title');
	var $search = $('#search');
	var $count = $('#count');
	var count = 0;
	var $movie = "";
	var addbtn = $('#add_movie');

	$('#title').on('input', function () {	
		
		$.ajax({
			type:'GET',
		//url:'http://localhost:3000/Search',
		url:'http://www.omdbapi.com/?s='+$title.val(),
		success:function(data) 
		{
			if($title.val()!='')
			{
				//$('#start').remove();

				$mytext.empty();
				$movieDetail.empty();
				$('#listHead').empty();
				count=0;
				var mydata = data.Search;
				$('#listHead').append('Results');


				$mytext.append( "<tr><th>Movies</th></tr>");

				$.each(mydata, function( index, value ) 
				{
					$mytext.append('<tr><td>'+value.Title+'</td><td style="display:none;">'+value.imdbID+'</td><td><button id="view" class="viewBtn glyphicon glyphicon-fullscreen"></button></td></tr>');
					$count.empty();
			//$count.append("Result Found : "+count);
		});

			}
			else
			{
				$mytext.empty();
				$movieDetail.empty();
				$count.empty();
				$('#listHead').empty();
				$movieDetail.empty();
						
			}
		}
	});

	});

	$mytext.delegate('.viewBtn','click',function () {
		
		var $td = $(this).closest('td').prev('td');

		$.ajax({
			type:'GET',
			url:'http://www.omdbapi.com/?s='+$title.val(),
			success:function(data) 
			{
				console.log("data : "+$td.text());
			//$td.hide();
			$movieDetail.empty();
			$('#detailHead').empty();
			
			$('#detailHead').append('Detail');
			var mydata = data.Search;
			$.each(mydata, function( index, value ) 
			{
				//console.log(value.Title);
				if(value.imdbID==$td.text())
				{
					$movieDetail.append( "<tr><td><h4>" + value.Title+"</h4></td></tr>");
					$movieDetail.append( "<tr><td><img src = '" + value.Poster+"' alt='Sorry No Image' /></td></tr>");
					$movieDetail.append( "<tr><td>" + value.Type+"</td></tr>");
					$movieDetail.append( "<tr><td>" + value.Year+"</td></tr>");
					$movieDetail.append( "<tr><td><a href='http://www.imdb.com/title/" + value.imdbID+"'>IMDB</a></td></tr>");
				}
				else
				{
						//console.log( 'Sorry' );
					}
				});
		}
	});
	})
});



// 		$mytext.delegate('.viewBtn','click',function () 
// 		{
// 		var $td = $(this).closest('td').prev('td').text();
// 		console.log("data DELETE : "+$td);

// 		$.ajax({
// 		type:'GET',
// 		url:'http://localhost:3000/Search/'+$(this).attr('data-id'),

// 		success:function(res) 
// 		{
// 			alert(res);
// 		}
// 	});
// 	})
// });