var ideacount = 0;
var rem_el_id;
var dataContainer=new Array();
var jsonString;
var file_Location;
var content2 = "<img src='images/rhino.jpg' width='298' height='373' alt='' />";
T$('testclick2').onclick = function(){TINY.box.show(content2,0,0,0,1)};
function generateIdea(item){
	var div = new Element('div', { 'id': "idea" + ideacount, 'class': 'ideadiv' });
	var txtarea = new Element('textarea', { 'id': 'textarea' + ideacount, 'title': "Click here to edit" }).update(item);
	Event.observe(txtarea, 'focus', setfocus);
	Event.observe(txtarea, 'blur', unsetfocus);
	
	var anchor = new Element('a', { 'href': "#", 'class': "cross", 'id': "a" + ideacount, 'title': "Click here to delete" });
	Event.observe(anchor, 'click', removeNode);

	div.insert(txtarea);
	div.insert(anchor);

	$('container').insert(div);
	Sortable.create('container',{tag:'div', constraint:false});
	div.hide();
	new Effect.Appear(div, { duration: 1.0 });       
	ideacount++;
}
function addIdea(){
    var idea = $('idea').value;	
    if (!idea.blank()) {
		generateIdea(idea)		
    }
    $('idea').value = "";
}
function setfocus() {this.addClassName("txt_focus");}
function unsetfocus() {this.removeClassName("txt_focus");}
function removeNode() {			
    rem_el_id = this.parentNode.id;
    new Effect.Fade(rem_el_id,
       { duration: 1.0 });
    setTimeout("time()", 1001);
}
function time() {$('container').removeChild($(rem_el_id));}
function saveSession(){
	dataContainer.clear();
	$('container').childElements().each(function(item){
		dataContainer.push(item.childElements()[0].value);
	});
	jsonString = dataContainer.toJSON();	
	WriteToFile(jsonString);
}
function loadSession(){
	ideacount=0;
	$('container').innerHTML="";
	
	(ReadFromFile().evalJSON()).each(function(item){		
		generateIdea(item);
	});	
}
function WriteToFile(jsonString){	
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var s = fso.CreateTextFile(file_Location, true);
	s.WriteLine(jsonString);
	s.Close();
}
function ReadFromFile(){
	var fso, a, ForReading;
	ForReading = 1;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	file = fso.OpenTextFile(file_Location, ForReading, false);
	return file.readline();	
	file.Close();
}
function showTiny(text){
	var content2 = text+"<input type='text' id='fileLocation' onblur='file_Location=this.value'/>";
	TINY.box.show(content2,0,0,0,1);
}
function showInstruction(){
	var content2 = "<b>Instruction</b> <br />1. Enter the save Location into POP-UP after clicking 'Save_Location' Button.Then, click save to save in.<br />2. Enter the load Location into POP-UP after clicking 'Load_Location' Button.Then, click load to load from.</pre>";
	TINY.box.show(content2,0,0,0,1);
}