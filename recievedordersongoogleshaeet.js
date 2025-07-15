function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    if (!e.postData || !e.postData.contents) {
      output.setContent(JSON.stringify({status: "error", message: "لا توجد بيانات مرسلة"}));
      return output;
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.name || "",
      data.order || "",
      data.notes || "",
      new Date()
    ]);

    output.setContent(JSON.stringify({status: "success", message: "✅ تم تسجيل الطلب"}));
  } catch (err) {
    output.setContent(JSON.stringify({status: "error", message: err.message}));
  }

  return output;
}

function doGet(e) {
  return ContentService.createTextOutput("واجهة الاستلام جاهزة. أرسل بياناتك بطريقة POST.");
}

