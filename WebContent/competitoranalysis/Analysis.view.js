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
		
		var oMatrix = new sap.ui.commons.layout.MatrixLayout(this.createId("searchMatrixId"));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Company"}),
				new sap.ui.commons.Label({text:"Field"}),
				new sap.ui.commons.Label({text:"Keyword"}),
				new sap.ui.commons.Label({text:"Time"}),
				new sap.ui.commons.Label({text:"Orderby"}),
				new sap.ui.commons.Label({text:"Source"})
		);
		oMatrix.createRow(
				new sap.ui.commons.DropdownBox(this.createId("companyBoxId")),
				new sap.ui.commons.DropdownBox(this.createId("fieldBoxId")),
				new sap.ui.commons.TextField(this.createId("keywordFieldId")),
				new sap.ui.commons.DropdownBox(this.createId("timeBoxId")),
				new sap.ui.commons.DropdownBox(this.createId("orderbyBoxId")),
				new sap.ui.commons.DropdownBox(this.createId("sourceBoxId")),
				new sap.ui.commons.Button(this.createId("searchBtnId"),{
					text:"Search",
					width:"100px",
					press: function(){
						
					}
				})
		);
		var oPanel1 = new sap.ui.commons.Panel(this.createId("panel1Id"),{
			text:"panel1",
			width:"100%",
			height:"20%"
			
		});
		var oPanel2 = new sap.ui.commons.Panel(this.createId("panel2Id"),{
			text:"panel2",
			width:"50%",
			height:"35%"
		});
		var oPanel3 = new sap.ui.commons.Panel(this.createId("panel3Id"),{
			text:"panel3",
			width:"50%",
			height:"35%"
		});
		var oPanel4 = new sap.ui.commons.Panel(this.createId("panel4Id"),{
			text:"panel4",
			width:"80%",
			height:"30%"
			
		});
		
		
		var oPage = new sap.m.Page({
			title:"Competitor Analysis",
			content:[
			   oMatrix,
			   oPanel1,
			   oPanel2,
			   oPanel3,
			   oPanel4
			
			]
		});
		
		
		return oPage;

	}

});
