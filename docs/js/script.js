$(document).ready(function () {
	// Превращаем картинки из img в background-image для родителя
	function ibg(){ // Копируем в свой js файл и не забываем про стили ниже их тоже копируем
		let ibg=document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if(ibg[i].querySelector('img')){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
			}
		}
	}
	ibg();
	
	// Для работы бургер - меню
	$(".header__burger").click(function(){
		$(".header__burger,.header__menu").toggleClass('active');
		$('body').toggleClass('lock');
	});

	// Для корректного отображения в IE
	$(window).resize(function(){
		mainblock();
	});

	function mainblock() { 
		var h = $(window).outerHeight();
		$('.mainblock').css('min-height', h);
	}
	mainblock();

	// Делаем параллакс эффект. Фоновая картинка прокручивается медленнее
	$(window).scroll(function(){
	 	var s = 0 - $(this).scrollTop() / 3;
	 	$('.mainblock__image').css('transform', 'translate3d(0, '+s+'px, 0)');
	 });

	// Плавный скролл к блоку .content
	$("a.goto").click(function(e){
		e.preventDefault();
		var id = $(this).attr('href');
		var top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1000);
	});
});