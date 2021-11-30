const { GoogleSpreadsheet } = require("google-spreadsheet");

async function googleSheetConn(sheetId, sheetTitle) {
  try {
    const doc = new GoogleSpreadsheet(sheetId);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo().catch((e) => console.log(e));

    const sheet = doc.sheetsByTitle[sheetTitle];

    const rows = await sheet.getRows();

    return [rows, rows[0]._rawData];
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function ppFilter() {
  const [rows, doc] = await googleSheetConn(process.env.SHEET_ID, process.env.SHEET_TITLE);

  return rows;
}

async function getUsuarioRow() {
  const [rows, doc] = await googleSheetConn(process.env.SHEET_ID, process.env.SHEET_TITLE);

  console.log(rows);

  return true;
}

async function promiseSlowNameId(doc, rows) {
  const sheet = await doc.sheetsByTitle["imp aprob 8/11"];
  let ind = 0;
  let exist = false;
  const aprobados = rows.map((row) => row[0]).slice(1);
  const unique = [...new Set(aprobados)];

  //chequea faltantes 1/2
  /*  const thisRows = await sheet.getRows();
    const idList = thisRows.map((row) => row['ID']); */

  const addrows = async (row) => {
    await sheet.addRow(row);
  };
  const deleteRow = async (row) => {
    await row.delete();
  };

  const requests = rows.map((row, index) => {
    let nombreComp = row[8] + " " + row[9];
    unique.map((rowaprob) => {
      if (rowaprob === nombreComp) {
        let monto = row[213];
        if (monto.length === 2) monto = monto + "000";

        let newRow = [row[1], row[8] + " " + row[9], row[17], monto];
        new Promise((resolve) => setTimeout(() => resolve(addrows(newRow)), ind * 1300));
        ind++;
        //chequea faltantes 2/2
        /*   let exist = idList.filter((id) => id === row[1]);
                console.log(exist.length);
                if (exist.length === 0) {
                    console.log('se agrega ', row[1]);
                    let newRow = [
                        row[1],
                        row[9] + ' ' + row[10],
                        row[18],
                        monto
                    ];
                    new Promise((resolve) =>
                        setTimeout(() => resolve(addrows(newRow)), ind * 1200)
                    );
                    ind++;
                } */
      }
    });
  });

  Promise.all(requests).then(() => {
    console.log("termino todo");
  });
}

async function getUserData(umail) {
  try {
    const [rows, header] = await googleSheetConn(process.env.SHEET_ID, process.env.SHEET_TITLE);

    const usuRow = rows.filter((row) => row._rawData[1] === umail);

    return [usuRow, header];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function saveRoww(datos, umail) {
  try {
    const [usuRow, header] = await getUserData(umail);

    Object.keys(datos).map((key) => {
      usuRow[0][key] = datos[key];
    });

    await usuRow[0].save();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  googleSheetConn,
  ppFilter,
  getUsuarioRow,
  getUserData,
  saveRoww,
};
