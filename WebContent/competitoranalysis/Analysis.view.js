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
				new sap.ui.commons.DropdownBox(this.createId("sourceBoxId"))
		);
		return oMatrix;

	}

});
