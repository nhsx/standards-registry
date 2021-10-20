import { ModelContextWrapper } from './model';
import { ContentContextWrapper } from './content';

export function PageContext({ children, content, data }) {
  return (
    <ContentContextWrapper value={content}>
      <ModelContextWrapper value={data}>
        { children }
      </ModelContextWrapper>
    </ContentContextWrapper>
  );
}
