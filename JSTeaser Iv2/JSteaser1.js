var errindex=0;
function draw(){
	$('maindiv').update("");    
    var itr=$('txt1').value,i=0,j=0;
	var SquareDivs=[];
	var count=0;
    if(!isNaN(itr))
    {     
        for(i=0;i<itr;i++) 
        {
            for(j=0;j<itr;j++)
            {
                var div=new Element('div',{'id':"div"+((i*itr)+j),});
				
                if((i+j)%2 == 0)
                {
                    div.addClassName("white"); 
					div.update(div.id+'\n'+"white");
                } 
                else
                {      
                    div.addClassName("black"); 
					div.update(div.id+'\n'+"black");							
                }              
                $('maindiv').insert(div);
				SquareDivs[count++]=div;				
            }
            $('maindiv').innerHTML+="<br />";		
        }
		for (i=0;i<SquareDivs.length;i++) { 
			div_id= SquareDivs[i].id;
			with ({temp : div_id}) {
				$(temp).onclick = function(){alert(temp)};
			}			
		}
    }
	else	
		$('errdiv').update( $('errdiv').innerHTML+ (++errindex + "Enter Numeric Value Only") +"<br />");	
}