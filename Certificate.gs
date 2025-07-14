var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = SpreadsheetApp.getActiveSheet();
var templateSheet = spreadsheet.getSheetByName("TEMPLATE") // Sheet Template
var majorlist=['AS','BE','BI','BM','BT','CH','IM','IN','MA','ME','SC','PI','PL','PY']
var majorlistname=['สาขา คณิตศาสตร์ประกันภัย','สาขา ทรัพยากรชีวภาพและชีววิทยาสภาวะแวดล้อม','สาขา ชีววิทยา','สาขา วิทยาศาสตร์ชีวการแพทย์','สาขา เทคโนโลยีชีวภาพ','สาขา เคมี','สาขา คณิตศาสตร์อุตสาหการและวิทยาการข้อมูล','สาขา ชีวนวัตกรรม','สาขา คณิตศาสตร์','สาขา วัสดุศาสตร์และวิศวกรรมนาโน','หลักสูตรไทย','โครงการผลิตแพทย์เพื่อชนบท','สาขา พฤกษศาสตร์','สาขา ฟิสิกส์'];
var fixsheet=['INSTRUCTION','TEMPLATE','EMAIL','CERTIFICATES']
var requiredsheet=fixsheet.concat(majorlist.filter(x => !fixsheet.includes(x)))
var allsheet = spreadsheet.getSheets();
var sheetname = new Array()
allsheet.forEach(function(value){
  sheetname.push(value.getName())
})

// Google Sheet form edit 
function onEdit(){
  text=sheet.getRange(1,1).getValue();
  text='แบบฟอร์มลงสมัครแข่งขันกีฬา Major Games 2023 (MA)';
  // Vanish()
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
    .addItem('Create New Sheet', 'newSheet')
    .addSeparator()
    .addItem('Create Namelist','nameList')
    .addItem('Create Certificates', 'createCertificates')
    .addToUi();
}

//// New sheet button
function newSheet(){
  do {
    var code = getSingleInput("Enter your major (CH) or click Cancel"); // below function
  } 
  // while (!sheetname.includes(code) || !majorlist.includes(code))
  while (spreadsheet.getSheetByName(code)!=null || sheetname.includes(code))
  if ((code==undefined)||(code=="")){
    return;
  }
  else {
    templateSheet.copyTo(spreadsheet).setName(code).activate().getRange(1,1,1,1).setValue("แบบฟอร์มลงสมัครแข่งขันกีฬา Major Games 2023 ("+code+")")
  }
}

//// Ui window
function getSingleInput(promptText){
  var ui = SpreadsheetApp.getUi();
  var title = "New Sheet"; // Header text of UI
  do {
    var ok = false;
    var returnedResult = undefined;
    var result = ui.prompt(title,promptText,ui.ButtonSet.OK_CANCEL); // UI INTERFACE (PromptResponse)
    var resultText = result.getResponseText(); // get promptText
    var resultButton = result.getSelectedButton(); // get BottonSet
    if (resultButton == ui.Button.OK && majorlist.includes(resultText)) {
    // if (resultButton == ui.Button.OK) {
      returnedResult = resultText; 
      ok = true; 
    }
    else{ok = true}
  }
  while (!ok) // ok == true => break
  return returnedResult;
}

//// Certificate button
const slideTemplateId = '1IMDIxo7FWUTI70IsZY-dsH7G9TjNMMENYbWK0yyh_BQ'; // Load the Google Slide template file
const folderTemplateId = '1dFwmOPu1CThjDjJrLMq1cK_gVKbdSl6n'; // Any folder in Google Drive 

