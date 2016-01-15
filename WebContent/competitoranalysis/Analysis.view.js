sap.ui.jsview("competitoranalysis.Analysis", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf competitoranalysis.Analysis
	*/ 
	getControllerName : function() {
		return "competitoranalysis.Analysis";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf competitoranalysis.Analysis
	*/ 
	createContent : function(oController) {
		var oMatrix = new sap.ui.commons.layout.MatrixLayout("searchMatrixId",{
			width:"700px",
			column:5
		}).addStyleClass("matrixStyle");
		oMatrix.createRow(
				
				new sap.ui.commons.Label({text:"Company"}).addStyleClass("CompanyStyle"),
				new sap.ui.commons.Label({text:"Field"}).addStyleClass("FieldStyle"),				
				new sap.ui.commons.Label({text:"Time"}).addStyleClass("TimeStyle"),
				new sap.ui.commons.Label({text:"Orderby"}).addStyleClass("OrderbyStyle"),
				new sap.ui.commons.Label({text:"Source"}).addStyleClass("SourceStyle")
				
				
		);
		
		oMatrix.createRow(
				
				new sap.ui.commons.DropdownBox(this.createId("companyBoxId")).addStyleClass("companyBoxStyle"),
				new sap.ui.commons.DropdownBox(this.createId("fieldBoxId")).addStyleClass("fieldBoxStyle"),				
				new sap.ui.commons.DropdownBox(this.createId("timeBoxId")).addStyleClass("timeBoxStyle"),
				new sap.ui.commons.DropdownBox(this.createId("orderbyBoxId")).addStyleClass("orderbyBoxStyle"),
				new sap.ui.commons.DropdownBox(this.createId("sourceBoxId")).addStyleClass("sourceBoxStyle")
		
		);
		
		var oPanel1 = new sap.ui.commons.Panel("panel1Id",{
			text:" Related news",
			width:"100%",
			height:"20%"
			
			
		});
		var oPanel2 = new sap.ui.commons.Panel(this.createId("panel2Id"),{
			text:" Visual graphs",
			width:"62%",
			height:"500px",
			content:[
			         new sap.viz.ui5.controls.VizFrame({  
					    	id : "CompanyPieChart",
					    	title:"Company",
					    	width : "50%",
					    	height : "50%"
					    }).addStyleClass("ChartStyle"),
					  new sap.viz.ui5.controls.VizFrame({  
					    	id : "FieldPieChart",
					    	title:"Field",
					    	width : "50%",
					    	height : "50%"
					    }).addStyleClass("ChartStyle"),
					  new sap.viz.ui5.controls.VizFrame({  
					    	id : "TimeLineChart",
					    	title:"Time",
					    	width : "50%",
					    	height : "50%"
					    }).addStyleClass("ChartStyle"),
					  new sap.viz.ui5.controls.VizFrame({  
					    	id : "SourcePieChart",
					    	title:"Source",
					    	width : "50%",
					    	height : "50%"
					   }).addStyleClass("ChartStyle")	
			
			
			
			
			]
		}).addStyleClass("Panel2StyleClass");
		var oPanel3 = new sap.ui.commons.Panel("panel3Id",{
			text:"Frequent words",
			width:"38%",
			height:"500px",
			content:[
			    
			    new sap.m.TextArea({
			    	width:"100%",
			    	height:"100%",
			    	value:"热词显示图以及与热词相关的新闻"
			    })
			    
			]
		}).addStyleClass("Panel3StyleClass");
		var oPanel4 = new sap.ui.commons.Panel("panel4Id",{
			text:" Analytical contents",
			width:"100%",
			height:"30%",
			content:[
					    
					    new sap.m.TextArea({
					    	width:"100%",
					    	height:"100%",
					    	value:"分析文本：例如\n" +
					    			"2015年期间，IBM在医疗领域备受关注，其中点击量前三的新闻有http://###########"
					    })
					    
		    ]
			
		});
		
		
		var oPage = new sap.m.Page({
			showHeader:false,			
			content:[
			  
			  oMatrix,
			   
			   new sap.ui.commons.TextField(this.createId("searchInfoFieldId"),{
				   width:"700px",
				   change:function(){
					   oController.search();
				   }
			   }).addStyleClass("keywordstyle"),
			   new sap.ui.commons.Button(this.createId("searchBtnId"),{
					text:"Search",
					press: function(){
						oController.search();
					}
				}).addStyleClass("SearchBtn"),
			   oPanel1,
			   oPanel2,
			   oPanel3,
			   oPanel4
			
			]
		});
		
		
		return oPage;

	}

});
