// Function to handle download
// function downloadFunction() {
//     hideButtons();
//     const element = document.getElementById('head');
//     const formattedDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
//     const options = {
//         margin: 10,
//         filename: 'FileName_' + formattedDate + '.pdf',
//         image: { type: 'png', quality: 1.0 },
//         html2canvas: { scale: 4 },
//         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//     };
//     html2pdf(element, options);
//     showButtons();
// }