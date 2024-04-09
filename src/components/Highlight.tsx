import Post from '../types/PostType';
import HighlightContent from './HighlightContent';
import HighlightPerson from './HighlightPerson';

type HighlightProps = {
  post: Post
};

function Highlight({ post }: HighlightProps) {
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="div-highlight">
      <HighlightPerson post={post} />
      <HighlightContent post={post} />
    </div>
  );
}

export default Highlight;
