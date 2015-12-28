sap.ui.controller("competitoranalysis.Analysis", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf competitoranalysis.Analysis
*/
	onInit: function() {

	
	var data = {
		"Company":[
		{"Name":"SAP"},
		{"Name":"IBM"},
		{"Name":"Oracle"}
		],
		"Field":[
		{"Name":"Medical"},
		{"Name":"Finance"},
		{"Name":"Retail"}
		],
		"Source":[
		{"Name":"IT专家网"},
		{"Name":"IT商业网"} 
		]
	}
	
	var oDropbox = sap.ui.getCore().byId(this.createId("companyBoxId"));
    var oJSONModel = new sap.ui.model.json.JSONModel();
	oJSONModel.setData(data);
	
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

			
//piechart

	
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
	
	
	var piedata = {
		"PieData":[
		{
			"City":"Shanghai",
			"AirQuality":"300"
		},	
		{
			"City":"Beijing",
			"AirQuality":"1000"
		},	
		{
			"City":"Hangzhou",
			"AirQuality":"500"
		}
		]
	};
	var pieModel = new sap.ui.model.json.JSONModel();
	pieModel.setData(piedata);
		
		
	var PieChart = sap.ui.getCore().byId(this.createId("PieChart"));	
	PieChart.removeAllFeeds();
	PieChart.setVizType("pie");
	
	var oDataset = new sap.viz.ui5.data.FlattenedDataset({
		dimensions : [ {
				axis : 1,
				name : "City",
				value : "{City}"
			} ],
			measures :  [{
				name : "AirQuality",
				value : "{AirQuality}"
			} ],
			data : {
				path : "/PieData"
			}
	});
	oDataset.setModel(pieModel);
	PieChart.setDataset(oDataset);
	
		var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "size",
                    'type': "Measure",
                    'values': ["AirQuality"]
                }),
       feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "color",
                    'type': "Dimension",
                    'values': ["City"]
                });
				PieChart.addFeed(feedValueAxis);
				PieChart.addFeed(feedCategoryAxis);
	
	
	  PieChart.setVizProperties({
               
                title: {
                    visible: false,
                }
            });
	
				
	    var oPanel = sap.ui.getCore().byId(this.createId("panel2Id"));
	 	oPanel.removeContent(PieChart);
	 	oPanel.addContent(PieChart);
		//oPanel.hide();
		
		
		
		var panelid = "#" + this.createId("panel2Id");
		$("#panel1Id").show();
		$(panelid).show();
		$("#panel3Id").show();
		$("#panel4Id").show();
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

});