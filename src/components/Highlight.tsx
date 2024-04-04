import Post from '../types/PostType';
import linkedinImg from '../assests/linkedin_3536569.webp';
import githubImg from '../assests/github-logo.webp';

type HighlightProps = {
  post: Post
};

function Highlight({ post }: HighlightProps) {
  // const [isHovered, setIsHovered] = useState(false);

  const {
    id, description, title, tags, name, picture, github, linkedin, illustration,
  } = post;

  return (
    <div className="div-highlight">
      <h2>{title}</h2>
      <div className="div-student">
        <img className="img-person" src={picture} alt="Foto de perfil" />
        <div className="info-person">
          <p>{`Nome: ${name}`}</p>
          <div className="flex-justify">
            <a href={linkedin} target="_blank" rel="noreferrer">
              <img alt="Linkedin" src={linkedinImg} className="social-logo" />
            </a>
            <a href={github} target="_blank" rel="noreferrer">
              <img alt="Github" src={githubImg} className="social-logo" />
            </a>
          </div>
        </div>
      </div>
      <div className="div-flex">
        <div className="img-port" style={{ backgroundImage: `url(${illustration})` }}>
          <div className="overlay">
            <h3>{description}</h3>
            <div className="flex row div-tags">
              {tags.map((tag) => (
                <h4 key={`${id}-${tag}`} className={`tag ${tag}`}>
                  {tag}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Highlight;
