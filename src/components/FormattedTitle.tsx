import { Fragment, type ElementType } from 'react';

type FormattedTitleProps = {
  title: string;
  className?: string;
  as?: ElementType;
  /** Vertical nudge for digits with serif descenders (e.g. 999). */
  numberOffset?: string;
};

export default function FormattedTitle({
  title,
  className,
  as: Tag = 'span',
  numberOffset,
}: FormattedTitleProps) {
  const parts = title.split(/(\d+)/g);

  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <span
            key={i}
            className={numberOffset ? 'relative inline-block lining-nums' : 'lining-nums'}
            style={numberOffset ? { top: numberOffset } : undefined}
          >
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </Tag>
  );
}
