//console.log("html: " + document.documentElement.currentStyle.fontSize);
// console.log("body: " + getComputedStyle(document.body).fontSize);
// console.log("wraper:   " + getComputedStyle(wraper).fontSize);
// console.log("thenav:   " + getComputedStyle(thenav).fontSize);
// console.log(".content: " + getComputedStyle(document.querySelector(".content")).fontSize);
// console.log("thenav h2:      " + getComputedStyle(document.querySelector("#thenav h2")).fontSize);
// console.log("thenav h2 span: " + getComputedStyle(document.querySelector("#thenav h2 span")).fontSize);
// console.log(document.documentElement.clientHeight);


window.addEventListener("scroll", function() {
	//*	создаю и выношу наверх все переменные
	//*	чтобы они не создавались в цыкле
	var elementChild, link, linkId, marTop, marBot;
	var linkIdCoord, documentHeight, linkHref;
	if(document.documentElement.clientWidth > 740) {
		//* делаем проверку на мобильное устройство
		//*	проверка сделана для того, чтобы добавить классы pc
		//*	для моб. устройств добавляются свои классы в javascriptmobile.js
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false) {
			//*	меняем поведение шапки меню
			//*	добавляем классы для position:fixed для меню
			//* и класс margin блоку #block1 для отступа
			//*	когда #block1 приближается к верху браузера ближе 50px

			if(block1.getBoundingClientRect().top < 50) {
				thenav.className = "fixed";
				block1.className = "marginTop";
			} else {
				thenav.className = "";
				block1.className = "";
			}
		}

		//* подсветка якоря меню при скролле
		//* создаем массыв тегов a которые имеют атрибут href^='#'
		elementChild = document.querySelectorAll("#thenav nav a[href^='#']");

		//*	потом перебираем массив в цыкле
		for(var i = 0; i < elementChild.length; i++) {
			//*	беру значение в href тега и
			//* нахожу элементы по id, присваиваю в linkId
			link = elementChild[i].getAttribute('href');
			linkId = document.querySelector(link);
			//console.log(linkId);
			//console.log(link);
			//console.log(link !== "#block5");

			//*	проверяю, есть ли по такому id элемент
			if (linkId !== null && link !== "#block5") {
				//*	определяю маргины элемента
				//*	маргины элемента относятся до самого элемента!
				marTop = parseInt(getComputedStyle(linkId).marginTop);
				marBot = parseInt(getComputedStyle(linkId).marginBottom);
				//*	присваиваю в переменную координаты всех элементов
				//* они все проходятся по цыклу
				linkIdCoord = linkId.getBoundingClientRect();
				//*	определяю высоту видимого экрана
				documentHeight = document.documentElement.clientHeight;

				//*	если верхняя координата элемента имеет меньшее значение,
				//*	чем размер половины высоты выдимой части браузера
				//*	плюс верхний маргин элемента
				//* И если нижняя координата элемента имеет большее значение,
				//*	чем размер половины высоты выдимой части браузера
				//*	плюс нижний маргин элемента.
				//*	когда верхняя часть элемента заходит за середину экрана,
				//*	то находится a с таким якорем и этой a присваивается класс scroll
				if(linkIdCoord.top <= (documentHeight / 2) + marTop && linkIdCoord.bottom >= (documentHeight / 2) + marBot) {
					linkHref = linkId.getAttribute('id');
					document.querySelector("a[href='#" + linkHref + "']").classList.add("scroll");
					//console.log(document.querySelector("a[href='#" + linkHref + "']"));
				}  else {
					//* удаляем класс scroll, если 
					//*	елемент уходит с области видимости экрана
					if(elementChild[i].classList.contains("scroll")) {
						elementChild[i].classList.remove("scroll");
					}
				}
			}
		}
	}	// end if(document.documentElement.clientWidth)
});	// end function scroll


