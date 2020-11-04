@@include('_progressbar.min.js');
@@include('_slick.min.js');
$(document).ready(function () {
	$('.content').children().addClass('_anim-items _anim-show _anim-no-hide');
	@@include('_scroll-animate.js');
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

	// Создаем объекты диаграммы
	var bar = [];
	for(var i = 0; i < 3; i++){
		bar[i] = new ProgressBar.Circle('#skils-'+i, {
		  color: '#81868E',
		  // This has to be the same size as the maximum width to
		  // prevent clipping
		  strokeWidth: 4,
		  trailWidth: 3,
		  trailColor: '#047378',
		  easing: 'easeInOut',
		  duration: 1400,
		  text: {
		    autoStyleContainer: false
		  },
		  from: { color: '#DD4F43', width: 4 },
		  to: { color: '#19BD9A', width: 4 },
		  // Set default step function for all animate calls
		  step: function(state, circle) {
		    circle.path.setAttribute('stroke', state.color);
		    circle.path.setAttribute('stroke-width', state.width);

		    var value = Math.round(circle.value() * 100);
		    if (value === 0) {
		      circle.setText('');
		    } else {
		      circle.setText(value + "<span id='percent'>%<span>");
		    }
		  }
		});
		bar[i].text.style.fontFamily = '"OpenSans-Bold"';
		bar[i].text.style.fontSize = '25px';
	}

	// Делаем фильтрацию
	$(".filter__item").click(function(){
		$(".filter__item").removeClass('active');
		$(this).addClass('active');

		var i = $(this).data('filter');
		if(i == 1){
			$('.portfolio__column').show();
		}else{
			$('.portfolio__column').hide();
			$('.portfolio__column.f_'+i).show();
		}
	});

	// Плавно скрываем/показываем описание для портфолио
	$(".portfolio__column").hover(function(){
		$(this).find('.hoverInfo').fadeIn(200);
	},function() {
		$(this).find('.hoverInfo').fadeOut(200);
	});

	// Создаем объекты скила для блока .team
	var skils = [];
	for(var i = 0; i < 9; i++){
		skils[i] = new ProgressBar.Line('#skils-team-'+i, {
		  strokeWidth: 4,
		  easing: 'easeInOut',
		  duration: 1400,
		  color: '#19bd9a',
		  trailColor: '#e1e4e9',
		  trailWidth: 4,
		  svgStyle: {width: '100%', height: '100%',position: 'absolute',top: '0px'},
		  text: {
		    style: {
		      // Text color.
		      // Default: same as stroke color (options.color)
		      color: '#999',
		      position: 'absolute',
		      right: '0',
		      top: '-18px',
		      fontSize: '16px',
		      padding: 0,
		      margin: 0,
		      transform: null
		    },
		    autoStyleContainer: false,
		  },
		  from: {color: '#19bd9a'},
		  to: {color: '#19bd9a'},
		  step: (state, bar) => {
		    bar.setText(Math.round(bar.value() * 100) + ' %');
		  }
		});
	}

	// Создаем слайдер №1
	$('.slider').slick({
		arrows: false,
		dots: true,
		adaptiveHeight: true
	});

	// Создаем слайдер №2
	$('.slider-testimonial').slick({
		arrows: false,
		dots: true,
		adaptiveHeight: true
	});

	// Создаем слайдер №3
	$('.news-slider').slick({
		arrows: false,
		dots: true,
		appendDots:$('#container-dots'),
		adaptiveHeight: true,
		vertical: true, // Вертикальное положение слайдера
		verticalSwiping: true, // Вертикальный свайп
		responsive:[ // Позволяет задавать брэйкпоинты для слайдера
			{ 
				breakpoint: 768, // Указываем ширину экрана при которой срабатывает брэйкпоинт
				settings: {
					vertical: false, // Вертикальное положение слайдера
					verticalSwiping: false, // Вертикальный свайп
					appendDots: $('.news-slider')
				}
			}
		],
		mobileFirst: false
	});
	
	// Показать/скрыть информацию о тарифах
	$(".price__item").hover(function(){
		$(this).find('.price__label').slideToggle(300);
		$(this).find('.price__content_1').slideUp(300);
		$(this).find('.price__content_2').slideDown(300);
	},function(){
		$(this).find('.price__label').slideToggle(300);
		$(this).find('.price__content_1').slideDown(300);
		$(this).find('.price__content_2').slideUp(300);
	});

	// Подключаю google maps
	let map = new google.maps.Map(document.getElementById("map"), {
    	center: { lat: -34.397, lng: 150.644 },
    	zoom: 8,
  	});

  	// Нажимаю кнопку OK чтоб не мешала
  	setTimeout(function() {
  		$('.dismissButton').click();
  	}, 8000);

  	// Скрыть чёрный фон над картой maps
  	$(".maps__bg").click(function(e){
  		e.stopPropagation();
  		$(this).fadeOut(500);
  	});
});