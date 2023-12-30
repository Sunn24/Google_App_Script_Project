function onEdit(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  // Get email
  var email = Session.getActiveUser().getEmail(); // users
  var me = Session.getEffectiveUser(); // owner
  // Recording timestamp with email
  var timestampsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Timestamp"); // Calling Timestamp sheet
  timestampsheet.appendRow([new Date(),email,e.range.getSheet().getName(),e.range.getA1Notation()]); // Timestamp recording
  // e.range.getRow(); if get only row of event
  // e.range.getColumn(); if get only column of event
  ///// Protect Sheet by user email.
  var check = sheet.getRange('D1');
  var cellValue = sheet.getRange('D3'); // Choose cell value
  if (check.isChecked() && sheet.getRange('E1').isBlank()){
    sheet.getRange('E1').setValue(email);
    var protection = sheet.protect()
    protection.addEditor(me);
    protection.removeEditors(protection.getEditors()); // remove another editors
    protection.setDomainEdit(false); // Organization can't edit this sheet
    protection.addEditor(email) //.setDescription("Only " + email + " has edit rights");
  }
  // else if (check.isChecked()&&!sheet.getRange('E1').isBlank()){
  //   sheet.getRange('E1').setValue(email);
  // }
  else if( !(check.isChecked() || sheet.getRange('E1').isBlank()) ){
    sheet.getRange('E1').clearContent(); // clear cell
    var protection = sheet.protect()
    protection.addEditor(me);
    protection.removeEditors(protection.getEditors()); // remove another editors
    protection.setDomainEdit(true); // Organization can edit this sheet
  }

  ///// Choose MAJOR and set sheet name.
  if (check.isChecked()&&cellValue.isBlank()){
  sheet.showRows(2,2);
  }
  else if (!cellValue.isBlank()){
    sheet.setName(cellValue.getValue()); // Change sheet name
    sheet.showRows(4,sheet.getMaxRows()-3);
    sheet.hideRows(1,3);
    sheet.setFrozenRows(6);
  }
  ///// Drop-down for choosing major (Data validation).
  ChooseMAJOR()
  ///// Sorting formula in the Conclusion sheet.
  var major2 = allmajor.filter(x => out.includes(x));//in
  var constantsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Conclusion");
  var data = [];
  var data2= [];
  major2.forEach(function(url, index) {
    data.push("\'"+major2[index]+"\'!A7:H");
    data2.push("\'"+major2[index]+"\'!A7:A");
  });
  var formula = "=SORT(FILTER({" + data.join(";") + "},\nNOT(ISBLANK({"+data2.join(";") +"}))),D5,TRUE)";
  constantsSheet.getRange("A7").setFormula(formula);
  console.log(sheet.getRange('E1').isBlank());

  var check2 = sheet.getRange('D4');
  if (check2.isChecked()){
    sheet.hideSheet();
  }

function ChooseMAJOR(){
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets(); // Get all Sheets in this Spreadsheet
  var out = new Array()
  for (var i=0 ; i<sheets.length ; i++) out.push(sheets[i].getName());
  var select = sheet.getRange('D3');
  var allmajor = ["AS1", "AS2", "AS3", "AS4", "IMDS1", "IMDS2", "IMDS3", "IMDS4","MA2","MA3","MA4","GRAD"];
  var major = allmajor.filter(x => !out.includes(x)); // intersection of allmajor and out
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(major).build();
  select.setDataValidation(rule); // dropdown 
}

  

// function Hide() {
//   var spreadsheet = SpreadsheetApp.getActive();
//   var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
//   var out = new Array()
//   for (var i=0 ; i<sheets.length ; i++) out.push(sheets[i].getName());
//   out.forEach(function(value,index){
//     if (sheets[index].getName()!=="Filter"){
//     spreadsheet.getSheetByName(sheets[index].getName()).hideSheet();
//     }})};
}

// function GetAllSheetNames() {
// var out = new Array()
// var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
// for (var i=0 ; i<sheets.length ; i++) out.push( [ sheets[i].getName() ] )
// return out 
// }


// var nums = [ 1, 3, 5, 7];
// console.log(nums.includes(3));

// function onOpen() {
//   var menu = [{name: "Duplicate sheet", functionName: "Duplicate"}];
//   SpreadsheetApp.getActiveSpreadsheet().addMenu("Custom", menu);
//   // SpreadsheetApp.getActiveSpreadsheet().removeMenu("Custom")
// }

// function dupName() {
//   var ss = SpreadsheetApp.getActiveSpreadsheet();
//   var sheet = ss.getActiveSheet();
//   var name = Browser.inputBox('Enter new sheet name');
//   ss.insertSheet(name, {template: sheet});
// }

// function Duplicate() {
//   var spreadsheet = SpreadsheetApp.getActive();
//   spreadsheet.getRange('A1').activate();
//   spreadsheet.duplicateActiveSheet();
// };
