//var CursorPlugin = window.WaveSurfer.cursor;
var currentTime = document.getElementById("currentTime");
var duration = document.getElementById("duration");
var test = document.getElementById("test");

var tag_h = 20;
var tag_w = 70;

var c_blue = "#4EC5DB";
var c_red = "#EE6B6C";
var c_yellow = "#F8DD62";
var c_green = "#4FBE95";

var tagList = [];

var tags = document.getElementById("tags");

var currentBtn = document.getElementById("btnBird");
currentBtn.setAttribute("style","outline: 2px dashed blue");

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
      		
    		}),
		WaveSurfer.regions.create({
            		drag: true,
            		dragSelection: {
                	slop: 5
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

wavesurfer.on('region-update-end',function(region){
	let totalTime = wavesurfer.getDuration();
	let x = (region.start/totalTime) * tags.width;
	let w = ((region.end - region.start)/totalTime) * tags.width;
	let isExsit = false;
	let index = -1;
	for(i=0;i<tagList.length;i++){
		if(region.id == tagList[i].id){
			isExsit = true;
			index = i;
			break;	
		}
	}
	
	if(isExsit){
		//updateTag(region);
		
		
		tagList[index].start = region.start;
		tagList[index].end = region.end;
		tagList[index].pos_x = x;
		tagList[index].width = w;
		drawTags();
		
	}
	else{
		test.innerHTML = region.id;
		
		
		if(currentBtn != null){
			if(currentBtn.id == "btnUnknown"){
			var t = new Tag("Unknown",region.id, region.start, region.end, x, w, c_blue);
				addTagBtn(t);
				currentTag = t.btn;
			}
		
			if(currentBtn.id == "btnNOI"){
			var t = new Tag("NOI",region.id, region.start, region.end, x, w, c_red);
				addTagBtn(t);
				currentTag = t.btn;
			}

			if(currentBtn.id == "btnBird"){
			var t = new Tag("Bird",region.id, region.start, region.end, x, w, c_yellow);
				addTagBtn(t);
				currentTag = t.btn;
			}

			if(currentBtn.id == "btnHuman"){
			var t = new Tag("Human",region.id, region.start, region.end, x, w, c_green);
				addTagBtn(t);
				currentTag = t.btn;
			}
		}
	}
	//for(var key in wavesurfer.regions.list)
	//{
	//	test.innerHTML = key.start;
	//}

//alert(Object.keys(wavesurfer.regions.list).length);
	
	

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
//document.querySelectorAll("button").forEach( function(item) {
//    item.addEventListener('focus', function() {
//        this.blur();
//    })
//})


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

function updateTag(region){


}


function btnUnknown(){
	


	$(".btnTag").each(function(){
		this.setAttribute("style","outline: none");
	});
	currentBtn = document.getElementById("btnUnknown");
	currentBtn.setAttribute("style","outline: 2px dashed blue");
	//addTagBtn(t);
	//alert(tagList[0].pos_x);
	//drawTags();
	for(i=0;i<tagList.length;i++){
		if(currentTag == tagList[i].btn){
			//alert("found");
			tagList[i].name = "Unknown";
			tagList[i].colour = c_blue;
			break;		
		}
	}

	drawTags();
	
	return false;
	

}

function btnNOI(){
	

	$(".btnTag").each(function(){
		this.setAttribute("style","outline: none");
	});
	currentBtn = document.getElementById("btnNOI");
	currentBtn.setAttribute("style","outline: 2px dashed blue");
	//addTagBtn(t);
	//tagList.push(t);
	//alert(tagList[0].pos_x);
	//drawTags();
	for(i=0;i<tagList.length;i++){
		if(currentTag == tagList[i].btn){
			//alert("found");
			tagList[i].name = "NOI";
			tagList[i].colour = c_red;
			break;		
		}
	}

	drawTags();

	return false;
}

function btnBird(){
	

	$(".btnTag").each(function(){
		this.setAttribute("style","outline: none");
	});
	currentBtn = document.getElementById("btnBird");
	currentBtn.setAttribute("style","outline: 2px dashed blue");
	//addTagBtn(t);
	//tagList.push(t);
	//alert(tagList[0].pos_x);
	//drawTags();
	for(i=0;i<tagList.length;i++){
		if(currentTag == tagList[i].btn){
			//alert("found");
			tagList[i].name = "Bird";
			tagList[i].colour = c_yellow;
			break;		
		}
	}

	drawTags();


	return false;
}

function btnHuman(){
	

	$(".btnTag").each(function(){
		this.setAttribute("style","outline: none");
	});
	currentBtn = document.getElementById("btnHuman");
	currentBtn.setAttribute("style","outline: 2px dashed blue");
	//addTagBtn(t);
	//alert(tagList[0].pos_x);
	//drawTags();
	for(i=0;i<tagList.length;i++){
		if(currentTag == tagList[i].btn){
			//alert("found");
			tagList[i].name = "Human";
			tagList[i].colour = c_green;
			break;		
		}
	}

	drawTags();


	return false;
}

function Tag(name, id, start, end, x, w, colour ){

		

	this.name = name;
	this.id = id;
	this.start = start;
	this.end = end;
	this.pos_x = x;
	this.width = w;
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
			wavesurfer.regions.list[tagList[i].id].remove();
			tagList.splice(i,1);
			
			break;		
		}
	}
	tags.innerHTML = "";
	//alert("emptied");
	


	drawTags();

	return false;

}

function drawTags(){
	//clear everything in tags div
	tags.innerHTML = "";
	var newList = [];
	newList = tagList;
	tagList = [];
	for(i=0;i<newList.length;i++){
		addTagBtn(newList[i]);
	}



}



function addTagBtn(tag){
	
	//shorten text if the width isnt enough
	if(tag.width < 60)
	{
		tag.btn.innerHTML = tag.name.substr(0,2); 	
	}
	else{
		tag.btn.innerHTML = tag.name;
	}
	
	//tag.btn.setAttribute("style","position:absolute;font-size:20px;" 
	//		+"color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:0px");
	//tags.appendChild(tag.btn);
	//alert(tag.pos_x);

	//check if tagList is empty
	if(tagList.length != 0){
		let tempList = [];

		for(i=0; i<tagList.length; i++){
			//check any overlaps
			if((tag.pos_x >= tagList[i].pos_x && tag.pos_x <= tagList[i].pos_x + tagList[i].width)
				||(tag.pos_x + tag.width >= tagList[i].pos_x && tag.pos_x + tag.width <= tagList[i].pos_x + tagList[i].width)
			){
				tempList.push(tagList[i]);


			}

		}
		
		//no overlapping
		if(tempList.length == 0){
			tag.btn.setAttribute("style","position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:0px;" + "height:"+tag_h+ "px;"+ "width:" +tag.width + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);

		}

		//only one overlapped
		if(tempList.length  == 1){
			tag.btn.setAttribute("style","position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:" + tag_h+ "px;" + "height:"+tag_h+ "px;"+ "width:" +tag.width + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);

		}

		if(tempList.length == 2){
			
			//check these two are overlapped
			if(((tempList[0].pos_x >= tempList[1].pos_x) && (tempList[0].pos_x <= tempList[1].pos_x + tempList[1].width))
				||(tempList[1].pos_x >= tempList[0].pos_x && tempList[1].pos_x <= tempList[0].pos_x + tempList[0].width)
			){
				//alert("overlapped");
				tag.btn.setAttribute("style","position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:" + 2*tag_h+ "px;" + "height:"+tag_h+ "px;"+ "width:" +tag.width + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);

			}
			
			//not overlapped
			else{
				//alert("not overlapped");
				tag.btn.setAttribute("style","position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:" + tag_h+ "px;" + "height:"+tag_h+ "px;"+ "width:" +tag.width + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);
			}

		}

		if(tempList.length ==3 || tempList.length == 4){
			tag.btn.setAttribute("style","position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:" + 2*tag_h+ "px;" + "height:"+tag_h+ "px;"+ "width:" +tag.width + "px");
			tags.appendChild(tag.btn);
			tagList.push(tag);

		}

		//alert(tempList.length +  " objects overlapped");
		


	}
	//if tagList is empty, add to the list
	else{
		
		tag.btn.setAttribute("style", "position:absolute;background-color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:0px;" + "height:"+tag_h+ "px;"+ "width:" +tag.width + "px");
		//tag.btn.style += "position:absolute;" 
		//	+"color:" +tag.colour + ";left:" + tag.pos_x + "px;" + "bottom:0px";
		tags.appendChild(tag.btn);
		tagList.push(tag);

	}
	

}

