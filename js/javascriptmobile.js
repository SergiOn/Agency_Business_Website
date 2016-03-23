//*	делаем проверку на обнаружение мобильного телефона && планшета
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent);
    //alert(document.documentElement.clientWidth);

window.addEventListener("scroll", function() {
	//*	на этом сайте меню фиксируется при ширине экрана больше 740px
	//*	то есть на телефон вызывать обработчик не имеет смысла
	//*	а будет он запускаться на планшетах в которых ширина экрана >740px
	//*	на компьютерах запускаться не будет!
	if (document.documentElement.clientWidth > 740) {
		//	здесь реализовано убрать :hover эфект при скролле
		//*	создаю массив элементов с a
		var link = document.querySelectorAll("#thenav nav li a");
		//console.log(link.length);

		//*	перебираю массив в цыкле
		for(var i = 0; i < link.length; i++) {
			//console.log(link[i]);
			
			if(!link[i].classList.contains("scroll")) {
				link[i].classList.add("nohover");
			} else {
				link[i].classList.remove("nohover");
			}
		}

		// здесь реализуем добавление класса для моб. устройств
		//* чтобы убрать ненужные свойства в элементе
		if(block1.getBoundingClientRect().top < 50) {
			//alert("fixedmob");
			thenav.className = "fixedmob";
			block1.className = "marginTop";
		} else {
			thenav.className = "";
			block1.className = "";
		}


	}//	end if (document.documentElement.clientWidth > 740)
});







} /* end "if test(navigator.userAgent)" */