function createCertificates() {
  //// Loading folder for collect certificate
  const createNewFolderId = DriveApp.getFolderById(folderTemplateId).createFolder('เกียรติบัตรรางวัล').setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW).getId();
  // const createSportFolderId = DriveApp.getFolderById(folderTemplateId).createFolder('เกียรติบัตรเข้าร่วม').setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW).getId();
  // const createStaffFolderId = DriveApp.getFolderById(folderTemplateId).createFolder('เกียรติบัตรstaff').setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW).getId();

  const certificatesheet = spreadsheet.getSheetByName('CERTIFICATES');
  //// called table (include header)
  const values = certificatesheet.getRange(2,1,certificatesheet.getLastRow()-1,certificatesheet.getLastColumn()).getValues();
  // const sport = certificatesheet.getRange(3,3).getValue();
  
  //// identify header
  const headers = values[0];
  // const typeIndex = headers.indexOf('ประเภท');
  const nameIndex = headers.indexOf('ชื่อ');
  const lastnameIndex = headers.indexOf('นามสกุล');
  // const majorIndex = headers.indexOf('สาขา');
  const awardIndex = headers.indexOf('รางวัล');
  const sportIndex = headers.indexOf('กีฬา');
  const pdfurlIndex = headers.indexOf('LINK');
  
  const folderTemplate = DriveApp.getFolderById(createNewFolderId);
  const slidetemplate = DriveApp.getFileById(slideTemplateId);
  //// Make a copy of the slide template
  const emptySlideId = slidetemplate.makeCopy(folderTemplate).setName('certificate').getId();  
  const namelist = new Array;
  //// Iterate through each row to capture individual details
  for (let i = 1; i < values.length; i++) {
    const rowData = values[i];
    const name = rowData[nameIndex];
    const lastname = rowData[lastnameIndex];
    // const major = rowData[majorIndex];
    const award = rowData[awardIndex];
    const sport = rowData[sportIndex];
    //// Open copied slide
    const emptySlide = SlidesApp.openById(emptySlideId).getSlides()[0].duplicate();
    //// Create certificate by text replacement
    emptySlide.replaceAllText('Surname-Lastname', name+"  "+lastname);
    // emptySlide.replaceAllText('Major', major);
    emptySlide.replaceAllText('Award', award);
    emptySlide.replaceAllText('Sport', sport);
    emptySlide.move(i+1); //// move this page to backward
    namelist.push([name,lastname,sport])
    SpreadsheetApp.flush();
  }
  SlidesApp.openById(emptySlideId).getSlides()[0].remove(); // end of iteration
  //// convert to PDF
  const slides = SlidesApp.openById(emptySlideId).getSlides();
  let holder = SlidesApp.create('holder');
  const holderID = holder.getId();
  slides.forEach((slide,index)=>{
    holder.appendSlide(slide);
    holder.getSlides()[0].remove();
    holder.saveAndClose();
    const pdfId = folderTemplate.createFile(DriveApp.getFileById(holderID).getBlob()).setName(namelist[index][0]+'_'+namelist[index][1]+'_'+namelist[index][2]+'.pdf').getId();
    sheet.getRange(index + 3, pdfurlIndex+1).setValue('https://drive.google.com/file/d/'+pdfId); // print pdf link
    holder = SlidesApp.openById(holderID);
  })
  DriveApp.getFileById(emptySlideId).setTrashed(true);
  holder.saveAndClose();
  DriveApp.getFileById(holderID).setTrashed(true);
}


var style = {};
style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
    DocumentApp.HorizontalAlignment.LEFT;
style[DocumentApp.Attribute.FONT_FAMILY] = 'Sarabun';
style[DocumentApp.Attribute.FONT_SIZE] = 12;
style[DocumentApp.Attribute.BOLD] = false;

