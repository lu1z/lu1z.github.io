import Post from '../types/PostType';
import linkedinImg from '../assests/linkedin_3536569.webp';
import githubImg from '../assests/github-logo.webp';
import emailImg from '../assests/email.png';

type HighlightProps = {
  post: Post
};

function HighlightPerson({ post }: HighlightProps) {
  // const [isHovered, setIsHovered] = useState(false);

  const {
    email, name, picture, github, linkedin,
  } = post;

  return (
    <div className="div-student">
      <img className="img-person" src={picture} alt="Foto de perfil" />
      <div className="info-person">
        <p>{`Nome: ${name}`}</p>
        <p>
          {'Email: '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <div className="flex-justify">
          <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
            <img alt="Email" src={emailImg} className="social-logo" />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer">
            <img alt="Linkedin" src={linkedinImg} className="social-logo" />
          </a>
          <a href={github} target="_blank" rel="noreferrer">
            <img alt="Github" src={githubImg} className="social-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HighlightPerson;
