

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
					executeCreate(ui.item.value);

				},
				
				source: tags
	});
	

	
	var executeCreate = function(chave)
	{
			var request = $.ajax({
			  url: "/getmsg",
			  type: "GET",
			  data: {key : chave},
			  dataType: "html"
			});
			
			request.done(function(msg) {	
				
				$('#dados_mensagem').val(msg);

			});
	}
	
	
	var inputs = function(type, id, value)
	{
		
		var obj = $('#'+id);
		
		if (obj.length == 0)
		{
			template = '<div class="labelForm"> '+ value +'</div> <input class="entrada" type="'+type+'" id="'+id+'" autocomplete="off"></br>';
			return $(template);
		} 
		else
		{
			return false;
		}
	}


	var getObj = function()
	{
		var obj = $('.obj').html();
		
		console.log(obj);

		
		//console.log(obj);
				
		var filter = obj.match(/\[.*?\]/g);

		var filters = new Array;
		for(var i = 0 ; i < filter.length ; i++)
		{
			var regex = filter[i].replace(/(\[|\])/g, '' );
			var rel = regex.split("=");	
			obj1 = $('.obj').html();		
			//console.log(obj1);
			newobj = obj1.replace(filter[i], '<a href="#" class="'+ rel[0] +'" rel="tooltip" title="'+rel[0]+'">@'+ rel[0] +'</a>');
			$('.obj').html(newobj);
			
			
			filters[i] =  filter[i].split("=");	
		}
		
		
		
		return filters;
		
	}
	
	
	var start = function()
	{
		
		var lista = $('.lista');
		
		if (lista.length > 0)
		{
			$(lista).remove();
		}	
		
		
		obj = getObj().reverse();
		
		
		//console.log(obj);


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
		
		
	 $('.entrada:first').focus();
		
		
	}
	

	var show = function(obj, key)
	{
		keyvar = $('#auto').val();
		
		//console.log('valor do input au entrar na funcao show' + keyvar);
		//console.log('valor da key quando entra na funcao' + key);

		var divWell = '<div class="wrapper well" rel="'+ key +'"> </div>';
		

		obj = obj.replace(/\n/g,'<br/>')
		
		key = $('.wrapper').attr('rel');
		//console.log('valor da key com passada ao attributo html' + key);
		
	
		var well = $('.wrapper');
		
		//console.log("objeto well" + well);
		
		
		var total = well.length;
		
		if (total = 0 || total !== undefined || keyvar !== key)
		{
			//console.log('keyvar diferente de key');	
			$(well).remove();
			//console.log('tamanho de well = ' + well.length);	
			
			$(divWell).appendTo('#container');

			objeto = '<hr><div class="obj" id="mensagem_geral"></div><hr>';
			
		
			
			$(objeto).appendTo('.wrapper');
			
			$('#mensagem_geral').html(obj);
			
			var editar = '<div class="btn editar pull-right" rel="'+keyvar+'"> Editar </div><br>';

			$(editar).prependTo('.wrapper');
			
			
			
			editarHelps();
			
			
			
			start();
			
			
			$(".entrada").focus(function () {
			        var id = $(this).attr('id');
					$('.'+id).tooltip('show');
				
			    });
			
				$(".entrada").focusout(function () {
				        var id = $(this).attr('id');
						$('.'+id).tooltip('hide');

				    });
			
			
			$('.entrada, #auto').keyup(function(){
				
				if (event.which == 13 || event.which == 40) 
					{
						console.log('pra baixo pra baixo');
						$(":input:eq(" + ($(":input").index(this) + 1) + ")").focus();
					} 
					else if(event.which == 38)
					{
						console.log('pra cima');
						$(":input:eq(" + ($(":input").index(this) - 1) + ")").focus();
					}
					else
					{
						var entrada = $(this).val();
						var id = $(this).attr('id');

						$('.'+id).text(entrada);
						
					}

			
			});
			
			$('.entrada').keydown(function()
			{
				if (event.which == 91) 
					{
						selectText('mensagem_geral');
					}
					
		
					
			});
			
		
			
			
		}
		

	}
	
	
	var executa = function(standart, mode)
	{
		
		toReturn = new Array();
		
		if(standart == undefined)
		{
			//console.log('standart undefined');	
			var keyvar = $('#auto').val();
			
		}
		else 
		{
			//console.log('standart definido');	
			var keyvar = standart;
		}

		//console.log("value do input inicial = " + keyvar)

		var request = $.ajax({
		  url: "/getmsg",
		  type: "GET",
		  data: {key : keyvar},
		  dataType: "html"
		});	


			request.done(function(msg) {
				show(msg, keyvar);
			});
			

	}
	
	$('#form-home').submit(function()
	{
		
		executa();
		
		return false;

	});
	
	
	
	$('.itemlista').live('click', function()
	{
		var key = $(this).text();
		
		executa(key);
		
		$('#auto').val(key);
		
	});
	

	var copy = function (meintext) {  
	if (window.clipboardData)   
	     window.clipboardData.setData("Text", meintext);  
	else if (window.netscape) {  
	     netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');  
	     var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);  
	     if (!clip)  
	          return false;  
	     var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);  
	     if (!trans)  
	          return false;  
	     trans.addDataFlavor('text/unicode');  
	     var str = new Object();  
	     var len = new Object();  
	     var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);  
	     str.data=meintext;  
	     trans.setTransferData("text/unicode",str,meintext.length*2);  
	     var clipid=Components.interfaces.nsIClipboard;  
	     if (!clipid)  
	          return false;  
	     clip.setData(trans,null,clipid.kGlobalClipboard);  
	}  
	     return false;  
	}
	
	
	$('#btn-novo').click(function()
	{	
		var autovalue = $('#auto').val();
		
		if(!autovalue.length == 0)
		{
			var key = 'key=' + autovalue;
		}
		
		window.location.href = "/create?" + key;
		
	});
	
	
	
	var editarHelps = function()
	{
		$('.editar').click(function()
		{
			var id = $(this).attr('rel');
			window.location.href = encodeURI("/create?key=" + id);

		});
		
	}
	
	
	editarHelps();
	
	
	var getParse = function(name, opt)
	{
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		
			if(opt == 1 && results != null)	
			{
				var parse = results[0].split("=");
				
				if (parse[0].replace('&', '') == name)
					return true;
					else
					return false;
			} 
			else
			{
				if( results == null )
 					return "";
 				else
					return results[1];
			}
	}
	
	
	
	if(getParse('key'))
	{
		executeCreate(decodeURI(getParse('key')));
		
		$('#dados_titulo').val(decodeURI(getParse('key')));
		$('#dados_real').val(decodeURI(getParse('key')));
		
		
	}
	
	
	
	$('#dados_titulo').keyup(function()
	{

		var content = $(this).val();
		
		$('#dados_real').val(content);
	});
	

	
	
	$('.excluir').click(function()
	{
		var $this = $(this);
		
		
		$('#confirm-delete').modal('show');
		
		$('.fechar-delete').click(function()
		{
			$('#confirm-delete').modal('hide');
		});
		
		$('.delete-master').click(function()
		{
			
			
			var key = $this.attr('rel');
			var linha = $('tr[linha="'+key+'"]');

			var request = $.ajax({
				url: "/del",
			  	type: "GET",
				data: {key : key},
				dataType: "html"
				});

				request.done(function(msg) {	
					console.log(msg);
					if(msg == 'ok')
					{
						$(linha).fadeOut('slow');

					}

				});	
			
			
		$('#confirm-delete').modal('hide');
		});
		
	

	});
	

	
	
	
	function selectText(element) {
	    var doc = document;
	    var text = doc.getElementById(element);    

	    if (doc.body.createTextRange) { // ms
	        var range = doc.body.createTextRange();
	        range.moveToElementText(text);
	        range.select();
	    } else if (window.getSelection) { // moz, opera, webkit
	        var selection = window.getSelection();            
	        var range = doc.createRange();
	        range.selectNodeContents(text);
	        selection.removeAllRanges();
	        selection.addRange(range);
	    }
	}
	
	
	
});	


	

