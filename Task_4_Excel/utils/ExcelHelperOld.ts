import * as EXCEL from "xlsx";
// avoid direct fs usage to prevent need for @types/node in TS projects

interface TestRecord {
  description: string;
  email: string;
  password: string;
}

export function readExcelFile(filePath: string) {
  // use xlsx's readFile which works without importing Node fs types
  let workbook: EXCEL.WorkBook;
  try {
    workbook = EXCEL.readFile(filePath);
  } catch (err) {
    throw new Error(`File not found or unreadable: ${filePath}`);
  }

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rawData: any[] = EXCEL.utils.sheet_to_json(sheet, { header: 1 });

  const records: TestRecord[] = rawData.slice(1).map((column: any) => ({
    description: column[0],
    email: column[1],
    password: column[2],
  }));
  return records;
}
