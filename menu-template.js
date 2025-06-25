
// template-loader.js 
async function loadTemplate(templateName, targetId) { try { const response = await fetch(`${templateName}.html`); 
const html = await response.text(); document.getElementById(targetId).innerHTML = html; } 
catch (error) { console.error('Error cargando template:', error); } } document.addEventListener('DOMContentLoaded', () => { loadTemplate('menu', 'menu-container'); });


 