import { ModelContextWrapper } from './model';
import { ContentContextWrapper } from './content';
import { QueryContextWrapper } from './query';
import { PagesContextWrapper } from './pages';

export function PageContext({ children, content, data, query, pages }) {
  return (
    <PagesContextWrapper value={pages}>
      <QueryContextWrapper value={query}>
        <ContentContextWrapper value={content}>
          <ModelContextWrapper value={data}>{children}</ModelContextWrapper>
        </ContentContextWrapper>
      </QueryContextWrapper>
    </PagesContextWrapper>
  );
}

export * from './content';
export * from './model';
export * from './pages';
export * from './query';
