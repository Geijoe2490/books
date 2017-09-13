/**
 * This files contains all JS method to get reg prodata from and submit to blue kai
 * Method Names: start,
 * 
 */
IDG = window.IDG || {};


IDG.bkCoreApi ={

	urlSuf :"/profile/",
	
	urlParam : "idg_eid",
	
	cName :"_idg_bk_pro",
	
	cPath : "/",
	
	varMap :function(){
		var map = new Object();
		map['idgEid']='idg_eid'
		map['company']='cmpy';
		map['city']='city';
		map['state']='st';
		map['postalCode']='pc';
		map['country']='cntry';
		map['jobTitle']='jt';
		map['personalJobTitle']='jt';
		map['jobPosition']='jp';
		map['jobFunction']='jf';
		map['companySize']='cs';
		map['industry']='in';
		return map;
	},
	
	consoleLog:function(){
		if(window.console && window.console.log && bk_debug_log){
			return true
		}else{
			return false;
		}
	},
	
	start:function(){
        var eid= IDG.bkCoreApi.readNLUrlParam("idg_eid");
	    var domainVal=IDG.bkCoreApi.getDomain();
	    
	    if(eid == undefined){
	    	if(IDG.bkCoreApi.consoleLog()){console.log("use case 2 : no nl page");}
	    	IDG.bkCoreApi.caseEidUndefined();
	    
	    }
	    else{
	    	if(IDG.bkCoreApi.consoleLog()){console.log("use case 1: nl page");}
	    	 if(IDG.bkCoreApi.isValid(eid)){
	    			IDG.bkCoreApi.caseEidDefined(eid);
	    	  }
	    		else{
	    			if(IDG.bkCoreApi.consoleLog()){console.log("invalid value send defaults");}
	    			IDG.bkCoreApi.submitDefaultToBk(blueKaiId,blueKaiPort); 
	    		}
	      }
	   
	
	},
	 
	caseEidUndefined: function(){
		
		if(IDG.bkCoreApi.consoleLog()){console.log("use case: 2 :eid is undefined ");}		
    	if(IDG.bkCoreApi.cookieAndRefresh()){
    		if(IDG.bkCoreApi.consoleLog()) {console.log(" 2a eid is undefinded : cookie exists and refresh needed");}
   				IDG.bkCoreApi.startBkSubmit(IDG.bkCoreApi.readProp(IDG.bkCoreApi.cName,'eid')); 
    	
    	}
    	else if (IDG.bkCoreApi.hasCookie(IDG.bkCoreApi.cName)){
    			if(IDG.bkCoreApi.consoleLog()) {console.log(" 2a eid is undefinded : cookie exists and refresh not needed");}
	    		var eid= IDG.bkCoreApi.readProp(IDG.bkCoreApi.cName,'eid');
	    		var tagVal='';
	    		if(eid){
	    			tagVal='['.concat(eid).concat(']');
	    		}
	    		bk_addPageCtx("idg_eid",tagVal);	
	    		IDG.bkCoreApi.submitDefaultToBk(blueKaiId,blueKaiPort);
    	}
    	else{ 
    		if(IDG.bkCoreApi.consoleLog()){console.log("2b eid is Undefinded :no cookie exists or no refresh needed");}
    			IDG.bkCoreApi.submitDefaultToBk(blueKaiId,blueKaiPort);
    		}
		
	},
	
	
	
	caseEidDefined : function(eid){
    	if(IDG.bkCoreApi.hasCookie(IDG.bkCoreApi.cName)){
    		if(IDG.bkCoreApi.consoleLog()){console.log("1a nl page: has cookie");}
    		var eh= IDG.bkCoreApi.readProp(IDG.bkCoreApi.cName,'eid');	
    		
    		if(eh==eid && IDG.bkCoreApi.refreshNeeded()){
    			if(IDG.bkCoreApi.consoleLog()) {console.log("nl page: cookie value and eid matched and refresh");}
    			
	    			IDG.bkCoreApi.startBkSubmit(eid); 
    		}
	    	else if( eh !=eid){ 
	    		if(IDG.bkCoreApi.consoleLog()) {console.log("1c nl page : hash not match");}
	    		IDG.bkCoreApi.initFullBkSubmit(eid);
	       }	
    		else{
    			if(IDG.bkCoreApi.consoleLog()) { console.log("1 nl page: cookie present : hash match: refresh not needed");}
    			//bk_addPageCtx("idg_eid",eid);
    			IDG.bkCoreApi.submitDefaultToBk(blueKaiId,blueKaiPort);
    		}
    	
    	}
    	else{
    		if(IDG.bkCoreApi.consoleLog()) {console.log("1b nl page: no cookie");}
    			IDG.bkCoreApi.initFullBkSubmit(eid);
    	  }
		
		
	},
	 
	initFullBkSubmit:function(eid){	
		if(IDG.bkCoreApi.isValid(eid)){
			var domainVal=IDG.bkCoreApi.getDomain();
			var cookieVal= IDG.bkCoreApi.defaultCookieValue(eid);
			IDG.bkCoreApi.createCookie(IDG.bkCoreApi.cName,cookieVal,IDG.bkCoreApi.cPath,domainVal);
			IDG.bkCoreApi.startBkSubmit(eid); 
		}else{
			if(IDG.bkCoreApi.consoleLog()) {console.log("invalid idgeid : send default");}
			IDG.bkCoreApi.submitDefaultToBk(blueKaiId,blueKaiPort);	
		}
		
	},
	
	 defaultCookieValue :function(eidVal){
		 var date=IDG.bkCoreApi.dateAsString();
		var obj={eid:eidVal,sbt:0,dst:date};
		if(IDG.bkCoreApi.consoleLog()) {console.log("default cookie value" +obj)}
		return $.param(obj);
		 
	 },
	 
	 /*
	  * Check if a cookie with a name is present
	  * returns boolean
	  */
	 hasCookie : function(name){
		 if(IDG.bkCoreApi.consoleLog()) { console.log("check cookie");}
		 var bkcookie=	 IDG.bkCoreApi.readCookie(name);
		 if(bkcookie){
			 return true;
		 }
		 return false;	 
	 },

	 isValid: function(stringValue){
			if(IDG.bkCoreApi.consoleLog()){console.log("check if valid value");}
			if(stringValue != 'undefinded' && stringValue.length == 32 && stringValue.match("[a-fA-F0-9]{32}")){
				return true;
			}else{ return false}
		},

		cookieAndRefresh: function(){	
			if(IDG.bkCoreApi.hasCookie(IDG.bkCoreApi.cName) && IDG.bkCoreApi.refreshNeeded()){
				return true;
			}
			else{
				return false;
			}
			
		},

	 
	 /**
	  * Checks if prodata refresh needed 
	  * if prodata not submitted to bk returns true
	  * if prodata submitte more than 30 days returns true
	  * else returns false
	  */
	 refreshNeeded: function(){
		 if(IDG.bkCoreApi.consoleLog()) { console.log("check refresh needed")}
		 var bkcookie= IDG.bkCoreApi.readCookie(IDG.bkCoreApi.cName);
		 if(bkcookie){
			 var sbtVal= IDG.bkCoreApi.readCookieProperty(bkcookie,'sbt');
			 if(sbtVal==0){ 
				 return true;
			 }
			 else{
				 var dstVal= IDG.bkCoreApi.readCookieProperty(bkcookie,'dst');
				 if(IDG.bkCoreApi.subDate(dstVal) > daysToRefresh){ 
					 return true;
				 }	
			 }
		 }	
		 return false;
	 },
	 
	 /**
	  * Parse cookie value and return property value
	  * @param cookieValue
	  * @param propName
	  * @returns property value
	  */
	 readCookieProperty:function(cookieValue,propName){
		if(cookieValue){
			var returnVal=undefined; 
		var cValAr=	 cookieValue.split('&');
			$.each(cValAr,function(index,value){
				if(value.indexOf(propName) >-1){
					var val=value.split('=')
					returnVal=val[1];
					 return false;
				}
			});		 
		 }
		return returnVal;
	 },
	 
	 readProp:function(cookieName,propName){
		var cookieValue = readCookie(cookieName);
			if(cookieValue){
				var returnVal=undefined; 
			var cValAr=	 cookieValue.split('&');
				$.each(cValAr,function(index,value){
					if(value.indexOf(propName) >-1){
						var val=value.split('=')
						returnVal=val[1];
						 return false;
					}
				});		 
			 }
			return returnVal;
		 },
	 
	/**
	 * Takes in date String in any format and substrat form
	 * current date and return number of days past
	 * @param dateString
	 * @returns
	 */
	 subDate:function(dateString){
		 var d1;
			 try{
				d1= new Date(dateString);
			 }
			 catch(err){
				d1= new Date(); 
			 }
		 var d2= new Date();
		 var diff = Math.abs(d1 - d2);
		 return Math.ceil(diff/(1000*60*60*24));
	 },
	 
	 //returns date as UTC string
	 dateUTCString : function dateUTCString(exdays){
		 var d= new Date();	 
		 d.setTime(d.getTime() + (exdays*24*60*60*1000));
		 return d.toUTCString();
	 },
	 
	 //Returns domain fromt the url
	 getDomain: function getDomain(){
		 var hostname = $('<a>').prop('href', url).prop('hostname');
		return hostname; 
	 },
	 
	 //Initiates prodata submission process;
	 startBkSubmit : function(eid){
		 if(IDG.bkCoreApi.consoleLog()) {console.log("start prodata sub")}
		 if(IDG.bkCoreApi.isValid(eid)){
			 var url=regUrl.concat(brandCode).concat(IDG.bkCoreApi.urlSuf).concat(eid);
		     IDG.bkCoreApi.processAndSubmit(url);
		 } else{ 
			 if(IDG.bkCoreApi.consoleLog()) {console.log("value invalid send default")}
			 IDG.bkCoreApi.submitDefaultToBk(blueKaiId,blueKaiPort); 
		 }  
	     
	  },
	  
	 /**
	  * creates new cooke 
	  * @param name
	  * @param value
	  * @param pathValue
	  * @param domainName
	  */
	createCookie : function(name,value,pathValue,domainName){
		if(this.consoleLog()) {console.log("creating cookie for :"+value);}
		$.cookie(name,value,{path:'/',domain:domainName,expires:3650});

	},

	//read cookie and returns value
	readCookie :function(cName){
		if(IDG.bkCoreApi.consoleLog()) {console.log("reading cookie :"+cName);}
		return	$.cookie(cName)
		
	},
	
	/*
	 * Updates cookie
	 */
	updateCookie : function(cName,submittedVal,dateSubmitted){
	
		if(IDG.bkCoreApi.consoleLog()) {console.log("updating  cookie :"+cName+submittedVal+dateSubmitted);}
		var cookieVal=	IDG.bkCoreApi.readCookie(cName);
     	var newVal={};
		var valArr=cookieVal.split('&');
		$.each(valArr ,function(index,value){
			var vaAr=value.split('=');
			var key=vaAr[0];
			if(key=='sbt'){
				newVal.sbt=submittedVal;	
			}
			else if(key=='dst'){
				newVal.dst=dateSubmitted;	
			}
			else if(key=='eid'){
			 newVal.eid=vaAr[1];		
			}
		});
     	IDG.bkCoreApi.createCookie(cName,$.param(newVal),IDG.bkCoreApi.path,IDG.bkCoreApi.getDomain());
     
	},
	
		
	//fetch prodata and parse
	processAndSubmit: function(urlValue){
		if(IDG.bkCoreApi.consoleLog()) {console.log("init get process from "+urlValue);}
		var ns=IDG.bkCoreApi;
		// $.get(url).done(ns.onSuccess).fail(ns.onFail);
		$.ajax({ 
			url : urlValue,
			method:"GET",
			timeout: 3000,	
			dataType:"json",
		}).done(ns.onSuccess).fail(ns.onFail);
		
		
	
	},
	
	dateAsString: function(){
	
		var d= new Date();	
		var dateString="";
		var month=d.getMonth()+1;
		if(month < 10){
			month=('0').concat(month);
		}
		dateString=dateString.concat( d.getFullYear()).concat('-').concat(month).concat('-').concat(d.getDate());
	
		return dateString;
	},
	
	
	onSuccess : function(data,status){
		if(IDG.bkCoreApi.consoleLog()) {console.log("In Success method");}
   		 var jsonObject=IDG.bkCoreApi.readJsonString(JSON.stringify(data));
   		 IDG.bkCoreApi.setBKValues(jsonObject);
   		 IDG.bkCoreApi.submitToBk(blueKaiId,blueKaiPort);
	},
	
	onFail: function(data,status){
		if(IDG.bkCoreApi.consoleLog()) {console.log("get failed	");}
	 	
	 	IDG.bkCoreApi.submitDefaultToBk(blueKaiId,blueKaiPort);
	},
	
	submitToBk : function(blueKaiId,blueKaiPort){
		if(IDG.bkCoreApi.consoleLog()) {console.log("submit to bk");}
		
		bk_doJSTag(blueKaiId,blueKaiPort);	
		//after submitting prodata to blue kai update cookie
		if(IDG.bkCoreApi.consoleLog()) {console.log("update cookie after submit to bk");}
		var date=IDG.bkCoreApi.dateAsString();
		IDG.bkCoreApi.updateCookie(IDG.bkCoreApi.cName,1,date);
		
	},
	
	submitDefaultToBk: function(blueKaiId,blueKaiPort){
		
		if(IDG.bkCoreApi.consoleLog()) {console.log("default to bk");}
		bk_doJSTag(blueKaiId,blueKaiPort);	
	},
	
	
	setBKValues : function (jsonObject){
		if(IDG.bkCoreApi.consoleLog()) {console.log("set bk tag");}
		 var map = IDG.bkCoreApi.varMap()
		for(var key in jsonObject){
			var keyValue='';
			if(jsonObject[key] && jsonObject[key] != 'null' ){
				keyValue=decodeURIComponent(jsonObject[key]);
			}
			bk_addPageCtx(map[key],'['.concat(keyValue).concat(']'));
		}	
	},
	
	
	readJsonString : function(jsonString){
		if(IDG.bkCoreApi.consoleLog()) {console.log("read json string and create object");}
			var obj = $.parseJSON(jsonString);
			return obj;
		
	},
	
	//read NL URI and get value for given parameter
	readNLUrlParam :function(sParam){
		var sPageURI = window.location.search.substring(1);
		var decodedUri;
		try{
			decodedUri = decodeURIComponent(sPageURI);
		}
		catch(e){
			decodedUri =sPageURI;
		}
		var sURLVariables = decodedUri.split('&');
		for (var i = 0; i < sURLVariables.length; i++) 
   			 {
   			  var sParameterName = sURLVariables[i].replace('phint=','').split('=');
      		  if (sParameterName[0] == sParam) 
      		  {
        	    return sParameterName[1];
       	 	  }
   		 	}
	}

};