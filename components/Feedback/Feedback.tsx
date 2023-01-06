import type { FC, ReactNode } from 'react';
import { StyledFeedback, StyledFeedbackProps } from './Feedback.styles';

export type FeedbackProps = StyledFeedbackProps & {
  title?: string;
  titleHeading?: 'h1' | 'h2' | 'h3';
  message?: string;
  children?: ReactNode;
};

export const Feedback: FC<FeedbackProps> = ({
  type = 'info',
  title = 'Oops, there was an error!',
  titleHeading = 'h1',
  message,
  children,
  ...props
}) => {
  return (
    <StyledFeedback type={type} {...props}>
      {titleHeading === 'h1' ? (
        <h1>{title}</h1>
      ) : titleHeading === 'h2' ? (
        <h2>{title}</h2>
      ) : (
        <h3>{title}</h3>
      )}
      {title && !!message && <hr />}
      {message && <p>{message}</p>}
      <div>{children}</div>
    </StyledFeedback>
  );
};