function scrollToId(scrollId) {
document.querySelector(scrollId).addEventListener("click", function(event) {

	function animationScroll(timeScroll) {
		//	timeScroll
		//	время движения скролла(ms) от начального положения до конечного 

		// количество кадров в секунду
		var fps = 50;
		//	шаг временого повторения скролла (1 кадр за 20ms, 50 кадров за 1000ms)
		//*	количество кадров в одной секунде не меняется!
		var timeInterval = 1000 / fps;
		//	шаг повторения скролла относительно координат
		//*	меняется шаг, размер координаты. Относительно linkId
		var coordInterval = linkId.getBoundingClientRect().top / (fps * timeScroll / 1000);
		//console.log(coordInterval);

		//	анимация при помощи setInterval
		//*	запускаем с интервалом времени timeInterval 1s/fps
		//* и интервалом координаты coordInterval
		//*	так же присваиваем timerId setInterval чтобы потом обнулить
		var timerId = setInterval(function() {
			window.scrollBy(0, coordInterval);
		}, timeInterval);

		//	отмена анимации через указанное время timeScroll
		setTimeout(function() {
			//*	сбрасываем таймер setInterval
		 	clearInterval(timerId);
		 	//*	подганяем наш элемент под верх видимой области браузера
			linkId.scrollIntoView();

			if(linkId === document.body) {
				window.scrollTo(0, 0)
			}
		}, timeScroll);
	}

	event.preventDefault();

	//console.log(event.target.parentElement.getAttribute('href') === "#top");
	//console.log(event.target.parentElement.hasAttribute("href"));

	//if (event.target.nodeName != 'A') return;

	//*	берем значение атрибута href элемента на который мы нажали
	var link = event.target.getAttribute('href');
	var linkId;
	//*	эти 3 стрчки кода не универсальны
	//*	они для того, если мы нажали на a с классом logo (наш логотип)
	var classLogo = event.target.getAttribute('class');
	var PrClassLogo = event.target.parentElement.getAttribute('class');
	var PrPrClassLogo = event.target.parentElement.parentElement.getAttribute('class');

	if(classLogo === "logo") {
		linkId = document.body;
	} else if(PrClassLogo === "logo") {
		linkId = document.body;
	} else if(PrPrClassLogo === "logo") {
		linkId = document.body;
	} else {
		//*	вот наше самое важное присваивание id в переменную linkId
		//*	и находим элемент с таким id
		linkId = document.querySelector(link);
	}

	//*	это важно, если нет элемента с таким id, то выключаем обработчик
	if(linkId === null) {
		return;
	}

//*	меняя значения внутри animationScroll() меняется скороть скролла
	animationScroll(700);
});
}
scrollToId("#thenav .logo");
scrollToId("#thenav nav");
scrollToId("#block1 a");


//*	ставим обработчик click на элемент меню A
//*	он срабатывает, если ширина экрана меньше 740px
//*	чтобы при нажатии на кнопку меню само меню закрывалось
document.querySelector("#thenav nav").addEventListener("click", function(event) {
	if (document.documentElement.clientWidth < 740) {
		//*	завершаем выполнение обработчика, если click был не на A
		if(event.target.nodeName !== "A") return;
		formenu.checked = false;
	}
});




//	*********** валидация формы ***********

function validationForm(elementWay) {
	//* находим форму
	var form = document.querySelector(elementWay);
	//* находим input
	var input = form.elements;
	//* input type reset
	var inputsClass;
	//*	создаем массив input type
	var inputType = ["text", "password", "email", "tel", "number"];
	//*	создаем массив input name
	var inputName = ["name", "company", "pass", "mail", "tel"];

	form.addEventListener("blur", function(event) {
		//* переменные для регулярных выражений
		var reg;
		var regName = /\w+/g;
		var regTel = /\d+[-_ ]*/g;
		var regMail = /^[a-zA-Z0-9!$*-=^`|~#%'+?_]+@[a-zA-Z0-9]+.[a-z]+$/;

		if (inputType.indexOf(event.target.type) === -1) {
			return;
		} else if (inputName.indexOf(event.target.name) === 0 ||
			inputName.indexOf(event.target.name) === 1) {
			reg = regName;
		} else if (inputName.indexOf(event.target.name) === 4) {
			reg = regTel;
		} else if (inputName.indexOf(event.target.name) === 3) {
			reg = regMail;
		}

		if(!reg.test(event.target.value) && event.target.value) {
			if(event.target.classList.contains("validate")) {
				event.target.classList.remove("validate");
			}
			event.target.classList.add("novalidate");
		} else if(!event.target.value) {
			if(event.target.classList.contains("novalidate")) {
				event.target.classList.remove("novalidate");
			}
			if(event.target.classList.contains("validate")) {
				event.target.classList.remove("validate");
			}
		} else {
			if(event.target.classList.contains("novalidate")) {
				event.target.classList.remove("novalidate");
			}
			event.target.classList.add("validate");
		}
	});

	form.addEventListener("submit", function(event) {
		for (var i = 0; i < input.length; i++) {
			inputsClass = input[i].classList;

			if (inputsClass.contains("novalidate")) {
				event.preventDefault();
				return;
			} else if (!input[i].value) {
				inputsClass.add("novalidate");
				input[i].value = "Fill out the field";
				event.preventDefault();
				return;
			}
		}
	});

	form.addEventListener("focus", function(event) {
		if (event.target.type === "reset") {
			for (var i = 0; i < input.length; i++) {
				inputsClass = input[i].classList;

				if (inputsClass.contains("novalidate")) {
					inputsClass.remove("novalidate");
				}
				if (inputsClass.contains("validate")) {
					inputsClass.remove("validate");
				}
			}
		} else if (inputType.indexOf(event.target.type) === -1) {
			return;
		}

		if (event.target.value === "Fill out the field") {
			event.target.classList.remove("novalidate");
			event.target.value = "";
		
			if (event.target.classList.contains("validate")) {
				event.target.classList.remove("validate");
			}
		}
	}, true);
}
validationForm("#block5 form");
validationForm("#block6 form");


