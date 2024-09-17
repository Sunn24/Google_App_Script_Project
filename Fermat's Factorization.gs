function onEdit() {
  // var sheet = SpreadsheetApp.getActiveSheet();
  var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Fermat");
  var value=sheet.getRange('B3').getValue();

  var logsheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logger");
  // var email = Session.getActiveUser().getEmail();
  var email = Session.getEffectiveUser().getEmail();

  // Clear All
  sheet.getRange('D3:F3').clearContent();
  sheet.getRange('D5:E5').clearContent();
  sheet.getRange('A9:D').clearContent(); //reset value

  // Iteration
  sheet.getRange('A2').setValue("Don't change integer");
  if (value%2===0){
    sheet.getRange('D3').setValue("It's not an odd integer");
  }
  else if (Number.isInteger(Math.sqrt(value))){
    sheet.getRange('D3:F3').setValues([[Math.sqrt(value),Math.sqrt(value),0]]);
    logsheet.appendRow([new Date(),email,sheet.getRange('B3').getValue(),sheet.getRange('D3').getValue(),sheet.getRange('E3').getValue(),sheet.getRange('F3').getValue(),sheet.getRange('G3').getValue()]);
  }
  else{
    var initial =Math.ceil(Math.sqrt(value));
    sheet.getRange(9,1,1,4).setValues([[1,Math.pow(initial,2),value,Math.pow(initial,2)-value]]);
    var select=sheet.getRange(9,4).getValue();
    var i=0
    // console.log(Number.isInteger(Math.sqrt(select)))
    while(!Number.isInteger(Math.sqrt(select))){
      i++;
      initial++;
      sheet.getRange(9+i,1,1,4).setValues([[i+1,Math.pow(initial,2),value,Math.pow(initial,2)-value]]);
      var select=sheet.getRange(9+i,4).getValue();
      // console.log(select)
    }
    sheet.getRange('D3:F3').setValues([[initial+Math.sqrt(select),initial-Math.sqrt(select),i+1]]);
    sheet.getRange('D5:E5').setValues([[initial,Math.sqrt(select)]]);
    logsheet.appendRow([new Date(),email,sheet.getRange('B3').getValue(),sheet.getRange('D3').getValue(),sheet.getRange('E3').getValue(),sheet.getRange('F3').getValue(),sheet.getRange('G3').getValue()]);
  }
  sheet.getRange('A2').setValue("You can change integer");
}
