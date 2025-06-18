<!-- Código para cargar COMPETENCIAS desde GitHub -->
<div id="competencias-content">Cargando competencias...</div>
<script>
async function loadCompetenciasFromGitHub() {
   try {
       const GITHUB_USER = 'informaticafecor';
       const REPO_NAME = 'SITESFECCORVS1';
       const BRANCH = 'main';
       
       // URLs de todos los archivos
       const htmlUrl = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/competencias.html;
       const css1Url = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/css/componentes.css;
       const css2Url = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/css/layout.css;
       const css3Url = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/css/responsive.css;
       const css4Url = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/css/styles.css;
       const js1Url = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/js/busqueda.js;
       const js2Url = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/js/filtros.js;
       const js3Url = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/js/principal.js;
       const js4Url = https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/Competencias/js/vistas.js;
       
       // Fetch paralelo de todos los archivos
       const [htmlResponse, css1Response, css2Response, css3Response, css4Response, js1Response, js2Response, js3Response, js4Response] = await Promise.all([
           fetch(htmlUrl), fetch(css1Url), fetch(css2Url), fetch(css3Url), fetch(css4Url), fetch(js1Url), fetch(js2Url), fetch(js3Url), fetch(js4Url)
       ]);
       
       // Verificar errores
       if (!htmlResponse.ok) throw new Error(Error HTML: ${htmlResponse.status});
       if (!css1Response.ok) throw new Error(Error CSS1: ${css1Response.status});
       if (!css2Response.ok) throw new Error(Error CSS2: ${css2Response.status});
       if (!css3Response.ok) throw new Error(Error CSS3: ${css3Response.status});
       if (!css4Response.ok) throw new Error(Error CSS4: ${css4Response.status});
       if (!js1Response.ok) throw new Error(Error JS1: ${js1Response.status});
       if (!js2Response.ok) throw new Error(Error JS2: ${js2Response.status});
       if (!js3Response.ok) throw new Error(Error JS3: ${js3Response.status});
       if (!js4Response.ok) throw new Error(Error JS4: ${js4Response.status});
       
       // Obtener contenido
       const [htmlContent, css1Content, css2Content, css3Content, css4Content, js1Content, js2Content, js3Content, js4Content] = await Promise.all([
           htmlResponse.text(), css1Response.text(), css2Response.text(), css3Response.text(), css4Response.text(), js1Response.text(), js2Response.text(), js3Response.text(), js4Response.text()
       ]);
       
       // Inyectar CSS en orden: layout → componentes → styles → responsive
       [css2Content, css1Content, css4Content, css3Content].forEach((cssContent) => {
           const styleElement = document.createElement('style');
           styleElement.textContent = cssContent;
           document.head.appendChild(styleElement);
       });
       
       // Inyectar HTML
       const tempDiv = document.createElement('div');
       tempDiv.innerHTML = htmlContent;
       const bodyContent = tempDiv.querySelector('body')?.innerHTML || htmlContent;
       document.getElementById('competencias-content').innerHTML = bodyContent;
       
       // Inyectar JS en orden: principal → filtros → busqueda → vistas
       [js3Content, js2Content, js1Content, js4Content].forEach((jsContent) => {
           const scriptElement = document.createElement('script');
           scriptElement.textContent = jsContent;
           document.body.appendChild(scriptElement);
       });
       
       console.log('✅ Competencias cargado desde GitHub');
       
   } catch (error) {
       console.error('❌ Error:', error);
       document.getElementById('competencias-content').innerHTML = `
           <div style="padding: 20px; border: 2px solid #ff6b6b; background: rgba(255, 107, 107, 0.1); border-radius: 10px; color: white;">
               <h3>❌ Error al cargar Competencias</h3>
               <p><strong>Error:</strong> ${error.message}</p>
               <p>Verifica que los archivos existan en: Competencias/</p>
           </div>
       `;
   }
}
document.addEventListener('DOMContentLoaded', loadCompetenciasFromGitHub);
</script>