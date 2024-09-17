function onEdit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("สถานะการขอยืมกุญแจห้องสนว");
  var sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("สถานะการขอยืมพัสดุ");
  // var email = Session.getActiveUser().getEmail();
  var thisRow = e.range.getRow();
  var thisCol = e.range.getColumn();
  var columnToCheck = sheet.getRange("B:B").getValues();
  var lastRow = getLastRowSpecial(columnToCheck);
  var columnToCheck2 = sheet2.getRange("B:B").getValues();
  var lastRow2 = getLastRowSpecial(columnToCheck2);
  if (!(sheet.getRange(lastRow,2).isBlank())&&sheet.getRange(lastRow,7).isBlank()){
  sheet.getRange(lastRow,7).insertCheckboxes();
  }
  // if (thisCol===6 && e.range.getValue()===true && e.range.getSheet().getName()==="การขอยืมกุญแจห้องสนว (Hide)"){
  // sheet.hideRows(thisRow,1);
  // }
  if (!(sheet2.getRange(lastRow2,2).isBlank())&&sheet2.getRange(lastRow2,6).isBlank()){
  sheet2.getRange(lastRow2,6).insertCheckboxes();
  }
  if (thisCol===6 && e.range.getValue()===true && e.range.getSheet().getName()==="สถานะการขอยืมพัสดุ"){
  sheet2.hideRows(thisRow,1);
  // sheet2.getRange(thisRow,thisCol+1).setValue(email);
  // e.range.setComment("Last modified: " + (new Date())+' by '+Session.getActiveUser().getEmail());
  }
}

function getLastRowSpecial(range){
  var rowNum = 0;
  var blank = false;
  for(var row = 0; row < range.length; row++){
 
    if(range[row][0] === "" && !blank){
      rowNum = row;
      blank = true;
    }else if(range[row][0] !== ""){
      blank = false;
    };
  };
  return rowNum;
};
