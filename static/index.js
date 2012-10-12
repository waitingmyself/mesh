$(function(){
	$('a[href="'+$('#key').html()+'"]').parent('li').children().not('ul').css('color','red').wrapInner('<b></b>');
});