var style2 = {};
style2[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
    DocumentApp.HorizontalAlignment.CENTER;
style2[DocumentApp.Attribute.FONT_FAMILY] = 'Sarabun';
style2[DocumentApp.Attribute.FONT_SIZE] = 12;
style2[DocumentApp.Attribute.BOLD] = false;

function nameList(){
  // start at 2
  for(let n=9;n<17;n++){
    loopNameList(n);
  }
}

function loopNameList(k){
  var registersheet = spreadsheet.getSheetByName("ใบลงทะเบียน");
  // const folder = DriveApp.getFolderById('1dFwmOPu1CThjDjJrLMq1cK_gVKbdSl6n');
  const folder = DriveApp.getFolderById('1K9f-B12YnGkA2U4BwiBhHGMof-tFfmiS'); //Major folder
  const docstemplate = DriveApp.getFileById('1J3XmsLhcFKz7xUCOE8xc3KWJ7PNJT-QRqwCjYLLW2aE');
  var docregister = docstemplate.makeCopy(folder).setName('ใบลงทะเบียนวันที่ '+registersheet.getRange(k,7).getValue().toLocaleDateString('th-TH', {year:'numeric',month:'long',day:'numeric'}));
  var docregisterID=docregister.getId();
  let i=registersheet.getRange(k,9).getValue();
  while(!registersheet.getRange(3+i,1).isBlank() && registersheet.getRange(3+i,1).getValue().toISOString()==registersheet.getRange(k,7).getValue().toISOString()){
    if(registersheet.getRange(3+i,2).getValue()=='ฟุตบอล'){
      var tem_football = DocumentApp.openById('1ZlO9g7hjn43juufs0Tjui0tPy4K26for_jyUjez28tI');
      var doc_football = DriveApp.getFileById(tem_football.getId()).makeCopy(folder).setName('DUMP1');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_football.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_football.getId()).getBody().getTables()[1];
      for(let j=0;j<10;j++){
        table.getCell(j+1, 1).setText(team1.getRange(14+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(14+j,4).getValue()+" "+team1.getRange(14+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(14+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(14+j,4).getValue()+" "+team2.getRange(14+j,5).getValue()).setAttributes(style);
      }
      DocumentApp.openById(doc_football.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_football.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_football.getId())
      doc_football.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();
    } else if(registersheet.getRange(3+i,2).getValue()=='แชร์บอล'){
      var tem_chairball = DocumentApp.openById('1-DY_tIRQk6K373Xcm2XjRTrvupEn_2Cg5ZbUV8vjRnI');
      var doc_chairball = DriveApp.getFileById(tem_chairball.getId()).makeCopy(folder).setName('DUMP2');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_chairball.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_chairball.getId()).getBody().getTables()[1];
      for(let j=0;j<12;j++){
        table.getCell(j+1, 1).setText(team1.getRange(27+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(27+j,4).getValue()+" "+team1.getRange(27+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(27+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(27+j,4).getValue()+" "+team2.getRange(27+j,5).getValue()).setAttributes(style);
      }
      DocumentApp.openById(doc_chairball.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_chairball.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_chairball.getId())
      doc_chairball.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();
    } else if(registersheet.getRange(3+i,2).getValue()=='บาสเกตบอล (ชาย)'){
      var tem_basketballM = DocumentApp.openById('1HUIYkTYtN6GYL9ISI0HVrcaOZgr9XMW-7879h0Gjnts');
      var doc_basketballM = DriveApp.getFileById(tem_basketballM.getId()).makeCopy(folder).setName('DUMP3');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_basketballM.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_basketballM.getId()).getBody().getTables()[1];
      for(let j=0;j<10;j++){
        table.getCell(j+1, 1).setText(team1.getRange(42+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(42+j,4).getValue()+" "+team1.getRange(42+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(42+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(42+j,4).getValue()+" "+team2.getRange(42+j,5).getValue()).setAttributes(style);
      }
      // DocumentApp.openById(doc_basketballM.getId()).getBody().editAsText().insertText(10, team1)
      DocumentApp.openById(doc_basketballM.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_basketballM.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_basketballM.getId())
      doc_basketballM.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if(registersheet.getRange(3+i,2).getValue()=='บาสเกตบอล (หญิง)'){
      var tem_basketballW = DocumentApp.openById('1hyFDWMuPqHbLVKA5MzITqfpsH8-nJWcBY_G5WtHkz0c');
      var doc_basketballW = DriveApp.getFileById(tem_basketballW.getId()).makeCopy(folder).setName('DUMP4');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_basketballW.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_basketballW.getId()).getBody().getTables()[1];
      for(let j=0;j<10;j++){
        table.getCell(j+1, 1).setText(team1.getRange(55+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(55+j,4).getValue()+" "+team1.getRange(55+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(55+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(55+j,4).getValue()+" "+team2.getRange(55+j,5).getValue()).setAttributes(style);
      }
      DocumentApp.openById(doc_basketballW.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_basketballW.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_basketballW.getId())
      doc_basketballW.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if(registersheet.getRange(3+i,2).getValue()=='วอลเลย์บอล'){
      var tem_volleyball = DocumentApp.openById('1gujhSN4ArZgjPzpr-2FW5Il_itLzqmyx660P5MAwB0Q');
      var doc_volleyball = DriveApp.getFileById(tem_volleyball.getId()).makeCopy(folder).setName('DUMP5');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_volleyball.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_volleyball.getId()).getBody().getTables()[1];
      for(let j=0;j<10;j++){
        table.getCell(j+1, 1).setText(team1.getRange(68+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(68+j,4).getValue()+" "+team1.getRange(68+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(68+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(68+j,4).getValue()+" "+team2.getRange(68+j,5).getValue()).setAttributes(style);
      }
      DocumentApp.openById(doc_volleyball.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_volleyball.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_volleyball.getId())
      doc_volleyball.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if (registersheet.getRange(3+i,2).getValue()=='แบดมินตัน (ชาย)'){
      var tem_badmintonM = DocumentApp.openById('1NxD8OquZaioOSUqVGdMzOv4rp41diHNSpYCcYF90u6E');
      var doc_badmintonM = DriveApp.getFileById(tem_badmintonM.getId()).makeCopy(folder).setName('DUMP6');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_badmintonM.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_badmintonM.getId()).getBody().getTables()[1];
      table.getCell(1, 1).setText(team1.getRange(81,3).getValue()).setAttributes(style2); 
      table.getCell(1, 2).setText(team1.getRange(81,4).getValue()+" "+team1.getRange(81,5).getValue()).setAttributes(style);
      table2.getCell(1, 1).setText(team2.getRange(81,3).getValue()).setAttributes(style2); 
      table2.getCell(1, 2).setText(team2.getRange(81,4).getValue()+" "+team2.getRange(81,5).getValue()).setAttributes(style);
      DocumentApp.openById(doc_badmintonM.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_badmintonM.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_badmintonM.getId())
      doc_badmintonM.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if (registersheet.getRange(3+i,2).getValue()=='แบดมินตัน (หญิง)'){
      var tem_badmintonW = DocumentApp.openById('1-ggCUgoacUmCvssjkha6Ue84epQKQCkPaTIr8WUuSIE');
      var doc_badmintonW = DriveApp.getFileById(tem_badmintonW.getId()).makeCopy(folder).setName('DUMP7');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_badmintonW.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_badmintonW.getId()).getBody().getTables()[1];
      table.getCell(1, 1).setText(team1.getRange(85,3).getValue()).setAttributes(style2); 
      table.getCell(1, 2).setText(team1.getRange(85,4).getValue()+" "+team1.getRange(85,5).getValue()).setAttributes(style);
      table2.getCell(1, 1).setText(team2.getRange(85,3).getValue()).setAttributes(style2); 
      table2.getCell(1, 2).setText(team2.getRange(85,4).getValue()+" "+team2.getRange(85,5).getValue()).setAttributes(style);
      DocumentApp.openById(doc_badmintonW.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_badmintonW.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_badmintonW.getId())
      doc_badmintonW.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if (registersheet.getRange(3+i,2).getValue()=='แบดมินตันคู่ (ชาย)'){
      var tem_badminton2M = DocumentApp.openById('1RqdL_crQHwAJZFFKc0s_12xCPz3odAKzXNfNZL-8eiQ');
      var doc_badminton2M = DriveApp.getFileById(tem_badminton2M.getId()).makeCopy(folder).setName('DUMP8');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_badminton2M.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_badminton2M.getId()).getBody().getTables()[1];
      for(let j=0;j<2;j++){
        table.getCell(j+1, 1).setText(team1.getRange(89+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(89+j,4).getValue()+" "+team1.getRange(89+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(89+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(89+j,4).getValue()+" "+team2.getRange(89+j,5).getValue()).setAttributes(style);
      }
      DocumentApp.openById(doc_badminton2M.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_badminton2M.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_badminton2M.getId())
      doc_badminton2M.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();
    } else if (registersheet.getRange(3+i,2).getValue()=='แบดมินตันคู่ (หญิง)'){
      var tem_badminton2W = DocumentApp.openById('1Hm-WHmncinv1oLVQxJ0162MkLOBHu6BaVajjb7ST7Wg');
      var doc_badminton2W = DriveApp.getFileById(tem_badminton2W.getId()).makeCopy(folder).setName('DUMP9');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_badminton2W.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_badminton2W.getId()).getBody().getTables()[1];
      for(let j=0;j<2;j++){
        table.getCell(j+1, 1).setText(team1.getRange(94+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(94+j,4).getValue()+" "+team1.getRange(94+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(94+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(94+j,4).getValue()+" "+team2.getRange(94+j,5).getValue()).setAttributes(style);
      }
      DocumentApp.openById(doc_badminton2W.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_badminton2W.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_badminton2W.getId())
      doc_badminton2W.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if (registersheet.getRange(3+i,2).getValue()=='เทเบิลเทนนิส (ชาย)'){
      var tem_tabletennisM = DocumentApp.openById('1UU54Qw9e77NpllveI46jSuL1KKd-egmofmcjHS-CFyM');
      var doc_tabletennisM = DriveApp.getFileById(tem_tabletennisM.getId()).makeCopy(folder).setName('DUMP10');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_tabletennisM.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_tabletennisM.getId()).getBody().getTables()[1];
        table.getCell(1, 1).setText(team1.getRange(99,3).getValue()).setAttributes(style2); 
        table.getCell(1, 2).setText(team1.getRange(99,4).getValue()+" "+team1.getRange(99,5).getValue()).setAttributes(style);
        table2.getCell(1, 1).setText(team2.getRange(99,3).getValue()).setAttributes(style2); 
        table2.getCell(1, 2).setText(team2.getRange(99,4).getValue()+" "+team2.getRange(99,5).getValue()).setAttributes(style);
      DocumentApp.openById(doc_tabletennisM.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_tabletennisM.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_tabletennisM.getId())
      doc_tabletennisM.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if (registersheet.getRange(3+i,2).getValue()=='เทเบิลเทนนิส (หญิง)'){
      var tem_tabletennisW = DocumentApp.openById('1fcze34_PAG-ka5cU53ri8t4NRuUBcprjAGaBcO369ds');
      var doc_tabletennisW = DriveApp.getFileById(tem_tabletennisW.getId()).makeCopy(folder).setName('DUMP11');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_tabletennisW.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_tabletennisW.getId()).getBody().getTables()[1];
        table.getCell(1, 1).setText(team1.getRange(103,3).getValue()).setAttributes(style2); 
        table.getCell(1, 2).setText(team1.getRange(103,4).getValue()+" "+team1.getRange(103,5).getValue()).setAttributes(style);
        table2.getCell(1, 1).setText(team2.getRange(103,3).getValue()).setAttributes(style2); 
        table2.getCell(1, 2).setText(team2.getRange(103,4).getValue()+" "+team2.getRange(103,5).getValue()).setAttributes(style);
      DocumentApp.openById(doc_tabletennisW.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_tabletennisW.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_tabletennisW.getId())
      doc_tabletennisW.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if (registersheet.getRange(3+i,2).getValue()=='เทเบิลเทนนิสคู่ (ผสม)'){
      var tem_tabletennis2MW = DocumentApp.openById('1vgHcWdga4e8T5V9w7OQAxilcfo_8N0i_XdahX9lpciw');
      var doc_tabletennis2MW = DriveApp.getFileById(tem_tabletennis2MW.getId()).makeCopy(folder).setName('DUMP12');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_tabletennis2MW.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_tabletennis2MW.getId()).getBody().getTables()[1];
      for(let j=0;j<2;j++){
        table.getCell(j+1, 1).setText(team1.getRange(107+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(107+j,4).getValue()+" "+team1.getRange(107+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(107+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(107+j,4).getValue()+" "+team2.getRange(107+j,5).getValue()).setAttributes(style);
      }
      DocumentApp.openById(doc_tabletennis2MW.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_tabletennis2MW.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_tabletennis2MW.getId())
      doc_tabletennis2MW.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();

    } else if(registersheet.getRange(3+i,2).getValue()=='ชักเย่อ'){
      var tem_war = DocumentApp.openById('1dLTbScoyw4c-ZMftdpj60fMoug4LaHycTAQxmJZuMAg');
      var doc_war = DriveApp.getFileById(tem_war.getId()).makeCopy(folder).setName('DUMP13');
      var team1 = spreadsheet.getSheetByName(registersheet.getRange(3+i,3).getValue());
      var team2 = spreadsheet.getSheetByName(registersheet.getRange(3+i,4).getValue());
      var table = DocumentApp.openById(doc_war.getId()).getBody().getTables()[0];
      var table2 = DocumentApp.openById(doc_war.getId()).getBody().getTables()[1];
      for(let j=0;j<20;j++){
        table.getCell(j+1, 1).setText(team1.getRange(112+j,3).getValue()).setAttributes(style2);
        table.getCell(j+1, 2).setText(team1.getRange(112+j,4).getValue()+" "+team1.getRange(112+j,5).getValue()).setAttributes(style);
        table2.getCell(j+1, 1).setText(team2.getRange(112+j,3).getValue()).setAttributes(style2);
        table2.getCell(j+1, 2).setText(team2.getRange(112+j,4).getValue()+" "+team2.getRange(112+j,5).getValue()).setAttributes(style);
      }
      DocumentApp.openById(doc_war.getId()).getBody().replaceText("M1",registersheet.getRange(3+i,3).getValue());
      DocumentApp.openById(doc_war.getId()).getBody().replaceText("M2",registersheet.getRange(3+i,4).getValue());
      importInDoc(docregisterID,doc_war.getId())
      doc_war.setTrashed(true);
      DocumentApp.openById(docregisterID).getBody().appendPageBreak();
    }
    i++;
  }
  DocumentApp.openById(docregisterID).getBody().replaceText("……………………"," "+registersheet.getRange(k,7).getValue().toLocaleDateString('th-TH', {year:'numeric',month:'long',day:'numeric'}));


  // const registerpdfId = folder.createFile(DriveApp.getFileById(docregisterID).getBlob()).setName('ใบลงทะเบียนวันที่ '+registersheet.getRange(2,7,1,1).getValue().toLocaleDateString('th-TH', {year:'numeric',month:'long',day:'numeric'})+'.pdf').getId();
  // folder.createFile(DriveApp.getFileById(registersheet).getBlob()).setName('Test'+'.pdf');
  
  ////...Set file as PDF...///
  // const blob = docregister.getAs(MimeType.PDF);
  // DocumentApp.openById(docregisterID).saveAndClose();
  // const pdf = folder.createFile(blob).setName('ใบลงทะเบียนวันที่ '+registersheet.getRange(k,7).getValue().toLocaleDateString('th-TH', {year:'numeric',month:'long',day:'numeric'})+'.pdf');
  // docregister.setTrashed(true);
  
  ////...insert link to cells...///
  // registersheet.getRange(k,6).setValue('https://drive.google.com/file/d/'+pdf.getId()); // print pdf link
  registersheet.getRange(k,6).setValue('https://docs.google.com/document/d/'+docregisterID); // print docs link


  // majorinDoc = body.replaceText("………………………………", majorlistname[majorlist.indexOf(sheet.getRange(1,1).getValue().slice(45,47))]) // Search Text
  // var values = sheet.getRange(12,1,sheet.getLastRow(),sheet.getLastColumn()).getValues(); // Data range
// Logger.log(i)
}

function importInDoc(a,b) {
  var docID = a;
  var baseDoc = DocumentApp.openById(docID);
  var body = baseDoc.getBody();

  var otherBody = DocumentApp.openById(b).getBody();
  var totalElements = otherBody.getNumChildren();
  for( var j = 0; j < totalElements; ++j ) {
    var element = otherBody.getChild(j).copy();
    var type = element.getType();
    if( type == DocumentApp.ElementType.PARAGRAPH )
      body.appendParagraph(element);
    else if( type == DocumentApp.ElementType.TABLE )
      body.appendTable(element);
    else if( type == DocumentApp.ElementType.LIST_ITEM )
      body.appendListItem(element);
    else if( type == DocumentApp.ElementType.INLINE_IMAGE )
      body.appendImage(element);

    // add other element types as you want

    else
      throw new Error("According to the doc this type couldn't appear in the body: "+type);
  }
}




// function htmlnameList() {
//   var widget = HtmlService.createHtmlOutputFromFile("Create1.html");
//   SpreadsheetApp.getUi().showModalDialog(widget, "Create Namelist");
// }

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}

// function formSubmit(form) {
//   var rowx = [form.name,form.feedback];
//   SpreadsheetApp.getActiveSheet().appendRow(rowx);
//   // spreadsheet.getSheetByName("DRAFT").appendRow(rowx);
// }
