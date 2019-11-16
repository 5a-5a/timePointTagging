//var CursorPlugin = window.WaveSurfer.cursor;
var currentTime = document.getElementById("currentTime");
var duration = document.getElementById("duration");
var test = document.getElementById("test");

var margin = 20;
var tag_h = 20;
var tag_w = 70;


var t1 = new Tag("unknown",currentTime,250);
var t2 = new Tag("unknown",currentTime,280);
var t3 = new Tag("unknown",currentTime,350);
var t4 = new Tag("unknown",currentTime,380);

var tagList = [];

var tags = document.getElementById("tags");

var currentTag = document.getElementById("btnDelete");
//var canvas = document.getElementById("canvas");

//var ctx = canvas.getContext("2d");

var waveform = document.getElementById("waveform");

var wavesurfer = WaveSurfer.create({
	container: '#waveform',
	waveColor: 'violet',
	progressColor: 'purple',
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



wavesurfer.load('test1.wav');

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

function btnReplay(){
	wavesurfer.play(0);
	document.getElementById("btnPlay").src = "img/pause.png";


}

function btnPlay(){
	if(wavesurfer.isPlaying() == true){
		wavesurfer.pause();
		document.getElementById("btnPlay").src = "img/PLAY.png";
	}
	else{
		 wavesurfer.play();
		document.getElementById("btnPlay").src = "img/pause.png";
	}

	//wavesurfer.playPause();

}

function btnBackward(){
	wavesurfer.skip(-5);
}

function btnForward(){
	wavesurfer.skip(5);
	
}

function btnUnknown(){
	
	let currentTime = wavesurfer.getCurrentTime();
	let totalTime = wavesurfer.getDuration();
	let x = (currentTime/totalTime) * tags.width;
	
	var t = new Tag("Unknown",currentTime, x,"#4EC5DB");

	addTagBtn(t);
	//alert(tagList[0].pos_x);
	//drawTags();
	

	//ctx.rect(x,20,50,20);
	//ctx.stroke();
}

function btnNOI(){
	let currentTime = wavesurfer.getCurrentTime();
	let totalTime = wavesurfer.getDuration();
	let x = (currentTime/totalTime) * tags.width;
	
	var t = new Tag("   NOI",currentTime,x,"#EE6B6C");
	addTagBtn(t);
	//tagList.push(t);
	//alert(tagList[0].pos_x);
	//drawTags();
}

function btnBird(){
	let currentTime = wavesurfer.getCurrentTime();
	let totalTime = wavesurfer.getDuration();
	let x = (currentTime/totalTime) * tags.width;
	
	var t = new Tag("    Bird",currentTime,x,"#F8DD62");
	addTagBtn(t);
	//tagList.push(t);
	//alert(tagList[0].pos_x);
	//drawTags();

}

function btnHuman(){
	let currentTime = wavesurfer.getCurrentTime();
	let totalTime = wavesurfer.getDuration();
	let x = (currentTime/totalTime) * tags.width;
	
	var t = new Tag(" Human",currentTime,x,"#4FBE95");
	addTagBtn(t);
	//alert(tagList[0].pos_x);
	//drawTags();

}

function Tag(name, time, pos_x, colour ){
	this.name = name;
	this.time = time;
	this.pos_x = pos_x;
	this.pos_y = 20;
	this.colour = colour;
	this.btn = document.createElement("BUTTON");
	this.btn.innerHTML = name;
	this.btn.setAttribute("onclick","btnTagClick(this)");
	this.btn.addEventListener("focusout",function(){
		//alert("focsout");
		currentTag = document.getElementById("btnDelete");
	});
	//this.btn.setAttribute("style","height:"+tag_h+ "px;"+ "width:" +tag_w + "px");
}


function btnTagClick(element){
	currentTag = element;

}

function btnDelete(){
	
	for(i=0;i<tagList.length;i++){
		if(currentTag == tagList[i].btn){
			//alert("found");
			tagList.splice(i,1);
			break;		
		}
	}
	tags.innerHTML = "";
	//alert("emptied");
	var newList = [];
	newList = tagList;
	tagList = [];
	for(i=0;i<newList.length;i++){
		addTagBtn(newList[i]);
	}

}


function addTagBtn(tag){
	
	
	//tag.btn.setAttribute("style","position:absolute;font-size:20px;" 
	//		+"color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:0px");
	//tags.appendChild(tag.btn);
	//alert(tag.pos_x);

	//check if tagList is empty
	if(tagList.length != 0){
		let tempList = [];

		for(i=0; i<tagList.length; i++){
			//check any overlaps
			if((tag.pos_x >= tagList[i].pos_x && tag.pos_x <= tagList[i].pos_x + tag_w)
				||(tag.pos_x + tag_w >= tagList[i].pos_x && tag.pos_x + tag_w <= tagList[i].pos_x + tag_w)
			){
				tempList.push(tagList[i]);


			}

		}
		
		//no overlapping
		if(tempList.length == 0){
			tag.btn.setAttribute("style","background:url(img/frame.png);position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:0px;" + "height:"+tag_h+ "px;"+ "width:" +tag_w + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);

		}

		//only one overlapped
		if(tempList.length  == 1){
			tag.btn.setAttribute("style","background:url(img/frame.png);position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:" + tag_h+ "px;" + "height:"+tag_h+ "px;"+ "width:" +tag_w + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);

		}

		if(tempList.length == 2){
			
			//check these two are overlapped
			if(((tempList[0].pos_x >= tempList[1].pos_x) && (tempList[0].pos_x <= tempList[1].pos_x + tag_w))
				||(tempList[1].pos_x >= tempList[0].pos_x && tempList[1].pos_x <= tempList[0].pos_x + tag_w)
			){
				//alert("overlapped");
				tag.btn.setAttribute("style","background:url(img/frame.png);position:absolute;background-color:" +tag.colour + ";left:" + 		tag.pos_x + "px;" + "bottom:" + 2*tag_h+ "px;" + "height:"+tag_h+ "px;"+ "width:" +tag_w + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);

			}
			
			//not overlapped
			else{
				//alert("not overlapped");
				tag.btn.setAttribute("style","background:url(img/frame.png);position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:" + tag_h+ "px;" + "height:"+tag_h+ "px;"+ "width:" +tag_w + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);
			}

		}

		if(tempList.length ==3 || tempList.length == 4){
			tag.btn.setAttribute("style","background:url(img/frame.png);position:absolute;background-color:" +tag.colour + ";left:" + 		tag.pos_x + "px;" + "bottom:" + 2*tag_h+ "px;" + "height:"+tag_h+ "px;"+ "width:" +tag_w + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);

		}

		//alert(tempList.length +  " objects overlapped");
		


	}
	//if tagList is empty, add to the list
	else{
		
		tag.btn.setAttribute("style", "background:url(img/frame.png);position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:0px;" + "height:"+tag_h+ "px;"+ "width:" +tag_w + "px");
		//tag.btn.style += "position:absolute;" 
		//	+"color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:0px";
		tags.appendChild(tag.btn);
		tagList.push(tag);

	}
	

}




function drawTags(){
	test.innerHTML = "";
	//ctx.save();
	//ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.restore();
	//ctx.beginPath();
	var drawnList = [];
	if(tagList.length != 0){
		
		if(drawnList.length == 0){
		//draw the first tag
		ctx.beginPath();
		ctx.moveTo(tagList[0].pos_x,0);
		ctx.lineTo(tagList[0].pos_x,margin);
		ctx.rect(tagList[0].pos_x, margin, tag_w, tag_h);
		ctx.stroke();
		ctx.closePath();
		ctx.font = "14px Arial";
		ctx.fillStyle = tagList[0].colour;
		ctx.fillText(tagList[0].name, tagList[0].pos_x, margin+15); 
		drawnList.push(tagList[0]); //add the first tag to the drawn list
		}

		for(i = 1; i < tagList.length; i++){
			let isDrawn = false;
			for(n = 0; n < drawnList.length; n++){
				if(tagList[i].pos_x >= drawnList[n].pos_x 
					&& tagList[i].pos_x <= (drawnList[n].pos_x + tag_w)){
					
					//tagList[i].pos_y += 20; 
					ctx.beginPath();
					ctx.moveTo(tagList[i].pos_x,0);
					ctx.lineTo(tagList[i].pos_x,margin);
					ctx.rect(tagList[i].pos_x, margin+20, tag_w, tag_h);
					ctx.stroke();
					ctx.closePath();
					ctx.font = "14px Arial";
					ctx.fillStyle = tagList[i].colour;
					ctx.fillText(tagList[i].name, tagList[i].pos_x, margin+35); 
					isDrawn = true;
					break;
					
					
				}
				else{
				
				}
			
				

			}
			if(isDrawn == false){
			ctx.beginPath();
			ctx.moveTo(tagList[i].pos_x,0);
			// End point (180,47)
			ctx.lineTo(tagList[i].pos_x,margin);
			ctx.rect(tagList[i].pos_x, margin, tag_w, tag_h);
			ctx.stroke();
			ctx.closePath();
			ctx.font = "14px Arial";
			ctx.fillStyle = tagList[i].colour;
			ctx.fillText(tagList[i].name, tagList[i].pos_x, margin+15); 
			}


			drawnList.push(tagList[i]);
			

		}

		
			





	
	}
	

}

