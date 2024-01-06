var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = SpreadsheetApp.getActiveSheet();
var templateSheet = spreadsheet.getSheetByName("TEMPLATE") // Sheet Template
var major=['AS','BE','BI','BM','BT','CH','IM','IN','MA','ME','SC','PI','PL','PY']
var fixsheet=['INSTRUCTION','TEMPLATE','EMAIL']
var requiredsheet=fixsheet.concat(major.filter(x => !fixsheet.includes(x)))
var allsheet = spreadsheet.getSheets();
var sheetname = new Array()
allsheet.forEach(function(value){
  sheetname.push(value.getName())
})
// Logger.log(spreadsheet.getSheetByName('TEMPLATE')!=null)
function onEdit(e){
  Vanish()
  var email = Session.getActiveUser().getEmail();
  var me = Session.getEffectiveUser();
  if(!fixsheet.includes(e.range.getSheet().getName()) && e.range.getColumn()===1 && 2<e.range.getRow()<7){
    if(e.range.isChecked()){
      sheet.getRange(e.range.getRow(),2).setValue(email);
    }
    else{
      sheet.getRange(e.range.getRow(),2).clearContent();
    }
    var protectcheck = sheet.getRange(3,1,4,1).getValues()
    var emailprotection = sheet.getRange(3,2,4,1).getValues()
    var array = new Array
    protectcheck.forEach(function(value){array.push(value[0])});
    var checker = arr => arr.every(v => v === true);
    var protection = sheet.protect()
    if(checker(array)===true){
      protection.addEditor(me);
      protection.removeEditors(protection.getEditors());
      emailprotection.forEach(function(value,i){protection.addEditor(emailprotection[i][0])})
      protection.setDomainEdit(false);
    }
    else{
      protection.remove()
    }
  }
}

function Vanish() {
  sheetname.forEach(function(value){
    if (!requiredsheet.includes(value)){
    spreadsheet.deleteSheet(spreadsheet.getSheetByName(value));
    }
  })  
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Menu')
    .addItem('New Sheet', 'newClass')
    .addToUi();
}

function newClass(){
  do {
    var code = getSingleInput("Enter your major (CH) or click Cancel"); // below function
  } 
  // while (!sheetname.includes(code) || !major.includes(code))
  while (spreadsheet.getSheetByName(code)!=null || sheetname.includes(code))
  if ((code==undefined)||(code=="")){
    return;
  }
  else {
    templateSheet.copyTo(spreadsheet).setName(code).activate().getRange(1,1,1,1).setValue("แบบฟอร์มลงสมัครแข่งขันกีฬา Major Games 2023 ("+code+")")
  }
}

function getSingleInput(promptText){
  var ui = SpreadsheetApp.getUi();
  var title = "New Sheet"; // Header text of UI
  do {
    var ok = false;
    var returnedResult = undefined;
    var result = ui.prompt(title,promptText,ui.ButtonSet.OK_CANCEL); // UI INTERFACE (PromptResponse)
    var resultText = result.getResponseText(); // get promptText
    var resultButton = result.getSelectedButton(); // get BottonSet
    if (resultButton == ui.Button.OK && major.includes(resultText)) {
    // if (resultButton == ui.Button.OK) {
      returnedResult = resultText; 
      ok = true; 
    }
    else{ok = true}
  }
  while (!ok) // ok == true => break
  return returnedResult;
}
