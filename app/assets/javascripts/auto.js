

$(document).ready(function(){
	//
	$( "#auto" ).autocomplete({
		
				
				select: function(event, ui) 
				{ 
					executa(ui.item.value);
				},
				
				source: tags
	});
	//-
	$( "#dados_titulo" ).autocomplete({
		
				
				select: function(event, ui) 
				{ 
					var request = $.ajax({
					  url: "/getmsg",
					  type: "GET",
					  data: {key : ui.item.value},
					  dataType: "html"
					});
					
					request.done(function(msg) {	
						
						$('#dados_mensagem').val(msg);

					});

				},
				
				source: tags
	});
	

	
	
	var inputs = function(type, id, value)
	{
		
		var obj = $('#'+id);
		
		if (obj.length == 0)
		{
			template = '<input class="entrada" type="'+type+'" id="'+id+'" value="'+value+'"></br>';
			return $(template);
		} 
		else
		{
			return false;
		}
	}


	var getObj = function()
	{
		var obj = $('.obj').text();
		
		console.log(obj);
				
		var filter = obj.match(/\[.*?\]/g);

		var filters = new Array;
		for(var i = 0 ; i < filter.length ; i++)
		{
			var regex = filter[i].replace(/(\[|\])/g, '' );
			var rel = regex.split("=");	
			obj1 = $('.obj').html();		
			console.log(obj1);
			newobj = obj1.replace(filter[i], '<a href="#" class="'+ rel[0] +'" rel="tooltip" title="'+rel[0]+'">@'+ rel[0] +'</a>');
			$('.obj').html(newobj);
			
			
			filters[i] =  filter[i].split("=");	
		}
		
		
		return filters;
		
	}
	
	
	var start = function()
	{
		obj = getObj().reverse();
		
		
		console.log(obj);

		
		for(var i =0; i < obj.length; i++)
		{
			var value = obj[i][0].replace('[', '');
			var id = value.split("_");
			
			var text = obj[i][1].replace(']', '');

			$(inputs(text,id[0],value)).prependTo('.wrapper');	
			

			
			
		}
		
		
			$("a[rel=popover]").popover();
			$(".tooltip").tooltip();
			$("a[rel=tooltip]").tooltip();
		
		
	
		
		
	}
	

	var show = function(obj, key)
	{
		keyvar = $('#auto').val();
		
		console.log('valor do input au entrar na funcao show' + keyvar);
		console.log('valor da key quando entra na funcao' + key);

		var divWell = '<div class="wrapper well" rel="'+ key +'"> </div>';

		key = $('.wrapper').attr('rel');
		console.log('valor da key com passada ao attributo html' + key);
		
	
		var well = $('.wrapper');
		
		console.log("objeto well" + well);
		
		
		var total = well.length;
		
		if (total = 0 || total !== undefined || keyvar !== key)
		{
			console.log('keyvar diferente de key');	
			$(well).remove();
			console.log('tamanho de well = ' + well.length);	
			
			$(divWell).appendTo('.container');

			objeto = '<div class="obj"> ' + obj + '</div>';
			

			$(objeto).appendTo('.wrapper');
			
			start();
			
			
			$(".entrada").focus(function () {
			        var id = $(this).attr('id');
					$('.'+id).tooltip('show');
				
			    });
			
				$(".entrada").focusout(function () {
				        var id = $(this).attr('id');
						$('.'+id).tooltip('hide');

				    });
			
			
			$('.entrada').keyup(function(){
				var entrada = $(this).val();
				var id = $(this).attr('id');
				$('.'+id).text(entrada);
					
		
			
			})
			
			
		}
		

	}
	
	
	var executa = function(standart, mode)
	{
		
		toReturn = new Array();
		
		if(standart == undefined)
		{
			console.log('standart undefined');	
			var keyvar = $('#auto').val();
			
		}
		else 
		{
			console.log('standart definido');	
			var keyvar = standart;
		}

		console.log("value do input inicial = " + keyvar)

		var request = $.ajax({
		  url: "/getmsg",
		  type: "GET",
		  data: {key : keyvar},
		  dataType: "html"
		});	



		if (!mode == 'get')
		{
				
			request.done(function(msg) {
				show(msg, keyvar);
			});
			
		}
		else
		{
			
			request.done(function(msg) {	
				toReturn.push(msg);
				
			});
			
		}
		
		
		alert(toReturn);
		
		return toReturn;
	
	
	}
	
	$('#form-home').submit(function()
	{
		
		executa();
		
		return false;

	});
	
	
	
});	


	

