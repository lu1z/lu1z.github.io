import '../css/footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <main className="main-footer">
        <div className="footer-info">
          <div className="container-course">
            <div className="div-footer">
              <h2>FULL</h2>
              <a href="https://www.betrybe.com/formacao-desenvolvimento-web" target="_blank" rel="noopener noreferrer">Desenvolvimento Web</a>
            </div>
            <div className="div-footer">
              <h2>FLEX</h2>
              <a href="https://www.betrybe.com/cursos/programacao-fundamentos-front-end" target="_blank" rel="noopener noreferrer">Fundamentos de Front-end</a>
              <a href="https://betrybe.com/cursos/inteligencia-artificial-na-pratica?_gl=1*13jysb9*_ga*MTM4OTYwOTgzNi4xNzA2NzIyNjg1*_ga_JRYMZ1LMBF*MTcxMjc3OTI2My41NS4xLjE3MTI3Nzk5NTMuOS4wLjA." target="_blank" rel="noopener noreferrer">IA na prática 2.0</a>
            </div>
            <div className="div-footer">
              <h2>FREE</h2>
              <a href="https://betrybe.com/cursos/bootcamp-gratuito-aws-ia-generativa?_gl=1*ty7vav*_ga*MTM4OTYwOTgzNi4xNzA2NzIyNjg1*_ga_JRYMZ1LMBF*MTcxMjc3OTI2My41NS4xLjE3MTI3ODAwMzIuMzMuMC4w" target="_blank" rel="noopener noreferrer">Bootcamp AI Gen da AWS</a>
              <a href="https://www.betrybe.com/curso-de-programacao-javascript-do-zero" target="_blank" rel="noopener noreferrer">JavaScript do Zero</a>
              <a href="https://betrybe.com/cursos/logica-de-programacao?_gl=1*4ntc27*_ga*MTM4OTYwOTgzNi4xNzA2NzIyNjg1*_ga_JRYMZ1LMBF*MTcxMjc3OTI2My41NS4xLjE3MTI3ODAyMzAuMjcuMC4w" target="_blank" rel="noopener noreferrer">Lógica de Programação</a>
            </div>
          </div>
          <div className="div-footer">
            <h2>Sobre</h2>
            <a href="https://www.betrybe.com/trabalhe-conosco" target="_blank" rel="noopener noreferrer">Trabalhe Conosco</a>
            <a href="https://www.betrybe.com/empresas-parceiras" target="_blank" rel="noopener noreferrer">Para Empresas</a>
            <a href="https://www.betrybe.com/compliance" target="_blank" rel="noopener noreferrer">Compliance</a>
            <a href="https://www.betrybe.com/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
            <a href="https://www.betrybe.com/termos-de-uso" target="_blank" rel="noopener noreferrer">Termos de Uso</a>
            <a href="https://www.betrybe.com/#config-consent" target="_blank" rel="noopener noreferrer">Desabilitar Cookies</a>
          </div>
          <div className="div-footer">
            <h2>Dúvidas</h2>
            <a href="https://ajuda.betrybe.com/hc/pt-br?_gl=1*ky14u2*_ga*MTM4OTYwOTgzNi4xNzA2NzIyNjg1*_ga_JRYMZ1LMBF*MTcxMjc3OTI2My41NS4xLjE3MTI3ODA5NTAuMjUuMC4w" target="_blank" rel="noopener noreferrer">Central de Ajuda</a>
            <a href="https://ajuda.betrybe.com/hc/pt-br/requests/new?_gl=1*ky14u2*_ga*MTM4OTYwOTgzNi4xNzA2NzIyNjg1*_ga_JRYMZ1LMBF*MTcxMjc3OTI2My41NS4xLjE3MTI3ODA5NTAuMjUuMC4w" target="_blank" rel="noopener noreferrer">Fale com a Gente</a>
            <a href="https://discord.com/invite/cEAmYYPxwB?utm_source=site-footer&utm_medium=link-sidebar&utm_campaign=attraction-course" target="_blank" rel="noopener noreferrer">Comunidade</a>
          </div>
        </div>
        <div className="linha" />
        {/*  criar componente linha */}
        <div>
          <div>
            <p>© 2021 devs. Todos os direitos reservados.</p>
          </div>
        </div>
      </main>
    </footer>
  );
}

export default Footer;
