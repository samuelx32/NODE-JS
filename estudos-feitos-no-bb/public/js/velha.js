
var l1c1 = "a", l1c2 = "d", l1c3 = "g";
var l2c1 = "b", l2c2 = "e", l2c3 = "h";
var l3c1 = "c", l3c2 = "f", l3c3 = "i";

var i = 0;
var play2 = "<svg xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-balloon-heart-fill' viewBox='0 0 16 16'> <path fill-rule='evenodd' d='M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z'/> </svg>";
var play1 = "<svg xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-bug-fill' viewBox='0 0 16 16'> <path d='M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z'/> <path d='M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z'/></svg>";


function resultado(){
	if(i % 2 == 0){
		alert("Fim de Jogo, o Jogador 2 venceu!!!");
	}else{
		alert("Fim de Jogo, o Jogador 1 venceu!!!");
	}
}

function verifica(){
	if(l1c1 == l1c2 && l1c2 == l1c3){
		resultado();
	}else if(l2c1 == l2c2 && l2c2 == l2c3){
		resultado();
	}else if(l3c1 == l3c2 && l3c2 == l3c3){
		resultado();
	}else if(l1c1 == l2c1 && l2c1 == l3c1){
		resultado();
	}else if(l1c2 == l2c2 && l2c2 == l3c2){
		resultado();
	}else if(l1c3 == l2c3 && l2c3 == l3c3){
		resultado();
	}else if(l1c1 == l2c2 && l2c2 == l3c3){
		resultado();
	}else if(l3c1 == l2c2 && l2c2 == l1c3){
		resultado();
	}else if(i == 9){
		alert("Empatou!!!");
	}
}

function bloco1(){
	i++;
	if(i % 2 == 0){
		l1c1 = play2;
	}else{
		l1c1 = play1;
	}
	document.getElementById('bloco1').innerHTML = '<p>'+l1c1+'</p>';
	
	verifica();
}

function bloco2(){
	i++;
	if(i % 2 == 0){
		l2c1 = play2;
	}else{
		l2c1 = play1;
	}
	document.getElementById('bloco2').innerHTML = '<p>'+l2c1+'</p>';
		
	verifica();	
}

function bloco3(){
	i++;
	if(i % 2 == 0){
		l3c1 = play2;
	}else{
		l3c1 = play1;
	}
	document.getElementById('bloco3').innerHTML = '<p>'+l3c1+'</p>';
	
	verifica();
}

function bloco4(){
	i++;
	if(i % 2 == 0){
		l1c2 = play2;
	}else{
		l1c2 = play1;
	}
	document.getElementById('bloco4').innerHTML = '<p>'+l1c2+'</p>';
	
	verifica();
}

function bloco5(){
	i++;
	if(i % 2 == 0){
		l2c2 = play2;
	}else{
		l2c2 = play1;
	}
	document.getElementById('bloco5').innerHTML = '<p>'+l2c2+'</p>';
	
	verifica();
}

function bloco6(){
	i++;
	if(i % 2 == 0){
		l3c2 = play2;
	}else{
		l3c2 = play1;
	}
	document.getElementById('bloco6').innerHTML = '<p>'+l3c2+'</p>';
	
	verifica();
}

function bloco7(){
	i++;
	if(i % 2 == 0){
		l1c3 = play2;
	}else{
		l1c3 = play1;
	}
	document.getElementById('bloco7').innerHTML = '<p>'+l1c3+'</p>';
	
	verifica();
}

function bloco8(){
	i++;
	if(i % 2 == 0){
		l2c3 = play2;
	}else{
		l2c3 = play1;
	}
	document.getElementById('bloco8').innerHTML = '<p>'+l2c3+'</p>';
	
	verifica();
}

function bloco9(){
	i++;
	if(i % 2 == 0){
		l3c3 = play2;
	}else{
		l3c3 = play1;
	}
	document.getElementById('bloco9').innerHTML = '<p>'+l3c3+'</p>';
	
	verifica();
}