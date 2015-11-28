function tipsBMO(img,ques,ans,likvalue,lik,commentvalue,com,like,comment,bookmark,like1,comment1,bookmark1){
	
	this.commentcount="0";
    this.ques=ques;
	this.ans=ans;
	this.img=img;
	
	
	this.likvalue=likvalue;
	this.lik=lik;
	this.commentvalue=commentvalue;
	this.com=com;
	
	
	this.like=like;
	this.comment=comment;
	this.bookmark=bookmark;
	this.like1=like1;
	this.comment1=comment1;
	this.bookmark1=bookmark1;
	
	
  }
  
 function tipsBMO1(){
	 this.likecount="0";
	 this.commentcount="0";
	 this.bookmarkcount="0";
    this.object1=[];
	this.object1.push(new tipsBMO("img/bulb.png","1.	What is duplexing?"," In wireless communication it is often desired to do two tasks simultaneously i.e. transfer of information from base station to the mobile unit and from the mobile unit to the base station. For example consider the traditional landline phones where it is possible to listen and talk simultaneously, this is known as Duplexing. Duplexing can be divided based on time or frequency slots. If it is divided based on frequency it is known as Frequency Division Duplexing (FDD) and if it is divided based on time slots it is known as Time Division Duplexing (TDD).",this.likecount,"Like",this.commentcount,"Comment","icon ion-thumbsup","icon ion-chatbox","icon ion-star","like","comment","bookmark"));
	this.object1.push(new tipsBMO("img/bulb.png","2.	Define coding gain.","Coding gain is the measure in the difference between the signal-to-noise ratio (SNR) levels between the uncoded system and coded system required to reach the same bit error rate (BER) levels when used with the error correcting code (ECC).",this.likecount,"Like",this.commentcount,"Comment","icon ion-thumbsup","icon ion-chatbox","icon ion-star","like","comment","bookmark"));
	this.object1.push(new tipsBMO("img/bulb.png","3.	What do you mean by transmit diversity?","Transmit diversity is radio communication using signals that originate from two or more independent sources that have been modulated with identical information-bearing signals and that may vary in their transmission characteristics at any given instant.",this.likecount,"Like",this.commentcount,"Comment","icon ion-thumbsup","icon ion-chatbox","icon ion-star","like","comment","bookmark"));
	this.object1.push(new tipsBMO("img/bulb.png","4.	What are the advantages of 3G network?"," Overcrowding is relieved in existing systems with radio spectrum; Bandwidth, security and reliability are more; Provides interoperability among service providers ; Availability of fixed and variable rates; Support to devices with backward compatibility with existing networks; Always online devices – 3G uses IP connectivity which is packet based; Rich multi media services are available",this.likecount,"Like",this.commentcount,"Comment","icon ion-thumbsup","icon ion-chatbox","icon ion-star","like","comment","bookmark"));
  }
  
