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

  ChooseMAJOR()
  
  var check2 = sheet.getRange('D4');
  if (check2.isChecked()){
    sheet.hideSheet();
  }
}

function ChooseMAJOR(){
  // var sheet = SpreadsheetApp.getActiveSheet();
  var allsheet = SpreadsheetApp.getActiveSpreadsheet().getSheets(); // Get all Sheets in this Spreadsheet
  var sheetname = new Array()
  for (var i=0 ; i<allsheet.length ; i++) sheetname.push(allsheet[i].getName());
  var allmajor = ["AS1", "AS2", "AS3", "AS4", "IMDS1", "IMDS2", "IMDS3", "IMDS4","MA2","MA3","MA4","GRAD"];
  
  ///// Drop-down for choosing major (Data validation).
  var major = allmajor.filter(x => !sheetname.includes(x)); // differ of allmajor by sheetname
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(major).build(); // set data validation rule
  sheet.getRange('D3').setDataValidation(rule); // choose range datavalidation
  
  ///// Sorting formula in the Conclusion sheet.
  var majorselected = allmajor.filter(x => sheetname.includes(x)); // intersection of allmajor and out
  // using forEach loop for print selected major in a formula. we can see also 'map' and 'filter' method.
  var filterrange = [];
  var filtercondition = [];
  majorselected.forEach(function(majorvalue,index, majorarray) {
    filterrange.push("\'"+majorselected[index]+"\'!A7:H");
    filtercondition.push("\'"+majorselected[index]+"\'!A7:A");
  }); 
  var constantsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Conclusion");
  var formula = "=SORT(FILTER({" + filterrange.join(";") + "},\nNOT(ISBLANK({"+filtercondition.join(";") +"}))),D5,TRUE)"; // set formula rule
  constantsSheet.getRange("A7").setFormula(formula); // choose range formula
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

// function GetAllSheetNames() {
// var out = new Array()
// var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
// for (var i=0 ; i<sheets.length ; i++) out.push( [ sheets[i].getName() ] )
// return out 
// }


// var nums = [ 1, 3, 5, 7];
// console.log(nums.includes(3));


///// Add Custom menu
// function onOpen() {
//   var menu = [{name: "Duplicate sheet", functionName: "Duplicate"}];
//   SpreadsheetApp.getActiveSpreadsheet().addMenu("Custom", menu);
//   // SpreadsheetApp.getActiveSpreadsheet().removeMenu("Custom")
// }
// function Duplicate() {
//   var spreadsheet = SpreadsheetApp.getActive();
//   spreadsheet.getRange('A1').activate();
//   spreadsheet.duplicateActiveSheet();
// };

// function dupName() {
//   var ss = SpreadsheetApp.getActiveSpreadsheet();
//   var sheet = ss.getActiveSheet();
//   var name = Browser.inputBox('Enter new sheet name');
//   ss.insertSheet(name, {template: sheet});
// }
