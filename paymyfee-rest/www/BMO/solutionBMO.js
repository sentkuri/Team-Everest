function solutionBMO(img,ques,ans,likvalue,lik,commentvalue,com,like,comment,bookmark,like1,comment1,bookmark1){
	
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
  
 function solutionBMO1(){
	 this.likecount="0";
	 this.commentcount="0";
	 this.bookmarkcount="0";
    this.object1=[];
	this.object1.push(new solutionBMO("img/qb.jpg","1. What is the need for protocol?"," In computer networks, communication occurs between entities in different systems. An entity is anything capable of sending or receiving information. However, two entities cannot simply send bit streams to each other and expect to be understood. For communication to occur, the entities must agree on a protocol. A protocol is a set of rules that govern data communications. A protocol defines what is communicated, how it is communicated, and when it is communicated. The key elements of a protocol are syntax, semantics, and timing.",this.likecount,"Like",this.commentcount,"Comment","icon ion-thumbsup","icon ion-chatbox","icon ion-star","like","comment","bookmark"));
	this.object1.push(new solutionBMO("img/qb.jpg","2. What are the features of datagram network?","If the message is going to pass through a packet-switched network, it needs to be divided into packets of fixed or variable size. The size of the packet is determined by the network and the governing protocol.There is no resource reservation; resources are allocated on demand.A switch in a datagram network uses a routing table that is based on the destination address.The destination address in the header of a packet in a datagram network remains the same during the entire journey of the packet",this.likecount,"Like",this.commentcount,"Comment","icon ion-thumbsup","icon ion-chatbox","icon ion-star","like","comment","bookmark"));
	this.object1.push(new solutionBMO("img/qb.jpg","3. Mention the advantages of <br>Multipoint connection over <br>point-to-point connection."," In a point-to-point connection, two and only two devices are connected by a dedicated link. In a multipoint connection, three or more devices share a link.",this.likecount,"Like",this.commentcount,"Comment","icon ion-thumbsup","icon ion-chatbox","icon ion-star","like","comment","bookmark"));
	this.object1.push(new solutionBMO("img/qb.jpg","4. What is peer-to-peer process?"," Between machines, layer x on one machine communicates with layer x on another machine. This communication is governed by an agreed-upon series of rules and conventions called protocols. The processes on each machine that communicate at a given layer are called peer-to-peer processes.Communication between machines is therefore a peer-to-peer process using the protocols appropriate to a given layer.",this.likecount,"Like",this.commentcount,"Comment","icon ion-thumbsup","icon ion-chatbox","icon ion-star","like","comment","bookmark"));
  }
  
