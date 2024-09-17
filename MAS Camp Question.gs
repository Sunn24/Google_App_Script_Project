function googleform(){
  var form = FormApp.openById('1EOwu9RbY-DunrcLeoK6P_zq9iPlimcOgnpXFG9Gfato');
  var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ชุดคำถาม");
  var value = sheet.getRange(5,5,getLastRowSpecial(sheet.getRange("C5:C").getValues())).getValues();
  var filtered = value.filter(String); // remove blank value
  // Logger.log(filtered)
  var check = form.getItems(FormApp.ItemType.CHECKBOX);
  var checkItemsTitle = check.map((item) => item.asCheckboxItem().getTitle()); 
  checkItemsTitle.length ? form.deleteItem(0) : {};
  var item = form.addCheckboxItem();
  item.setTitle('คำถามที่เลือก')
  item.setChoiceValues(filtered);
  item.setRequired(true);
  // form.setCollectEmail(true);
  form.setAcceptingResponses(true);
  var checkBoxValidation = FormApp.createCheckboxValidation().requireSelectExactly(7).build();
  item.setValidation(checkBoxValidation);
}

function onEdit(e){
  var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ชุดคำถาม");
  if(sheet.getRange('D2').isChecked() && sheet.getRange('E2').isBlank()){
    // googleform();
    sheet.getRange('E2').setValue('https://forms.gle/LsWtVzcLr4ttRiR7A');
  }
  // if(e.range.getSheet().getName()==="ชุดคำถาม" && e.range.getColumn()===2 && e.range.getRow()>4){
  //   var email = Session.getActiveUser().getEmail();
  //   var me = Session.getEffectiveUser();
  //   sheet.getRange(e.range.getRow(),1).setValue(email);
  // }
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

// function setOperator(){
//   var a=[1,2,3];
//   var b=[2,3,4];
//   var difference = a.filter(x => !b.includes(x));
//   var intersection = a.filter(x => b.includes(x));
// }

