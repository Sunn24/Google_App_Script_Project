<h1> Google Spreadsheets Template with Google App Script</h1> 

* Integral Day Spreadsheets (Restricted editor, Remove choice in drop-down after selected, Create log)\
**\* support for organization google account**\
<a href="https://docs.google.com/spreadsheets/d/1mbdinVrVSfCOg-IhTKS9wijIrcD6kpU6OI8CuOUQBnM/view">(view sheet)</a>&emsp;
<a href="https://docs.google.com/spreadsheets/d/1mbdinVrVSfCOg-IhTKS9wijIrcD6kpU6OI8CuOUQBnM/template/preview">(template)</a>&emsp;
<a href="https://github.com/Sunn24/Google_App_Script_Project/blob/main/Integral%20Day.gs">(script)</a>

* SMO 2023 Spreadsheets\
<a href="https://docs.google.com/spreadsheets/d/1CnQyU8MZCyiXljuRo4zY8-sYZIzswMlbsmnQF4Jx750/view">(view sheet)</a>&emsp;
<a href="https://docs.google.com/spreadsheets/d/1CnQyU8MZCyiXljuRo4zY8-sYZIzswMlbsmnQF4Jx750/template/preview">(template)</a>&emsp;
<a href="https://github.com/Sunn24/Google_App_Script_Project/blob/main/SMO%20Google%20Sheet.gs">(script)</a>

* Fermat's Factorization Virtualize Spreadsheets\
<a href="https://docs.google.com/spreadsheets/d/1lInRBG6kQhh8O2SUpPTJ9NZ_3vZ3i2rk4NBUNAxkiGA/view">(view sheet)</a>&emsp;
<a href="https://docs.google.com/spreadsheets/d/1lInRBG6kQhh8O2SUpPTJ9NZ_3vZ3i2rk4NBUNAxkiGA/template/preview">(template)</a>&emsp;
<a href="https://github.com/Sunn24/Google_App_Script_Project/blob/main/Fermat's%20Factorization.gs">(script)</a>

* Create Google Form from Spreadsheets in Open House 2023\
<a href="https://docs.google.com/spreadsheets/d/1FIUapGxNPEG6yHmHmzRlSbHXz49ZMt2kjlBTaOogrAE/view">(view sheet)</a>&emsp;
<a href="https://docs.google.com/spreadsheets/d/1FIUapGxNPEG6yHmHmzRlSbHXz49ZMt2kjlBTaOogrAE/template/preview">(template)</a>&emsp;
<a href="https://github.com/Sunn24/Google_App_Script_Project/blob/main/Google%20Form%20Create%20(Open%20House).gs">(script)</a>

* Create Google Form from Spreadsheets in MAS Camp 34<sup>th</sup>\
<a href="https://docs.google.com/spreadsheets/d/1cjsme_qg9R8hskDV-ireEaR5xnIwCetusq0rgXeuMD8/view">(view sheet)</a>&emsp;
<a href="https://docs.google.com/spreadsheets/d/1cjsme_qg9R8hskDV-ireEaR5xnIwCetusq0rgXeuMD8/template/preview">(template)</a>&emsp;
<a href="https://github.com/Sunn24/Google_App_Script_Project/blob/main/Google%20Form%20Create%20(MAS%20Camp).gs">(script)</a>

* Major Game 2024 Spreadsheets (Create namelist from google docs and create certificate from google slides)\
<a href="https://docs.google.com/spreadsheets/d/1GCaPG_1-49phUsrsGEOZjv31dljlD6LRCnvPGwl6Pm8/view">(view sheet)</a>&emsp;
<a href="https://docs.google.com/spreadsheets/d/1GCaPG_1-49phUsrsGEOZjv31dljlD6LRCnvPGwl6Pm8/template/preview">(template)</a>&emsp;
<a href="https://github.com/Sunn24/Google_App_Script_Project/blob/main/Major%20game%202024.gs">(script)</a>

<!-- ```javascript
function onSelectionChange(){
// var now = new Date();
// var deadline = new Date(2023, 7, 8);
// if (now > deadline){
//   // Vanish()
// Hide()
  // }
}

function onEdit(e){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var comment = spreadsheet.getSheetByName("Filter").getRange("B2");
  comment.setComment("Last modified: " + (new Date())+' by '+Session.getActiveUser());
  var st = spreadsheet.getSheetByName("Timestamp");
  var email = Session.getActiveUser().getEmail();
  st.appendRow([new Date(),email,e.range.getSheet().getName(),e.range.getA1Notation()]);

}

function Vanish() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.insertSheet().setName("Sheet1");
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var out = new Array()
  for (var i=0 ; i<sheets.length ; i++) out.push(sheets[i].getName());
  out.forEach(function(value,index){
    if (sheets[index].getName()!=="Sheet1"){
    spreadsheet.deleteSheet(spreadsheet.getSheetByName(sheets[index].getName()));
    }})};

function Hide() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var out = new Array()
  for (var i=0 ; i<sheets.length ; i++) out.push(sheets[i].getName());
  out.forEach(function(value,index){
    if (sheets[index].getName()!=="Filter"){
    spreadsheet.getSheetByName(sheets[index].getName()).hideSheet();
    }})};

// function TimestampEdit(){
//   var selectsheet = SpreadsheetApp.getActiveSpreadsheet.getSheetbyName("Timestamp");
//   selectsheet.appendRow();

// }
``` -->
