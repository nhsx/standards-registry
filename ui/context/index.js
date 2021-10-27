import { ModelContextWrapper } from './model';
import { ContentContextWrapper } from './content';
import { QueryContextWrapper } from './query';

export function PageContext({ children, content, data, query }) {
  return (
    <QueryContextWrapper value={query}>
      <ContentContextWrapper value={content}>
        <ModelContextWrapper value={data}>
          { children }
        </ModelContextWrapper>
      </ContentContextWrapper>
    </QueryContextWrapper>
  );
}
