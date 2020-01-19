//var CursorPlugin = window.WaveSurfer.cursor;
var currentTime = document.getElementById("currentTime");
var duration = document.getElementById("duration");
var test = document.getElementById("test");


var startTime;
var endTime;
var sgTotalTime = 0;


var tagDict = {
	1:{
		Unknown: false,
		NOI: false,
		Bird: false,
		Human: false

	},
	2:{
		Unknown: false,
		NOI: false,
		Bird: false,
		Human: false

	},
	3:{
		Unknown: false,
		NOI: false,
		Bird: false,
		Human: false

	}


};

var tags = document.getElementById("tags");

var btnU = document.getElementById("btnUnknown");
var btnN = document.getElementById("btnNOI");
var btnB = document.getElementById("btnBird");
var btnH = document.getElementById("btnHuman");



var currentPage = 1;
//var canvas = document.getElementById("canvas");

//var ctx = canvas.getContext("2d");

var waveform = document.getElementById("waveform");

var wavesurfer = WaveSurfer.create({
	container: '#waveform',
	waveColor: 'violet',
	progressColor: 'violet',
	barWidth: 2,
	barHeight: 5,
	//scrollParent: true,
	plugins: [
    		WaveSurfer.cursor.create({
		showTime: true,
                opacity: 1,
                customShowTimeStyle: {
                    'background-color': '#000',
                    color: '#fff',
                    padding: '2px',
                    'font-size': '10px'
                	}
      		
    		})
  	]	
});



wavesurfer.load('test3-1.wav');

tags.width = waveform.clientWidth;


wavesurfer.on('ready',function(){
	currentTime.innerHTML = "CURRENT: " + wavesurfer.getCurrentTime().toFixed(1) + " s";
	duration.innerHTML = "DURATION: " + wavesurfer.getDuration().toFixed(1) + " s";
});



wavesurfer.on('audioprocess', function(){
	currentTime.innerHTML = "CURRENT: " + wavesurfer.getCurrentTime().toFixed(1) + " s";
	duration.innerHTML = "DURATION: " + wavesurfer.getDuration().toFixed(1) + " s";

});


wavesurfer.on('interaction',function(){
	currentTime.innerHTML = "CURRENT: " + wavesurfer.getCurrentTime().toFixed(1) + " s";

});

wavesurfer.on('finish',function(){
	document.getElementById("btnPlay").src = "img/PLAY.png";
	

});

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var current_volume = wavesurfer.getVolume();
output.innerHTML = "volume";
slider.value = current_volume*100;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
	let v = this.value/100;
	wavesurfer.setVolume(v);	
	//output.innerHTML = "volume: " + v*100 + "%";
} 



$(window).keypress(function(e) {
  if (e.keyCode == 0 || e.keyCode == 32) {
    btnPlay();
  }
});

//prevent spacebar interacting with tag buttons
document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})


function btnReplay(){
	wavesurfer.play(0);
	document.getElementById("btnPlay").src = "img/pause.png";


}

var firstTimeClick = true;

function btnPlay(){
	if(wavesurfer.isPlaying() == true){
		wavesurfer.pause();
		document.getElementById("btnPlay").src = "img/PLAY.png";
	}
	else{
		 wavesurfer.play();
		document.getElementById("btnPlay").src = "img/pause.png";
	}

	if(firstTimeClick == true){
		startTime = performance.now();
		firstTimeClick = false;
	
	}
	//wavesurfer.playPause();

}



function btnUnknown(){
	if(tagDict[currentPage].Unknown == false){
		

		btnU.setAttribute("style","outline: 3px solid blue");
		tagDict[currentPage].Unknown = true;
	}
	else{
		
		btnU.setAttribute("style","outline: none");
		tagDict[currentPage].Unknown = false;

	}
	
}

function btnNOI(){
	
	if(tagDict[currentPage].NOI == false){
		

		btnN.setAttribute("style","outline: 3px solid blue");
		tagDict[currentPage].NOI = true;
	}
	else{
		
		btnN.setAttribute("style","outline: none");
		tagDict[currentPage].NOI = false;

	}
}

function btnBird(){

	if(tagDict[currentPage].Bird == false){
		

		btnB.setAttribute("style","outline: 3px solid blue");
		tagDict[currentPage].Bird = true;
	}
	else{
		
		btnB.setAttribute("style","outline: none");
		tagDict[currentPage].Bird = false;

	}

}

function btnHuman(){
	
	
	if(tagDict[currentPage].Human == false){
		

		btnH.setAttribute("style","outline: 3px solid blue");
		tagDict[currentPage].Human = true;
	}
	else{
		
		btnH.setAttribute("style","outline: none");
		tagDict[currentPage].Human = false;

	}

}

function btnNext(){
	if(currentPage == 1){
		
		if(tagDict[1].Unknown == false && tagDict[1].NOI == false
			&& tagDict[1].Bird == false && tagDict[1].Human == false){
			alert("Please select at least one tag!");
			return;
			
		}

		endTime = performance.now();
		sgTotalTime += endTime - startTime;
		//wavesurfer.empty();
		wavesurfer.load('test3-2.wav');

		currentTime.innerHTML = "CURRENT: " + wavesurfer.getCurrentTime().toFixed(1) + " s";
		duration.innerHTML = "DURATION: " + wavesurfer.getDuration().toFixed(1) + " s";

		btnU.setAttribute("style","outline: none");
		btnN.setAttribute("style","outline: none");
		btnB.setAttribute("style","outline: none");
		btnH.setAttribute("style","outline: none");

		document.getElementById("btnPlay").src = "img/PLAY.png";

		currentPage = 2;
		firstTimeClick = true;

	}

	else if(currentPage == 2){

		if(tagDict[2].Unknown == false && tagDict[2].NOI == false
			&& tagDict[2].Bird == false && tagDict[2].Human == false){
			alert("Please select at least one tag!");
			return;
			
		}

		endTime = performance.now();
		sgTotalTime += endTime - startTime;
		//wavesurfer.empty();
		wavesurfer.load('test3-3.wav');

		currentTime.innerHTML = "CURRENT: " + wavesurfer.getCurrentTime().toFixed(1) + " s";
		duration.innerHTML = "DURATION: " + wavesurfer.getDuration().toFixed(1) + " s";
		currentPage = 3;

		btnU.setAttribute("style","outline: none");
		btnN.setAttribute("style","outline: none");
		btnB.setAttribute("style","outline: none");
		btnH.setAttribute("style","outline: none");
	
		document.getElementById("btnPlay").src = "img/PLAY.png";


		var btnSubmit = document.getElementById("btnNext");
		btnSubmit.innerHTML = "submit";
		btnSubmit.setAttribute("onclick","submit()");
		firstTimeClick = true;

	
		

	}

	


}


function submit(){
	if(tagDict[3].Unknown == false && tagDict[3].NOI == false
			&& tagDict[3].Bird == false && tagDict[3].Human == false){
			alert("Please select at least one tag!");
			return;
			
	}

	endTime = performance.now();
	sgTotalTime += endTime - startTime;

	var result = JSON.stringify({"sg1":tagDict,"time":sgTotalTime});
	
	localStorage.setItem("segment1",result);
	//download(result, 'segment_json.txt', 'text/plain');
	var a = document.createElement("a");
	a.href = "segment2.html";
	alert("Great job, now let's do another set of segment tagging!");
	a.click();
	//alert("all done!");

}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}















