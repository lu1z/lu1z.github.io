type Post = {
  id: number,
  date: { day: number, month: number, year: number },
  name: string,
  picture: string,
  github: string,
  linkedin: string,
  email: string,
  title: string,
  link: string,
  illustration: string,
  description: string,
  tags: string[],
  [key: string]: string[] | string | number |
  { day: number, month: number, year: number, [key: string]: number },
};

export default Post;
