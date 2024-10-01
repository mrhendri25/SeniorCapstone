<script>
    import { onMount } from 'svelte';
    import { excelData } from '/Capstobe_github/SeniorCapstone/BetBigOrSML/SRC/routes/DataTest';
    import * as XLSX from 'xlsx';
  
    async function fetchExcelData() {
      // Fetch the Excel file
      const response = await fetch('/Capstobe_github/SeniorCapstone/BetBigOrSML/SRC/routes/DataTest/FootballStats.xlsx');
      const data = await response.arrayBuffer();
  
      // Read the Excel file
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON
  
      // Update the store with the JSON data
      excelData.set(jsonData);
    }
  
    onMount(() => {
      fetchExcelData();
    });
  </script>
  
  <h1>Excel Data</h1>
  <ul>
    {#each $excelData as row}
      <li>{JSON.stringify(row)}</li>
    {/each}
  </ul>
  