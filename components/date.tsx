import { NextPage } from 'next';
import { parseISO, format } from 'date-fns';

export const Date: NextPage<{date: string}> = ({ date }) => {
  const d = parseISO(date);
  return (<time dateTime={date}>{format(d, 'LLLL d, yyyy')}</time>);
}