sap.ui.controller("competitoranalysis.Analysis", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf competitoranalysis.Analysis
*/
	onInit: function() {
		
		var oModel = new sap.ui.model.odata.ODataModel("proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV", false,"kevin","support");
		sap.ui.getCore().setModel(oModel);
		var data = {
				"Company":[
				           {"Name":''},				           
				           {"Name":"IBM"},				           
				           {"Name":"HP"},
				           {"Name":"Neusoft"},
				           {"Name":"Accenture"},
				           {"Name":"Digital China Ltd"},
				           {"Name":"Capgemini"},
				           {"Name":"hand"},
				           {"Name":""}
				        
				           
				 ],
				 "Field":[
				          {"Name":''},
				          {"Name":"IM&C"},
				          {"Name":"Retail"},
				          {"Name":"Insurance"},
				          {"Name":"Oil_gas"},
				          {"Name":"Banking"},
				          {"Name":"Government"},
				          {"Name":"Automotive"},
				          {"Name":"Hitech"}
				  ],
				  "Source":[
				           {"Name":''},
				           {"Name":"CTOCIO"}
				           
				  ],
				  "Time":[
				          {"Name":''},
				          {"Name":"2015-04-27"},
				          {"Name":"2015-07-30"}
				          
				          ]
		};
		
		
		
		var oJSONModel = new sap.ui.model.json.JSONModel();
		oJSONModel.setData(data);
		
		var oDropbox = sap.ui.getCore().byId(this.createId("companyBoxId"));
		oDropbox.setModel(oJSONModel);
		
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "Name");
		oItemTemplate1.bindProperty("key", "Name");
		//oItemTemplate1.bindProperty("enabled", "enabled");
		oDropbox.bindItems("/Company", oItemTemplate1);
	
		var oDropboxField = sap.ui.getCore().byId(this.createId("fieldBoxId"));
		oDropboxField.setModel(oJSONModel);
			
		var oItemTemplate2 = new sap.ui.core.ListItem();
		oItemTemplate2.bindProperty("text", "Name");
		oItemTemplate2.bindProperty("key", "Name");
		oDropboxField.bindItems("/Field", oItemTemplate2);
		
		var oDropboxSource = sap.ui.getCore().byId(this.createId("sourceBoxId"));
		oDropboxSource.setModel(oJSONModel);
		var oItemTemplate3 = new sap.ui.core.ListItem();
		oItemTemplate3.bindProperty("text", "Name");
		oItemTemplate3.bindProperty("key", "Name");
		oDropboxSource.bindItems("/Source", oItemTemplate3);
		
		var oDropboxTime = sap.ui.getCore().byId(this.createId("timeBoxId"));
		oDropboxTime.setModel(oJSONModel);
		var oItemTemplate4 = new sap.ui.core.ListItem();
		oItemTemplate4.bindProperty("text", "Name");
		oItemTemplate4.bindProperty("key", "Name");
		oDropboxTime.bindItems("/Time", oItemTemplate4);

			


	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf competitoranalysis.Analysis
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf competitoranalysis.Analysis
*/
	onAfterRendering: function() {
		
		
		var panelid = "#" + this.createId("panel2Id");
		$("#panel1Id").hide();
		$(panelid).hide();
		$("#panel3Id").hide();
		$("#panel4Id").hide();

	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf competitoranalysis.Analysis
*/
//	onExit: function() {
//
//	}
	
	search:function(){
		
		var company = sap.ui.getCore().byId(this.createId("companyBoxId")).getSelectedKey();
		var field = sap.ui.getCore().byId(this.createId("fieldBoxId")).getSelectedKey();
		var time = sap.ui.getCore().byId(this.createId("timeBoxId")).getSelectedKey();
		var orderby = sap.ui.getCore().byId(this.createId("orderbyBoxId")).getSelectedKey();
		var source = sap.ui.getCore().byId(this.createId("sourceBoxId")).getSelectedKey();
		var searchInfo = sap.ui.getCore().byId(this.createId("searchInfoFieldId")).getValue();
		var oJsonModel = new sap.ui.model.json.JSONModel();
		var tempData = 0;
		
		var detailArea = sap.ui.getCore().byId(this.createId("detailResultsArea"));
        
		var requestObj = {    			
    			requestUri: "",
    			method: "GET",
    			async:false,
    			headers: {
    				"X-Requested-With": "XMLHttpRequest",
    				"Content-Type": "application/atom+xml",
    				"DataServiceVersion": "2.0",
    				"MaxDataServiceVersion": "2.0",
    				"Accept": "application/atom+xml"
					
    			}
    	}; 		
		
		if(company == '' && field == '' && time == '' && source == ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zcompanySet?$filter=substringof('"+searchInfo+"',Title) eq true&$orderby=Time desc";
			OData.request(requestObj, function (data, response) {	
				
				tempData = data.results;
			});
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zfieldSet?$filter=substringof('"+searchInfo+"',Title) eq true&$orderby=Time desc";
		}
		else if(company != '' && field == '' && time == '' && source == ''){//company is selected			
				requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zcompanySet?$filter=substringof('"+searchInfo+"',Title) eq true and Company eq '"+company+"'&$orderby=Time desc";
		}
		else if(company == '' && field != '' && time == '' && source == ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zfieldSet?$filter=substringof('"+searchInfo+"',Title) eq true and Field eq '"+field+"'&$orderby=Time desc";
		}	           
		else if(company == '' && field == '' && time != '' && source == ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zcompanySet?$filter=substringof('"+searchInfo+"',Title) eq true and Time eq '"+time+"T00:00:00'";
		}
		else if(company == '' && field == '' && time == '' && source != ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zcompanySet?$filter=substringof('"+searchInfo+"',Title) eq true and Source eq '"+ source +"'&$orderby=Time desc";
		}
		else if(company != '' && field != '' && time == '' && source == ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zmixSet?$filter=substringof('"+searchInfo+"',Title) eq true and Company eq '"+ company +"' and Field eq '"+field+"'&$orderby=Time desc";
		}
		else if(company != '' && field == '' && time != '' && source == ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zcompanySet?$filter=substringof('"+searchInfo+"',Title) eq true and Company eq '"+ company +"' and Time eq '"+time+"T00:00:00'";
		}
		else if(company != '' && field == '' && time == '' && source != ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zcompanySet?$filter=substringof('"+searchInfo+"',Title) eq true and Company eq '"+ company +"' and Source eq '"+source+"'&$orderby=Time desc";
		}
		else if(company == '' && field != '' && time != '' && source == ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zfieldSet?$filter=substringof('"+searchInfo+"',Title) eq true and Field eq '"+ field +"' and Time eq '"+time+"T00:00:00'";
		}
		else if(company == '' && field != '' && time == '' && source != ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zfieldSet?$filter=substringof('"+searchInfo+"',Title) eq true and Field eq '"+ field +"' and Source eq '"+source+"'&$orderby=Time desc";
		}
		else if(company == '' && field == '' && time != '' && source != ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zcompanySet?$filter=substringof('"+searchInfo+"',Title) eq true and Time eq '"+time+"T00:00:00' and Source eq '"+source+"'";
		}
		else if(company != '' && field != '' && time != '' && source == ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zmixSet?$filter=substringof('"+searchInfo+"',Title) eq true and Company eq '"+ company +"' and Field eq '"+ field +"' and Time eq '"+time+"T00:00:00'";
		}
		else if(company != '' && field != '' && time == '' && source != ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zmixSet?$filter=substringof('"+searchInfo+"',Title) eq true and Company eq '"+ company +"' and Field eq '"+ field +"' and Source eq '"+source+"'&$orderby=Time desc";
		}
		else if(company != '' && field == '' && time != '' && source != ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zcompanySet?$filter=substringof('"+searchInfo+"',Title) eq true and Company eq '"+ company +"' and Time eq '"+time+"T00:00:00' and Source eq '"+source+"'";
		}
		else if(company == '' && field != '' && time != '' && source != ''){
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zfieldSet?$filter=substringof('"+searchInfo+"',Title) eq true and Field eq '"+ field +"' and Time eq '"+time+"' and Source eq '"+source+"'";
		}
		else{
			requestObj.requestUri = "proxy/http/DEWDFLSSC5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/zmixSet?$filter=substringof('"+searchInfo+"',Title) eq true and Company eq '"+ company +"' and Field eq '"+ field +"' and Time eq '"+time+"' and Source eq '"+source+"'";
		}
		var oPanel1 = sap.ui.getCore().byId("panel1Id");
		oPanel1.removeAllContent();
		OData.request(requestObj, function (data, response) {				
			
			if(tempData != 0){//company == '' && field == '',request two table zcompanySet,zfieldSet
				
				data.results = data.results.concat(tempData);
				
			}
			oJsonModel.setData(data.results);		
			
			for(var i = 0;i < data.results.length; i++){
				oPanel1.addContent(new sap.ui.commons.Link({
					text:"["+i+"]"+data.results[i].Title,
					press:function(){
						var text = this.getText();
						var id = text.substring(1,text.indexOf(']'));
						var link = data.results[id].Link;
						window.location.replace(link);
						
					}
				}));
			}
			
	
	    });
		
		if(company == '' && field == ''){
			this.wordsCouting(oJsonModel,"zkey_companySet");
		}
		else if(company != '' && field == ''){
			this.wordsCouting(oJsonModel,"zkey_companySet");
		}
		else if(company == '' && field != ''){
			this.wordsCouting(oJsonModel,"zkey_fieldSet");
		}
		else{
			this.wordsCouting(oJsonModel,"zkey_mixSet");
		}
		
		
		
		var odata = oJsonModel.getData();
		var companyDataSet = [];
		var fieldDataSet = [];
		var timeDataSet = [];
		var sourceDataSet = [];
		if(odata[0].Company){
			companyDataSet[0] = {};
			companyDataSet[0].Company = odata[0].Company;
			companyDataSet[0].count = 1;
		}
		if(odata[0].Field){
			fieldDataSet[0] = {};
			fieldDataSet[0].Field = odata[0].Field;
			fieldDataSet[0].count = 1;
		}
		if(odata[0].Time){
			timeDataSet[0] = {};
			timeDataSet[0].Time = odata[0].Time;
			timeDataSet[0].count = 1;
		}
		if(odata[0].Source){
			sourceDataSet[0] = {};
			sourceDataSet[0].Source = odata[0].Source;
			sourceDataSet[0].count = 1;
		}
		
		for(var i = 1;i < odata.length;i++){
			if(odata[i].Company){
				var c_index = 0;//companyDataSet index
				//companyDataSet couting
				for(;c_index < companyDataSet.length;c_index++){
					if(companyDataSet[c_index].Company == odata[i].Company){
						companyDataSet[c_index].count++;
						break;
					}						
					
				}
				if(c_index >= companyDataSet.length){
					companyDataSet[c_index] = {};
					companyDataSet[c_index].Company = odata[i].Company;
					companyDataSet[c_index].count = 1;
				}
			}
			if(odata[i].Field){
				var f_index = 0;//fieldDataSet index
				//fieldDataSet counting
				for(;f_index < fieldDataSet.length;f_index++){
					if(fieldDataSet[f_index].Field == odata[i].Field){
						fieldDataSet[f_index].count++;
						break;
					}						
					
				}
				if(f_index >= fieldDataSet.length){
					fieldDataSet[f_index] = {};
					fieldDataSet[f_index].Field = odata[i].Field;
					fieldDataSet[f_index].count = 1;
				}
			}
			if(odata[i].Time){
				var t_index = 0;//timeDataSet index
				//timeDataSet counting
				for(;t_index < timeDataSet.length;t_index++){
					if(timeDataSet[t_index].Time == odata[i].Time){
						timeDataSet[t_index].count++;
						break;
					}						
					
				}
				if(t_index >= timeDataSet.length){
					timeDataSet[t_index] = {};
					timeDataSet[t_index].Time = odata[i].Time;
					timeDataSet[t_index].count = 1;
				}
			}
			if(odata[i].Source){
				var s_index = 0;//sourceDataSet index
				//sourceDataSet counting
				for(;s_index < sourceDataSet.length;s_index++){
					if(sourceDataSet[s_index].Source == odata[i].Source){
						sourceDataSet[s_index].count++;
						break;
					}						
					
				}
				if(s_index >= sourceDataSet.length){
					sourceDataSet[s_index] = {};
					sourceDataSet[s_index].Source = odata[i].Source;
					sourceDataSet[s_index].count = 1;
				}
			}
				
				
			
		}
		
		var oCompanyChart = this.drawChart("Company","pie",companyDataSet);
		var oFieldChart = this.drawChart("Field","pie",fieldDataSet);
		var oTimeChart = this.drawChart("Time","line",timeDataSet);
		var oSourceChart = this.drawChart("Source","pie",sourceDataSet);
		
		
		var oPanel = sap.ui.getCore().byId(this.createId("panel2Id"));
	 	oPanel.removeAllContent();
	 	oPanel.addContent(oCompanyChart);
	 	oPanel.addContent(oFieldChart);
	 	oPanel.addContent(oTimeChart);
	 	oPanel.addContent(oSourceChart);
		
		
	 	var myElements = document.getElementsByClassName("matrixStyle");		 
		myElements[0].style.marginTop = "0.5em";
		
		var panelid = "#" + this.createId("panel2Id");
		$("#panel1Id").show();
		$(panelid).show();
		$("#panel3Id").show();
		$("#panel4Id").show();
		
	},
	goContent:function(){
		
		
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
	    var oHashChanger = new sap.ui.core.routing.HashChanger();
	    oHashChanger.setHash(oRouter.getURL("ContentView"));
		
	},
	
	drawChart:function(chartName,chartType,dataSet){
		if(dataSet.length < 1){
			dataSet[0] = {};
			dataSet[0][chartName] = "No "+chartName;
			dataSet[0].count = 0;
			
		}
		var DataModel = new sap.ui.model.json.JSONModel();
		DataModel.setData(dataSet);
		
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [ {
				axis : 1,
				name : chartName,
				value : "{"+chartName+"}"
			} ],
			measures : [ {
				name : "Count",
				value : "{count}"
			} ],
			data : {
				path : "/"
			}
		});
			
		oDataset.setModel(DataModel);
		var oChart = 0;
		if(chartType == "pie"){
			oChart = sap.ui.getCore().byId(chartName+"PieChart");
			oChart.removeAllFeeds();
			oChart.setVizType("pie");
			oChart.setDataset(oDataset);
			    
			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			    	'uid': "size",
			    	'type': "Measure",
			    	'values': ["Count"]
			 }),
			    
			 feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			    	'uid': "color",
			    	'type': "Dimension",
			    	'values': [chartName]
			 });
			oChart.setVizProperties({
				title:{
					text:chartName,
			    	visible:true
			    }
			   
			 });
		}
		else if(chartType == "line"){
		    oChart = sap.ui.getCore().byId(chartName+"LineChart");
			oChart.removeAllFeeds();
			oChart.setVizType("line");
			oChart.setDataset(oDataset);
			    
			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			    	'uid': "valueAxis",
			    	'type': "Measure",
			    	'values': ["Count"]
			 }),
			    
			 feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			    	'uid': "categoryAxis",
			    	'type': "Dimension",
			    	'values': [chartName]
			 });
			
			
			oChart.setVizProperties({
				title:{
					text:chartName,
					visible:true
			    	},
			    valueAxis: {
			    	 title :{
			    	 	visible:false
			    	 }
			    	 			
			    },
			    categoryAxis:{
			    	title:{
			    		visible:false
			    	 }
			    }
			 });
		}
		
		    
		    
		oChart.addFeed(feedValueAxis);
		oChart.addFeed(feedCategoryAxis);	
		    
		
		return oChart;
	},
	wordsCouting:function(model,entitySet){
		var data = model.getData();
		if(data.length > 0){
			var requestObj = {    			
	    			requestUri: "",
	    			method: "GET",
	    			async:false,
	    			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/atom+xml",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",
	    				"Accept": "application/atom+xml"
						
	    			}
	    	}; 		
			var id = data[0].Id; 
			var cou = id.substring(0,id.indexOf("+"));
			var Count = cou + '.0';
			var keyWordsNum = [];
			requestObj.requestUri = "proxy/http/dewdflssc5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/"+entitySet+"?$filter=Cou eq '"+Count+"'";
			OData.request(requestObj,function(data,response){
				for(var i = 0;i < data.results.length;i++){
					keyWordsNum[i] = {};
					keyWordsNum[i].word = data.results[i].FrequentWord;
					keyWordsNum[i].num = data.results[i].Num;
				}
			});
			for(var i = 1;i < data.length;i++){
				id = data[i].Id; 
				if(cou != id.substring(0,id.indexOf("+"))){
					cou = id.substring(0,id.indexOf("+"));
					Count = cou + '.0';
					requestObj.requestUri = "proxy/http/dewdflssc5446.emea.global.corp.sap:8000/sap/opu/odata/sap/Z_GXQ_TEST1_SRV/"+entitySet+"?$filter=Cou eq '"+Count+"'";
					OData.request(requestObj,function(data,response){
						for(var j = 0;j < data.results.length;j++){							
							keyWordsNum[j].num = Number(keyWordsNum[j].num)+Number(data.results[j].Num);
						}
					});
				}				
				
				
			}
			
			var panel3 = sap.ui.getCore().byId("panel3Id");
			panel3.removeAllContent();
			for(var i = 0;i < keyWordsNum.length && keyWordsNum[i].num != 0;i++){
				panel3.addContent(
						new sap.ui.commons.Label({text:keyWordsNum[i].word+'：'+keyWordsNum[i].num.toString()}).addStyleClass("keyWordLabel")
						
				);
				
				
			}
			
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

});