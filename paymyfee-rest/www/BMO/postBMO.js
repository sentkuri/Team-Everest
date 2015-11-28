function forminputBMO(name,question,answer){
    this.name=name;
	this.question=question;
	this.answer=answer;
    this.list=[];
    
  }
  function forminput(){
	   this.list=[];
	  this.list.push(new forminputBMO("Name","Question","Answer"));
  };
  

  forminputBMO.prototype.create = function(name,question,answer){
	  
	
	 this.list.push(new forminputBMO(name,question,answer));
     
  };
  
  forminputBMO.prototype.del = function(name) {
	  for(var i=0;i<this.list.length;i++){
		  if(this.list[i].name == name){
			  this.list.splice(i,1);
		  }
	  }
  };
  
  
 forminputBMO.prototype.find=function(name){
	  for(var i=0;i<this.list.length;i++){
		  if(this.list[i].name == name){
			  return this.list[i];
		  }
	  }
  };