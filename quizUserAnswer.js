var wrongMarker=L.AwesomeMarkers.icon({
	icon:'play',
	markerColor:'red'});
var correctMarker=L.AwesomeMarkers.icon({
	icon:'play',
	markerColor:'green'});

function checkAnswer(questionID) {  
	// get the correct answer from the hidden div  
	// NB - do this BEFORE you close the pop-up as when you close the pop-up the DIV is destroyed  
	var answer = document.getElementById("answer"+questionID).innerHTML; 
 	// now check the question radio buttons 
 	var correctAnswer = false;  
 	var answerSelected = 0;  
 	for (var i=1; i < 5; i++) {   
 		if (document.getElementById("answer_"+i).checked){    
 			answerSelected = i;   
 		}   
 		if ((document.getElementById("answer_"+i).checked) && (i == answer)) { 
 			alert ("Well done");      
 			correctAnswer = true;   
 		}  
 	}  
 	if (correctAnswer === false) {   
 		// they didn't get it right   
 		alert("Better luck next time");  
 	} 

 	// now close the popup   
 	mymap.closePopup();  

 	// the code to upload the answer to the server would go here  
 	// call an AJAX routine using the data  
 	// the answerSelected variable holds the number of the answer     
 	//that the user picked 
 	var question_id = questionID;
 	var correct_answer = answer;
	// now get the radio button values
	var answer_selected=answerSelected;
	var postString = "&question_id="+ question_id +"&answer_selected="+answer_selected+"&correct_answer="+correct_answer;
	alert (postString);

	//the code to change matching icon colours
	//the colour depending on whether answer was right or wrong
	QuizPointLayer.eachLayer(function(layer) {   
		console.log(layer.feature.properties.id);
		if (layer.feature.properties.id == question_id){
			if (correctAnswer===true) {
				layer.setIcon(layer.options.icon=correctMarker);  
			}    
			 else{
			 	layer.setIcon(layer.options.icon=wrongMarker);  
			 }
		}  
	}); 
	processAnswer(postString);
}

function changeMarkerColour(){
	
}