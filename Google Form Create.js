function myGoogleform(){
  var form = FormApp.openById('1kPtT4GuCwCC2Lz3KOnQjvGP74dECrbN9qTZJhaJ6XAc');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ชุดคำถาม");
  var value = sheet.getRange(5,1,sheet.getMaxRows()-1).getValues(); // list of problems
  var choice = ["Yes","No"] // list of choices
  var lastRow = getLastRowSpecial(sheet.getRange("A:A").getValues());

  
  var probleminsheet = new Array()
  for (var i=0 ; i<lastRow-4 ; i++){probleminsheet.push(value[i][0])}; // append problems to list of probleminsheet
/////   First time   /////
  var check = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  var multipleChoiceItemsTitle = check.map((item) => item.asMultipleChoiceItem().getTitle()); //change item to MultipleChoiceItem() and get title from its.
  if(multipleChoiceItemsTitle.length ? false : true){ // ternary operator
    var name = form.addTextItem();
    name.setTitle('ชื่อ');
    name.setHelpText('หรือนามแฝงอะไรก็ได้');
    name.setRequired(true);
    // var section = form.addSectionHeaderItem();
    // section.setTitle('');
    // section.setHelpText('');
    
    for(var i=0; i<lastRow-4;i++){
      var item = form.addMultipleChoiceItem();
      item.setTitle(value[i][0]);
      item.setChoiceValues(choice);
      item.setRequired(true);
    }
  }
    var checkagain=form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
    var newMultipleChoiceItemsTitle = checkagain.map((item) => item.asMultipleChoiceItem().getTitle());
/////    Append and Delete problems   /////
  if(newMultipleChoiceItemsTitle !=probleminsheet){ //compare the original problems with extended problems
    var difference = probleminsheet.filter(x => !newMultipleChoiceItemsTitle.includes(x)); // difference of list like set.
    for(var i=0; i<difference.length;i++){
      var item = form.addMultipleChoiceItem();
        item.setTitle(difference[i]);
        item.setChoiceValues(choice);
        item.setRequired(true);
    }
    var difference2 = newMultipleChoiceItemsTitle.filter(x => !probleminsheet.includes(x));
    for(var i=0; i<difference2.length;i++){
      index = newMultipleChoiceItemsTitle.indexOf(difference2[i]);
      form.deleteItem(index);
    }
  }
// form.setDescription("คิดไม่ออก");
form.setCollectEmail(false);
form.setConfirmationMessage('น้องๆสามารถดูผลลัพธ์ของหมวกคัดสรรนี้ได้บนหน้าจอด้านบน หรือ \n https://docs.google.com/spreadsheets/d/e/2PACX-1vQB1E8IxYLfG-K5vVUOh15qrSMeMSrTGEUG9vN3VoAlfxXnP_WCYFKeKW6MQhU7aOZL8kRJ6jkn6NTh/pubhtml?gid=359488531&single=true');
form.setShowLinkToRespondAgain(true);
form.setShuffleQuestions(true);
form.setAcceptingResponses(true);
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

