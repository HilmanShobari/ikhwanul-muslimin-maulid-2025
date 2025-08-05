import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
    const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
    
    if (!apiKey || !spreadsheetId) {
      return NextResponse.json(
        { error: 'Missing API credentials' },
        { status: 500 }
      );
    }

    // Fetch data from Google Sheets
    // Based on the actual structure: B=Date, C=Description, D=Income, E=Expense, F=Balance
    const range = 'Sheet1!A:F'; 
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();
    const rows = data.values || [];

    // Process the data - header is in row 3 (index 2), data starts from row 4 (index 3)
    const incomeData: Array<{ source: string; amount: number }> = [];
    const expenseData: Array<{ item: string; amount: number }> = [];

    // Skip empty rows and header, start from row 4 (index 3)
    const dataRows = rows.slice(3);

    let totalIncome = 0;
    let totalExpense = 0;
    let currentBalance = 0;

    dataRows.forEach((row: string[]) => {
      if (row.length >= 6 && row[2]) { // Check if description exists (column C)
        const description = row[2]?.trim();
        const incomeStr = row[3]?.replace(/[^\d]/g, '') || '0'; // Remove commas and non-digits
        const expenseStr = row[4]?.replace(/[^\d]/g, '') || '0';
        const balanceStr = row[5]?.replace(/[^\d]/g, '') || '0';
        
        const incomeAmount = parseInt(incomeStr) || 0;
        const expenseAmount = parseInt(expenseStr) || 0;
        const balance = parseInt(balanceStr) || 0;

        if (incomeAmount > 0) {
          incomeData.push({
            source: description,
            amount: incomeAmount
          });
          totalIncome += incomeAmount;
        }

        if (expenseAmount > 0) {
          expenseData.push({
            item: description,
            amount: expenseAmount
          });
          totalExpense += expenseAmount;
        }

        // Update current balance from the last valid entry
        if (balance > 0) {
          currentBalance = balance;
        }
      }
    });

    return NextResponse.json({
      incomeData,
      expenseData,
      totalIncome,
      totalExpense,
      balance: currentBalance
    });

  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch budget data' },
      { status: 500 }
    );
  }
}